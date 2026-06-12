"use client";
/* ─────────────────────────────────────────────
   Course Detail — AI for Data Analytics
   Exact markup from:
   course_detail_ai_for_data_analytics_updated_nav/code.html
   ───────────────────────────────────────────── */
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

/* ── Stat meta row item ── */
function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--on-surface-variant)", marginBottom: "0.25rem" }}>
        {label}
      </span>
      <span style={{ fontSize: "18px", fontWeight: 500, color: "var(--primary)" }}>{value}</span>
    </div>
  );
}

/* ── Job row with bar ── */
function JobRow({ title, range, barPct, opacity = 1 }: { title: string; range: string; barPct: number; opacity?: number }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.375rem" }}>
        <span style={{ fontSize: "16px", color: "var(--on-surface)" }}>{title}</span>
        <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--primary)" }}>{range}</span>
      </div>
      <div style={{ width: "100%", background: "var(--surface-variant)", borderRadius: "var(--radius-full)", height: 6 }}>
        <div style={{ background: "var(--secondary)", height: 6, borderRadius: "var(--radius-full)", width: `${barPct}%`, opacity }} />
      </div>
    </div>
  );
}

/* ── Similar Programme card ── */
function SimilarCard({ title, meta, match }: { title: string; meta: string; match: string }) {
  return (
    <a
      href="#"
      style={{
        display: "block",
        padding: "0.75rem",
        borderRadius: "var(--radius-md)",
        border: "1px solid transparent",
        transition: "all 0.2s",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "var(--surface)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--surface-variant)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "transparent";
        (e.currentTarget as HTMLElement).style.borderColor = "transparent";
      }}
    >
      <h4 style={{ fontSize: "14px", fontWeight: 600, color: "var(--primary)", transition: "color 0.2s" }}>{title}</h4>
      <p style={{ fontSize: "12px", color: "var(--on-surface-variant)", marginTop: "0.25rem" }}>{meta}</p>
      <div style={{ marginTop: "0.5rem" }}>
        <span style={{ padding: "0.125rem 0.5rem", background: "var(--secondary-fixed)", color: "var(--secondary)", borderRadius: "0.25rem", fontSize: "10px", fontWeight: 700 }}>
          {match} Match
        </span>
      </div>
    </a>
  );
}

/* ── PAGE ── */
export default function CourseDetailPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "var(--background)" }}>
      <Header />

      {/* Mobile bottom nav */}
      <nav
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          background: "var(--primary-container)",
          zIndex: 50,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: 64,
          boxShadow: "0 -4px 6px -1px rgba(0,0,0,0.1)",
        }}
        className="mobile-nav"
      >
        {[
          { icon: "school",     label: "Programs",  active: true },
          { icon: "dashboard",  label: "Dashboard", active: false },
          { icon: "analytics",  label: "Analytics", active: false },
          { icon: "settings",   label: "Settings",  active: false },
        ].map((item) => (
          <a
            key={item.label}
            href="#"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              color: item.active ? "var(--secondary)" : "var(--on-primary-container)",
              textDecoration: "none",
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>{item.icon}</span>
            <span style={{ fontSize: "10px", marginTop: "2px", fontWeight: item.active ? 600 : 400 }}>{item.label}</span>
          </a>
        ))}
      </nav>

      <main
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "2rem var(--space-margin-mobile) 6rem",
        }}
      >
        {/* Breadcrumbs */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "14px", color: "var(--on-surface-variant)", marginBottom: "1.5rem" }}>
          <Link href="/recommendations" style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }}>Programs</Link>
          <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>chevron_right</span>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Technology</a>
          <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>chevron_right</span>
          <span style={{ color: "var(--on-surface)" }}>AI for Data Analytics</span>
        </div>

        {/* Programme Header */}
        <div
          style={{
            background: "var(--surface-container-lowest)",
            borderRadius: "var(--radius-xl)",
            padding: "2rem",
            marginBottom: "var(--space-gutter)",
            boxShadow: "0 10px 40px -10px rgba(30,41,59,0.08)",
            border: "1px solid var(--surface-variant)",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative orb */}
          <div style={{ position: "absolute", top: 0, right: 0, width: 256, height: 256, background: "var(--secondary-fixed-dim)", borderRadius: "50%", filter: "blur(80px)", opacity: 0.2, transform: "translate(25%, -50%)", pointerEvents: "none" }} />

          <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", position: "relative", zIndex: 1 }}>
            {/* Logo */}
            <div style={{ width: 80, height: 80, borderRadius: "var(--radius-md)", background: "var(--surface-container)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--outline-variant)", flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ fontSize: "40px", color: "var(--secondary)" }}>school</span>
            </div>

            <div style={{ flex: 1 }}>
              <h1 className="text-headline-lg-mobile text-primary" style={{ marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>
                AI for Data Analytics
              </h1>
              <p className="text-body-lg text-on-surface-variant" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                Online Learning Path
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 20, height: 20, borderRadius: "50%", background: "var(--secondary-fixed)", color: "var(--secondary)", fontSize: "10px" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>verified</span>
                </span>
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1rem" }}>
                {["100% Online", "Lifetime Access"].map((tag) => (
                  <span key={tag} style={{ padding: "0.25rem 0.75rem", background: "var(--surface-container)", borderRadius: "var(--radius-full)", fontSize: "12px", fontWeight: 600, color: "var(--on-surface)" }}>{tag}</span>
                ))}
                <span style={{ padding: "0.25rem 0.75rem", background: "var(--lavender-light)", borderRadius: "var(--radius-full)", fontSize: "12px", fontWeight: 600, color: "var(--secondary)", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>workspace_premium</span>
                  Certification Included
                </span>
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: "1rem", position: "relative", zIndex: 1 }}>
            <button
              style={{
                flex: 1,
                padding: "0.75rem 1.5rem",
                borderRadius: "var(--radius-md)",
                border: "2px solid var(--outline-variant)",
                background: "transparent",
                color: "var(--on-surface)",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                transition: "all 0.2s",
              }}
            >
              <span className="material-symbols-outlined">bookmark_border</span>
              Save
            </button>
            <button
              className="btn-gradient"
              style={{
                flex: 1,
                padding: "0.75rem 2rem",
                borderRadius: "var(--radius-md)",
                fontSize: "14px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                cursor: "pointer",
              }}
            >
              Apply Now
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* 2-col grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "var(--space-gutter)",
          }}
          className="detail-grid"
        >
          {/* ── LEFT ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-gutter)" }}>
            {/* Overview */}
            <section
              style={{
                background: "var(--surface-container-lowest)",
                borderRadius: "var(--radius-xl)",
                padding: "2rem",
                boxShadow: "0 10px 40px -10px rgba(30,41,59,0.08)",
                border: "1px solid var(--surface-variant)",
              }}
            >
              <h2 className="text-headline-md text-primary" style={{ marginBottom: "1.5rem" }}>Overview</h2>
              <p className="text-body-md text-on-surface-variant" style={{ marginBottom: "1.5rem", lineHeight: 1.75 }}>
                The AI for Data Analytics program equips professionals with practical skills to leverage artificial intelligence in data-driven decision making. It combines hands-on projects with industry-standard AI tools to provide a deep understanding of how to automate and enhance data analysis. Graduates are ready to apply AI techniques in various business contexts.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "1rem",
                  paddingTop: "1.5rem",
                  borderTop: "1px solid var(--surface-variant)",
                }}
              >
                <StatItem label="Duration"   value="6 Months" />
                <StatItem label="Tuition"    value="₦150,000" />
                <StatItem label="Start Date" value="Self-paced" />
                <StatItem label="Credits"    value="12 Modules" />
              </div>
            </section>

            {/* AI Fit Analysis */}
            <section>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
                <span className="material-symbols-outlined" style={{ color: "var(--secondary)", fontSize: "24px" }}>psychology</span>
                <h2 className="text-headline-md text-primary">AI Fit Analysis</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}>
                {/* Fit score card */}
                <div
                  className="glass-panel"
                  style={{
                    borderRadius: "var(--radius-xl)",
                    padding: "1.5rem",
                    position: "relative",
                    overflow: "hidden",
                    background: "linear-gradient(to br, var(--surface-off-white), var(--surface-container-lowest))",
                  }}
                >
                  <div style={{ position: "absolute", top: -24, right: -24, width: 128, height: 128, background: "var(--secondary-fixed)", borderRadius: "50%", filter: "blur(40px)", opacity: 0.5 }} />
                  <h3 className="text-label-md text-on-surface-variant" style={{ marginBottom: "1rem" }}>Your Match Score</h3>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "1rem" }}>
                    <span style={{ fontSize: "48px", fontWeight: 900, color: "var(--primary)", letterSpacing: "-0.02em", lineHeight: 1 }}>
                      94<span style={{ fontSize: "28px", color: "var(--on-surface-variant)" }}>%</span>
                    </span>
                    <span style={{ background: "var(--secondary-fixed)", color: "var(--secondary)", padding: "0.25rem 0.75rem", borderRadius: "0.25rem", fontSize: "14px", fontWeight: 600, marginBottom: "0.5rem" }}>
                      Exceptional Fit
                    </span>
                  </div>
                  <p className="text-body-md text-on-surface-variant" style={{ marginTop: "1rem", fontSize: "14px" }}>
                    Based on your background in data analysis and expressed interest in AI applications.
                  </p>
                </div>

                {/* Ideal candidate */}
                <div
                  style={{
                    background: "var(--surface-container-lowest)",
                    borderRadius: "var(--radius-xl)",
                    padding: "1.5rem",
                    border: "1px solid var(--surface-variant)",
                    boxShadow: "0 10px 40px -10px rgba(30,41,59,0.08)",
                  }}
                >
                  <h3 className="text-label-md text-on-surface-variant" style={{ marginBottom: "1rem" }}>Ideal Candidate Profile</h3>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {[
                      "Professionals looking to integrate AI into data workflows",
                      "Basic understanding of data concepts",
                      "Interest in practical AI tools and automation",
                    ].map((item) => (
                      <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                        <span className="material-symbols-outlined" style={{ color: "var(--secondary)", fontSize: "18px", marginTop: "2px", flexShrink: 0 }}>check_circle</span>
                        <span style={{ fontSize: "14px", color: "var(--on-surface)" }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Career Outcomes */}
            <section
              style={{
                background: "var(--surface-container-lowest)",
                borderRadius: "var(--radius-xl)",
                padding: "2rem",
                boxShadow: "0 10px 40px -10px rgba(30,41,59,0.08)",
                border: "1px solid var(--surface-variant)",
              }}
            >
              <h2 className="text-headline-md text-primary" style={{ marginBottom: "1.5rem" }}>Career Outcomes</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>
                <div>
                  <h3 style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--on-surface-variant)", marginBottom: "1rem" }}>Top Job Roles</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <JobRow title="AI Data Analyst"       range="₦8M – ₦15M"  barPct={85} />
                    <JobRow title="Data Science Consultant" range="₦10M – ₦18M" barPct={70} opacity={0.8} />
                    <JobRow title="BI Analyst"            range="₦5M – ₦9M"   barPct={45} opacity={0.6} />
                  </div>
                </div>
                <div>
                  <h3 style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--on-surface-variant)", marginBottom: "1rem" }}>Employment Rate</h3>
                  <div
                    style={{
                      height: 128,
                      background: "var(--surface-off-white)",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--surface-variant)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div style={{ position: "absolute", bottom: 0, width: "100%", height: "50%", background: "linear-gradient(to top, rgba(231,222,255,0.5), transparent)" }} />
                    <span style={{ fontSize: "32px", fontWeight: 200, color: "var(--primary)", position: "relative", zIndex: 1, letterSpacing: "-0.01em" }}>98%</span>
                    <span style={{ fontSize: "14px", color: "var(--on-surface-variant)", position: "relative", zIndex: 1 }}>Employed within 6 months</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* ── RIGHT Sidebar ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-gutter)" }}>
            {/* Entry Requirements */}
            <div
              style={{
                background: "var(--surface-container-lowest)",
                borderRadius: "var(--radius-xl)",
                padding: "1.5rem",
                boxShadow: "0 10px 40px -10px rgba(30,41,59,0.08)",
                border: "1px solid var(--surface-variant)",
              }}
            >
              <h3 className="text-label-md text-primary" style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: "14px" }}>checklist</span>
                Entry Requirements
              </h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { label: "Experience",   value: "No prior coding experience required" },
                  { label: "Prerequisites", value: "Basic computer literacy" },
                  { label: "Equipment",    value: "Laptop and reliable internet connection" },
                ].map((item) => (
                  <li key={item.label} style={{ borderBottom: "1px solid var(--surface-variant)", paddingBottom: "0.75rem" }}>
                    <span style={{ display: "block", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--on-surface-variant)", marginBottom: "0.25rem" }}>
                      {item.label}
                    </span>
                    <span style={{ fontSize: "16px", color: "var(--on-surface)" }}>{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Similar Programmes */}
            <div
              style={{
                background: "var(--surface-container-lowest)",
                borderRadius: "var(--radius-xl)",
                padding: "1.5rem",
                boxShadow: "0 10px 40px -10px rgba(30,41,59,0.08)",
                border: "1px solid var(--surface-variant)",
              }}
            >
              <h3 className="text-label-md text-primary" style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: "14px" }}>compare_arrows</span>
                Similar Programs
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <SimilarCard title="Applied Machine Learning" meta="Online Learning Path" match="92%" />
                <SimilarCard title="Data Analytics Bootcamp"  meta="Online Learning Path" match="88%" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        @media (min-width: 1024px) {
          .detail-grid { grid-template-columns: 2fr 1fr !important; }
        }
        @media (min-width: 768px) {
          .mobile-nav { display: none !important; }
          main { padding-bottom: 3rem !important; }
        }
      `}</style>
    </div>
  );
}
