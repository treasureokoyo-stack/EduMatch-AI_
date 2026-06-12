"use client";
import Link from "next/link";

interface CourseCardProps {
  title: string;
  meta: string;
  salary: string;
  difficulty: string;
  matchPct: string;
}

export default function CourseCard({
  title,
  meta,
  salary,
  difficulty,
  matchPct,
}: CourseCardProps) {
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
        <h4 style={{ fontSize: "20px", fontWeight: 300, color: "var(--primary)", lineHeight: 1.3, flex: 1 }}>
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
