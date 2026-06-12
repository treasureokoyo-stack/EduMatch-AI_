"use client";
/* ─────────────────────────────────────────────
   AI Course Recommendations
   Exact markup from:
   ai_course_recommendations_redesigned/code.html
   ───────────────────────────────────────────── */
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

/* ── Filter Chip ── */
function FilterBtn({ icon, label }: { icon: string; label: string }) {
  return (
    <button
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem 1.25rem",
        borderRadius: "var(--radius-full)",
        border: "1px solid var(--outline-variant)",
        background: "var(--surface-container-lowest)",
        color: "var(--on-surface-variant)",
        fontSize: "14px",
        fontWeight: 600,
        letterSpacing: "0.02em",
        cursor: "pointer",
        boxShadow: "0 1px 3px rgba(0,0,0,.06)",
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--secondary)";
        (e.currentTarget as HTMLElement).style.background = "rgba(97,62,211,0.04)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--outline-variant)";
        (e.currentTarget as HTMLElement).style.background = "var(--surface-container-lowest)";
      }}
    >
      <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>{icon}</span>
      {label}
    </button>
  );
}

/* ── CourseCard (secondary match) ── */
function CourseCard({
  title,
  meta,
  salary,
  difficulty,
  matchPct,
}: {
  title: string;
  meta: string;
  salary: string;
  difficulty: string;
  matchPct: string;
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "var(--radius-xl)",
        padding: "1.5rem",
        border: "1px solid rgba(198,198,205,0.3)",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        boxShadow: "0 1px 4px rgba(0,0,0,.05)",
        transition: "all 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 40px rgba(0,0,0,.12)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(97,62,211,0.2)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(0,0,0,.05)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(198,198,205,0.3)";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
        <h4 style={{ fontSize: "20px", fontWeight: 300, color: "var(--primary)", lineHeight: 1.3, flex: 1, transition: "color 0.2s" }}>
          {title}
        </h4>
        <span
          style={{
            background: "var(--surface-container-high)",
            color: "var(--on-surface-variant)",
            padding: "0.25rem 0.75rem",
            borderRadius: "var(--radius-full)",
            fontSize: "11px",
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}
        >
          {matchPct} MATCH
        </span>
      </div>
      <p style={{ fontSize: "16px", color: "var(--on-surface-variant)" }}>{meta}</p>
      <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "13px", color: "var(--on-surface-variant)", fontWeight: 600 }}>
          <span className="material-symbols-outlined" style={{ fontSize: "18px", color: "var(--secondary)" }}>payments</span>
          {salary}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "13px", color: "var(--on-surface-variant)", fontWeight: 600 }}>
          <span className="material-symbols-outlined" style={{ fontSize: "18px", color: "var(--secondary)" }}>bar_chart</span>
          {difficulty}
        </span>
      </div>
      <Link href="/course">
        <button
          style={{
            padding: "0.625rem 2rem",
            borderRadius: "var(--radius-full)",
            border: "1px solid var(--outline-variant)",
            background: "transparent",
            color: "var(--primary)",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s",
            alignSelf: "flex-start",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--primary)";
            (e.currentTarget as HTMLElement).style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "var(--primary)";
          }}
        >
          Details
        </button>
      </Link>
    </div>
  );
}

/* ── Skill Bar ── */
function SkillBar({ label, pct }: { label: string; pct: number }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "0.5rem", fontWeight: 600 }}>
        <span style={{ color: "rgba(255,255,255,0.9)" }}>{label}</span>
        <span style={{ color: "var(--secondary)", fontWeight: 700 }}>{pct}%</span>
      </div>
      <div style={{ width: "100%", background: "rgba(255,255,255,0.1)", borderRadius: "var(--radius-full)", height: 8 }}>
        <div
          style={{
            background: "var(--secondary)",
            height: 8,
            borderRadius: "var(--radius-full)",
            width: `${pct}%`,
            boxShadow: "0 0 10px rgba(97,62,211,0.5)",
          }}
        />
      </div>
    </div>
  );
}

/* ── PAGE ── */
export default function RecommendationsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "var(--surface-off-white)" }}>
      <Header />

      <main
        style={{
          flex: 1,
          width: "100%",
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "3rem var(--space-margin-mobile)",
        }}
      >
        {/* Page Header */}
        <header style={{ marginBottom: "3rem" }}>
          <h1
            className="text-headline-xl text-primary"
            style={{ marginBottom: "1rem", fontWeight: 200 }}
          >
            Your Best Program Matches
          </h1>
          <p className="text-body-lg text-on-surface-variant">
            Based on your aptitude scores, interest profile, and market demand projections for 2028.
          </p>
        </header>

        {/* 12-col grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "var(--space-gutter)",
          }}
        >
          {/* ── LEFT: main content ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Filter chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
              <FilterBtn icon="speed"    label="Self-Paced" />
              <FilterBtn icon="group"    label="Instructor-Led" />
              <FilterBtn icon="payments" label="Cost" />
              <FilterBtn icon="schedule" label="Duration" />
              <FilterBtn icon="work"     label="Career Outcome" />
            </div>

            {/* ── TOP MATCH CARD ── */}
            <section
              style={{
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderRadius: "var(--radius-xl)",
                padding: "2rem",
                position: "relative",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.4)",
                boxShadow: "0 20px 40px rgba(0,0,0,.1)",
              }}
            >
              {/* Glow orb */}
              <div
                style={{
                  position: "absolute",
                  top: "-6rem",
                  right: "-6rem",
                  width: "24rem",
                  height: "24rem",
                  background: "linear-gradient(to br, var(--lavender-light), rgba(97,62,211,0.1))",
                  borderRadius: "50%",
                  filter: "blur(80px)",
                  opacity: 0.6,
                  zIndex: 0,
                }}
              />

              <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                    <span
                      style={{
                        background: "var(--secondary)",
                        color: "#fff",
                        padding: "0.25rem 1rem",
                        borderRadius: "var(--radius-full)",
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      Top Match
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.375rem", color: "var(--secondary)", fontWeight: 700, fontSize: "14px" }}>
                      <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>auto_awesome</span>
                      94% Fit Score
                    </span>
                  </div>

                  <h2 className="text-headline-lg text-primary" style={{ marginBottom: "0.75rem" }}>
                    AI for Data Analytics
                  </h2>
                  <p className="text-body-md text-on-surface-variant" style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>school</span>
                    Techstitute Online
                    <span style={{ opacity: 0.3 }}>•</span>
                    <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>calendar_today</span>
                    6 Months
                    <span style={{ opacity: 0.3 }}>•</span>
                    <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>bolt</span>
                    Self-Paced
                  </p>

                  {/* Why this match */}
                  <div
                    style={{
                      background: "rgba(255,255,255,0.4)",
                      borderRadius: "var(--radius-xl)",
                      padding: "1.5rem",
                      border: "1px solid rgba(255,255,255,0.6)",
                      marginBottom: "2rem",
                      boxShadow: "0 1px 4px rgba(0,0,0,.04)",
                    }}
                  >
                    <h3 className="text-label-md text-primary" style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                      <span className="material-symbols-outlined" style={{ color: "var(--secondary)", fontSize: "20px" }}>psychology</span>
                      Why this is your top match:
                    </h3>
                    <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {[
                        "Aligns perfectly with your high aptitude in analytical reasoning.",
                        "Strong overlap with your interest in leveraging AI for data-driven decisions.",
                      ].map((reason) => (
                        <li key={reason} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", color: "var(--on-surface-variant)", fontSize: "16px" }}>
                          <span className="material-symbols-outlined" style={{ color: "var(--secondary)", fontSize: "18px", marginTop: "2px", flexShrink: 0 }}>verified</span>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTAs */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                    <Link href="/course">
                      <button
                        style={{
                          background: "var(--secondary)",
                          color: "#fff",
                          padding: "0.875rem 2rem",
                          borderRadius: "var(--radius-full)",
                          border: "none",
                          fontSize: "14px",
                          fontWeight: 600,
                          cursor: "pointer",
                          boxShadow: "0 8px 20px rgba(97,62,211,0.3)",
                          transition: "all 0.2s",
                        }}
                      >
                        View Program
                      </button>
                    </Link>
                    <button
                      style={{
                        padding: "0.875rem 2rem",
                        borderRadius: "var(--radius-full)",
                        border: "2px solid rgba(97,62,211,0.2)",
                        color: "var(--secondary)",
                        background: "transparent",
                        fontSize: "14px",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      Save Shortlist
                    </button>
                  </div>
                </div>

                {/* Circular score */}
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <div style={{ position: "relative", width: 160, height: 160, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
                      <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(97,62,211,0.1)" strokeWidth="6" />
                      <circle
                        cx="50" cy="50" r="44" fill="none"
                        stroke="var(--secondary)"
                        strokeWidth="8"
                        strokeDasharray="276.46"
                        strokeDashoffset="16.58"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div style={{ position: "absolute", textAlign: "center" }}>
                      <span style={{ display: "block", fontSize: "32px", fontWeight: 900, color: "var(--primary)", lineHeight: 1 }}>94%</span>
                      <span style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "-0.03em", color: "var(--on-surface-variant)", fontWeight: 700 }}>Match</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ── OTHER MATCHES ── */}
            <section>
              <h3 className="text-headline-md text-primary" style={{ marginBottom: "1.5rem" }}>Other Strong Matches</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <CourseCard
                  title="AI Software and Web Development"
                  meta="Techstitute Online • 8 Months • Instructor-Led"
                  salary="₦15M+ Salary Potential"
                  difficulty="High Difficulty"
                  matchPct="89%"
                />
                <CourseCard
                  title="Applied Generative AI"
                  meta="Techstitute Online • 4 Months • Self-Paced"
                  salary="₦12M+ Salary Potential"
                  difficulty="Medium Difficulty"
                  matchPct="85%"
                />
              </div>
            </section>
          </div>

          {/* ── RIGHT: AI Insight sidebar ── */}
          <aside style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Dark panel */}
            <div
              style={{
                background: "var(--deep-blue-accent)",
                color: "#fff",
                borderRadius: "var(--radius-xl)",
                padding: "2rem",
                boxShadow: "0 25px 50px rgba(0,0,0,.2)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* glow orb */}
              <div style={{ position: "absolute", top: 0, right: 0, width: 192, height: 192, background: "rgba(97,62,211,0.2)", borderRadius: "50%", filter: "blur(80px)", transform: "translate(40px,-40px)" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", background: "rgba(97,62,211,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="material-symbols-outlined" style={{ color: "var(--secondary)" }}>psychology_alt</span>
                  </div>
                  <h3 style={{ fontSize: "22px", fontWeight: 300, color: "#fff" }}>AI Insight</h3>
                </div>

                {/* Skills mapping */}
                <div style={{ marginBottom: "2.5rem" }}>
                  <h4 style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.25rem" }}>
                    Skills Mapping
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <SkillBar label="Logic & Math" pct={95} />
                    <SkillBar label="Communication" pct={70} />
                    <SkillBar label="Creativity" pct={82} />
                  </div>
                </div>

                {/* Career trajectory */}
                <div>
                  <h4 style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>
                    Career Trajectory
                  </h4>
                  <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "var(--radius-xl)", padding: "1.25rem", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)", lineHeight: 1.75 }}>
                      Graduates typically enter roles such as{" "}
                      <strong style={{ color: "#fff" }}>Data Analytics Manager</strong> or{" "}
                      <strong style={{ color: "#fff" }}>AI Integration Specialist</strong> with an average starting salary of{" "}
                      <strong style={{ color: "var(--secondary)" }}>₦15,000,000</strong> annually.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ background: "#fff", borderRadius: "var(--radius-xl)", padding: "1.5rem", border: "1px solid rgba(198,198,205,0.3)", display: "flex", flexDirection: "column", gap: "1rem", boxShadow: "0 1px 4px rgba(0,0,0,.05)" }}>
              <button
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  padding: "0.875rem 1.5rem",
                  borderRadius: "var(--radius-full)",
                  border: "1px solid var(--outline-variant)",
                  color: "var(--primary)",
                  background: "transparent",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>share</span>
                Share Results
              </button>
              <button
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  padding: "0.875rem 1.5rem",
                  borderRadius: "var(--radius-full)",
                  background: "var(--primary)",
                  color: "#fff",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: "0 4px 12px rgba(0,0,0,.2)",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>support_agent</span>
                Request Advisor
              </button>
            </div>
          </aside>
        </div>

        {/* Responsive sidebar below main on mobile */}
        <style>{`
          @media (min-width: 1024px) {
            .recs-grid {
              grid-template-columns: 8fr 4fr !important;
            }
          }
        `}</style>
      </main>

      <Footer />
    </div>
  );
}
