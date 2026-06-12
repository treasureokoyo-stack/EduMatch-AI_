import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { userId, email, name, answers } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // 1. Ensure User exists
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: name || "Student",
        },
      });
    }

    // 2. Save Assessment
    const assessment = await prisma.assessments.create({
      data: {
        userId: user.id,
      },
    });

    // Save individual responses
    const responseData = Object.entries(answers).map(([qIdx, ans]) => ({
      assessmentId: assessment.id,
      questionIdx: parseInt(qIdx, 10),
      questionText: `Question ${parseInt(qIdx, 10) + 1}`,
      answer: String(ans),
    }));

    await prisma.assessment_responses.createMany({
      data: responseData,
    });

    // 3. Career Match Engine (Deterministic scoring)
    const careers = await prisma.careers.findMany({
      include: { weights: true },
    });

    const careerScores = careers.map((career) => {
      let score = 0;
      const reasons: string[] = [];

      // Calculate score based on answers matching weights
      career.weights.forEach((w) => {
        const matchingAns = Object.values(answers).some((val) => String(val).toLowerCase().includes(w.key.toLowerCase()));
        if (matchingAns) {
          score += w.weightValue;
          reasons.push(`Aligns with your preference for ${w.key}`);
        }
      });

      // Simple normalization (ensure between 0 and 100)
      const maxScore = career.weights.reduce((sum, w) => sum + w.weightValue, 0) || 100;
      const finalScorePct = Math.min(100, Math.max(0, Math.round((score / maxScore) * 100)));

      return {
        id: career.id,
        name: career.name,
        description: career.description,
        score: finalScorePct,
        reasons: reasons.slice(0, 3), // Top 3 reasons
      };
    });

    // Sort and take top 3 careers
    const topCareers = careerScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    // 4. Program Recommendations
    const topCareerIds = topCareers.map((c) => c.id);
    const mappings = await prisma.career_program_mappings.findMany({
      where: { careerId: { in: topCareerIds } },
      include: { program: true },
    });

    const recommendedPrograms = mappings.map((m) => ({
      name: m.program.name,
      description: m.program.description,
      duration: m.program.duration,
      deliveryMode: m.program.deliveryMode,
      tuition: m.program.tuition,
      employmentRate: m.program.employmentRate || "N/A",
      fitScore: topCareers.find((c) => c.id === m.careerId)?.score || 80,
    })).slice(0, 5);

    // 5. Store Recommendation Report
    const report = await prisma.recommendation_reports.create({
      data: {
        userId: user.id,
        summary: JSON.stringify({
          userName: name || "Student",
          email,
          completedAt: new Date().toISOString(),
        }),
        careers: JSON.stringify(topCareers),
        programs: JSON.stringify(recommendedPrograms),
      },
    });

    return NextResponse.json({
      success: true,
      reportId: report.id,
      careers: topCareers,
      programs: recommendedPrograms,
    });
  } catch (err: any) {
    console.error("Submission API Error:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
