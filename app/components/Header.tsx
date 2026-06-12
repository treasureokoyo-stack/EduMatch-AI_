"use client";
/* ─────────────────────────────────────────────
   TopNavBar — exact markup from design HTML
   ───────────────────────────────────────────── */
import Link from "next/link";

export default function Header() {
  return (
    <nav
      style={{
        background: "rgba(252,248,250,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0 1px 3px rgba(0,0,0,.06)",
        position: "sticky",
        top: 0,
        width: "100%",
        zIndex: 50,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "80px",
        paddingLeft: "var(--space-margin-mobile)",
        paddingRight: "var(--space-margin-mobile)",
        maxWidth: "var(--container-max)",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link
          href="/"
          className="text-headline-md text-primary font-black"
          style={{ fontSize: "24px", fontWeight: 900, color: "var(--primary)" }}
        >
          EduMatch AI
        </Link>
      </div>

      {/* Centre Nav Links (desktop) */}
      <ul
        style={{
          display: "none",
          gap: "2rem",
          alignItems: "center",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          listStyle: "none",
        }}
        className="nav-links"
      >
        {["Home", "Courses", "Resources", "Pricing"].map((item) => (
          <li key={item}>
            <a
              href="#"
              className="text-label-md transition-colors"
              style={{ color: "var(--on-surface-variant)" }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "var(--secondary)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color =
                  "var(--on-surface-variant)")
              }
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      {/* Right Actions (desktop) */}
      <div
        style={{ display: "flex", alignItems: "center", gap: "1rem" }}
        className="nav-actions"
      >
        <button
          className="text-label-md transition-colors"
          style={{
            background: "none",
            border: "none",
            color: "var(--primary)",
          }}
          onMouseEnter={(e) =>
            ((e.target as HTMLElement).style.color = "var(--secondary)")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLElement).style.color = "var(--primary)")
          }
        >
          Log In
        </button>
        <button
          className="text-label-md transition-opacity"
          style={{
            background: "var(--secondary)",
            color: "#fff",
            border: "none",
            padding: "0.5rem 1.5rem",
            borderRadius: "var(--radius-full)",
            boxShadow: "0 4px 12px rgba(97,62,211,0.25)",
          }}
        >
          Request Demo
        </button>
      </div>

      {/* Hamburger (mobile only) */}
      <button
        style={{
          background: "none",
          border: "none",
          color: "var(--primary)",
          fontSize: "24px",
        }}
        className="mobile-menu-btn"
        aria-label="Open menu"
      >
        <span className="material-symbols-outlined">menu</span>
      </button>

      <style>{`
        @media (min-width: 768px) {
          .nav-links        { display: flex !important; }
          .nav-actions      { display: flex !important; }
          .mobile-menu-btn  { display: none !important; }
        }
        @media (max-width: 767px) {
          .nav-links    { display: none !important; }
          .nav-actions  { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
