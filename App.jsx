import React, { useMemo, useState, useEffect } from "react";

/**
 * Idol Planner — Blue + White premium UI
 * Single-file App.jsx (no extra CSS files required).
 * Replace your existing App.jsx with this file.
 */

const FOUNDERS = [
  {
    id: "zuck",
    name: "Mark Zuckerberg",
    company: "Facebook (Meta)",
    category: "Social",
    oneLiner: "Built and shipped relentlessly; won via speed + network effects.",
    short: "Coding and building projects nonstop as a teenager; shipped early social products.",
    story:
      "Zuckerberg’s edge was shipping early products fast, learning from real users, and compounding distribution through network effects. The “moat” wasn’t clever code— it was adoption and iteration velocity.",
    principles: [
      "Ship fast and learn from users",
      "Distribution is a feature",
      "Focus on retention loops",
      "Keep product simple, improve weekly",
    ],
    focusByAge: (age) => {
      if (age <= 18) return ["Code daily", "Ship tiny apps weekly", "Learn fundamentals deeply", "Build for real users (even 10)"];
      if (age <= 22) return ["Build an MVP people return to", "Create growth loops", "Iterate weekly with user feedback", "Learn systems + scalability basics"];
      if (age <= 26) return ["Scale product + infra", "Hire/partner for leverage", "Protect focus, avoid distraction", "Obsess over distribution & retention"];
      return ["Operate at scale", "Build moats", "Place strategic bets", "Keep execution cadence strong"];
    },
  },
  {
    id: "musk",
    name: "Elon Musk",
    company: "Tesla, SpaceX",
    category: "Hard Tech",
    oneLiner: "First principles + mission obsession + brutal execution.",
    short: "Obsessed with physics, sci-fi, and computers from a young age; went deep on first principles.",
    story:
      "Musk leans on first-principles reasoning: break problems down to physics/economics, then rebuild a solution. Combine that with risk tolerance and high-intensity iteration and you get hard-tech compounding.",
    principles: [
      "First principles over analogy",
      "Choose hard, valuable problems",
      "Prototype fast with constraints",
      "Relentless iteration under pressure",
    ],
    focusByAge: (age) => {
      if (age <= 18) return ["Math + physics basics", "Build small prototypes", "Learn coding + systems", "Practice first principles thinking"];
      if (age <= 22) return ["Pick a hard domain", "Build proof-of-concepts", "Learn business models", "Work with real constraints (time/money)"];
      if (age <= 26) return ["Recruit top talent", "Scale prototypes into product", "Raise capital or generate revenue", "Build execution discipline"];
      return ["Scale org", "Optimize manufacturing/ops", "Long-term bets with compounding advantage", "Keep speed without chaos"];
    },
  },
  {
    id: "ek",
    name: "Daniel Ek",
    company: "Spotify",
    category: "Product",
    oneLiner: "Practical building + product taste + distribution partnerships.",
    short: "Freelance coder early; learned real-world product delivery and UX.",
    story:
      "Ek sharpened skills by building for clients and then applied product taste + distribution strategy to a massive market: music consumption. The lesson: make something users love, then win distribution.",
    principles: [
      "Build practical skills via real work",
      "Optimize UX + speed",
      "Retention beats hype",
      "Partnerships accelerate distribution",
    ],
    focusByAge: (age) => {
      if (age <= 18) return ["Client work to sharpen skills", "Learn UX basics", "Ship features consistently", "Study distribution channels"];
      if (age <= 22) return ["Build a product people return to", "Make it fast + delightful", "Measure retention", "Ship weekly improvements"];
      if (age <= 26) return ["Scale with data", "Partnership strategy", "International expansion thinking", "Build a brand + habit"];
      return ["Platform strategy", "Expand ecosystem", "New product lines", "Defend and compound distribution"];
    },
  },
  {
    id: "jobs",
    name: "Steve Jobs",
    company: "Apple",
    category: "Design",
    oneLiner: "Taste + storytelling + product simplicity.",
    short: "Focused on product vision, simplicity, and packaging technology into desire.",
    story:
      "Jobs’ advantage wasn’t just tech. It was taste and the ability to turn complex engineering into simple, emotional products. He aligned design, distribution, and narrative.",
    principles: [
      "Simplicity is a feature",
      "Taste matters",
      "Story + brand amplify product",
      "Make the whole experience coherent",
    ],
    focusByAge: (age) => {
      if (age <= 18) return ["Build taste: study great products", "Learn basic engineering", "Practice storytelling", "Make simple things feel premium"];
      if (age <= 22) return ["Build a product with strong taste", "Obsess over UX", "Polish the core workflow", "Learn persuasion + narrative"];
      if (age <= 26) return ["Pair with strong engineers", "Ship iconic v1", "Build brand trust", "Ruthlessly cut fluff"];
      return ["Scale product line", "Maintain taste as team grows", "Launch cycles", "Defend brand + ecosystem"];
    },
  },
  {
    id: "gates",
    name: "Bill Gates",
    company: "Microsoft",
    category: "Software",
    oneLiner: "Deep technical skill + ruthless focus + distribution leverage.",
    short: "Hardcore programmer; bet early on software becoming the control layer of computing.",
    story:
      "Gates went deep on coding early, then positioned Microsoft where leverage was highest: the software layer controlling hardware ecosystems. Key lesson: technical mastery + platform leverage.",
    principles: [
      "Technical mastery compounds",
      "Choose leverage points (platforms)",
      "Focus beats breadth",
      "Ship reliable software",
    ],
    focusByAge: (age) => {
      if (age <= 18) return ["Code daily", "Learn systems + OS basics", "Build small tools", "Study how platforms win"];
      if (age <= 22) return ["Pick a platform opportunity", "Build developer-friendly tools", "Learn distribution deals", "Write clean, reliable software"];
      if (age <= 26) return ["Scale with partners", "Build ecosystem", "Own the platform layer", "Execution and reliability"];
      return ["Defend platform", "Expand product suite", "Strategic acquisitions", "Sustain technical excellence"];
    },
  },
  {
    id: "page",
    name: "Larry Page",
    company: "Google",
    category: "Search",
    oneLiner: "Algorithms + data + compounding distribution.",
    short: "Focused on ranking information better; won via superior algorithmic advantage.",
    story:
      "Page leaned into the simplest powerful idea: rank pages by links (signals). Then compound data, infrastructure, and distribution. Lesson: build a product that improves with usage.",
    principles: [
      "Algorithmic advantage matters",
      "Data flywheels",
      "Infrastructure = moats",
      "Make the product improve with usage",
    ],
    focusByAge: (age) => {
      if (age <= 18) return ["Learn algorithms + math basics", "Build data projects", "Practice research thinking", "Ship prototypes"];
      if (age <= 22) return ["Pick a problem with a data flywheel", "Build a measurable MVP", "Optimize quality signals", "Learn scale basics"];
      if (age <= 26) return ["Infra + reliability", "Distribution partnerships", "Hire strong engineers", "Protect signal quality"];
      return ["Scale responsibly", "Expand ecosystem", "Long-term research bets", "Defend platform integrity"];
    },
  },
  {
    id: "bezos",
    name: "Jeff Bezos",
    company: "Amazon",
    category: "E-commerce",
    oneLiner: "Customer obsession + long-term compounding.",
    short: "Relentless customer focus; optimized for long-term advantage, not short-term comfort.",
    story:
      "Bezos built a machine: customer obsession, selection, convenience, and compounding logistics. Lesson: long-term thinking + operational excellence is a superpower.",
    principles: [
      "Customer obsession",
      "Long-term thinking",
      "Operational excellence",
      "Compounding systems",
    ],
    focusByAge: (age) => {
      if (age <= 18) return ["Learn fundamentals", "Work hard jobs to build grit", "Study systems", "Build discipline"];
      if (age <= 22) return ["Build a product customers love", "Measure what matters", "Create reliable execution", "Think in years, not days"];
      if (age <= 26) return ["Build operations", "Automate processes", "Scale with systems", "Add selection/features steadily"];
      return ["Compound distribution + ops", "Invest in moats", "Keep customer trust", "Expand platform"];
    },
  },
  {
    id: "altman",
    name: "Sam Altman",
    company: "OpenAI / YC",
    category: "Startups",
    oneLiner: "Fast iteration + networking + capital strategy.",
    short: "Built early; learned startup mechanics and how to scale teams/products.",
    story:
      "Altman’s playbook is: build, learn fast, recruit, and execute. Combine product sense with distribution and capital strategy. Strong networks amplify outcomes.",
    principles: [
      "Fast iteration",
      "Recruit strong people",
      "Distribution + capital strategy",
      "Long-term compounding bets",
    ],
    focusByAge: (age) => {
      if (age <= 18) return ["Build things", "Learn to sell ideas", "Make friends with builders", "Ship constantly"];
      if (age <= 22) return ["Build a real MVP", "Talk to users weekly", "Learn growth + distribution", "Recruit collaborators"];
      if (age <= 26) return ["Scale product + team", "Fundraising strategy", "Execution cadence", "Build a wedge + moat"];
      return ["Platform thinking", "Strategic partnerships", "Second-order effects", "Keep shipping at scale"];
    },
  },
  {
    id: "systrom",
    name: "Kevin Systrom",
    company: "Instagram",
    category: "Social",
    oneLiner: "Simple product + strong UX + viral distribution.",
    short: "Focused on making a simple, addictive product with a clear sharing loop.",
    story:
      "Instagram won by being simple, fast, and shareable. Lesson: strip complexity, obsess over UX, and engineer distribution into the product.",
    principles: [
      "Simplicity wins",
      "UX is distribution",
      "Sharing loops matter",
      "Speed + iteration",
    ],
    focusByAge: (age) => {
      if (age <= 18) return ["Build small apps", "Learn design basics", "Ship weekly", "Study viral loops"];
      if (age <= 22) return ["Build a simple MVP", "Obsess over UI", "Ship fast", "Engineer sharing/retention loops"];
      if (age <= 26) return ["Scale infra", "Improve retention", "Expand features carefully", "Keep product simple"];
      return ["Defend attention", "New growth channels", "Platform strategy", "Protect quality and brand"];
    },
  },
  {
    id: "collison",
    name: "Patrick Collison",
    company: "Stripe",
    category: "Payments",
    oneLiner: "Developer-first product + infrastructure moat.",
    short: "Focused on building infrastructure that developers love—clean APIs and reliability.",
    story:
      "Stripe won by obsessing over developer experience: simple APIs, clear docs, and reliability. Lesson: boring infrastructure becomes huge if it’s the best tool.",
    principles: [
      "Developer experience is a moat",
      "Reliability over flash",
      "Build infrastructure",
      "Ship with excellent docs",
    ],
    focusByAge: (age) => {
      if (age <= 18) return ["Build developer tools", "Learn APIs deeply", "Write docs for your own projects", "Ship small utilities"];
      if (age <= 22) return ["Build an API product", "Care about reliability", "Work on docs + onboarding", "Solve a painful workflow"];
      if (age <= 26) return ["Scale infrastructure", "Enterprise thinking", "Security + compliance basics", "Partner distribution"];
      return ["Platform expansion", "New products", "Defend trust + reliability", "Ecosystem strategy"];
    },
  },
  {
    id: "nadella",
    name: "Satya Nadella",
    company: "Microsoft (CEO)",
    category: "Leadership",
    oneLiner: "Growth mindset + systems leadership + compounding teams.",
    short: "Built deep technical foundation then scaled impact through leadership and culture.",
    story:
      "Nadella is a culture + systems leader: align teams, create learning loops, and modernize platforms. Lesson: leadership multiplies technical work.",
    principles: [
      "Growth mindset",
      "Team leverage",
      "Systems thinking",
      "Customer + developer focus",
    ],
    focusByAge: (age) => {
      if (age <= 18) return ["Build fundamentals", "Practice communication", "Lead small groups/projects", "Develop consistency"];
      if (age <= 22) return ["Build projects with others", "Improve communication", "Learn architecture basics", "Build reliable delivery habits"];
      if (age <= 26) return ["Lead initiatives", "Scale systems", "Mentor others", "Create strong execution culture"];
      return ["Org design", "Strategy + execution alignment", "Platform modernization", "Compounding teams"];
    },
  },
  {
    id: "huang",
    name: "Jensen Huang",
    company: "NVIDIA",
    category: "Hardware",
    oneLiner: "High standards + long-term technical bets + execution.",
    short: "Bet early on compute acceleration; long-term vision combined with intense execution.",
    story:
      "Huang’s lesson: pick a long-term technical wave, then execute with high standards for years. Compounding wins if you keep shipping and improving.",
    principles: [
      "High standards",
      "Long-term technical bets",
      "Execution discipline",
      "Build platforms, not features",
    ],
    focusByAge: (age) => {
      if (age <= 18) return ["Math + CS fundamentals", "Build small systems", "Learn how computers work", "Stay consistent daily"];
      if (age <= 22) return ["Pick a deep tech area", "Build projects that teach systems", "Learn performance basics", "Develop quality standards"];
      if (age <= 26) return ["Scale expertise", "Ship polished work", "Work with strong teams", "Build platform thinking"];
      return ["Platform strategy", "Sustained execution", "Ecosystem partnerships", "Long-run compounding bets"];
    },
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(FOUNDERS.map((f) => f.category)))];

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function App() {
  const [age, setAge] = useState(22);
  const [selectedId, setSelectedId] = useState(FOUNDERS[0].id);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);

  const selected = useMemo(
    () => FOUNDERS.find((f) => f.id === selectedId) || FOUNDERS[0],
    [selectedId]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FOUNDERS.filter((f) => {
      const catOk = cat === "All" ? true : f.category === cat;
      const qOk = !q
        ? true
        : (f.name + " " + f.company + " " + f.category + " " + f.oneLiner + " " + f.short)
            .toLowerCase()
            .includes(q);
      return catOk && qOk;
    });
  }, [query, cat]);

  const focus = useMemo(() => selected.focusByAge(age), [selected, age]);

  // Inject global CSS (body margin, background, etc.)
  useEffect(() => {
    const style = document.createElement("style");
    style.setAttribute("data-idol-planner", "true");
    style.innerHTML = GLOBAL_CSS;
    document.head.appendChild(style);
    return () => {
      document.querySelectorAll('style[data-idol-planner="true"]').forEach((n) => n.remove());
    };
  }, []);

  return (
    <div className="appShell">
      {/* Top Nav */}
      <header className="topNav">
        <div className="topNavInner">
          <div className="brandRow">
            <div className="brandMark" />
            <div className="brandText">
              <div className="brandName">Idol Planner</div>
              <div className="brandTag">Blue/White theme • Founders playbook • Execution system</div>
            </div>
          </div>

          <div className="topRight">
            <div className="pill">React + Vite</div>
            <div className="pill ghost">Local Dev</div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="heroInner">
          <div className="heroCenter">
            <div className="heroKicker">Your age → their focus → your next move</div>
            <h1 className="heroTitle">What were top entrepreneurs doing at your age?</h1>
            <p className="heroSub">
              This is an <b>execution dashboard</b>. Pick a founder, set your age, and extract a
              repeatable plan. Less scrolling. More shipping.
            </p>

            <div className="heroControls">
              <div className="ageBox">
                <div className="ageLabel">Your age</div>
                <div className="ageValue">{age}</div>
                <div className="ageSuffix">years</div>
              </div>

              <div className="sliderBox">
                <div className="sliderTopRow">
                  <span>14</span>
                  <span>45</span>
                </div>
                <input
                  className="slider"
                  type="range"
                  min="14"
                  max="45"
                  value={age}
                  onChange={(e) => setAge(clamp(Number(e.target.value), 14, 45))}
                />
                <div className="sliderHint">Slide the age. The focus list updates instantly.</div>
              </div>
            </div>

            <div className="heroFilters">
              <div className="searchWrap">
                <span className="searchIcon">⌕</span>
                <input
                  className="searchInput"
                  placeholder="Search founders (name, company, category)…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <div className="selectWrap">
                <span className="selectLabel">Category</span>
                <select className="select" value={cat} onChange={(e) => setCat(e.target.value)}>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="btnPrimary"
                onClick={() => {
                  setQuery("");
                  setCat("All");
                }}
              >
                Reset
              </button>
            </div>

            <div className="heroExamples">
              <div className="exampleCard">
                <div className="exampleTitle">Examples you can build</div>
                <div className="exampleGrid">
                  <div className="ex">
                    <div className="exHead">📈 Data + Security</div>
                    <div className="exBody">Phishing trends dashboard, breach insights, anomaly login detector</div>
                  </div>
                  <div className="ex">
                    <div className="exHead">⚙️ Dev Tool</div>
                    <div className="exBody">Log parser, API tester, CLI automation, report generator</div>
                  </div>
                  <div className="ex">
                    <div className="exHead">🧠 Learning Project</div>
                    <div className="exBody">Algorithms visualizer, mini database, mini interpreter/shell</div>
                  </div>
                  <div className="ex">
                    <div className="exHead">🚀 MVP Product</div>
                    <div className="exBody">Simple habit tool, scheduling helper, portfolio dashboard</div>
                  </div>
                </div>
              </div>

              <div className="exampleCard alt">
                <div className="exampleTitle">Rule of the game</div>
                <div className="exampleText">
                  Pick <b>one</b> idea. Ship a v1 in <b>7 days</b>. Iterate weekly. Your real advantage is
                  compounding output, not perfect planning.
                </div>
                <div className="exampleBtns">
                  <button className="btnSecondary" onClick={() => alert("Sprint locked: 7 days. Ship v1. Iterate weekly.")}>
                    Lock a 7-day sprint
                  </button>
                  <button
                    className="btnSecondary"
                    onClick={() => alert("Upgrade path: add timeline view + more founder data + save profiles.")}
                  >
                    Upgrade roadmap
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main */}
      <main className="main">
        <div className="sectionTitleWrap">
          <h2 className="sectionTitle">Founder Library</h2>
          <p className="sectionSub">
            Click a founder to select. Hit “View full story” for deeper notes and principles.
          </p>
        </div>

        <div className="grid">
          {filtered.map((f) => {
            const isActive = f.id === selectedId;
            return (
              <button
                key={f.id}
                className={cx("founderCard", isActive && "active")}
                onClick={() => setSelectedId(f.id)}
              >
                <div className="founderTop">
                  <div className="founderCat">{f.category}</div>
                </div>

                <div className="founderBody">
                  <div className="founderName">{f.name}</div>
                  <div className="founderCompany">{f.company}</div>
                  <div className="founderOneLiner">{f.oneLiner}</div>
                  <div className="founderShort">{f.short}</div>

                  <div className="cardActions">
                    <span className="selectState">{isActive ? "Selected" : "Select"}</span>
                    <span className="arrow">→</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Plan */}
        <section className="plan">
          <div className="planHeader">
            <div className="planLeft">
              <div className="planHeadline">
                At <span className="accent">{age}</span>, what would{" "}
                <span className="accent">{selected.name}</span> focus on?
              </div>
              <div className="planDesc">{selected.story}</div>
            </div>

            <div className="planRight">
              <button className="btnPrimary" onClick={() => setModalOpen(true)}>
                View full story
              </button>
            </div>
          </div>

          <div className="planGrid">
            <div className="planCard">
              <div className="planCardTitle">Focus List</div>
              <ul className="list">
                {focus.map((item) => (
                  <li key={item} className="li">
                    <span className="check">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="planCard">
              <div className="planCardTitle">Your next move (tight)</div>
              <div className="planText">
                Choose <b>one project</b> from the examples. Ship a working v1 within <b>7 days</b>.
                Then iterate weekly. If you want, we’ll add a timeline view + more founders + saved profiles.
              </div>

              <div className="planButtons">
                <button className="btnSecondary" onClick={() => alert("Action: Pick 1 project now. v1 in 7 days.")}>
                  Pick 1 project
                </button>
                <button className="btnSecondary" onClick={() => alert("Next: add timeline view, charts, saved profiles, Netlify function plans.")}>
                  Add upgrades
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="footerLine" />
          <div className="footerText">
            Idol Planner • Blue/White UI • Built to ship • Keep compounding.
          </div>
        </footer>
      </main>

      {/* Modal */}
      {modalOpen && (
        <div className="modalOverlay" onMouseDown={() => setModalOpen(false)}>
          <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="modalTop">
              <div>
                <div className="modalTitle">{selected.name}</div>
                <div className="modalSub">{selected.company} • {selected.category}</div>
              </div>
              <button className="modalClose" onClick={() => setModalOpen(false)}>✕</button>
            </div>

            <div className="modalBody">
              <div className="modalSectionTitle">Story</div>
              <div className="modalText">{selected.story}</div>

              <div className="modalSectionTitle" style={{ marginTop: 14 }}>Core Principles</div>
              <div className="pillRow">
                {selected.principles.map((p) => (
                  <span key={p} className="pillLite">{p}</span>
                ))}
              </div>

              <div className="modalSectionTitle" style={{ marginTop: 14 }}>At age {age}, focus list</div>
              <ul className="list">
                {selected.focusByAge(age).map((item) => (
                  <li key={item} className="li">
                    <span className="check">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="modalHint">
                Want more founders? Add more objects to the <b>FOUNDERS</b> array at the top of this file.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const GLOBAL_CSS = `
:root{
  --blue-950:#07162F;
  --blue-900:#0A2144;
  --blue-800:#0B2E5E;
  --blue-700:#0F3B78;
  --blue-600:#1A4EA1;
  --blue-500:#2563EB;
  --sky-200:#CFE6FF;
  --sky-100:#EAF4FF;
  --white:#FFFFFF;
  --text:#0B1B2F;
  --muted:#49627D;
  --card:#FFFFFF;
  --border:rgba(37,99,235,0.18);
  --shadow: 0 20px 55px rgba(7,22,47,0.18);
  --shadow2: 0 12px 28px rgba(7,22,47,0.12);
  --radius: 18px;
}

*{ box-sizing:border-box; }
html, body { height:100%; }
body{
  margin:0;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji";
  background:
    radial-gradient(900px 450px at 15% 0%, rgba(37,99,235,0.18), transparent 55%),
    radial-gradient(850px 520px at 85% 10%, rgba(14,165,233,0.16), transparent 60%),
    linear-gradient(180deg, var(--sky-100), #F7FBFF 45%, #F5F9FF 100%);
  color: var(--text);
}

button, input, select { font-family: inherit; }

.appShell{ min-height: 100vh; }

/* Top Nav */
.topNav{
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255,255,255,0.82);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(37,99,235,0.12);
}
.topNavInner{
  max-width: 1180px;
  margin: 0 auto;
  padding: 14px 18px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: 12px;
}
.brandRow{ display:flex; align-items:center; gap: 12px; }
.brandMark{
  width: 14px; height: 14px; border-radius: 999px;
  background: linear-gradient(135deg, #2563EB, #38BDF8);
  box-shadow: 0 0 0 6px rgba(37,99,235,0.10);
}
.brandName{ font-weight: 950; letter-spacing: -0.3px; font-size: 16px; }
.brandTag{ font-size: 12px; color: var(--muted); margin-top: 2px; }
.topRight{ display:flex; gap: 10px; flex-wrap: wrap; justify-content:flex-end; }
.pill{
  font-size: 12px;
  font-weight: 700;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid rgba(37,99,235,0.18);
  background: rgba(37,99,235,0.08);
  color: #0B2E5E;
}
.pill.ghost{
  background: rgba(255,255,255,0.65);
  border: 1px solid rgba(37,99,235,0.12);
}

/* Hero */
.hero{
  padding: 42px 18px 24px;
}
.heroInner{
  max-width: 1180px;
  margin: 0 auto;
}
.heroCenter{
  text-align: center;
}
.heroKicker{
  display:inline-block;
  font-weight: 800;
  font-size: 12px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #0B2E5E;
  background: rgba(37,99,235,0.10);
  border: 1px solid rgba(37,99,235,0.16);
  padding: 8px 12px;
  border-radius: 999px;
}
.heroTitle{
  margin: 14px auto 0;
  font-size: 46px;
  line-height: 1.07;
  letter-spacing: -1.2px;
  font-weight: 950;
  max-width: 900px;
  color: #061A33;
}
.heroSub{
  margin: 12px auto 0;
  max-width: 860px;
  font-size: 16px;
  line-height: 1.5;
  color: #2A445F;
}
.heroControls{
  margin: 22px auto 0;
  max-width: 860px;
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 14px;
  align-items: stretch;
}
.ageBox{
  background: var(--card);
  border: 1px solid rgba(37,99,235,0.14);
  border-radius: var(--radius);
  box-shadow: var(--shadow2);
  padding: 14px;
  display:flex;
  flex-direction: column;
  justify-content: center;
}
.ageLabel{ font-size: 12px; color: var(--muted); font-weight: 800; }
.ageValue{ font-size: 42px; font-weight: 950; letter-spacing: -1px; color: #0B2E5E; margin-top: 4px; }
.ageSuffix{ font-size: 12px; color: var(--muted); font-weight: 800; margin-top: 2px; }

.sliderBox{
  background: var(--card);
  border: 1px solid rgba(37,99,235,0.14);
  border-radius: var(--radius);
  box-shadow: var(--shadow2);
  padding: 14px;
  display:flex;
  flex-direction: column;
  justify-content: center;
}
.sliderTopRow{ display:flex; justify-content: space-between; font-size: 12px; color: var(--muted); font-weight: 800; }
.slider{
  width:100%;
  margin-top: 10px;
}
.sliderHint{
  margin-top: 10px;
  font-size: 12px;
  color: var(--muted);
  font-weight: 700;
}
.heroFilters{
  margin: 14px auto 0;
  max-width: 860px;
  display:flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.searchWrap{
  display:flex;
  align-items:center;
  gap: 8px;
  background: var(--card);
  border: 1px solid rgba(37,99,235,0.14);
  border-radius: 999px;
  padding: 10px 12px;
  box-shadow: var(--shadow2);
  min-width: 320px;
}
.searchIcon{ color: #0B2E5E; font-weight: 900; }
.searchInput{
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  font-size: 14px;
  color: #0B1B2F;
}
.selectWrap{
  display:flex;
  align-items:center;
  gap: 8px;
  background: var(--card);
  border: 1px solid rgba(37,99,235,0.14);
  border-radius: 999px;
  padding: 10px 12px;
  box-shadow: var(--shadow2);
}
.selectLabel{ font-size: 12px; color: var(--muted); font-weight: 900; }
.select{
  border: none;
  outline: none;
  background: transparent;
  font-weight: 800;
  color: #0B2E5E;
}
.btnPrimary{
  border: none;
  cursor: pointer;
  font-weight: 950;
  padding: 11px 14px;
  border-radius: 999px;
  color: white;
  background: linear-gradient(135deg, #2563EB, #38BDF8);
  box-shadow: 0 14px 32px rgba(37,99,235,0.22);
}
.btnPrimary:hover{ filter: brightness(0.98); }

.heroExamples{
  margin: 18px auto 0;
  max-width: 1000px;
  display:grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 14px;
  text-align: left;
}
.exampleCard{
  background: var(--card);
  border: 1px solid rgba(37,99,235,0.14);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 14px;
}
.exampleCard.alt{
  background: linear-gradient(180deg, rgba(37,99,235,0.08), rgba(56,189,248,0.08));
}
.exampleTitle{
  font-weight: 950;
  letter-spacing: -0.2px;
  color: #061A33;
}
.exampleGrid{
  margin-top: 10px;
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.ex{
  border: 1px solid rgba(37,99,235,0.12);
  border-radius: 14px;
  padding: 10px;
  background: rgba(37,99,235,0.04);
}
.exHead{ font-weight: 950; color: #0B2E5E; }
.exBody{ margin-top: 4px; color: #2A445F; font-size: 13px; line-height: 1.35; }
.exampleText{ margin-top: 10px; color: #2A445F; line-height: 1.45; }
.exampleBtns{ margin-top: 12px; display:flex; gap: 10px; flex-wrap: wrap; }
.btnSecondary{
  cursor:pointer;
  font-weight: 900;
  padding: 10px 12px;
  border-radius: 999px;
  border: 1px solid rgba(37,99,235,0.16);
  background: rgba(255,255,255,0.75);
  color: #0B2E5E;
}
.btnSecondary:hover{ background: rgba(255,255,255,0.92); }

/* Main */
.main{
  max-width: 1180px;
  margin: 0 auto;
  padding: 18px 18px 60px;
}
.sectionTitleWrap{ text-align: center; margin-top: 8px; }
.sectionTitle{
  margin: 0;
  font-size: 28px;
  font-weight: 950;
  letter-spacing: -0.6px;
  color: #061A33;
}
.sectionSub{
  margin: 10px auto 0;
  max-width: 820px;
  color: #2A445F;
  line-height: 1.45;
}

.grid{
  margin-top: 16px;
  display:grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}
.founderCard{
  cursor:pointer;
  border: 1px solid rgba(37,99,235,0.14);
  border-radius: var(--radius);
  background: var(--card);
  box-shadow: var(--shadow2);
  padding: 0;
  overflow:hidden;
  text-align:left;
  transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
}
.founderCard:hover{
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}
.founderCard.active{
  border-color: rgba(37,99,235,0.32);
  box-shadow: 0 26px 70px rgba(37,99,235,0.22);
}
.founderTop{
  height: 56px;
  background: linear-gradient(135deg, rgba(37,99,235,0.22), rgba(56,189,248,0.18));
  display:flex;
  align-items:flex-end;
  padding: 12px;
}
.founderCat{
  font-size: 12px;
  font-weight: 950;
  color: #0B2E5E;
  background: rgba(255,255,255,0.75);
  border: 1px solid rgba(37,99,235,0.14);
  padding: 6px 10px;
  border-radius: 999px;
}
.founderBody{ padding: 14px; }
.founderName{ font-weight: 950; letter-spacing: -0.2px; color: #061A33; }
.founderCompany{ margin-top: 3px; font-size: 13px; color: #3C5874; font-weight: 800; }
.founderOneLiner{ margin-top: 10px; font-weight: 900; color: #0B2E5E; }
.founderShort{ margin-top: 8px; font-size: 13px; color: #2A445F; line-height: 1.35; }
.cardActions{
  margin-top: 12px;
  display:flex;
  align-items:center;
  justify-content: space-between;
  color: #0B2E5E;
}
.selectState{ font-weight: 950; }
.arrow{ font-weight: 950; }

.plan{
  margin-top: 18px;
  border: 1px solid rgba(37,99,235,0.14);
  border-radius: 22px;
  background: rgba(255,255,255,0.78);
  box-shadow: var(--shadow);
  padding: 16px;
}
.planHeader{
  display:flex;
  justify-content: space-between;
  align-items:flex-start;
  gap: 12px;
}
.planHeadline{
  font-size: 20px;
  font-weight: 950;
  letter-spacing: -0.3px;
  color: #061A33;
}
.accent{ color: #2563EB; }
.planDesc{
  margin-top: 10px;
  color: #2A445F;
  line-height: 1.5;
  max-width: 820px;
}
.planGrid{
  margin-top: 14px;
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.planCard{
  border: 1px solid rgba(37,99,235,0.12);
  border-radius: 18px;
  background: white;
  padding: 14px;
}
.planCardTitle{ font-weight: 950; color: #061A33; }
.planText{ margin-top: 10px; color: #2A445F; line-height: 1.5; }
.planButtons{ margin-top: 12px; display:flex; gap: 10px; flex-wrap: wrap; }

.list{ list-style: none; padding: 0; margin: 12px 0 0; display:grid; gap: 10px; }
.li{ display:flex; gap: 10px; align-items:flex-start; color: #18324A; line-height: 1.35; }
.check{
  width: 22px; height: 22px;
  display:flex; align-items:center; justify-content:center;
  border-radius: 10px;
  font-weight: 950;
  background: rgba(37,99,235,0.12);
  border: 1px solid rgba(37,99,235,0.18);
  color: #0B2E5E;
  flex: 0 0 auto;
}

.footer{ margin-top: 18px; text-align: center; }
.footerLine{ height: 1px; background: rgba(37,99,235,0.12); margin: 18px 0 12px; }
.footerText{ color: #3C5874; font-weight: 800; font-size: 12px; }

/* Modal */
.modalOverlay{
  position: fixed;
  inset: 0;
  background: rgba(7,22,47,0.45);
  display:flex;
  align-items:center;
  justify-content:center;
  padding: 18px;
  z-index: 100;
}
.modal{
  width: min(900px, 100%);
  background: white;
  border-radius: 22px;
  border: 1px solid rgba(37,99,235,0.18);
  box-shadow: 0 30px 90px rgba(7,22,47,0.30);
  overflow:hidden;
}
.modalTop{
  padding: 14px 16px;
  display:flex;
  align-items:flex-start;
  justify-content: space-between;
  gap: 10px;
  background: linear-gradient(135deg, rgba(37,99,235,0.12), rgba(56,189,248,0.10));
  border-bottom: 1px solid rgba(37,99,235,0.12);
}
.modalTitle{ font-weight: 950; font-size: 18px; color: #061A33; }
.modalSub{ margin-top: 3px; color: #3C5874; font-weight: 800; font-size: 12px; }
.modalClose{
  cursor:pointer;
  border: 1px solid rgba(37,99,235,0.18);
  background: rgba(255,255,255,0.75);
  border-radius: 12px;
  padding: 8px 10px;
  font-weight: 950;
  color: #0B2E5E;
}
.modalBody{ padding: 14px 16px 18px; }
.modalSectionTitle{ font-weight: 950; color: #061A33; }
.modalText{ margin-top: 8px; color: #2A445F; line-height: 1.55; }
.pillRow{ display:flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
.pillLite{
  font-size: 12px;
  font-weight: 900;
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid rgba(37,99,235,0.16);
  background: rgba(37,99,235,0.06);
  color: #0B2E5E;
}
.modalHint{
  margin-top: 14px;
  font-size: 12px;
  color: #3C5874;
  font-weight: 800;
}

/* Responsive */
@media (max-width: 980px){
  .grid{ grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .heroExamples{ grid-template-columns: 1fr; }
  .heroControls{ grid-template-columns: 1fr; }
}
@media (max-width: 560px){
  .grid{ grid-template-columns: 1fr; }
  .planGrid{ grid-template-columns: 1fr; }
  .heroTitle{ font-size: 34px; }
  .searchWrap{ min-width: 0; width: 100%; }
}
`;

