"use client";
/* ─────────────────────────────────────────────
   Home page — redirects to onboarding wizard
   (acts as the app entry point)
   ───────────────────────────────────────────── */
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "var(--surface-off-white)" }}>
      <Header />

      {/* Hero */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "5rem var(--space-margin-mobile)",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        {/* Ambient orbs */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "-10%",
            width: "50%",
            height: "50%",
            background: "var(--lavender-light)",
            borderRadius: "50%",
            filter: "blur(120px)",
            opacity: 0.6,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            right: "-10%",
            width: "50%",
            height: "50%",
            background: "var(--primary-fixed)",
            borderRadius: "50%",
            filter: "blur(120px)",
            opacity: 0.4,
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "680px", margin: "0 auto" }}>
          {/* Badge */}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "var(--secondary-fixed)",
              color: "var(--secondary)",
              padding: "0.375rem 1rem",
              borderRadius: "var(--radius-full)",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.05em",
              marginBottom: "1.5rem",
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>auto_awesome</span>
            AI-Powered Course Matching
          </span>

          <h1
            className="text-headline-xl text-primary"
            style={{ marginBottom: "1.5rem", letterSpacing: "-0.02em" }}
          >
            Find Your Best-Fit AI Program
          </h1>

          <p
            className="text-body-lg text-on-surface-variant"
            style={{ marginBottom: "2.5rem", maxWidth: "520px", margin: "0 auto 2.5rem" }}
          >
            Let EduMatch AI analyse your background, interests, and career goals to
            match you with the perfect educational path in under 5 minutes.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/onboarding">
              <button
                className="gradient-btn text-label-md"
                style={{
                  padding: "1rem 2rem",
                  borderRadius: "var(--radius-md)",
                  fontSize: "15px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                Start Assessment
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_forward</span>
              </button>
            </Link>
            <Link href="/recommendations">
              <button
                style={{
                  padding: "1rem 2rem",
                  borderRadius: "var(--radius-md)",
                  border: "2px solid var(--outline-variant)",
                  background: "transparent",
                  color: "var(--primary)",
                  fontSize: "15px",
                  fontWeight: 600,
                }}
              >
                View Sample Results
              </button>
            </Link>
          </div>
        </div>

        {/* Stats strip */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            marginTop: "5rem",
            display: "flex",
            gap: "3rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            { value: "94%", label: "Match accuracy" },
            { value: "10k+", label: "Students matched" },
            { value: "50+", label: "AI programs" },
            { value: "5 min", label: "Assessment time" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div
                className="ai-gradient-text"
                style={{ fontSize: "32px", fontWeight: 900, lineHeight: 1 }}
              >
                {stat.value}
              </div>
              <div className="text-label-md text-on-surface-variant" style={{ marginTop: "0.25rem" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
