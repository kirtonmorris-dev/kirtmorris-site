"use client";
import { useState, useEffect, useRef } from "react";

// ─── BRAND SYSTEM ───────────────────────────────────────────────────────────

const B = {
  midnight: "#0D1117",
  charcoal: "#1B2028",
  slate: "#2D3340",
  steel: "#8B95A5",
  silver: "#B8C0CC",
  ivory: "#F5F3EF",
  cream: "#FAF9F6",
  white: "#FFFFFF",
  gold: "#C5975B",
  goldLight: "#D4AD72",
  goldDark: "#A67B42",
};

// ─── FINANCIAL-FRAMED METRICS ───────────────────────────────────────────────

const METRICS = [
  { value: "$20MM+", label: "Revenue Under Management", context: "Fortune 1000 Digital Transformations" },
  { value: "20%", label: "Profit Margin Improvement", context: "Under Armour Platform Restructure" },
  { value: "$1M", label: "Operational Cost Savings", context: "Lowe's CRM Implementation" },
  { value: "10%", label: "Delivery Cost Reduction", context: "Cross-Platform Efficiency Gains" },
  { value: "3x", label: "Promotion Velocity", context: "Three Promotions in Six Months via LIFT" },
  { value: "18%", label: "Revenue Growth Recovered", context: "P&G $250M Platform Turnaround" },
];

const METRICS_ROW2 = [
  { value: "$12MM", label: "Budget Stewarded Over 5 Years", context: "Global Talent Operations, Americas, EMEA, APAC" },
  { value: "50%", label: "Talent Pipeline Expansion", context: "Reduced Time-to-Fill for Critical Roles" },
  { value: "1,300", label: "DEI Champions Mobilized", context: "Retention Infrastructure Across 16,000+" },
  { value: "4%+", label: "Women in Executive Ranks", context: "Leadership Bench Strength Increase" },
  { value: "35%", label: "Diverse Recruitment Lift", context: "Howard University Partnership ROI" },
  { value: "5", label: "Industry Awards", context: "Including Microsoft DEI Champion of the Year" },
];

const EXPERTISE = [
  { title: "Workforce Analytics & Predictive Modeling", desc: "Using workforce data to predict attrition risk, quantify retention economics, and identify performance patterns before they impact the P&L.", icon: "◆" },
  { title: "Culture Transformation at Scale", desc: "Building measurable culture programs from zero to center of excellence with defensible ROI tied directly to margin protection and talent retention.", icon: "◇" },
  { title: "Enterprise Digital Delivery", desc: "25+ years leading $20MM+ technology transformations for Fortune 1000 brands, delivering cost reduction, productivity improvement, and revenue growth.", icon: "▣" },
  { title: "Talent System Architecture", desc: "Designing fair, transparent talent systems that accelerate promotion velocity, reduce time-to-fill for critical roles, and connect people investments to financial outcomes.", icon: "△" },
  { title: "Employee Value Proposition Design", desc: "Crafting EVP frameworks that reduce attrition cost exposure, strengthen employer brand positioning, and measurably improve offer acceptance rates.", icon: "○" },
  { title: "Organizational Design & Restructuring", desc: "Aligning talent capabilities with strategic business objectives to protect margins, mitigate succession risk, and accelerate enterprise performance.", icon: "□" },
];

const PUBLICATIONS = [
  { title: "6 Tactics to Support Employee Mental Health", outlet: "Quartz", year: "2023", url: "https://qz.com/6-tactics-to-support-employee-mental-health-1850739090" },
  { title: "We Are Not Spectators: Creating More Equitable Environments", outlet: "Afrotech", year: "2022", url: "https://afrotech.com/we-are-not-spectators-inclusion-leaders-at-dentsu-international-on-how-theyre-creating-more-equitable-environments-for-black-employees" },
  { title: "People Are Over Mentored and Under Sponsored", outlet: "Digiday", year: "2022", url: "https://digiday.com/marketing/people-are-over-mentored-under-sponsored-merkeles-global-chief-equity-officer-sounds-off-on-dei-industrial-complex/" },
  { title: "Understanding Your Employees Is Critical to Great Work Experience", outlet: "People Matters", year: "2021", url: "https://sea.peoplemattersglobal.com/article/employee-relations/understanding-your-employees-is-critical-to-ensure-great-work-experience-36135" },
  { title: "Interview: Chief Equity Officer at Merkle", outlet: "AiThority", year: "2021", url: "https://aithority.com/technology/customer-experience/aithority-interview-with-kirt-morris-chief-equity-officer-at-merkle/" },
  { title: "Supporting Employees' Mental Health: An Innovative Approach", outlet: "Merkle Reports", year: "2023", url: "https://www.merkle.com/en/merkle-now/ebooks/supporting-employees--mental-health.html" },
];

const AWARDS = [
  { name: "Microsoft Advertising DEI Champion of the Year", year: "2018" },
  { name: "DEI Champion for Merkle", year: "2019" },
  { name: "Digital Revolution Awards: D&I Employer of the Year (UK)", year: "2022" },
  { name: "Building Futures Award, Genesys Works", year: "2022" },
  { name: "US Agency Awards Shortlist: Best Inclusion Initiative", year: "2023" },
];

const TIMELINE = [
  { period: "2020 to Present", role: "Global Chief Culture Officer", org: "Merkle / Dentsu", highlight: "Built global talent center of excellence from zero. $12MM budget over five years. 16,000+ employees across Americas, EMEA, and APAC. Reduced attrition cost exposure and increased leadership bench strength." },
  { period: "2011 to 2020", role: "Senior Director & Delivery Engagement Leader", org: "Merkle", highlight: "Led $20MM+ in digital transformations. Improved profit margins 20%, reduced delivery costs 10%, recovered 18% revenue growth. 4 promotions in tenure." },
  { period: "2007 to 2011", role: "Associate Program Manager", org: "Merkle", highlight: "Transformed underperforming $250M P&G marketing platform. Grew revenue 18%, profitability 27%. Reduced system downtime from 18 hours to 4 to 6 hours." },
  { period: "2000 to 2007", role: "Manager & Senior Consultant", org: "Capgemini Ernst & Young", highlight: "Led engagements valued up to $30M across telecom, media, entertainment, and health sciences. 2 promotions based on top line financial performance." },
];

// ─── UTILITY COMPONENTS ─────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.unobserve(e.target); } }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`, ...style }}>{children}</div>
  );
}

function SectionLabel({ text }) {
  return <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: B.gold, marginBottom: "16px" }}>{text}</p>;
}

function SectionHeading({ children, light }: { children: any; light?: boolean }) {
  return <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 300, lineHeight: 1.15, color: light ? B.ivory : B.midnight, marginBottom: "56px", maxWidth: "750px" }}>{children}</h2>;
}

// ─── NAVIGATION ─────────────────────────────────────────────────────────────

function Navigation({ active, onNav }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 60); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  useEffect(() => {
    if (open) {
      const sy = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${sy}px`;
    } else {
      const sy = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      if (sy) window.scrollTo(0, parseInt(sy) * -1);
    }
  }, [open]);
  const links = ["Home", "About", "Impact", "Expertise", "Case Study", "Thought Leadership", "Resume", "Governance", "Contact"];
  return (
    <>
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: scrolled ? "10px 40px" : "18px 40px", background: scrolled ? "rgba(13,17,23,0.96)" : "rgba(13,17,23,0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: scrolled ? `1px solid ${B.slate}33` : "none", transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 600, color: B.ivory, letterSpacing: "0.06em", cursor: "pointer" }} onClick={() => onNav("Home")}>KIRT MORRIS</div>
      <div className="dnav" style={{ display: "flex", gap: "28px", alignItems: "center" }}>
        {links.map(l => (
          <button key={l} onClick={() => onNav(l)} style={{ background: "none", border: "none", color: active === l ? B.gold : B.silver, fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 400, letterSpacing: "0.13em", textTransform: "uppercase", cursor: "pointer", padding: "4px 0", borderBottom: active === l ? `1px solid ${B.gold}` : "1px solid transparent", transition: "all 0.3s ease" }}>{l}</button>
        ))}
      </div>
      <button className="mbtn" onClick={() => setOpen(true)} style={{ display: "none", background: "none", border: "none", color: B.ivory, fontSize: "24px", cursor: "pointer" }}>☰</button>
    </nav>
    {open && (
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, width: "100vw", height: "100vh", backgroundColor: "#0D1117", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "28px", zIndex: 10000 }}>
        <button onClick={() => setOpen(false)} style={{ position: "absolute", top: "18px", right: "40px", background: "none", border: "none", color: B.ivory, fontSize: "28px", cursor: "pointer", padding: "10px" }}>✕</button>
        {links.map(l => (<button key={l} onClick={() => { setOpen(false); setTimeout(() => onNav(l), 50); }} style={{ background: "none", border: "none", color: B.ivory, fontFamily: "'Cormorant Garamond', serif", fontSize: "26px", fontWeight: 300, letterSpacing: "0.08em", cursor: "pointer", padding: "12px 40px", WebkitTapHighlightColor: "rgba(197,151,91,0.2)" }}>{l}</button>))}
      </div>
    )}
    </>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function Hero() {
  const [on, setOn] = useState(false);
  useEffect(() => { setTimeout(() => setOn(true), 200); }, []);
  const t = (d) => `all 0.9s cubic-bezier(0.22,1,0.36,1) ${d}s`;

  return (
    <section id="Home" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 40px 80px", position: "relative", overflow: "hidden", background: `radial-gradient(ellipse at 25% 50%, ${B.charcoal} 0%, ${B.midnight} 70%)` }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.025, background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 320px", gap: "60px", alignItems: "center" }} className="hero-grid">
        <div>
          {/* Flagship Identity */}
          <div style={{ width: on ? "50px" : "0px", height: "2px", background: B.gold, marginBottom: "28px", transition: t(0.4) }} />

          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: B.gold, marginBottom: "8px", opacity: on ? 1 : 0, transition: t(0.6) }}>
            Operator Turned Workforce Strategist
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", letterSpacing: "0.08em", color: B.steel, marginBottom: "20px", opacity: on ? 1 : 0, transition: t(0.65) }}>
            Talent Analytics · Workforce Strategy · Culture Transformation · Digital Delivery
          </p>

          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(38px, 5.5vw, 68px)", fontWeight: 300, lineHeight: 1.08, color: B.ivory, marginBottom: "28px", opacity: on ? 1 : 0, transform: on ? "translateY(0)" : "translateY(20px)", transition: t(0.8) }}>
            I turn workforce data into
            <br />
            <span style={{ color: B.gold, fontStyle: "italic" }}>competitive advantage.</span>
          </h1>

          {/* 3-line executive summary */}
          <div style={{ borderLeft: `2px solid ${B.gold}44`, paddingLeft: "20px", marginBottom: "40px", opacity: on ? 1 : 0, transition: t(1.0) }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", lineHeight: 1.75, color: B.silver }}>
              Enterprise performance strategist with 25+ years in technology delivery and people strategy. I build talent systems that reduce attrition cost, accelerate promotion velocity, and protect margins. Fortune 1000 track record across $20MM+ in transformations.
            </p>
          </div>

          {/* Financial proof statements */}
          <div style={{ display: "flex", gap: "36px", flexWrap: "wrap", opacity: on ? 1 : 0, transition: `opacity 0.8s ease 1.3s` }}>
            {[
              "20% profit margin improvement at Under Armour",
              "$1M in operational savings at Lowe's",
              "18% revenue recovery on $250M P&G platform",
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", color: B.steel, fontFamily: "'DM Sans', sans-serif", fontSize: "13px" }}>
                <span style={{ color: B.gold, fontSize: "7px" }}>◆</span>{p}
              </div>
            ))}
          </div>

          {/* Hero CTAs */}
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "36px", opacity: on ? 1 : 0, transition: `opacity 0.8s ease 1.5s` }}>
            <a href="/Kirt_Morris_Executive_Bio.pdf" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: B.midnight, background: B.gold, padding: "12px 28px", textDecoration: "none", transition: "all 0.3s ease" }}
              onMouseEnter={ev => { ev.currentTarget.style.background = B.ivory; }}
              onMouseLeave={ev => { ev.currentTarget.style.background = B.gold; }}>
              Download Resume
            </a>
            <a href="https://www.linkedin.com/in/kirtmorris/" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: B.silver, border: `1px solid ${B.silver}44`, padding: "12px 28px", textDecoration: "none", transition: "all 0.3s ease" }}
              onMouseEnter={ev => { ev.currentTarget.style.color = B.gold; ev.currentTarget.style.borderColor = B.gold; }}
              onMouseLeave={ev => { ev.currentTarget.style.color = B.silver; ev.currentTarget.style.borderColor = `${B.silver}44`; }}>
              Connect on LinkedIn
            </a>
          </div>
        </div>

        {/* Headshot Placeholder */}
        <div style={{ opacity: on ? 1 : 0, transition: t(1.2) }} className="headshot-col">
          <div style={{
            width: "280px",
            height: "340px",
            position: "relative",
            overflow: "hidden",
          }}>
            <img
              src="/headshot.jpg"
              alt="Kirt Morris, Enterprise Performance Strategist"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
            />
            {/* Corner accents */}
            <div style={{ position: "absolute", top: "0", left: "0", width: "24px", height: "24px", borderTop: `2px solid ${B.gold}`, borderLeft: `2px solid ${B.gold}` }} />
            <div style={{ position: "absolute", bottom: "0", right: "0", width: "24px", height: "24px", borderBottom: `2px solid ${B.gold}`, borderRight: `2px solid ${B.gold}` }} />
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: "12px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", opacity: on ? 0.35 : 0, transition: `opacity 1s ease 2s` }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: B.steel }}>Scroll</span>
        <div style={{ width: "1px", height: "18px", background: `linear-gradient(to bottom, ${B.steel}, transparent)` }} />
      </div>
    </section>
  );
}

// ─── ABOUT ──────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="About" style={{ padding: "100px 40px", background: B.cream }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <FadeIn><SectionLabel text="About" /></FadeIn>
        <FadeIn delay={100}>
          <SectionHeading>
            An enterprise performance strategist who uses workforce systems as <span style={{ fontStyle: "italic", color: B.goldDark }}>financial leverage</span>.
          </SectionHeading>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px", alignItems: "start" }} className="about-grid">
          <FadeIn delay={200}>
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", lineHeight: 1.8, color: B.slate, marginBottom: "22px" }}>
                Most people leaders come from HR. I came from the engine room. For 20 years, I managed complex technology programs for brands like Procter & Gamble, Canon, Under Armour, and Lowe's. I learned where decisions stall, where talent breaks, and where margin leaks hide in workforce data that nobody is reading.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", lineHeight: 1.8, color: B.slate, marginBottom: "22px" }}>
                When I transitioned to lead Merkle's global culture function, I brought operational discipline with me. I built a center of excellence serving 16,000+ employees across the Americas, EMEA, and APAC with a $12MM budget over five years. But more importantly, I connected every talent initiative to a financial outcome: reduced attrition cost exposure, accelerated promotion velocity, expanded leadership bench strength, and measurable retention economics.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", lineHeight: 1.8, color: B.slate }}>
                My career proves a thesis that most organizations still haven't internalized: the best talent strategies are built by leaders who understand both the data and the humans behind it, and can translate both into language the CFO respects.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={350}>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Philosophy */}
              <div style={{ background: B.white, padding: "36px", border: `1px solid ${B.silver}33` }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: B.gold, marginBottom: "16px" }}>Leadership Philosophy</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "21px", fontWeight: 400, lineHeight: 1.5, color: B.midnight, fontStyle: "italic", marginBottom: "16px" }}>"I'm renting my title, but I own my brand."</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", lineHeight: 1.7, color: B.slate }}>
                  Three pillars: transparency, promise, and control. Trust is the default. Autonomy is granted. When workforce data reveals uncomfortable truths, I act on them.
                </p>
              </div>

              {/* For Boards & CEOs */}
              <div style={{ background: B.midnight, padding: "36px", border: `1px solid ${B.slate}` }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: B.gold, marginBottom: "16px" }}>For Boards & CEOs</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", lineHeight: 1.7, color: B.silver }}>
                  I operate at the governance level. Board member at Genesys Works National Capitol Region. Chief Technology & Transformation Advisor at Mind for Mission. I understand fiduciary responsibility, enterprise risk, and the connection between workforce health and shareholder value.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── TARGET ROLES ───────────────────────────────────────────────────────────

function TargetRoles() {
  const roles = [
    "Head of People Analytics & Workforce Strategy",
    "Chief Culture & Talent Strategy Officer",
    "SVP, Talent Strategy & Workforce Analytics",
    "Head of Business Intelligence",
  ];
  return (
    <section style={{ padding: "56px 40px", background: B.midnight, borderTop: `1px solid ${B.slate}22`, borderBottom: `1px solid ${B.slate}22` }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", gap: "40px", flexWrap: "wrap" }} className="roles-row">
        <FadeIn>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: B.gold, whiteSpace: "nowrap" }}>Target Roles</p>
        </FadeIn>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", flex: 1 }}>
          {roles.map((r, i) => (
            <FadeIn key={i} delay={100 + i * 60}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: B.silver, padding: "8px 20px", border: `1px solid ${B.slate}44`, whiteSpace: "nowrap" }}>{r}</span>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── IMPACT ─────────────────────────────────────────────────────────────────

function Impact() {
  return (
    <section id="Impact" style={{ padding: "100px 40px", background: B.midnight }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <FadeIn><SectionLabel text="Impact" /></FadeIn>
        <FadeIn delay={100}>
          <SectionHeading light>
            Every initiative connects to a <span style={{ fontStyle: "italic", color: B.gold }}>financial outcome</span>.
          </SectionHeading>
        </FadeIn>

        {/* Business & Financial Metrics */}
        <FadeIn delay={150}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: B.gold, marginBottom: "20px" }}>Business & Financial Performance</p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: `${B.slate}22`, marginBottom: "48px" }} className="mgrid">
          {METRICS.map((m, i) => (
            <FadeIn key={i} delay={180 + i * 80}>
              <div style={{ background: B.midnight, padding: "36px 28px", textAlign: "center" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 300, color: B.gold, marginBottom: "6px" }}>{m.value}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500, color: B.ivory, marginBottom: "3px" }}>{m.label}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: B.steel }}>{m.context}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Talent & Workforce Metrics */}
        <FadeIn delay={200}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: B.gold, marginBottom: "20px" }}>Talent & Workforce Outcomes</p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: `${B.slate}22`, marginBottom: "64px" }} className="mgrid">
          {METRICS_ROW2.map((m, i) => (
            <FadeIn key={i} delay={250 + i * 80}>
              <div style={{ background: B.midnight, padding: "36px 28px", textAlign: "center" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 300, color: B.gold, marginBottom: "6px" }}>{m.value}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500, color: B.ivory, marginBottom: "3px" }}>{m.label}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: B.steel }}>{m.context}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Awards */}
        <FadeIn delay={300}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: B.gold, marginBottom: "20px" }}>Awards & Recognition</p></FadeIn>
        {AWARDS.map((a, i) => (
          <FadeIn key={i} delay={350 + i * 60}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${B.slate}22` }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: B.ivory }}>{a.name}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: B.steel }}>{a.year}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ─── EXPERTISE ──────────────────────────────────────────────────────────────

function Expertise() {
  return (
    <section id="Expertise" style={{ padding: "100px 40px", background: B.cream }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <FadeIn><SectionLabel text="Expertise" /></FadeIn>
        <FadeIn delay={100}>
          <SectionHeading>Where data, people, and <span style={{ fontStyle: "italic", color: B.goldDark }}>financial discipline</span> converge.</SectionHeading>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }} className="egrid">
          {EXPERTISE.map((e, i) => (
            <FadeIn key={i} delay={150 + i * 80}>
              <div style={{ background: B.white, padding: "32px 28px", border: `1px solid ${B.silver}33`, transition: "all 0.3s ease", cursor: "default", height: "100%" }}
                onMouseEnter={ev => { ev.currentTarget.style.borderColor = B.gold; ev.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={ev => { ev.currentTarget.style.borderColor = `${B.silver}33`; ev.currentTarget.style.transform = "translateY(0)"; }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: B.gold, display: "block", marginBottom: "14px" }}>{e.icon}</span>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", fontWeight: 600, color: B.midnight, marginBottom: "10px" }}>{e.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", lineHeight: 1.7, color: B.steel }}>{e.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CASE STUDY ─────────────────────────────────────────────────────────────

function CaseStudy() {
  return (
    <section id="Case Study" style={{ padding: "100px 40px", background: B.white }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <FadeIn><SectionLabel text="Case Study" /></FadeIn>
        <FadeIn delay={100}>
          <SectionHeading>Building a global talent function <span style={{ fontStyle: "italic", color: B.goldDark }}>from zero</span>.</SectionHeading>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0px" }}>
          {[
            { label: "Before", color: `${B.slate}11`, text: "Merkle had no formal DEI function, no measurement framework, no dedicated budget, and no global coordination across 16,000+ employees in three regions. Talent representation was stagnant. Leadership bench strength was weak in diversity. There was no infrastructure to connect people strategy to business outcomes." },
            { label: "Problem", color: `${B.slate}08`, text: "The CEO needed a center of excellence that could operate at enterprise scale, produce measurable financial and talent outcomes, and withstand scrutiny from the CFO, the board, and external stakeholders. This was not a communications exercise. It was an operational build that required budget management, vendor selection, technology integration, cross-regional governance, and executive stakeholder alignment." },
            { label: "Action", color: `${B.slate}11`, text: "I recruited a team of six professionals across three regions within 12 months and built the function from the ground up. I secured and managed a $12MM budget over five years, established 11 Employee Resource Groups with 1,300 champions, created systematic measurement frameworks using Workday and workforce analytics, launched the LIFT leadership program, formed Merkle's first Howard University partnership, and embedded inclusive hiring practices with the first Inclusive Hiring Manager." },
            { label: "Result", color: `${B.slate}08`, text: "50% increase in diverse talent pipeline. 4% rise in women executives. 7% growth in underrepresented talent. 35% boost in diverse recruitment via Howard University. Three internal promotions in six months through LIFT. Employee Pulse scores improved from 3.0 to 4.1. Five industry awards including Microsoft DEI Champion of the Year. Published thought leadership in Quartz, Digiday, and Afrotech. The function became a model referenced by Dentsu's global leadership." },
          ].map((step, i) => (
            <FadeIn key={i} delay={200 + i * 120}>
              <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "0", background: step.color, borderBottom: `1px solid ${B.silver}22` }} className="case-row">
                <div style={{ padding: "32px 24px 8px 24px" }} className="case-label">
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: B.gold }}>{step.label}</p>
                </div>
                <div style={{ padding: "32px 24px 32px 0" }} className="case-text">
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", lineHeight: 1.8, color: B.slate }}>{step.text}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── THOUGHT LEADERSHIP ─────────────────────────────────────────────────────

function ThoughtLeadership() {
  return (
    <section id="Thought Leadership" style={{ padding: "100px 40px", background: B.cream }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <FadeIn><SectionLabel text="Thought Leadership" /></FadeIn>
        <FadeIn delay={100}>
          <SectionHeading>Published perspectives on <span style={{ fontStyle: "italic", color: B.goldDark }}>the future of work</span>.</SectionHeading>
        </FadeIn>
        {PUBLICATIONS.map((p, i) => (
          <FadeIn key={i} delay={150 + i * 60}>
            <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "20px", alignItems: "center", padding: "20px 0", borderBottom: `1px solid ${B.silver}33`, transition: "all 0.2s ease", cursor: "pointer", textDecoration: "none" }} className="pub-row"
              onMouseEnter={ev => { ev.currentTarget.style.paddingLeft = "10px"; const h3 = ev.currentTarget.querySelector("h3"); if (h3) h3.style.color = B.goldDark; }}
              onMouseLeave={ev => { ev.currentTarget.style.paddingLeft = "0px"; const h3 = ev.currentTarget.querySelector("h3"); if (h3) h3.style.color = B.midnight; }}>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", fontWeight: 500, color: B.midnight, transition: "color 0.2s ease" }}>{p.title}</h3>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 500, color: B.gold, padding: "3px 10px", border: `1px solid ${B.gold}44`, borderRadius: "2px", whiteSpace: "nowrap" }}>{p.outlet}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: B.steel }}>{p.year}</span>
            </a>
          </FadeIn>
        ))}

        {/* Downloadable Bio CTA */}
        <FadeIn delay={500}>
          <div style={{ marginTop: "48px", padding: "32px", background: B.white, border: `1px solid ${B.silver}33`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: B.midnight, marginBottom: "4px" }}>Executive Bio (1 Page PDF)</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: B.steel }}>Downloadable for recruiters, hiring managers, and board introductions.</p>
            </div>
            <a href="/Kirt_Morris_Executive_Bio.pdf" target="_blank" rel="noopener noreferrer" style={{ padding: "10px 28px", border: `1px solid ${B.gold}`, fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: B.gold, cursor: "pointer", transition: "all 0.3s ease", textDecoration: "none" }}
              onMouseEnter={ev => { ev.currentTarget.style.background = B.gold; ev.currentTarget.style.color = B.midnight; }}
              onMouseLeave={ev => { ev.currentTarget.style.background = "transparent"; ev.currentTarget.style.color = B.gold; }}>
              Download PDF
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── RESUME ─────────────────────────────────────────────────────────────────

function Resume() {
  return (
    <section id="Resume" style={{ padding: "100px 40px", background: B.white }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <FadeIn><SectionLabel text="Career Timeline" /></FadeIn>
        <FadeIn delay={100}>
          <SectionHeading>25+ years building teams, systems, and <span style={{ fontStyle: "italic", color: B.goldDark }}>bottom line results</span>.</SectionHeading>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div style={{ position: "absolute", left: "120px", top: 0, bottom: 0, width: "1px", background: `linear-gradient(to bottom, ${B.gold}44, ${B.silver}22)` }} className="tline" />
          {TIMELINE.map((t, i) => (
            <FadeIn key={i} delay={150 + i * 100}>
              <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "36px", padding: "28px 0", position: "relative" }} className="titem">
                <div style={{ position: "absolute", left: "116px", top: "36px", width: "9px", height: "9px", background: i === 0 ? B.gold : B.white, border: `2px solid ${B.gold}`, borderRadius: "50%", zIndex: 1 }} className="tdot" />
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 500, color: B.steel, textAlign: "right" }}>{t.period}</p>
                <div style={{ paddingLeft: "20px" }}>
                  <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", fontWeight: 600, color: B.midnight, marginBottom: "3px" }}>{t.role}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500, color: B.gold, marginBottom: "8px" }}>{t.org}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", lineHeight: 1.7, color: B.steel }}>{t.highlight}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={500}>
          <div style={{ marginTop: "56px", padding: "36px", background: B.cream, border: `1px solid ${B.silver}33` }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: B.gold, marginBottom: "18px" }}>Education & Executive Development</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }} className="edugrid">
              {[
                "M.S. Computer Information Systems, University of Phoenix",
                "B.S. Computer Science, University of Maryland",
                "Harvard: Building Organizational Cultures",
                "Cambridge: Prince of Wales Business & Sustainability",
                "Georgetown: Certificate in DEI",
                "McKinsey: Connected Leaders Academy",
                "Duke: Building Financial Acumen",
                "PMP Certified, Project Management Institute",
              ].map((e, i) => (
                <p key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: B.slate, display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <span style={{ color: B.gold, fontSize: "7px", marginTop: "6px", flexShrink: 0 }}>◆</span>{e}
                </p>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── GOVERNANCE & COMMUNITY IMPACT ──────────────────────────────────────────

function Governance() {
  return (
    <section id="Governance" style={{ padding: "100px 40px", background: B.cream }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <FadeIn><SectionLabel text="Governance & Community Impact" /></FadeIn>
        <FadeIn delay={100}>
          <SectionHeading>
            Extending enterprise discipline to <span style={{ fontStyle: "italic", color: B.goldDark }}>community ecosystems</span>.
          </SectionHeading>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "start" }} className="about-grid">
          {/* Genesys Works */}
          <FadeIn delay={200}>
            <div style={{ background: B.white, padding: "36px", border: `1px solid ${B.silver}33`, height: "100%" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: B.gold, marginBottom: "16px" }}>Board of Directors, 2021 to Present</p>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "17px", fontWeight: 600, color: B.midnight, marginBottom: "10px" }}>Genesys Works National Capitol Region</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", lineHeight: 1.75, color: B.slate }}>
                Governance oversight for a workforce development nonprofit that creates career pathways for young adults from underserved communities into corporate internships and full time employment. Connecting enterprise talent pipeline strategy with community level workforce infrastructure.
              </p>
            </div>
          </FadeIn>

          {/* CAFE */}
          <FadeIn delay={300}>
            <div style={{ background: B.white, padding: "36px", border: `1px solid ${B.silver}33`, height: "100%" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: B.gold, marginBottom: "16px" }}>Strategic Advisor, 2025 to Present</p>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "17px", fontWeight: 600, color: B.midnight, marginBottom: "10px" }}>Cultural Academy for Excellence (CAFE)</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", lineHeight: 1.75, color: B.slate }}>
                CAFE is an award winning 501(c)(3) that has used performing arts to develop leadership, discipline, and academic achievement in over 1,500 youth since 1996. As strategic advisor during its 30th anniversary year, I led a comprehensive brand, technology, and marketing transformation: delivering a full brand refresh, implementing a 13 platform digital ecosystem with CRM integration, and managing a holiday concert campaign that generated $5,297 in revenue with 5X return on ad spend. Applied Fortune 1000 operational methodology to strengthen how a community organization communicates its mission and connects with supporters.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* CAFE Metrics Row */}
        <FadeIn delay={400}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: `${B.silver}22`, marginTop: "32px" }} className="mgrid">
            {[
              { value: "$5,297", label: "Concert Revenue", context: "228 Tickets, 4.9/5 Rating" },
              { value: "5X", label: "Ad Return on Spend", context: "Facebook Campaign on $101 Investment" },
              { value: "2X", label: "Email Engagement", context: "Open and Click Rate Improvement" },
              { value: "13", label: "Platforms Integrated", context: "Full Digital Ecosystem Documented" },
            ].map((m, i) => (
              <div key={i} style={{ background: B.cream, padding: "28px 20px", textAlign: "center" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 300, color: B.goldDark, marginBottom: "4px" }}>{m.value}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 500, color: B.midnight, marginBottom: "2px" }}>{m.label}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: B.steel }}>{m.context}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Testimonial */}
        <FadeIn delay={500}>
          <div style={{ marginTop: "40px", padding: "36px", background: B.white, border: `1px solid ${B.silver}33`, borderLeft: `3px solid ${B.gold}` }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 400, lineHeight: 1.7, color: B.slate, fontStyle: "italic", marginBottom: "20px" }}>
              "Kirt Morris brought a level of strategic marketing and technology expertise to CAFE that most nonprofits our size simply cannot access. His work has strengthened every aspect of how we communicate our mission and connect with our supporters. I recommend Kirt without reservation."
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: B.midnight }}>Lorna Green</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: B.steel }}>Founder & CEO, Cultural Academy for Excellence</p>
          </div>
        </FadeIn>

        {/* Mind for Mission */}
        <FadeIn delay={550}>
          <div style={{ marginTop: "24px", padding: "28px 36px", background: B.midnight, border: `1px solid ${B.slate}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: B.gold, marginBottom: "6px" }}>Chief Technology & Transformation Advisor</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", fontWeight: 500, color: B.ivory }}>Mind for Mission</p>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: B.silver, maxWidth: "400px" }}>
                Advisory role applying enterprise technology strategy and organizational transformation expertise to mission driven organizations.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── EXECUTIVE CTA ──────────────────────────────────────────────────────────

function ExecutiveCTA() {
  return (
    <section id="Connect" style={{ padding: "80px 40px", background: B.white, borderTop: `1px solid ${B.silver}22`, borderBottom: `1px solid ${B.silver}22` }}>
      <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <div style={{ width: "40px", height: "2px", background: B.gold, margin: "0 auto 28px" }} />
        </FadeIn>
        <FadeIn delay={100}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 300, color: B.midnight, marginBottom: "20px" }}>
            For executive, board, or strategic advisory discussions.
          </h2>
        </FadeIn>
        <FadeIn delay={200}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", lineHeight: 1.7, color: B.steel, marginBottom: "36px" }}>
            I engage selectively with organizations where workforce strategy, talent systems, or culture transformation are treated as competitive levers. If that describes your challenge, I welcome the conversation.
          </p>
        </FadeIn>
        <FadeIn delay={300}>
          <a href="https://calendly.com/kirt_morris/30min" target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-block",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: B.white,
              background: B.midnight,
              padding: "16px 48px",
              textDecoration: "none",
              border: `1px solid ${B.midnight}`,
              transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
              cursor: "pointer",
            }}
            onMouseEnter={ev => {
              ev.currentTarget.style.background = B.gold;
              ev.currentTarget.style.borderColor = B.gold;
              ev.currentTarget.style.color = B.midnight;
              ev.currentTarget.style.transform = "translateY(-2px)";
              ev.currentTarget.style.boxShadow = "0 4px 20px rgba(197, 151, 91, 0.25)";
            }}
            onMouseLeave={ev => {
              ev.currentTarget.style.background = B.midnight;
              ev.currentTarget.style.borderColor = B.midnight;
              ev.currentTarget.style.color = B.white;
              ev.currentTarget.style.transform = "translateY(0)";
              ev.currentTarget.style.boxShadow = "none";
            }}>
            Schedule a Conversation
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="Contact" style={{ padding: "80px 40px", background: B.midnight, textAlign: "center" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        <FadeIn>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 300, color: B.ivory, marginBottom: "28px" }}>
            Direct <span style={{ fontStyle: "italic", color: B.gold }}>contact</span>.
          </h2>
        </FadeIn>
        <FadeIn delay={100}>
          <div style={{ display: "flex", gap: "40px", justifyContent: "center", flexWrap: "wrap", marginBottom: "24px" }}>
            {[
              { label: "kirtonmorris@gmail.com", href: "mailto:kirtonmorris@gmail.com" },
              { label: "240.353.5992", href: "tel:240-353-5992" },
            ].map((c, i) => (
              <a key={i} href={c.href} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: B.silver, textDecoration: "none", transition: "color 0.2s", letterSpacing: "0.02em" }}
                onMouseEnter={ev => (ev.currentTarget.style.color = B.gold)}
                onMouseLeave={ev => (ev.currentTarget.style.color = B.silver)}>{c.label}</a>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={150}>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "20px" }}>
            <a href="https://www.linkedin.com/in/kirtmorris/" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: B.gold, padding: "10px 24px", border: `1px solid ${B.gold}44`, textDecoration: "none", transition: "all 0.3s ease" }}
              onMouseEnter={ev => { ev.currentTarget.style.background = B.gold; ev.currentTarget.style.color = B.midnight; }}
              onMouseLeave={ev => { ev.currentTarget.style.background = "transparent"; ev.currentTarget.style.color = B.gold; }}>
              LinkedIn Profile
            </a>
            <a href="/Kirt_Morris_Executive_Bio.pdf" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: B.silver, padding: "10px 24px", border: `1px solid ${B.slate}44`, textDecoration: "none", transition: "all 0.3s ease" }}
              onMouseEnter={ev => { ev.currentTarget.style.color = B.gold; ev.currentTarget.style.borderColor = B.gold; }}
              onMouseLeave={ev => { ev.currentTarget.style.color = B.silver; ev.currentTarget.style.borderColor = `${B.slate}44`; }}>
              Download Resume
            </a>
          </div>
        </FadeIn>
        <FadeIn delay={200}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: B.steel }}>Odenton, Maryland · Open to Remote & Hybrid</p>
        </FadeIn>
      </div>
      <div style={{ marginTop: "48px", paddingTop: "20px", borderTop: `1px solid ${B.slate}22` }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: `${B.steel}77`, letterSpacing: "0.04em" }}>
          © 2026 Kirt Morris. Board Member, Genesys Works National Capitol Region. Strategic Advisor, Cultural Academy for Excellence. Chief Technology & Transformation Advisor, Mind for Mission.
        </p>
      </div>
    </section>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────────────────────

export default function KirtMorrisSite() {
  const [active, setActive] = useState("Home");

  const nav = (s) => {
    const el = document.getElementById(s);
    if (el) { el.scrollIntoView({ behavior: "smooth" }); setActive(s); }
  };

  useEffect(() => {
    const secs = ["Home", "About", "Impact", "Expertise", "Case Study", "Thought Leadership", "Resume", "Governance", "Connect", "Contact"];
    const obs = new IntersectionObserver((entries) => { entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }); }, { threshold: 0.25 });
    secs.forEach(s => { const el = document.getElementById(s); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: B.midnight, overflowX: "hidden" }}>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
        ::selection{background:${B.gold}33;color:${B.midnight}}
        @media(max-width:900px){
          .dnav{display:none!important}
          .mbtn{display:block!important}
          .about-grid,.hero-grid{grid-template-columns:1fr!important}
          .mgrid,.egrid{grid-template-columns:1fr 1fr!important}
          .edugrid{grid-template-columns:1fr!important}
          .tline{left:0!important}
          .titem{grid-template-columns:1fr!important;gap:6px!important;padding-left:20px!important}
          .tdot{left:-4px!important}
          .headshot-col{display:flex;justify-content:center;order:-1}
          .case-row{grid-template-columns:1fr!important}
          .case-row .case-label{padding:24px 24px 4px 24px!important}
          .case-row .case-text{padding:0 24px 24px 24px!important}
          .roles-row{flex-direction:column;align-items:flex-start!important;gap:20px!important}
          .pub-row{grid-template-columns:1fr!important;gap:8px!important}
        }
        @media(max-width:600px){
          .mgrid{grid-template-columns:1fr!important}
          .egrid{grid-template-columns:1fr!important}
        }
      `}</style>
      <Navigation active={active} onNav={nav} />
      <Hero />
      <About />
      <TargetRoles />
      <Impact />
      <Expertise />
      <CaseStudy />
      <ThoughtLeadership />
      <Resume />
      <Governance />
      <ExecutiveCTA />
      <Contact />
    </div>
  );
}
