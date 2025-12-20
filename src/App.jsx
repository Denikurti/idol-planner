import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * IMPORTANT:
 * - This uses a curated local timeline dataset (reliable, fast, no scraping).
 * - Age slider is step=5 so it jumps: 15,20,25,30,35,40 etc.
 * - If a founder has no exact milestone for that age, we fall back to a generic plan.
 *
 * Later (optional): You can replace timelines by loading /data/founders.json or calling a Netlify function.
 */

const AGE_MIN = 15;
const AGE_MAX = 40;
const AGE_STEP = 5;

const FOUNDERS = [
  // ======== Tech / Internet ========
  {
    id: "zuck",
    name: "Mark Zuckerberg",
    company: "Facebook (Meta)",
    tag: "Product + speed",
    summary: "Build relentlessly, ship fast, learn distribution and retention.",
    timeline: {
      15: "Coding daily, building small tools, learning fast by doing.",
      20: "Building and experimenting at Harvard; shipping prototypes and social products.",
      25: "Scaling Facebook aggressively: growth, product iterations, and platform expansion.",
      30: "Turning Facebook into Meta-era scale: acquisitions, monetization, infrastructure.",
      35: "Battling platform governance: trust, safety, and massive-scale systems.",
      40: "Running a global platform with long-term bets: AI, AR/VR, and ecosystems."
    }
  },
  {
    id: "musk",
    name: "Elon Musk",
    company: "Zip2 / later Tesla & SpaceX",
    tag: "First principles",
    summary: "Hard problems, physics thinking, execution under pressure.",
    timeline: {
      15: "Obsessed with computers; learning by building programs and reading aggressively.",
      20: "Grinding skills and ambition: learning, coding, building leverage and direction.",
      25: "Early company-building phase: learning how startups actually work (ops + survival).",
      30: "Taking bigger bets: pushing into difficult engineering + scaling teams.",
      35: "Operating multiple high-stakes companies: speed + risk tolerance + execution.",
      40: "Compounding leverage: capital + teams + infrastructure + moonshot projects."
    }
  },
  {
    id: "ek",
    name: "Daniel Ek",
    company: "Spotify",
    tag: "Distribution",
    summary: "Early coding + business sense; win through product + partnerships.",
    timeline: {
      15: "Building websites and hustling early as a teen coder.",
      20: "Working in tech roles + building experience; learning how the industry works.",
      25: "Spotify era: building a legal streaming product and pushing distribution deals.",
      30: "Scaling Spotify globally: product, partnerships, and monetization.",
      35: "Leading a dominant platform while navigating creator economics and competition.",
      40: "Operator + investor: extending into new domains while maintaining control."
    }
  },
  {
    id: "jobs",
    name: "Steve Jobs",
    company: "Apple",
    tag: "Taste + sales",
    summary: "Taste, persuasion, focus, and relentless product clarity.",
    timeline: {
      15: "Curious tinkering, electronics exposure, building taste and ambition.",
      20: "Wandering + learning + absorbing ideas; building identity and conviction.",
      25: "Apple era: packaging tech into a story and product people buy.",
      30: "Pushing for product focus and strong teams, competing in a brutal market.",
      35: "NeXT/Pixar-era lessons: products, teams, and strategic patience.",
      40: "Returning/leading: re-focusing product lines and rebuilding execution."
    }
  },
  {
    id: "gates",
    name: "Bill Gates",
    company: "Microsoft",
    tag: "Depth",
    summary: "Deep technical competence + platform strategy + focus.",
    timeline: {
      15: "Programming constantly; building serious skill depth early.",
      20: "Early Microsoft phase: writing software, learning platforms, shipping real value.",
      25: "Scaling Microsoft: turning software into the default platform.",
      30: "Winning platform wars: OS + developer ecosystem + distribution.",
      35: "Leading a global software empire: strategy + execution + scale.",
      40: "Dominating enterprise + consumer software; long-term platform thinking."
    }
  },
  {
    id: "bezos",
    name: "Jeff Bezos",
    company: "Amazon",
    tag: "Customer obsession",
    summary: "Long-term thinking, systems, and compounding advantage.",
    timeline: {
      15: "Building curiosity + problem-solving habits; learning how systems work.",
      20: "Education + early career: learning rigorous thinking and technical fundamentals.",
      25: "Early career growth: learning high standards, leverage, and execution.",
      30: "Amazon launch era: obsessing over customer value and operational excellence.",
      35: "Scaling Amazon: logistics, growth loops, and relentless optimization.",
      40: "Building an empire: platform expansion and infrastructure advantages."
    }
  },

  // ======== Modern builders / AI / Infra ========
  {
    id: "altman",
    name: "Sam Altman",
    company: "YC / OpenAI",
    tag: "Leverage",
    summary: "Leverage through networks, systems, capital, and compounding tools.",
    timeline: {
      15: "Learning fast, building projects, forming taste and ambition.",
      20: "Early operator mindset: building, networking, learning startup mechanics.",
      25: "Scaling leverage: teams + capital + distribution; accelerating execution.",
      30: "Operating at ecosystem level: founders, funding, long-term bets.",
      35: "Compounding with AI: pushing frontier products and strategy.",
      40: "Long-term institution building: infrastructure + policy + global scale."
    }
  },
  {
    id: "huang",
    name: "Jensen Huang",
    company: "NVIDIA",
    tag: "Hard tech",
    summary: "Deep tech + platform strategy + relentless execution.",
    timeline: {
      15: "Building fundamentals: math, physics, systems thinking.",
      20: "Training as an engineer: learning how real systems are built.",
      25: "Early career: execution discipline, learning what matters in hardware/software.",
      30: "Building NVIDIA: platform decisions + execution + long-term vision.",
      35: "Scaling a hardware platform: ecosystems, developers, performance.",
      40: "Compounding advantage: platform dominance through relentless iteration."
    }
  },
  {
    id: "collison",
    name: "Patrick Collison",
    company: "Stripe",
    tag: "Craft",
    summary: "Developer experience, craft, and precision execution.",
    timeline: {
      15: "Already building and winning competitions: strong early engineering output.",
      20: "Building companies and learning real execution under pressure.",
      25: "Stripe scaling: dev experience + infrastructure reliability + growth.",
      30: "Global payments platform: expansion, reliability, and ecosystem strategy.",
      35: "Operating at scale: long-term bets, platform expansion, high standards.",
      40: "Institution-building mindset: compounding through research and ecosystem work."
    }
  },
  {
    id: "collison2",
    name: "John Collison",
    company: "Stripe",
    tag: "Speed",
    summary: "Fast iteration with high standards.",
    timeline: {
      15: "High-output building and learning; compounding skills early.",
      20: "Stripe early days: shipping fast, learning product-market fit and dev needs.",
      25: "Scaling a payments API: reliability + performance + growth.",
      30: "Platform expansion: global compliance + product breadth.",
      35: "Operating at scale: execution systems and leverage through teams.",
      40: "Long-term strategy: compounding platform advantages."
    }
  },
  {
    id: "karpathy",
    name: "Andrej Karpathy",
    company: "AI Research",
    tag: "Depth",
    summary: "Deep ML competence + clear thinking + building systems.",
    timeline: {
      15: "Build fundamentals: math, coding, and obsession-level practice.",
      20: "Training phase: shipping projects + learning theory with practical systems.",
      25: "Serious ML era: research output + engineering discipline.",
      30: "Scaling AI systems: building production-grade ML and teaching clearly.",
      35: "Frontier work: leveraging deep understanding for real systems impact.",
      40: "Institution-level impact: shaping how people build and understand AI."
    }
  },

  // ======== Consumer / Social / Media ========
  {
    id: "systrom",
    name: "Kevin Systrom",
    company: "Instagram",
    tag: "Product taste",
    summary: "Simple product, sharp aesthetic, viral distribution loops.",
    timeline: {
      15: "Building interest and skill: learn by making small products.",
      20: "Skill building + early career: taste, product intuition, and craft.",
      25: "Building and iterating fast: learning what makes products spread.",
      30: "Instagram era: focus on simplicity + sharing + retention.",
      35: "Scaling platform: community + product integrity under massive growth.",
      40: "Operator/investor mindset: applying product taste across ventures."
    }
  },
  {
    id: "koum",
    name: "Jan Koum",
    company: "WhatsApp",
    tag: "Simplicity",
    summary: "Minimalism, reliability, and relentless focus on core utility.",
    timeline: {
      15: "Learning survival + self-teaching skills; building grit.",
      20: "Grinding technical competence: learning systems and reliability.",
      25: "Early career strength-building: expertise + discipline.",
      30: "WhatsApp building phase: simplicity, reliability, privacy.",
      35: "Scaling: massive growth with minimal bloat.",
      40: "Platform stewardship: maintaining simplicity under huge pressure."
    }
  },

  // ======== Hardware / makers ========
  {
    id: "luckey",
    name: "Palmer Luckey",
    company: "Oculus / Anduril",
    tag: "Build prototypes",
    summary: "Prototype fast, iterate hardware, prove it works.",
    timeline: {
      15: "Building hardware prototypes and learning by hacking systems together.",
      20: "Shipping prototypes that work; proving the core experience is real.",
      25: "Scaling vision into companies: teams, funding, and execution systems.",
      30: "Building serious defense-grade systems: hardware + software integration.",
      35: "Compounding execution: productization, platforms, and operations.",
      40: "Institution scale: building ecosystems and long-term engineering leverage."
    }
  },
  {
    id: "wozniak",
    name: "Steve Wozniak",
    company: "Apple",
    tag: "Engineering",
    summary: "Pure engineering mastery and love for building the thing.",
    timeline: {
      15: "Electronics obsession: building circuits and learning fundamentals.",
      20: "Engineering skill compounding: making real devices and systems.",
      25: "Apple era: building elegant machines with constraints and ingenuity.",
      30: "Scaling impact: engineering identity + practical invention.",
      35: "Staying close to engineering craft and real building.",
      40: "Mentorship and continuing exploration of tech and systems."
    }
  },

  // ======== Business / strategy ========
  {
    id: "ma",
    name: "Jack Ma",
    company: "Alibaba",
    tag: "Sales",
    summary: "Sales, persuasion, and networks as distribution.",
    timeline: {
      15: "Learning communication and building resilience.",
      20: "Grinding skills: language, persuasion, leadership, persistence.",
      25: "Learning business mechanics and positioning.",
      30: "Alibaba era: sales + partnerships + distribution through relationships.",
      35: "Scaling an ecosystem: platform strategy and execution.",
      40: "Institution scale: leadership, strategy, and long-term advantage."
    }
  },
  {
    id: "reed",
    name: "Reed Hastings",
    company: "Netflix",
    tag: "Strategy",
    summary: "Business model shifts + discipline + long-term competition.",
    timeline: {
      15: "Building curiosity and discipline; learning how to learn.",
      20: "Education and skill-building; becoming a sharp thinker.",
      25: "Early career: building execution ability and clarity.",
      30: "Netflix era: building a model that can evolve.",
      35: "Pivot mindset: adapting with technology and user behavior shifts.",
      40: "Scaling globally: strategy, content economics, and systems."
    }
  },

  // ======== YC / startup philosophy ========
  {
    id: "pg",
    name: "Paul Graham",
    company: "Y Combinator",
    tag: "Make something people want",
    summary: "Build → talk to users → iterate. Avoid delusion.",
    timeline: {
      15: "Practice writing and building; clarity is a skill.",
      20: "Learn to think clearly and build small things with feedback.",
      25: "Build in public: projects, essays, and experiments.",
      30: "Operator mindset: user needs and iteration loops.",
      35: "Ecosystem building: helping others ship and learn faster.",
      40: "Long-term influence: ideas + systems + compounding culture."
    }
  },
  {
    id: "hoffman",
    name: "Reid Hoffman",
    company: "LinkedIn",
    tag: "Network effects",
    summary: "Distribution, networks, and compounding advantage.",
    timeline: {
      15: "Build communication skills and curiosity.",
      20: "Learn social dynamics + business fundamentals.",
      25: "Career leverage: relationships and strategic positioning.",
      30: "LinkedIn-era thinking: network effects and platform scaling.",
      35: "Operating platforms: distribution and ecosystem advantage.",
      40: "Investor/operator leverage: shaping outcomes through networks."
    }
  },
  {
    id: "thiel",
    name: "Peter Thiel",
    company: "PayPal",
    tag: "Contrarian",
    summary: "Find secrets, build differentiation, create a wedge.",
    timeline: {
      15: "Train thinking: logic, debate, and reading hard stuff.",
      20: "Develop contrarian clarity: learn to reason independently.",
      25: "Build differentiated products: focus on a wedge you can own.",
      30: "Scale a monopoly-like advantage: differentiation + distribution.",
      35: "Capital + strategy leverage: making big bets with conviction.",
      40: "Institution-level influence: ideas + money + networks."
    }
  }
];

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

/**
 * Given a founder + age (step of 5), returns:
 * - what they were doing at that age (timeline)
 * - plus a "plan" that adapts to the age band
 */
function getFounderAtAge(founder, age) {
  const doing = founder.timeline?.[age] ?? null;
  const plan = pickPlan(founder, age);
  return { doing, plan };
}

function pickPlan(founder, age) {
  // Age bands based on 5-year steps
  const focus = [];
  const actions = [];

  if (age <= 20) {
    focus.push("Skills", "Output", "Feedback loops");
    actions.push("Ship 1 small project every week (public).");
    actions.push("Daily fundamentals: CS + math + systems.");
    actions.push("Write 5 bullets: what you built + what broke + what you learned.");
  } else if (age <= 30) {
    focus.push("Depth", "Distribution", "Consistency");
    actions.push("Ship 1 serious project/month (real users or real data).");
    actions.push("Talk to users weekly; turn feedback into tickets.");
    actions.push("Build a repeatable pipeline: build → deploy → measure.");
  } else {
    focus.push("Leverage", "Reliability", "Moat");
    actions.push("Automate your workflow; remove manual steps.");
    actions.push("Raise standards: reliability, UX, ops, security.");
    actions.push("Own a wedge: one feature/system you do best.");
  }

  const founderAngle =
    founder.tag.includes("Distribution")
      ? "Prioritize growth loops + retention."
      : founder.tag.includes("First principles")
      ? "Train first-principles breakdowns weekly."
      : founder.tag.includes("Hard tech")
      ? "Prove competence with hard technical builds."
      : founder.tag.includes("UX") || founder.tag.includes("Craft")
      ? "Polish UX and developer experience."
      : founder.tag.includes("Sales")
      ? "Practice sales weekly: outreach, negotiation, closing."
      : "Increase output and tighten feedback loops.";

  return { focus, actions, founderAngle };
}

export default function App() {
  const [age, setAge] = useState(22); // will be snapped to 5-year steps below
  const [selectedId, setSelectedId] = useState(FOUNDERS[0].id);

  const founders = useMemo(() => FOUNDERS, []);
  const selectedFounder = useMemo(
    () => founders.find((f) => f.id === selectedId) ?? founders[0],
    [founders, selectedId]
  );

  // Snap age to nearest 5-year step (so even if you change code later, it stays clean)
  useEffect(() => {
    const snapped = snapToStep(age, AGE_MIN, AGE_MAX, AGE_STEP);
    if (snapped !== age) setAge(snapped);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { doing, plan } = useMemo(
    () => getFounderAtAge(selectedFounder, age),
    [selectedFounder, age]
  );

  // Carousel state
  const [page, setPage] = useState(0);
  const wrapRef = useRef(null);

  const cardsPerView = useCardsPerView();
  const totalPages = Math.max(1, Math.ceil(founders.length / cardsPerView));

  useEffect(() => {
    setPage((p) => clamp(p, 0, totalPages - 1));
  }, [cardsPerView, totalPages]);

  // Keyboard navigation
  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowLeft") setPage((p) => clamp(p - 1, 0, totalPages - 1));
      if (e.key === "ArrowRight") setPage((p) => clamp(p + 1, 0, totalPages - 1));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [totalPages]);

  // Swipe (mobile)
  useSwipe(wrapRef, {
    onSwipeLeft: () => setPage((p) => clamp(p + 1, 0, totalPages - 1)),
    onSwipeRight: () => setPage((p) => clamp(p - 1, 0, totalPages - 1))
  });

  const pages = useMemo(() => chunk(founders, cardsPerView), [founders, cardsPerView]);
  const offsetPct = page * 100;

  return (
    <div className="container">
      {/* Top Bar */}
      <div className="topbar">
        <div className="brand">
          <div className="logo" />
          <div className="brandText">
            <div className="kicker">IDOL PLANNER</div>
            <div className="title">Founders at Your Age</div>
          </div>
        </div>

        <div className="pill">
          <span>Selected:</span>
          <strong>{selectedFounder.name}</strong>
          <span style={{ opacity: 0.7 }}>•</span>
          <span>{selectedFounder.company}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="hero">
        <div className="heroCard">
          <div className="heroInner">
            <div>
              <h1 className="h1">What were top founders doing at your age?</h1>
              <p className="sub">
                Now it actually changes with age. Slide in 5-year jumps and see what each founder
                was focused on at that point, plus what YOU should do to match the trajectory.
              </p>

              <div className="badges">
                <div className="badge">
                  <span className="dot" /> 5-year age steps only
                </div>
                <div className="badge">
                  <span className="dot" /> Founder timelines per age
                </div>
                <div className="badge">
                  <span className="dot" /> Cards update live
                </div>
              </div>
            </div>

            <div className="sidePanel">
              <p className="sideTitle">Your settings</p>

              <div className="rangeRow">
                <div className="rangeLabel">
                  <span>Your age</span>
                  <strong>{age} years</strong>
                </div>

                <input
                  type="range"
                  min={AGE_MIN}
                  max={AGE_MAX}
                  step={AGE_STEP}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                />

                <div className="rangeLabel">
                  <span style={{ opacity: 0.9 }}>Tip</span>
                  <span style={{ opacity: 0.75 }}>Use ← → to slide</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel */}
      <div className="sectionHeader">
        <h2>Founders library</h2>
        <p>{founders.length} profiles • {cardsPerView} per view</p>
      </div>

      <div className="carousel" ref={wrapRef}>
        <div className="carouselTop">
          <div className="carouselMeta">
            <span className="kbd">←</span>
            <span className="kbd">→</span>
            <span style={{ opacity: 0.85 }}>
              Page <strong style={{ color: "rgba(255,255,255,0.92)" }}>{page + 1}</strong> / {totalPages}
            </span>
          </div>
          <div className="controls">
            <button className="btn secondary" onClick={() => setPage(0)}>First</button>
            <button className="btn" onClick={() => setPage((p) => clamp(p - 1, 0, totalPages - 1))}>Prev</button>
            <button className="btn" onClick={() => setPage((p) => clamp(p + 1, 0, totalPages - 1))}>Next</button>
            <button className="btn secondary" onClick={() => setPage(totalPages - 1)}>Last</button>
          </div>
        </div>

        <div className="trackWrap">
          <div
            className="track"
            style={{ transform: `translateX(-${offsetPct}%)` }}
          >
            {pages.map((group, idx) => (
              <React.Fragment key={idx}>
                {group.map((f) => {
                  const doingAtAge = f.timeline?.[age] ?? `At ${age}, focus on: ${f.summary}`;
                  const isSelected = f.id === selectedId;

                  return (
                    <div
                      key={f.id}
                      className="card"
                      onClick={() => setSelectedId(f.id)}
                      style={{
                        outline: isSelected ? "2px solid rgba(96,165,250,0.55)" : "none",
                        background: isSelected ? "rgba(255,255,255,0.11)" : undefined
                      }}
                    >
                      <div className="cardTop">
                        <div className="avatar" />
                        <div className="cardTitle">
                          <strong>{f.name}</strong>
                          <span>{f.company}</span>
                        </div>
                      </div>

                      <div className="cardBody">
                        <strong style={{ color: "rgba(255,255,255,0.9)" }}>At {age}:</strong>{" "}
                        {doingAtAge}
                      </div>

                      <div className="cardFooter">
                        <span className="tag">{f.tag}</span>
                        <span>Tap to select →</span>
                      </div>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="dots">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`dotBtn ${i === page ? "active" : ""}`}
              onClick={() => setPage(i)}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Plan */}
      <div className="plan">
        <h3>
          At {age}, what was{" "}
          <span style={{ color: "rgba(96,165,250,0.95)" }}>{selectedFounder.name}</span>{" "}
          doing?
        </h3>

        <p>
          {doing ?? (
            <>
              No exact milestone stored for {age}. So here’s the correct fallback:
              <strong style={{ color: "rgba(255,255,255,0.92)" }}> focus on the pattern</strong>,
              not the trivia. {selectedFounder.summary}
            </>
          )}
        </p>

        <div className="grid2">
          <div className="mini">
            <h4>Focus pillars</h4>
            <ul>
              {plan.focus.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
          <div className="mini">
            <h4>Do this now (weekly)</h4>
            <ul>
              {plan.actions.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </div>
        </div>

        <div className="footerNote">
          Founder angle:{" "}
          <strong style={{ color: "rgba(255,255,255,0.92)" }}>{plan.founderAngle}</strong>
        </div>
      </div>
    </div>
  );
}

/** Helpers */

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function snapToStep(value, min, max, step) {
  const v = clamp(value, min, max);
  const snapped = Math.round((v - min) / step) * step + min;
  return clamp(snapped, min, max);
}

function useCardsPerView() {
  const [n, setN] = useState(() => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1200;
    if (w < 640) return 1;
    if (w < 980) return 2;
    return 3;
  });

  useEffect(() => {
    function onResize() {
      const w = window.innerWidth;
      setN(w < 640 ? 1 : w < 980 ? 2 : 3);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return n;
}

function useSwipe(ref, { onSwipeLeft, onSwipeRight }) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let active = false;

    function onTouchStart(e) {
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
      active = true;
    }

    function onTouchMove(e) {
      if (!active) return;
      const t = e.touches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      if (Math.abs(dy) > Math.abs(dx)) return;
      e.preventDefault?.();
    }

    function onTouchEnd(e) {
      if (!active) return;
      active = false;
      const t = e.changedTouches[0];
      const dx = t.clientX - startX;
      if (dx < -50) onSwipeLeft?.();
      if (dx > 50) onSwipeRight?.();
    }

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [ref, onSwipeLeft, onSwipeRight]);
}
