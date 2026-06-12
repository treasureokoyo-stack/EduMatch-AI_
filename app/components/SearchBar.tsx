"use client";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (val: string) => void;
}

export default function SearchBar({
  placeholder = "Search programs or courses...",
  value = "",
  onChange,
}: SearchBarProps) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "500px",
      }}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        style={{
          width: "100%",
          backgroundColor: "var(--surface-off-white)",
          border: "none",
          borderBottom: "2px solid var(--surface-variant)",
          padding: "0.75rem 1rem 0.75rem 2.5rem",
          borderRadius: "var(--radius-md) var(--radius-md) 0 0",
          outline: "none",
          fontSize: "16px",
          fontFamily: "Manrope",
          color: "var(--on-surface)",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "var(--secondary)";
          e.target.style.boxShadow = "0 2px 8px rgba(97,62,211,0.1)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "var(--surface-variant)";
          e.target.style.boxShadow = "none";
        }}
      />
      <span
        className="material-symbols-outlined"
        style={{
          position: "absolute",
          left: "0.75rem",
          top: "50%",
          transform: "translateY(-50%)",
          color: "var(--on-surface-variant)",
          fontSize: "20px",
          pointerEvents: "none",
        }}
      >
        search
      </span>
    </div>
  );
}
