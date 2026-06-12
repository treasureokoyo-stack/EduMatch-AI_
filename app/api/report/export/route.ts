import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { sendRecommendationEmail } from "../../../utils/postmark";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { reportId, email } = await request.json();

    if (!reportId || !email) {
      return NextResponse.json({ error: "Report ID and Email are required" }, { status: 400 });
    }

    const report = await prisma.recommendation_reports.findUnique({
      where: { id: reportId },
      include: { user: true },
    });

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    const programs = JSON.parse(report.programs);
    const careers = JSON.parse(report.careers);

    // Format HTML for matches
    const matchesHtml = `
      <h3>Top Recommended Careers:</h3>
      <ul>
        ${careers.map((c: any) => `<li><strong>${c.name}</strong> (${c.score}% Match) - ${c.description}</li>`).join("")}
      </ul>
      <h3>Recommended Academic Programs:</h3>
      <ul>
        ${programs.map((p: any) => `
          <li>
            <strong>${p.name}</strong> - ${p.duration} (${p.deliveryMode})<br />
            Tuition: ${p.tuition} | Employment Rate: ${p.employmentRate}<br />
            <em>${p.description}</em>
          </li>
        `).join("")}
      </ul>
    `;

    const success = await sendRecommendationEmail(email, report.user.name || "Student", matchesHtml);

    if (!success) {
      return NextResponse.json({ error: "Failed to send email. Check Postmark server config." }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Report exported and emailed successfully!" });
  } catch (err: any) {
    console.error("Export API Error:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
