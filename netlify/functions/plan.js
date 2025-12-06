const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

exports.handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const body = JSON.parse(event.body || "{}");
  const { age, idolKey, skillLevel, hoursPerWeek } = body;

  // ---------------------------------------------------
  // Idol timeline data (age 22 snapshots)
  // ---------------------------------------------------
  const idolData = {
    elon_musk: {
      22: {
        summary:
          "At 22, Elon Musk had finished his physics degree and was preparing to move to the US. He was studying hard, coding, and obsessing over building tech companies.",
        skills: [
          "Physics and maths",
          "Coding (C, early web tech)",
          "Product thinking",
          "Extreme work ethic",
        ],
        environment:
          "University + side coding projects + reading and planning startups",
        intensity: "Roughly 60–80 hours/week focused on study and building",
      },
    },

    mark_zuckerberg: {
      22: {
        summary:
          "At 22, Mark Zuckerberg was scaling Facebook aggressively. He had dropped out of Harvard, moved to Palo Alto, and was hiring engineers, raising capital, and expanding the user base globally.",
        skills: [
          "Backend engineering",
          "Product design",
          "Leadership",
          "Hiring and team building",
          "Fundraising mindset",
        ],
        environment:
          "Fast-growth startup in Palo Alto, working nonstop with a small engineering team",
        intensity: "80–100 hours/week in hyper-growth startup pressure",
      },
    },

    jensen_huang: {
      22: {
        summary:
          "At 22, Jensen Huang was working as an engineer after studying electrical engineering. He was mastering semiconductor concepts, low-level systems, and hardware — foundations that later led to NVIDIA.",
        skills: [
          "Electrical engineering",
          "Semiconductor design",
          "Hardware-systems thinking",
          "Low-level programming",
          "Engineering discipline",
        ],
        environment:
          "Early engineering role, long hours, deep technical learning, no glamour — foundation-building phase",
        intensity: "50–70 hours/week of serious engineering and self-study",
      },
    },

    larry_ellison: {
      22: {
        summary:
          "At 22, Larry Ellison had dropped out of multiple universities and moved to Berkeley. He was working low-level programming jobs while self-teaching databases, operating systems, and the ideas that later became Oracle.",
        skills: [
          "C programming",
          "Database fundamentals",
          "Unix / operating systems",
          "Systems design thinking",
          "Self-directed learning",
        ],
        environment:
          "Cheap apartments in Berkeley, low-paying programming jobs, obsessive self-study, zero glamour but massive technical growth",
        intensity: "50–70 hours/week between work and intense self-teaching",
      },
    },

    jeff_bezos: {
      22: {
        summary:
          "At 22, Jeff Bezos had just graduated from Princeton in electrical engineering and computer science. He went into highly technical Wall Street roles, working on trading systems and large-scale software.",
        skills: [
          "Computer science fundamentals",
          "Systems design",
          "Software engineering",
          "Quantitative thinking",
          "Operational discipline",
        ],
        environment:
          "High-intensity finance/tech roles, building reliable systems with big consequences for failure",
        intensity: "60–80 hours/week in demanding corporate tech environment",
      },
    },

    travis_kalanick: {
      22: {
        summary:
          "At 22, Travis Kalanick was working on Scour, a peer-to-peer file-sharing startup. He was coding, fighting legal pressure, and learning how to move fast under risk and uncertainty.",
        skills: [
          "Self-taught programming",
          "Scrappy product building",
          "Dealing with legal and business pressure",
          "Growth hacking mindset",
        ],
        environment:
          "Early-stage startup chaos, legal risk from big media companies, constant pressure to survive and iterate",
        intensity: "60–90 hours/week in a high-stress startup environment",
      },
    },
  };

  // Get idol snapshot for this age
  let idolSnapshot = idolData[idolKey]?.[age];

  if (!idolSnapshot) {
    idolSnapshot = {
      summary: "No timeline data for this idol at this exact age yet.",
      skills: [],
      environment: "",
      intensity: "",
    };
  }

  // ---------------------------------------------------
  // 30-day plan (slightly adapted by skill/hours)
  // ---------------------------------------------------
  const weeklyHours = Number(hoursPerWeek) || 10;

  let intensityComment = "";
  if (weeklyHours < 5) {
    intensityComment =
      "You’re putting in very low hours. If you’re serious, you need to raise this over time.";
  } else if (weeklyHours < 15) {
    intensityComment =
      "This is a decent start. Push it towards 15–20 hours/week if you want compounding progress.";
  } else {
    intensityComment =
      "You’re in a good intensity zone. The question now is focus and consistency, not just hours.";
  }

  let skillComment = "";
  if (skillLevel === "beginner") {
    skillComment =
      "Focus on fundamentals and small, complete projects. Don’t chase 100 ideas.";
  } else if (skillLevel === "intermediate") {
    skillComment =
      "You should be shipping slightly harder projects and cleaning up your fundamentals where you’re weak.";
  } else if (skillLevel === "advanced") {
    skillComment =
      "Stop tutorial-hopping. Build something non-trivial that other people can actually use.";
  }

  const plan = {
    headline: "Your 30-Day Acceleration Plan",
    meta: {
      intensityComment,
      skillComment,
    },
    tasks: [
      `Block ${weeklyHours} hours/week on your calendar purely for learning + building. No negotiation.`,
      `Pick ONE real project and ship it publicly (GitHub + deploy). No new ideas until it's live.`,
      `Every week, write a short reflection: what improved, what broke, what you learned.`,
      `Join at least one builder / hacker / founder community and post your progress weekly.`,
    ],
  };

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      age,
      idol: idolKey,
      idolSnapshot,
      plan,
    }),
  };
};
