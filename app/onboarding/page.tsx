"use client";
/* ─────────────────────────────────────────────
   Student Onboarding Wizard
   Exact markup from:
   student_onboarding_online_courses/code.html
   ───────────────────────────────────────────── */
import { useState } from "react";
import { useRouter } from "next/navigation";

/* ── helpers ── */
function GradientBtn({
  children,
  onClick,
  style,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  return (
    <button
      onClick={onClick}
      className="gradient-btn text-label-md"
      style={{
        padding: "0.75rem 2rem",
        borderRadius: "var(--radius-md)",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        fontSize: "14px",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function InterestCard({
  icon,
  label,
}: {
  icon: string;
  label: string;
}) {
  const [selected, setSelected] = useState(false);
  return (
    <div
      onClick={() => setSelected((s) => !s)}
      style={{
        border: `1px solid ${selected ? "var(--secondary)" : "var(--outline-variant)"}`,
        borderRadius: "var(--radius-xl)",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        cursor: "pointer",
        background: selected ? "var(--secondary-fixed)" : "var(--surface-container-lowest)",
        textAlign: "center",
        transition: "all 0.2s",
      }}
    >
      <span
        className="material-symbols-outlined"
        style={{ fontSize: "28px", color: "var(--secondary)" }}
      >
        {icon}
      </span>
      <span className="text-label-md" style={{ color: "var(--on-surface)", fontSize: "13px" }}>
        {label}
      </span>
    </div>
  );
}

function StyleCard({
  icon,
  title,
  desc,
  selected,
  onClick,
}: {
  icon: string;
  title: string;
  desc: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        border: `1px solid ${selected ? "var(--secondary)" : "var(--outline-variant)"}`,
        borderRadius: "var(--radius-xl)",
        padding: "1rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        cursor: "pointer",
        background: selected ? "var(--secondary-fixed)" : "var(--surface-container-lowest)",
        transition: "all 0.2s",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "var(--secondary-fixed)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--secondary)",
          flexShrink: 0,
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>{icon}</span>
      </div>
      <div>
        <h3 className="text-label-md" style={{ fontWeight: 700, marginBottom: "0.125rem" }}>{title}</h3>
        <p style={{ fontSize: "13px", color: "var(--on-surface-variant)" }}>{desc}</p>
      </div>
    </div>
  );
}

/* ── main wizard ── */
export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 7;
  const [learnStyle, setLearnStyle] = useState<string | null>(null);
  const [budget, setBudget] = useState(500);
  const [loadingText, setLoadingText] = useState("Cross-referencing global program data...");
  const [loadingDone, setLoadingDone] = useState(false);

  function nextStep() {
    if (step < totalSteps) {
      setStep((s) => s + 1);
      if (step + 1 === totalSteps) runLoader();
    }
  }
  function prevStep() { if (step > 1) setStep((s) => s - 1); }

  function runLoader() {
    const texts = [
      "Cross-referencing global program data...",
      "Evaluating career trajectories...",
      "Matching learning styles...",
      "Calculating return on investment...",
      "Finalizing your top matches...",
    ];
    let i = 0;
    const id = setInterval(() => {
      i++;
      if (i < texts.length) setLoadingText(texts[i]);
      else {
        clearInterval(id);
        setLoadingText("Match Complete!");
        setLoadingDone(true);
        setTimeout(() => router.push("/recommendations"), 1200);
      }
    }, 1200);
  }

  const progressPct =
    step === 1 || step === totalSteps
      ? 0
      : ((step - 1) / 5) * 100;

  /* ── step 1: welcome ── */
  const Step1 = (
    <section className="step-container active" id="step1"
      style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        className="glass-card"
        style={{
          borderRadius: "var(--radius-xl)",
          padding: "3rem 2rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          border: "1px solid rgba(198,198,205,0.3)",
          width: "100%",
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            background: "var(--secondary-container)",
            borderRadius: "50%",
            margin: "0 auto 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 14px rgba(97,62,211,0.25)",
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "36px", color: "#fff" }}>school</span>
        </div>
        <h1 className="text-primary font-black" style={{ fontSize: "32px", fontWeight: 900, marginBottom: "1rem" }}>
          EduMatch AI
        </h1>
        <p className="text-body-lg text-on-surface-variant" style={{ marginBottom: "2.5rem" }}>
          Let's find your best-fit AI program. We'll ask a few quick questions to align
          your goals with the perfect educational path.
        </p>
        <GradientBtn onClick={nextStep} style={{ width: "100%", justifyContent: "center", padding: "1rem" }}>
          Start Assessment
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_forward</span>
        </GradientBtn>
      </div>
    </section>
  );

  /* ── step 2: basic info ── */
  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--surface-off-white)",
    borderBottom: "2px solid var(--surface-variant)",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    padding: "0.75rem 1rem",
    borderRadius: "var(--radius-md) var(--radius-md) 0 0",
    outline: "none",
    fontFamily: "var(--font-family)",
    fontSize: "16px",
    color: "var(--on-surface)",
    transition: "border-color 0.2s",
  };

  const Step2 = (
    <section className="step-container active" id="step2">
      <div className="glass-card" style={{ borderRadius: "var(--radius-xl)", padding: "1.5rem", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <h2 className="text-headline-md text-on-surface" style={{ fontWeight: 600, marginBottom: "1.5rem" }}>Let's start with the basics</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label className="text-label-md text-on-surface-variant" style={{ display: "block", marginBottom: "0.5rem" }}>Full Name</label>
            <input style={inputStyle} type="text" placeholder="e.g. Jane Doe" />
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ flex: 1 }}>
              <label className="text-label-md text-on-surface-variant" style={{ display: "block", marginBottom: "0.5rem" }}>Age</label>
              <input style={inputStyle} type="number" placeholder="18" />
            </div>
            <div style={{ flex: 2 }}>
              <label className="text-label-md text-on-surface-variant" style={{ display: "block", marginBottom: "0.5rem" }}>Location</label>
              <input style={inputStyle} type="text" placeholder="City, Country" />
            </div>
          </div>
          <div>
            <label className="text-label-md text-on-surface-variant" style={{ display: "block", marginBottom: "0.5rem" }}>Current Education Level</label>
            <select style={{ ...inputStyle, appearance: "none" }}>
              <option value="" disabled>Select level...</option>
              <option value="hs">High School</option>
              <option value="ug">Undergraduate</option>
              <option value="pg">Postgraduate</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div style={{ marginTop: "2.5rem", display: "flex", justifyContent: "flex-end" }}>
          <GradientBtn onClick={nextStep}>
            Continue <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>arrow_forward</span>
          </GradientBtn>
        </div>
      </div>
    </section>
  );

  /* ── step 3: interests ── */
  const interests = [
    { icon: "smart_toy",  label: "AI Automation" },
    { icon: "code",       label: "AI Software & Web Dev" },
    { icon: "movie",      label: "AI Video Creation" },
    { icon: "analytics",  label: "AI for Data Analytics" },
    { icon: "assignment", label: "AI for Business Analysis" },
    { icon: "groups",     label: "AI for HR Analytics" },
  ];

  const Step3 = (
    <section className="step-container active" id="step3">
      <div className="glass-card" style={{ borderRadius: "var(--radius-xl)", padding: "1.5rem", height: "100%", display: "flex", flexDirection: "column" }}>
        <h2 className="text-headline-md" style={{ fontWeight: 600, marginBottom: "0.5rem" }}>What sparks your curiosity?</h2>
        <p className="text-body-md text-on-surface-variant" style={{ marginBottom: "1.5rem" }}>Select up to 3 AI tracks you're most interested in exploring.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "2rem" }}>
          {interests.map((item) => (
            <InterestCard key={item.label} icon={item.icon} label={item.label} />
          ))}
        </div>
        <div style={{ marginTop: "auto", display: "flex", justifyContent: "flex-end" }}>
          <GradientBtn onClick={nextStep}>
            Continue <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>arrow_forward</span>
          </GradientBtn>
        </div>
      </div>
    </section>
  );

  /* ── step 4: learning style ── */
  const styles = [
    { id: "visual",      icon: "visibility",    title: "Visual",      desc: "I prefer diagrams, videos, and reading." },
    { id: "practical",   icon: "handyman",      title: "Practical",   desc: "I learn by doing and hands-on projects." },
    { id: "theoretical", icon: "library_books", title: "Theoretical", desc: "I enjoy deep concepts and research." },
    { id: "mixed",       icon: "diversity_3",   title: "Mixed",       desc: "A balanced combination of all styles." },
  ];

  const Step4 = (
    <section className="step-container active" id="step4">
      <div className="glass-card" style={{ borderRadius: "var(--radius-xl)", padding: "1.5rem" }}>
        <h2 className="text-headline-md" style={{ fontWeight: 600, marginBottom: "0.5rem" }}>How do you learn best?</h2>
        <p className="text-body-md text-on-surface-variant" style={{ marginBottom: "1.5rem" }}>This helps us match you with programs that fit your style.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {styles.map((s) => (
            <StyleCard
              key={s.id}
              icon={s.icon}
              title={s.title}
              desc={s.desc}
              selected={learnStyle === s.id}
              onClick={() => setLearnStyle(s.id)}
            />
          ))}
        </div>
        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end" }}>
          <GradientBtn onClick={nextStep}>
            Continue <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>arrow_forward</span>
          </GradientBtn>
        </div>
      </div>
    </section>
  );

  /* ── step 5: career goals ── */
  const roles = ["AI Engineer", "Data Scientist", "AI Product Manager", "Automation Specialist", "+ Add Custom"];
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const Step5 = (
    <section className="step-container active" id="step5">
      <div className="glass-card" style={{ borderRadius: "var(--radius-xl)", padding: "1.5rem" }}>
        <h2 className="text-headline-md" style={{ fontWeight: 600, marginBottom: "1.5rem" }}>What's your dream role?</h2>
        <div style={{ marginBottom: "1.5rem" }}>
          <label className="text-label-md text-on-surface-variant" style={{ display: "block", marginBottom: "0.5rem" }}>Describe your ideal career (optional)</label>
          <textarea
            style={{
              width: "100%",
              background: "var(--surface-off-white)",
              borderBottom: "2px solid var(--surface-variant)",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              padding: "0.75rem 1rem",
              borderRadius: "var(--radius-md) var(--radius-md) 0 0",
              outline: "none",
              fontFamily: "var(--font-family)",
              fontSize: "16px",
              color: "var(--on-surface)",
              resize: "none",
            }}
            placeholder="I want to build things that help people..."
            rows={3}
          />
        </div>
        <div>
          <label className="text-label-md text-on-surface-variant" style={{ display: "block", marginBottom: "0.75rem" }}>Popular AI roles based on your interests</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {roles.map((role) => (
              <div
                key={role}
                onClick={() =>
                  setSelectedRoles((prev) =>
                    prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
                  )
                }
                style={{
                  border: `1px solid ${selectedRoles.includes(role) ? "var(--secondary)" : "var(--outline-variant)"}`,
                  borderRadius: "var(--radius-full)",
                  padding: "0.5rem 1rem",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  background: selectedRoles.includes(role) ? "var(--secondary-fixed)" : "var(--surface-container-lowest)",
                  color: selectedRoles.includes(role) ? "var(--on-secondary-fixed)" : "var(--on-surface)",
                  transition: "all 0.2s",
                }}
              >
                {role}
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: "2.5rem", display: "flex", justifyContent: "flex-end" }}>
          <GradientBtn onClick={nextStep}>
            Continue <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>arrow_forward</span>
          </GradientBtn>
        </div>
      </div>
    </section>
  );

  /* ── step 6: constraints ── */
  const [locationMode, setLocationMode] = useState("online");

  const Step6 = (
    <section className="step-container active" id="step6">
      <div className="glass-card" style={{ borderRadius: "var(--radius-xl)", padding: "1.5rem" }}>
        <h2 className="text-headline-md" style={{ fontWeight: 600, marginBottom: "1.5rem" }}>Any specific requirements?</h2>
        <div style={{ marginBottom: "2rem" }}>
          <label className="text-label-md text-on-surface-variant" style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
            <span>Expected Budget Range</span>
            <span style={{ fontWeight: 700, color: "var(--secondary)" }}>₦100k – ₦{budget}k</span>
          </label>
          <div style={{ padding: "0 0.5rem" }}>
            <input
              type="range"
              min={100}
              max={2000}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--on-surface-variant)", marginTop: "0.5rem", padding: "0 0.5rem" }}>
            <span>₦0</span><span>₦2M+</span>
          </div>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <label className="text-label-md text-on-surface-variant" style={{ display: "block", marginBottom: "0.75rem" }}>Learning Mode Preference</label>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { id: "online",  label: "100% Online (Preferred)" },
              { id: "hybrid",  label: "Hybrid (Online + In-person)" },
            ].map((opt) => (
              <label
                key={opt.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem",
                  border: `1px solid ${locationMode === opt.id ? "var(--secondary)" : "var(--outline-variant)"}`,
                  borderRadius: "var(--radius-md)",
                  cursor: "pointer",
                  background: locationMode === opt.id ? "var(--secondary-fixed)" : "var(--surface-container-lowest)",
                  transition: "all 0.2s",
                }}
              >
                <input
                  type="radio"
                  name="location"
                  checked={locationMode === opt.id}
                  onChange={() => setLocationMode(opt.id)}
                  style={{ accentColor: "var(--secondary)", width: "20px", height: "20px" }}
                />
                <span className="text-label-md">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <GradientBtn onClick={nextStep}>
            Find My Match <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>auto_awesome</span>
          </GradientBtn>
        </div>
      </div>
    </section>
  );

  /* ── step 7: AI loader ── */
  const Step7 = (
    <section className="step-container active" id="step7"
      style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center", width: "100%", maxWidth: "320px", margin: "0 auto" }}>
        {/* Pulsing orbs */}
        <div style={{ position: "relative", width: 160, height: 160, margin: "0 auto 2rem" }}>
          <div className="ai-pulse" style={{ position: "absolute", inset: 0, background: "var(--secondary-container)", borderRadius: "50%", opacity: 0.2, animationDelay: "0s" }} />
          <div className="ai-pulse" style={{ position: "absolute", inset: "1rem", background: "var(--secondary)", borderRadius: "50%", opacity: 0.4, animationDelay: "0.5s" }} />
          <div
            className="ai-pulse"
            style={{
              position: "absolute",
              inset: "2rem",
              background: "var(--gradient-start)",
              borderRadius: "50%",
              opacity: 0.8,
              animationDelay: "1s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 24px rgba(97,62,211,0.4)",
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "36px", color: "#fff" }}>psychology</span>
          </div>
        </div>
        <h2 className="text-headline-md text-primary" style={{ fontWeight: 700, marginBottom: "0.75rem" }}>Analysing your profile...</h2>
        <p
          className="text-body-md text-on-surface-variant"
          style={{ marginBottom: "1.5rem", minHeight: "1.5rem", color: loadingDone ? "var(--secondary)" : undefined, fontWeight: loadingDone ? 700 : undefined }}
        >
          {loadingText}
        </p>
        {/* Progress shimmer bar */}
        <div style={{ width: "100%", background: "var(--surface-variant)", borderRadius: "var(--radius-full)", height: 6, overflow: "hidden" }}>
          <div
            style={{
              background: "linear-gradient(to right, var(--gradient-start), var(--gradient-end))",
              height: "100%",
              width: loadingDone ? "100%" : "33%",
              borderRadius: "var(--radius-full)",
              transition: "width 1s ease",
              position: "relative",
            }}
          />
        </div>
      </div>
    </section>
  );

  const steps = [Step1, Step2, Step3, Step4, Step5, Step6, Step7];
  const showProgress = step > 1 && step < totalSteps;

  return (
    <div
      style={{
        background: "var(--surface)",
        color: "var(--on-surface)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-margin-mobile)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient orbs */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "50%", height: "50%", background: "var(--lavender-light)", borderRadius: "50%", filter: "blur(120px)", opacity: 0.6 }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "50%", height: "50%", background: "var(--primary-fixed)", borderRadius: "50%", filter: "blur(120px)", opacity: 0.4 }} />
      </div>

      {/* Main card container */}
      <main style={{ width: "100%", maxWidth: "600px", margin: "0 auto", zIndex: 10, display: "flex", flexDirection: "column", minHeight: "600px" }}>
        {/* Progress header */}
        {showProgress && (
          <header style={{ width: "100%", marginBottom: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <button
                onClick={prevStep}
                style={{ background: "none", border: "none", color: "var(--on-surface-variant)", cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--secondary)")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--on-surface-variant)")}
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <span className="text-label-md text-on-surface-variant">
                Step {step} of 6
              </span>
              <div style={{ width: 24 }} />
            </div>
            {/* Progress bar */}
            <div style={{ width: "100%", height: 8, background: "var(--surface-container-high)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  background: "var(--secondary)",
                  borderRadius: "var(--radius-full)",
                  width: `${progressPct}%`,
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </header>
        )}

        {/* Active step */}
        {steps[step - 1]}
      </main>
    </div>
  );
}
