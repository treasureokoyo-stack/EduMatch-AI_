/* ─────────────────────────────────────────────
   Footer — exact markup from design HTML
   ───────────────────────────────────────────── */
export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--surface-container-highest)",
        width: "100%",
        paddingTop: "3rem",
        paddingBottom: "3rem",
        paddingLeft: "var(--space-margin-mobile)",
        paddingRight: "var(--space-margin-mobile)",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "var(--space-base)",
        borderTop: "1px solid var(--outline-variant)",
        marginTop: "auto",
      }}
    >
      {/* Brand */}
      <div
        className="text-primary font-bold"
        style={{ fontSize: "18px", fontWeight: 700 }}
      >
        EduMatch AI
      </div>

      {/* Copyright */}
      <div
        className="text-body-md text-on-surface-variant"
        style={{ textAlign: "center" }}
      >
        © 2024 EduMatch AI. All rights reserved.
      </div>

      {/* Links */}
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1.5rem",
          listStyle: "none",
        }}
      >
        {["Privacy Policy", "Terms of Service", "Cookie Policy", "Contact Us"].map(
          (item) => (
            <li key={item}>
              <a
                href="#"
                className="text-label-md"
                style={{ color: "var(--on-surface-variant)", transition: "color 0.2s" }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--secondary)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--on-surface-variant)")
                }
              >
                {item}
              </a>
            </li>
          )
        )}
      </ul>
    </footer>
  );
}
