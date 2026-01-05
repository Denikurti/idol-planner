import React, { useMemo, useState } from "react";

export default function App() {
  // Images expected in: /public/images/<id>/<id>-<age>.png
  // Example: public/images/travis/travis-25.png -> src "/images/travis/travis-25.png"

  const founders = useMemo(
    () => [
      // -------------------- ZUCK --------------------
      {
        id: "zuck",
        name: "Mark Zuckerberg",
        company: "Facebook (Meta)",
        tagline: "Product + speed",
        coverImage: "/images/zuck/zuck-22.png",
        blurb:
          "Built fast, shipped constantly, obsessed over distribution + retention.",
        ages: [
          {
            age: 15,
            image: "/images/zuck/zuck-15.png",
            title: "Early builder mode",
            text: `At 15, Zuckerberg was already doing the only thing that matters: building and iterating. This is the phase where you build instinct — you learn by shipping, breaking stuff, and fixing it. Not reading about it. Not “planning.” He was messing with software, learning how people use products, and building the muscle of turning ideas into reality quickly.

The real lesson: when you're young, your advantage is speed + low risk. You can afford to look stupid. You can afford to ship ugly prototypes. Your job is to stack reps: build small systems, learn feedback loops, and get comfortable being wrong fast.`,
          },
          {
            age: 22,
            image: "/images/zuck/zuck-22.png",
            title: "Facebook is real",
            text: `At 22, Facebook wasn’t a fantasy — it was an operating machine. This is when your project stops being “a cool site” and becomes a system: user growth, uptime, abuse, scaling, hiring, and focus. The shift is brutal: you go from building features to building an organization that builds features.

The lesson: distribution beats perfection. If you can grow, retain, and expand, you can win even with an imperfect product. The best founders treat growth + product as one combined job.`,
          },
          {
            age: 25,
            image: "/images/zuck/zuck-25.png",
            title: "Scale + defense",
            text: `By 25, the game becomes competitive warfare. Copycats appear. Press attacks. Platform risk. Your job is to build a moat: network effects, ecosystem, and relentless execution speed.

The lesson: scaling isn’t just servers — it’s culture. Culture is the operating system of the company. If you don't intentionally shape it, it shapes itself into something weak.`,
          },
          {
            age: 30,
            image: "/images/zuck/zuck-30.png",
            title: "Platform + acquisitions",
            text: `Around 30, Zuckerberg’s focus was platform dominance: mobile shift, Instagram/WhatsApp era, keeping attention, buying threats, and building long-term control.

The lesson: big wins come from correctly calling platform transitions (desktop → mobile → AI). If you’re late, you die. If you’re early, you look crazy until you’re right.`,
          },
          {
            age: 40,
            image: "/images/zuck/zuck-40.png",
            title: "Reinvention attempts",
            text: `At 40, the challenge is reinvention under pressure. Regulation, public perception, and new paradigms. The mission becomes: can the company evolve without losing its core advantages?

The lesson: even giants can decay. Your job is to keep the company hungry, focused, and aligned on a clear strategy, not vanity projects.`,
          },
        ],
      },

      // -------------------- ELON --------------------
      {
        id: "elon",
        name: "Elon Musk",
        company: "Zip2 → PayPal → Tesla → SpaceX",
        tagline: "First principles",
        coverImage: "/images/elon/elon-25.png",
        blurb: "Physics mindset, extreme work ethic, bets on hard problems.",
        ages: [
          {
            age: 15,
            image: "/images/elon/elon-15.png",
            title: "Obsessive learning + coding",
            text: `At 15, Elon was stacking hardcore fundamentals: reading constantly, learning physics thinking, and coding. This phase is about building an unfair advantage in how you think — not just what you know.

Lesson: first-principles thinking is a skill. You learn it by repeatedly asking: what is true here? What are the constraints? What assumptions am I blindly copying?`,
          },
          {
            age: 25,
            image: "/images/elon/elon-25.png",
            title: "Zip2 grind",
            text: `In his mid-20s, Elon was deep in grind mode: building software, selling to businesses, pushing distribution, and living the founder life (sleeping near the office, extreme output).

Lesson: early-stage startups are not “balanced.” They are output wars. The founder’s job is to create momentum from nothing.`,
          },
          {
            age: 30,
            image: "/images/elon/elon-30.png",
            title: "PayPal era + capital",
            text: `Around 30, PayPal created leverage: capital, credibility, network. This is when you turn early success into the ability to attempt bigger problems.

Lesson: cash is not the goal — optionality is. Money buys time, talent, and bigger shots.`,
          },
          {
            age: 40,
            image: "/images/elon/elon-40.png",
            title: "Hard-tech scaling",
            text: `By 40, the game became building real-world machines at scale: rockets, factories, supply chains. That’s where most founders fail — because reality has no mercy.

Lesson: hard-tech requires systems engineering thinking: parts, processes, constraints, manufacturing, and iteration loops.`,
          },
        ],
      },

      // -------------------- GATES --------------------
      {
        id: "gates",
        name: "Bill Gates",
        company: "Microsoft",
        tagline: "Software mastery",
        coverImage: "/images/gates/gates-22.png",
        blurb: "Deep focus, technical edge, ruthless clarity on what matters.",
        ages: [
          {
            age: 15,
            image: "/images/gates/gates-15.png",
            title: "Programming obsession",
            text: `At 15, Gates was already deep in code. This is not talent — it’s obsession + reps. He didn’t “learn programming.” He lived it.

Lesson: if you want elite skill, you need intensity. Your competition is people who do this all day without motivation needed.`,
          },
          {
            age: 22,
            image: "/images/gates/gates-22.png",
            title: "Microsoft momentum",
            text: `At 22, Gates was focused on the core leverage point: software standards and distribution to manufacturers. He wasn’t building random apps — he was positioning Microsoft at the center.

Lesson: the biggest wins often come from owning the interface / platform, not being “a nice product.”`,
          },
          {
            age: 30,
            image: "/images/gates/gates-30.png",
            title: "Platform dominance",
            text: `Around 30, it’s about protecting dominance: partnerships, developer ecosystem, and relentless shipping.

Lesson: once you win, you must defend. Complacency is death.`,
          },
        ],
      },

      // -------------------- JOBS --------------------
      {
        id: "jobs",
        name: "Steve Jobs",
        company: "Apple",
        tagline: "Taste + storytelling",
        coverImage: "/images/jobs/jobs-22.png",
        blurb: "Taste, focus, and turning tech into a cultural product.",
        ages: [
          {
            age: 15,
            image: "/images/jobs/jobs-15.png",
            title: "Curiosity + craft",
            text: `At 15, Jobs was soaking up craft, electronics curiosity, and learning from builders around him.

Lesson: taste is built. You develop it by studying great work and being extremely picky about what “good” is.`,
          },
          {
            age: 22,
            image: "/images/jobs/jobs-22.png",
            title: "Early Apple era",
            text: `At 22, Jobs was in the mix of the early Apple story: merging technical work with product vision and selling the dream.

Lesson: great founders sell the future in a way people can feel — then they execute until it becomes real.`,
          },
          {
            age: 30,
            image: "/images/jobs/jobs-30.png",
            title: "Hard lessons",
            text: `Around 30, Jobs learned that leadership, politics, and execution maturity matter. Vision alone doesn’t run companies.

Lesson: if you can’t manage people and conflict, your company will outgrow you.`,
          },
        ],
      },

      // -------------------- BEZOS --------------------
      {
        id: "bezos",
        name: "Jeff Bezos",
        company: "Amazon",
        tagline: "Customer obsession",
        coverImage: "/images/bezos/bezos-30.png",
        blurb: "Long-term compounding, customer focus, ruthless logistics.",
        ages: [
          {
            age: 22,
            image: "/images/bezos/bezos-22.png",
            title: "Building competence",
            text: `At 22, Bezos was stacking competence: learning systems, learning business, learning the mechanics of execution.

Lesson: early years are about building the base. Competence compounds.`,
          },
          {
            age: 30,
            image: "/images/bezos/bezos-30.png",
            title: "Amazon is scaling",
            text: `Around 30, Amazon is becoming a machine: logistics, pricing, customer experience.

Lesson: “customer obsession” is not a quote — it’s operational discipline.`,
          },
          {
            age: 40,
            image: "/images/bezos/bezos-40.png",
            title: "Platform thinking",
            text: `At 40, the game is platform expansion: cloud, marketplace, infrastructure.

Lesson: build the tools others depend on. That’s power.`,
          },
        ],
      },

      // -------------------- LARRY PAGE --------------------
      {
        id: "larry",
        name: "Larry Page",
        company: "Google",
        tagline: "Algorithms + data",
        coverImage: "/images/larry/larry-25.png",
        blurb:
          "Information leverage, technical differentiation, scale by design.",
        ages: [
          {
            age: 22,
            image: "/images/larry/larry-22.png",
            title: "Research mindset",
            text: `At 22, Page is in deep technical problem territory: finding better ways to organize information.

Lesson: big companies often start as one strong technical insight executed hard.`,
          },
          {
            age: 25,
            image: "/images/larry/larry-25.png",
            title: "Google growth",
            text: `By 25, Google is becoming real: product traction + infrastructure scaling.

Lesson: when you have product-market fit, you must scale without breaking quality.`,
          },
          {
            age: 35,
            image: "/images/larry/larry-35.png",
            title: "Moonshots mindset",
            text: `At 35, Page pushes moonshots and long-term bets.

Lesson: after you win, allocate some resources to asymmetric upside projects.`,
          },
        ],
      },

      // -------------------- DANIEL EK --------------------
      {
        id: "ek",
        name: "Daniel Ek",
        company: "Spotify",
        tagline: "Distribution",
        coverImage: "/images/ek/ek-30.png",
        blurb:
          "Licensing + product + growth — fighting in a tough industry.",
        ages: [
          {
            age: 22,
            image: "/images/ek/ek-22.png",
            title: "Early hustle",
            text: `At 22, Ek is in the high-output hustle phase: building skills, building credibility, learning the market.

Lesson: people underestimate how much “early hustle” decides the next decade.`,
          },
          {
            age: 30,
            image: "/images/ek/ek-30.png",
            title: "Spotify scaling",
            text: `Around 30, Spotify is fighting major forces: licensing, labels, platform shifts.

Lesson: in regulated or complex industries, you need negotiation + product excellence.`,
          },
        ],
      },

      // -------------------- NEW: TRAVIS KALANICK --------------------
      {
        id: "travis",
        name: "Travis Kalanick",
        company: "Uber",
        tagline: "Relentless execution",
        coverImage: "/images/travis/travis-25.png",
        blurb:
          "Aggressive operator mindset: move fast, break inertia, win the city-by-city war.",
        ages: [
          {
            age: 15,
            image: "/images/travis/travis-15.png",
            title: "Young builder instincts",
            text: `At 15, the value isn't “what company you run” — it’s whether you're becoming dangerous: learning how systems work, building technical confidence, and developing the habit of shipping things instead of consuming content.

For Travis-style founders, this is where traits form: intensity, competitiveness, comfort with uncertainty. You learn how to argue for your idea, persuade friends to join, test something small, and keep going after embarrassment.

Lesson: you don’t need a perfect plan — you need reps. Your job is to build the identity: “I ship.”`,
          },
          {
            age: 25,
            image: "/images/travis/travis-25.png",
            title: "Operator mode: turning chaos into momentum",
            text: `At 25, the main skill is not “having ideas.” It’s operating. This is the age where a future operator-founder learns the real game: execution beats intelligence if you can outwork and out-iterate.

The Uber-style lesson: markets aren’t won by nice features. They’re won by distribution, incentives, and relentless local execution. You win city-by-city. You build playbooks. You recruit supply. You fix onboarding. You improve conversion. You get to repeatable growth.

Lesson: momentum is the currency of startups. If you can create it and keep it, you can beat better-funded competitors.`,
          },
          {
            age: 35,
            image: "/images/travis/travis-35.png",
            title: "Scaling a machine + dealing with backlash",
            text: `At 35, hypergrowth creates enemies — regulators, competitors, press. The company becomes political. You can’t just “build,” you must manage second-order effects.

This stage forces a truth: leadership maturity matters. Culture matters. Governance matters. If you don’t manage risk, risk manages you.

Lesson: you can win the market and still lose the company if you ignore culture, ethics, and leadership discipline.`,
          },
          {
            age: 45,
            image: "/images/travis/travis-45.png",
            title: "Rebuilding + pattern recognition",
            text: `At 45, the most valuable asset isn’t the brand name — it’s pattern recognition. You’ve seen the traps: ego, sloppy culture, uncontrolled risk, PR disasters, leadership bottlenecks.

Lesson: evolve. Keep the aggression for execution, but build real systems for trust, culture, and long-term stability.`,
          },
        ],
      },

      // -------------------- NEW: RICHARD BRANSON --------------------
      {
        id: "richard",
        name: "Richard Branson",
        company: "Virgin",
        tagline: "Brand + deals",
        coverImage: "/images/richard/richard-25.png",
        blurb:
          "Charismatic entrepreneur: brand storytelling, partnerships, bold bets, and learning by doing.",
        ages: [
          {
            age: 15,
            image: "/images/richard/richard-15.png",
            title: "Confidence + selling energy",
            text: `At 15, Branson-style founders build a different superpower: selling. Not in a scam way — in a human way. You learn how to get attention, pitch, and make people believe in the story.

You also realize you don’t need permission. You can start small businesses, make deals, and learn by being in the arena.

Lesson: confidence compounds. If you get comfortable reaching out, pitching, and negotiating early, you become unstoppable later.`,
          },
          {
            age: 25,
            image: "/images/richard/richard-25.png",
            title: "Brand building + leverage via partnerships",
            text: `At 25, Branson’s edge isn’t deep engineering — it’s brand + deal-making. He understands attention, storytelling, and how to partner to create leverage.

There are multiple founder archetypes. Some win via engineering. Some via distribution. Branson wins via brand and bold moves.

Lesson: you don’t have to be the most technical person to build big things — but you must be elite at something. For Branson: marketing, risk-taking, and recruiting strong operators.`,
          },
          {
            age: 35,
            image: "/images/richard/richard-35.png",
            title: "Bigger bets, bigger risk management",
            text: `At 35, the company becomes a portfolio. You place bets across industries using brand as the bridge — but you must manage risk and keep the core strong.

Lesson: expansion is dangerous. Don’t expand because it’s exciting — expand because you have a repeatable advantage you can transfer.`,
          },
          {
            age: 45,
            image: "/images/richard/richard-45.png",
            title: "Legacy + long-term positioning",
            text: `At 45, the challenge is staying relevant while scaling reputation and long-term value. You’re managing brand, leadership succession, and public narrative.

Lesson: at scale, trust is an asset. Reputation can open doors that money can’t. Protect it.`,
          },
        ],
      },
    ],
    []
  );

  // -------------------- STATE --------------------
  const [selectedFounderId, setSelectedFounderId] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);

  const selectedFounder =
    founders.find((f) => f.id === selectedFounderId) || null;

  const openFounder = (id) => {
    const f = founders.find((x) => x.id === id);
    setSelectedFounderId(id);
    setSelectedAge(f?.ages?.[0]?.age ?? null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goHome = () => {
    setSelectedFounderId(null);
    setSelectedAge(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectedAgeObj =
    selectedFounder?.ages?.find((a) => a.age === selectedAge) ||
    selectedFounder?.ages?.[0] ||
    null;

  // -------------------- UI --------------------
  return (
    <div className="app">
      <style>{css}</style>

      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand" onClick={goHome} role="button" tabIndex={0}>
            <div className="brand-kicker">IDOL PLANNER</div>
            <div className="brand-title">Idols at a Young Age</div>
            <div className="brand-sub">
              Pick a founder. Learn what they were doing at key ages — then
              steal the pattern.
            </div>
          </div>

          {selectedFounder ? (
            <button className="btn btn-ghost" onClick={goHome}>
              ← Back to founders
            </button>
          ) : (
            <div className="pill">
              <span className="pill-dot" />
              Enabled now: {founders.map((f) => f.name).join(", ")}
            </div>
          )}
        </div>
      </header>

      <main className="main">
        {!selectedFounder && (
          <>
            <div className="actions">
              <button
                className="btn btn-primary"
                onClick={() => openFounder(founders[0].id)}
              >
                Choose a founder
              </button>
              <div className="hint">
                Tip: If an image doesn’t show, it’s almost always the file path
                or filename mismatch.
              </div>
            </div>

            <div className="grid">
              {founders.map((f) => (
                <div className="card" key={f.id}>
                  <div className="card-row">
                    <div className="card-left">
                      <div className="card-name">{f.name}</div>
                      <div className="card-company">{f.company}</div>
                    </div>

                    <div className="avatar">
                      <img
                        src={f.coverImage}
                        alt={`${f.name} cover`}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  </div>

                  <div className="card-row card-row-bottom">
                    <div className="tag">{f.tagline}</div>
                    <button
                      className="btn btn-small"
                      onClick={() => openFounder(f.id)}
                    >
                      Open →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="footer-note">
              Your job: don’t just read these. Extract patterns, then copy the
              pattern into your week.
            </div>
          </>
        )}

        {selectedFounder && (
          <div className="founder-page">
            <div className="founder-hero">
              <div className="founder-hero-left">
                <div className="founder-name">{selectedFounder.name}</div>
                <div className="founder-meta">
                  <span className="meta-chip">{selectedFounder.company}</span>
                  <span className="meta-chip meta-chip-strong">
                    {selectedFounder.tagline}
                  </span>
                </div>
                <div className="founder-blurb">{selectedFounder.blurb}</div>
              </div>

              <div className="founder-hero-right">
                <div className="hero-image">
                  <img
                    src={selectedFounder.coverImage}
                    alt={`${selectedFounder.name} cover`}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="timeline">
              <div className="timeline-title">Pick an age</div>
              <div className="age-row">
                {selectedFounder.ages.map((a) => (
                  <button
                    key={a.age}
                    className={`age-btn ${
                      a.age === selectedAge ? "age-btn-active" : ""
                    }`}
                    onClick={() => setSelectedAge(a.age)}
                  >
                    {a.age}
                  </button>
                ))}
              </div>
            </div>

            {selectedAgeObj && (
              <div className="detail">
                <div className="detail-left">
                  <div className="detail-image">
                    <img
                      src={selectedAgeObj.image}
                      alt={`${selectedFounder.name} at ${selectedAgeObj.age}`}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                </div>

                <div className="detail-right">
                  <div className="detail-age">Age {selectedAgeObj.age}</div>
                  <div className="detail-title">{selectedAgeObj.title}</div>
                  <div className="detail-text">{selectedAgeObj.text}</div>

                  <div className="detail-actions">
                    <button className="btn btn-ghost" onClick={goHome}>
                      ← Back to founders
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        const idx = selectedFounder.ages.findIndex(
                          (x) => x.age === selectedAgeObj.age
                        );
                        const next = selectedFounder.ages[idx + 1];
                        if (next) setSelectedAge(next.age);
                      }}
                    >
                      Next age →
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="mini-note">
              Pattern extraction: write 3 bullets — (1) skill built, (2) leverage
              used, (3) risk taken. Then plan your week.
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const css = `
  :root{
    --bg1:#070A12;
    --bg2:#0B1230;
    --stroke:rgba(255,255,255,.10);
    --text:rgba(255,255,255,.92);
    --muted:rgba(255,255,255,.65);
    --muted2:rgba(255,255,255,.48);
    --shadow: 0 24px 70px rgba(0,0,0,.45);
    --shadow2: 0 14px 38px rgba(0,0,0,.35);
  }

  *{ box-sizing:border-box; }
  body{ margin:0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; }

  .app{
    min-height:100vh;
    color:var(--text);
    background:
      radial-gradient(900px 500px at 10% 12%, rgba(70,120,255,.40), transparent 60%),
      radial-gradient(900px 520px at 80% 28%, rgba(180,100,255,.30), transparent 65%),
      radial-gradient(1100px 700px at 50% 110%, rgba(40,220,255,.12), transparent 60%),
      linear-gradient(180deg, var(--bg1), var(--bg2));
  }

  .topbar{
    position:sticky;
    top:0;
    z-index:50;
    backdrop-filter: blur(14px);
    background: linear-gradient(180deg, rgba(10,14,30,.80), rgba(10,14,30,.55));
    border-bottom:1px solid var(--stroke);
  }
  .topbar-inner{
    max-width: 1100px;
    margin:0 auto;
    padding: 18px 18px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:16px;
  }

  .brand{ cursor:pointer; }
  .brand-kicker{
    letter-spacing:.25em;
    font-weight:800;
    font-size:12px;
    color:rgba(255,255,255,.75);
  }
  .brand-title{
    font-size:44px;
    font-weight:900;
    line-height:1.05;
    margin-top:6px;
  }
  .brand-sub{
    margin-top:10px;
    color:var(--muted);
    max-width:700px;
    font-size:14px;
    line-height:1.5;
  }

  .pill{
    display:flex;
    align-items:center;
    gap:10px;
    padding:10px 12px;
    border:1px solid var(--stroke);
    background: rgba(10,14,30,.40);
    border-radius:999px;
    color:rgba(255,255,255,.70);
    font-size:13px;
    white-space:nowrap;
    max-width: 480px;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .pill-dot{
    width:9px;height:9px;border-radius:50%;
    background: rgba(110,255,190,.95);
    box-shadow: 0 0 0 4px rgba(110,255,190,.15);
  }

  .main{
    max-width:1100px;
    margin:0 auto;
    padding: 22px 18px 60px;
  }

  .actions{
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:14px;
    margin: 10px 0 18px;
  }
  .hint{
    flex:1;
    text-align:right;
    color:var(--muted2);
    font-size:13px;
  }

  .grid{
    display:grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap:14px;
  }

  .card{
    border:1px solid var(--stroke);
    background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03));
    border-radius:18px;
    padding:16px;
    box-shadow: var(--shadow2);
    position:relative;
    overflow:hidden;
  }
  .card:before{
    content:"";
    position:absolute;
    inset:-1px;
    background:
      radial-gradient(600px 180px at 10% 0%, rgba(110,160,255,.22), transparent 60%),
      radial-gradient(600px 200px at 90% 0%, rgba(190,120,255,.18), transparent 60%);
    pointer-events:none;
  }

  .card-row{
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:14px;
    position:relative;
    z-index:2;
  }

  .card-left{ min-width:0; }
  .card-name{
    font-size:18px;
    font-weight:900;
    line-height:1.1;
  }
  .card-company{
    margin-top:4px;
    color:var(--muted);
    font-size:13px;
  }

  .avatar{
    width:46px;height:46px;
    border-radius:14px;
    border:1px solid var(--stroke);
    background: rgba(0,0,0,.2);
    overflow:hidden;
    box-shadow: 0 10px 22px rgba(0,0,0,.35);
    flex:0 0 auto;
  }
  .avatar img{ width:100%; height:100%; object-fit:cover; display:block; }

  .card-row-bottom{ margin-top:14px; }

  .tag{
    padding:7px 10px;
    border-radius:999px;
    border:1px solid var(--stroke);
    background: rgba(10,14,30,.40);
    color: rgba(255,255,255,.80);
    font-size:12px;
    font-weight:700;
  }

  .btn{
    border:none;
    cursor:pointer;
    font-weight:800;
    border-radius:999px;
    padding:10px 14px;
    transition: transform .12s ease, opacity .12s ease, background .12s ease;
  }
  .btn:active{ transform: scale(.98); }
  .btn-primary{
    color: rgba(10,14,30,.95);
    background: linear-gradient(90deg, rgba(120,170,255,.95), rgba(200,140,255,.92));
    box-shadow: 0 16px 40px rgba(120,170,255,.18);
  }
  .btn-ghost{
    color: rgba(255,255,255,.86);
    background: rgba(255,255,255,.06);
    border:1px solid var(--stroke);
  }
  .btn-small{
    color: rgba(255,255,255,.86);
    background: rgba(255,255,255,.06);
    border:1px solid var(--stroke);
    padding:8px 12px;
  }

  .footer-note{
    margin-top:18px;
    border:1px solid var(--stroke);
    background: rgba(10,14,30,.34);
    border-radius:16px;
    padding:14px 14px;
    color: rgba(255,255,255,.68);
    font-size:13px;
  }

  .founder-page{ margin-top: 10px; }

  .founder-hero{
    display:grid;
    grid-template-columns: 1.4fr .6fr;
    gap:16px;
    border:1px solid var(--stroke);
    border-radius:18px;
    background: rgba(10,14,30,.36);
    padding:16px;
    box-shadow: var(--shadow);
    overflow:hidden;
  }

  .founder-name{
    font-size:34px;
    font-weight:950;
    line-height:1.05;
  }
  .founder-meta{
    margin-top:10px;
    display:flex;
    gap:10px;
    flex-wrap:wrap;
  }
  .meta-chip{
    padding:7px 10px;
    border-radius:999px;
    border:1px solid var(--stroke);
    background: rgba(255,255,255,.05);
    color: rgba(255,255,255,.78);
    font-size:12px;
    font-weight:800;
  }
  .meta-chip-strong{
    background: rgba(120,170,255,.16);
    border-color: rgba(120,170,255,.28);
  }

  .founder-blurb{
    margin-top:12px;
    color: var(--muted);
    line-height:1.55;
    font-size:14px;
    max-width: 720px;
  }

  .hero-image{
    width:100%;
    height:180px;
    border-radius:16px;
    border:1px solid var(--stroke);
    overflow:hidden;
    background: rgba(0,0,0,.18);
    box-shadow: 0 16px 38px rgba(0,0,0,.35);
  }
  .hero-image img{ width:100%; height:100%; object-fit:cover; display:block; }

  .timeline{
    margin-top:14px;
    border:1px solid var(--stroke);
    border-radius:18px;
    background: rgba(10,14,30,.30);
    padding:14px;
  }
  .timeline-title{
    font-weight:900;
    color: rgba(255,255,255,.85);
    margin-bottom:10px;
  }
  .age-row{
    display:flex;
    flex-wrap:wrap;
    gap:10px;
  }
  .age-btn{
    padding:10px 14px;
    border-radius:999px;
    border:1px solid var(--stroke);
    background: rgba(255,255,255,.05);
    color: rgba(255,255,255,.86);
    font-weight:900;
    cursor:pointer;
  }
  .age-btn-active{
    background: linear-gradient(90deg, rgba(110,160,255,.92), rgba(200,140,255,.85));
    color: rgba(10,14,30,.95);
    border-color: transparent;
  }

  .detail{
    margin-top:14px;
    display:grid;
    grid-template-columns: .9fr 1.1fr;
    gap:16px;
    border:1px solid var(--stroke);
    border-radius:18px;
    background: rgba(10,14,30,.34);
    padding:16px;
    box-shadow: var(--shadow);
  }

  .detail-image{
    width:100%;
    height:340px;
    border-radius:16px;
    border:1px solid var(--stroke);
    overflow:hidden;
    background: rgba(0,0,0,.18);
  }
  .detail-image img{ width:100%; height:100%; object-fit:cover; display:block; }

  .detail-age{
    font-size:12px;
    letter-spacing:.22em;
    font-weight:950;
    color: rgba(255,255,255,.72);
  }
  .detail-title{
    margin-top:8px;
    font-size:22px;
    font-weight:950;
  }
  .detail-text{
    margin-top:10px;
    color: rgba(255,255,255,.70);
    line-height:1.7;
    font-size:14px;
    white-space: pre-wrap;
  }

  .detail-actions{
    margin-top:14px;
    display:flex;
    gap:12px;
    flex-wrap:wrap;
  }

  .mini-note{
    margin-top:14px;
    color: rgba(255,255,255,.65);
    font-size:13px;
    border:1px solid var(--stroke);
    background: rgba(10,14,30,.28);
    border-radius:16px;
    padding:12px 14px;
  }

  @media (max-width: 980px){
    .grid{ grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .founder-hero{ grid-template-columns: 1fr; }
    .hero-image{ height: 200px; }
    .detail{ grid-template-columns: 1fr; }
    .detail-image{ height: 260px; }
    .brand-title{ font-size: 36px; }
    .hint{ text-align:left; }
    .actions{ flex-direction:column; align-items:flex-start; }
    .pill{ max-width: 100%; }
  }
  @media (max-width: 560px){
    .grid{ grid-template-columns: 1fr; }
    .brand-title{ font-size: 30px; }
  }
`;\
