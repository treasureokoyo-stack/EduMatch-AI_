"use client";
/* ─────────────────────────────────────────────
   AI Assessment — 8-question flow
   Exact markup from:
   ai_assessment_question_1_of_8/code.html
   ai_assessment_questions_2_3/code.html
   ai_assessment_questions_4_5/code.html
   ai_assessment_final_questions/code.html
   ───────────────────────────────────────────── */
import { useState } from "react";
import { useRouter } from "next/navigation";

/* ── Assessment question data ── */
type Option = { icon: string; label: string; desc?: string };
type Question = {
  q: string;
  hint: string;
  type: string;
  options?: Option[];
  labels?: string[];
};

const QUESTIONS: Question[] = [
  {
    q: "What best describes you?",
    hint: "Help our AI understand your current professional context.",
    type: "bento",
    options: [
      { icon: "school",     label: "Student",         desc: "Currently enrolled in an academic program or pursuing formal education." },
      { icon: "work",       label: "Professional",    desc: "Active in the workforce looking to upskill or specialize in your current field." },
      { icon: "transform",  label: "Career Switcher", desc: "Exploring new industries and looking for a structural path to transition." },
      { icon: "storefront", label: "Business Owner",  desc: "Entrepreneur seeking to leverage AI and decision intelligence for growth." },
    ],
  },
  {
    q: "What is your primary goal?",
    hint: "We'll tailor your path based on what success looks like to you.",
    type: "bento",
    options: [
      { icon: "home_work",  label: "Remote job",      desc: "Work from anywhere in the world on your schedule." },
      { icon: "payments",   label: "Earn more",       desc: "Maximize your market value with high-demand skills." },
      { icon: "shuffle",    label: "Change careers",  desc: "Transition smoothly into a completely new industry." },
      { icon: "laptop_mac", label: "Freelancing",     desc: "Become your own boss and build a client portfolio." },
      { icon: "trending_up",label: "Improve role",    desc: "Level up your current performance and prepare for promotion." },
    ],
  },
  {
    q: "What interests you most?",
    hint: "Select the domain where you want to apply your decision intelligence.",
    type: "list",
    options: [
      { icon: "memory",          label: "Technology" },
      { icon: "analytics",       label: "Data" },
      { icon: "business_center", label: "Business" },
      { icon: "palette",         label: "Design" },
      { icon: "groups",          label: "HR" },
    ],
  },
  {
    q: "How much experience do you have?",
    hint: "In your primary field of interest or study.",
    type: "bento",
    options: [
      { icon: "explore",           label: "None",         desc: "I am exploring a completely new field." },
      { icon: "school",            label: "Beginner",     desc: "I have foundational knowledge or 1 year of experience." },
      { icon: "workspace_premium", label: "Intermediate", desc: "I have 2-5 years of practical experience." },
      { icon: "psychology",        label: "Advanced",     desc: "Expert level or 5+ years of senior leadership." },
    ],
  },
  {
    q: "Technical Comfort Scale",
    hint: "How comfortable are you with learning new technical tools or platforms?",
    type: "scale",
    labels: ["Avoid Tech", "Capable", "Power User"],
  },
  {
    q: "How many hours weekly can you commit?",
    hint: "Consistent study schedules lead to best-fit course alignment.",
    type: "bento",
    options: [
      { icon: "schedule", label: "2-5 Hours",   desc: "Light commitment, fits around a busy schedule." },
      { icon: "schedule", label: "5-10 Hours",  desc: "Steady progress, balanced learning pace." },
      { icon: "schedule", label: "10-20 Hours", desc: "Accelerated path for career switchers." },
      { icon: "schedule", label: "20+ Hours",   desc: "Immersive focus, rapid skill acquisition." },
    ],
  },
  {
    q: "What is your preferred learning style?",
    hint: "We'll prioritize courses that match how you process information.",
    type: "bento",
    options: [
      { icon: "construction", label: "Practical", desc: "I learn by doing and building hands-on projects." },
      { icon: "code",         label: "Technical", desc: "I prefer coding, scripting, and configuring systems." },
      { icon: "palette",      label: "Creative",  desc: "I enjoy styling interfaces and crafting visual models." },
      { icon: "insights",     label: "Strategic", desc: "I like business alignment and optimization frameworks." },
    ],
  },
  {
    q: "What concerns you most?",
    hint: "We'll tailor your recommendations to address these hurdles directly.",
    type: "list",
    options: [
      { icon: "payments",    label: "Cost & ROI" },
      { icon: "extension",   label: "Difficulty Level" },
      { icon: "alarm",       label: "Time Management" },
      { icon: "history_edu", label: "Lack of Prior Experience" },
      { icon: "help",        label: "Choosing the Wrong Path" },
    ],
  },
];;

/* ── Option card (Bento style) ── */
function BentoOption({
  icon,
  label,
  desc,
  selected,
  onClick,
}: {
  icon: string;
  label: string;
  desc: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="selection-card glass-card"
      style={{
        padding: "2rem",
        borderRadius: "24px",
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        border: `1px solid ${selected ? "var(--secondary)" : "var(--outline-variant)"}`,
        background: selected ? "var(--lavender-light)" : "rgba(255,255,255,0.4)",
        transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        cursor: "pointer",
        width: "100%",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "var(--radius-md)",
          background: "var(--lavender-light)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.2s",
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: "28px", color: "var(--secondary)" }}>{icon}</span>
      </div>
      <div>
        <h3 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "0.25rem" }}>{label}</h3>
        <p style={{ fontSize: "14px", color: "var(--on-surface-variant)" }}>{desc}</p>
      </div>
    </button>
  );
}

/* ── List option ── */
function ListOption({
  icon,
  label,
  selected,
  onClick,
}: {
  icon: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: "1rem 1.5rem",
        borderRadius: "var(--radius-md)",
        border: `1px solid ${selected ? "var(--secondary)" : "var(--outline-variant)"}`,
        background: selected ? "var(--lavender-light)" : "rgba(255,255,255,0.4)",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        textAlign: "left",
        cursor: "pointer",
        transition: "all 0.2s",
        backdropFilter: "blur(12px)",
      }}
    >
      <span className="material-symbols-outlined" style={{ color: "var(--secondary)", fontSize: "22px" }}>{icon}</span>
      <span style={{ fontSize: "16px", fontWeight: selected ? 600 : 400, color: "var(--on-surface)" }}>{label}</span>
      {selected && <span className="material-symbols-outlined" style={{ marginLeft: "auto", color: "var(--secondary)", fontSize: "20px" }}>check_circle</span>}
    </button>
  );
}

/* ── PAGE ── */
export default function AssessmentPage() {
  const router = useRouter();
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [scaleVal, setScaleVal] = useState(3);

  const q = QUESTIONS[qIdx];
  const totalQ = QUESTIONS.length;
  const progress = ((qIdx) / totalQ) * 100;
  const current = answers[qIdx];

  function select(label: string) {
    setAnswers((a) => ({ ...a, [qIdx]: label }));
  }

  function next() {
    if (qIdx < totalQ - 1) setQIdx((i) => i + 1);
    else router.push("/recommendations");
  }
  function back() { if (qIdx > 0) setQIdx((i) => i - 1); }

  return (
    <div style={{ background: "var(--surface)", minHeight: "100vh", fontFamily: "var(--font-family)" }}>
      {/* TopNav */}
      <header
        style={{
          background: "var(--surface-container-lowest)",
          boxShadow: "0 1px 3px rgba(0,0,0,.08)",
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 50,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: 64,
            padding: "0 var(--space-margin-desktop)",
            maxWidth: "var(--container-max)",
            margin: "0 auto",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <span style={{ fontSize: "24px", fontWeight: 900, color: "var(--primary)" }}>EduMatch AI</span>
            <nav style={{ display: "flex", gap: "1.5rem" }}>
              {["Home", "Courses", "Resources", "Pricing"].map((item) => (
                <a key={item} href="#" style={{ fontSize: "16px", color: "var(--on-surface-variant)", textDecoration: "none", transition: "color 0.2s" }}>
                  {item}
                </a>
              ))}
            </nav>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button style={{ background: "none", border: "none", color: "var(--on-surface-variant)", cursor: "pointer", padding: "0.5rem", borderRadius: "50%" }}>
              <span className="material-symbols-outlined">search</span>
            </button>
            <button
              style={{
                background: "var(--primary)",
                color: "#fff",
                padding: "0.5rem 1.5rem",
                borderRadius: "var(--radius-full)",
                border: "none",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "transform 0.2s",
              }}
            >
              Request Demo
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main
        style={{
          paddingTop: "8rem",
          paddingBottom: "5rem",
          padding: "8rem var(--space-margin-mobile) 5rem",
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient orbs */}
        <div style={{ position: "absolute", top: "-6rem", right: "-6rem", width: "24rem", height: "24rem", background: "var(--lavender-light)", opacity: 0.5, filter: "blur(100px)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", left: "-6rem", width: "16rem", height: "16rem", background: "var(--secondary-fixed-dim)", opacity: 0.3, filter: "blur(80px)", borderRadius: "50%", pointerEvents: "none" }} />

        {/* Progress section */}
        <div style={{ maxWidth: "48rem", margin: "0 auto 3rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1rem" }}>
            <div>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--secondary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                AI Assessment
              </span>
              <h1 style={{ fontSize: "32px", fontWeight: 200, color: "var(--on-surface)", marginTop: "0.25rem", letterSpacing: "-0.01em" }}>
                Tailoring your journey
              </h1>
            </div>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--on-surface-variant)" }}>
              {qIdx + 1} / {totalQ}
            </span>
          </div>
          {/* Gradient progress bar */}
          <div style={{ height: 8, width: "100%", background: "var(--surface-container-highest)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                background: "linear-gradient(to right, var(--gradient-start), var(--gradient-end))",
                width: `${((qIdx + 1) / totalQ) * 100}%`,
                borderRadius: "var(--radius-full)",
                transition: "width 0.5s ease",
              }}
            />
          </div>
        </div>

        {/* Question */}
        <div style={{ maxWidth: "48rem", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: "24px", fontWeight: 300, color: "var(--on-surface)", lineHeight: 1.4 }}>{q.q}</h2>
            <p style={{ color: "var(--on-surface-variant)", marginTop: "0.5rem", fontSize: "16px" }}>{q.hint}</p>
          </div>

          {/* Bento grid */}
          {q.type === "bento" && q.options && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "var(--space-gutter)" }}>
              {q.options.map((opt) => (
                <BentoOption
                  key={opt.label}
                  icon={opt.icon}
                  label={opt.label}
                  desc={opt.desc ?? ""}
                  selected={current === opt.label}
                  onClick={() => select(opt.label)}
                />
              ))}
            </div>
          )}

          {/* List options */}
          {q.type === "list" && q.options && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {q.options.map((opt) => (
                <ListOption
                  key={opt.label}
                  icon={opt.icon}
                  label={opt.label}
                  selected={current === opt.label}
                  onClick={() => select(opt.label)}
                />
              ))}
            </div>
          )}

          {/* Scale */}
          {q.type === "scale" && (
            <div className="glass-card" style={{ borderRadius: "24px", padding: "2rem", border: "1px solid rgba(255,255,255,0.2)" }}>
              <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <span style={{ fontSize: "48px", fontWeight: 900, color: "var(--secondary)" }}>{scaleVal}</span>
                <span style={{ fontSize: "20px", color: "var(--on-surface-variant)", marginLeft: "4px" }}>/ 5</span>
              </div>
              <input
                type="range"
                min={1}
                max={5}
                value={scaleVal}
                onChange={(e) => {
                  setScaleVal(Number(e.target.value));
                  select(String(e.target.value));
                }}
                style={{ width: "100%", accentColor: "var(--secondary)" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.75rem", fontSize: "13px", color: "var(--on-surface-variant)", fontWeight: 600 }}>
                {q.labels?.map((l) => <span key={l}>{l}</span>)}
              </div>
            </div>
          )}

          {/* Action row */}
          <div
            style={{
              marginTop: "4rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid var(--outline-variant)",
              paddingTop: "2rem",
            }}
          >
            <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
              <button
                onClick={back}
                disabled={qIdx === 0}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "none",
                  border: "none",
                  color: qIdx === 0 ? "var(--surface-variant)" : "var(--on-surface-variant)",
                  cursor: qIdx === 0 ? "not-allowed" : "pointer",
                  fontSize: "14px",
                  fontWeight: 600,
                  transition: "color 0.2s",
                }}
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Back
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <span style={{ color: "var(--on-surface-variant)", fontSize: "14px" }}>
                  Press <kbd style={{ padding: "0.125rem 0.5rem", background: "var(--surface-container)", borderRadius: "0.375rem", border: "1px solid var(--outline-variant)", fontFamily: "monospace" }}>Enter</kbd> to continue
                </span>
                <button
                  onClick={next}
                  style={{
                    background: "linear-gradient(90deg, #6742FA 0%, #8B6BFF 100%)",
                    boxShadow: "0 4px 14px 0 rgba(103, 66, 250, 0.3)",
                    color: "#fff",
                    padding: "1rem 2.5rem",
                    borderRadius: "var(--radius-full)",
                    border: "none",
                    fontSize: "14px",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    transition: "transform 0.2s",
                  }}
                >
                  {qIdx === totalQ - 1 ? "See My Results" : "Next Step"}
                  <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating AI tooltip card (desktop) */}
      <div
        style={{
          position: "fixed",
          bottom: "3rem",
          right: "3rem",
          width: 256,
          padding: "1.5rem",
          borderRadius: "24px",
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.4)",
          boxShadow: "0 25px 50px rgba(0,0,0,.15)",
          animation: "bounceSlow 4s ease-in-out infinite",
          zIndex: 40,
        }}
        className="ai-float-card"
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "linear-gradient(to tr, var(--gradient-start), var(--gradient-end))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span className="material-symbols-outlined" style={{ color: "#fff", fontSize: "14px" }}>auto_awesome</span>
          </div>
          <span style={{ fontSize: "14px", fontWeight: 600 }}>AI Assistant</span>
        </div>
        <p style={{ fontSize: "12px", color: "var(--on-surface-variant)", fontStyle: "italic" }}>
          "This helps me filter 4,500+ modules into a personalized 12-month roadmap just for you."
        </p>
      </div>

      <style>{`
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @media (max-width: 1023px) {
          .ai-float-card { display: none; }
        }
      `}</style>
    </div>
  );
}
