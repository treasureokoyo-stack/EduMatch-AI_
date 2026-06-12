import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.career_program_mappings.deleteMany();
  await prisma.career_weights.deleteMany();
  await prisma.programs.deleteMany();
  await prisma.careers.deleteMany();

  // Create careers
  const cData = [
    {
      name: "AI Data Analyst",
      description: "Analyze business metrics, manage automated analytics pipelines, and construct decision-support dashboards using AI models.",
      weights: [
        { category: "interest", key: "Data & Analytics", value: 25 },
        { category: "interest", key: "AI Automation", value: 15 },
        { category: "skill", key: "Logic & Math", value: 20 },
        { category: "goal", key: "Career Growth", value: 15 },
        { category: "preference", key: "Independent", value: 10 },
      ],
    },
    {
      name: "AI Software Developer",
      description: "Code intelligence features directly into SaaS applications, design agent networks, and integrate LLMs into production websites.",
      weights: [
        { category: "interest", key: "AI Development", value: 25 },
        { category: "interest", key: "AI Automation", value: 15 },
        { category: "skill", key: "Logic & Math", value: 20 },
        { category: "goal", key: "Better Income", value: 15 },
        { category: "preference", key: "Independent", value: 10 },
      ],
    },
    {
      name: "Generative AI Specialist",
      description: "Construct fine-tuning pipelines, manage prompt layouts, and engineer custom media assets with foundational diffusion models.",
      weights: [
        { category: "interest", key: "Generative AI", value: 25 },
        { category: "skill", key: "Creativity", value: 20 },
        { category: "goal", key: "Start a Business", value: 15 },
        { category: "preference", key: "Independent", value: 10 },
      ],
    },
  ];

  for (const c of cData) {
    const career = await prisma.careers.create({
      data: {
        name: c.name,
        description: c.description,
      },
    });

    for (const w of c.weights) {
      await prisma.career_weights.create({
        data: {
          careerId: career.id,
          category: w.category,
          key: w.key,
          weightValue: w.value,
        },
      });
    }
  }

  // Create programs
  const pData = [
    {
      name: "AI for Data Analytics",
      description: "The AI for Data Analytics program equips professionals with practical skills to leverage artificial intelligence in data-driven decision making.",
      duration: "6 Months",
      deliveryMode: "Online",
      tuition: "₦150,000",
      employmentRate: "98%",
      careers: ["AI Data Analyst"],
    },
    {
      name: "AI Software and Web Development",
      description: "Comprehensive software engineering curriculum centered on LLM API integrations, vector databases, and fullstack Next.js deployment.",
      duration: "8 Months",
      deliveryMode: "Hybrid",
      tuition: "₦250,000",
      employmentRate: "95%",
      careers: ["AI Software Developer"],
    },
    {
      name: "Applied Generative AI",
      description: "Hands-on bootcamp focusing on prompt engineering, model tuning, workflow automation, and stable diffusion applications.",
      duration: "4 Months",
      deliveryMode: "Online",
      tuition: "₦120,000",
      employmentRate: "92%",
      careers: ["Generative AI Specialist"],
    },
  ];

  for (const p of pData) {
    const prog = await prisma.programs.create({
      data: {
        name: p.name,
        description: p.description,
        duration: p.duration,
        deliveryMode: p.deliveryMode,
        tuition: p.tuition,
        employmentRate: p.employmentRate,
      },
    });

    for (const cName of p.careers) {
      const career = await prisma.careers.findUnique({
        where: { name: cName },
      });
      if (career) {
        await prisma.career_program_mappings.create({
          data: {
            careerId: career.id,
            programId: prog.id,
          },
        });
      }
    }
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
