import React, { useState } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import { founders } from "./foundersData";

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      <header className="border-b border-slate-700 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">
          Idol Age Planner
        </Link>
        <nav className="space-x-4 text-sm">
          <Link to="/" className="hover:underline">
            Planner
          </Link>
          <Link to="/founders" className="hover:underline">
            All founders
          </Link>
        </nav>
      </header>

      <main className="px-4 py-6 max-w-5xl mx-auto">
        <Routes>
          <Route path="/" element={<PlannerHome />} />
          <Route path="/founders" element={<FounderGrid />} />
          <Route path="/founder/:id" element={<FounderDetail />} />
        </Routes>
      </main>
    </div>
  );
}

/* ---------- HOME: planner + quick founder cards ---------- */

function PlannerHome() {
  const [selectedId, setSelectedId] = useState(founders[0].id);
  const [age, setAge] = useState(22);

  const selectedFounder = founders.find((f) => f.id === selectedId);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">
        What were top founders doing at your age?
      </h1>

      <div className="grid md:grid-cols-3 gap-4">
        {founders.map((f) => (
          <button
            key={f.id}
            onClick={() => setSelectedId(f.id)}
            className={`rounded-xl p-3 text-left border ${
              f.id === selectedId
                ? "border-emerald-400 bg-emerald-950/40"
                : "border-slate-700 bg-slate-800/40 hover:border-slate-500"
            }`}
          >
            <div className="flex items-center gap-3">
              <img
                src={f.youngPhoto}
                alt={f.name}
                className="w-12 h-12 rounded-full object-cover bg-slate-700"
              />
              <div>
                <div className="font-semibold text-sm">{f.name}</div>
                <div className="text-xs text-slate-300">{f.mainCompany}</div>
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-300">
              {f.shortTagline}
            </p>
            <Link
              to={`/founder/${f.id}`}
              className="mt-2 inline-block text-xs text-emerald-300 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              View full story →
            </Link>
          </button>
        ))}
      </div>

      <section className="space-y-3">
        <label className="text-sm font-medium flex justify-between">
          <span>Your age</span>
          <span className="text-emerald-300">{age} years</span>
        </label>
        <input
          type="range"
          min="15"
          max="40"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="w-full"
        />
      </section>

      <section className="rounded-xl border border-slate-700 bg-slate-800/60 p-4 space-y-3">
        <h2 className="font-semibold text-lg">
          At {age}, what would {selectedFounder.name} focus on?
        </h2>
        <p className="text-sm text-slate-200">
          This is the placeholder plan area. You can plug your Netlify
          function here using <code>fetch</code> and pass{" "}
          <code>selectedFounder.id</code> and <code>age</code>.
        </p>
      </section>
    </div>
  );
}

/* ---------- FOUNDERS GRID PAGE ---------- */

function FounderGrid() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Founders library</h1>
      <p className="text-sm text-slate-300">
        Click any card to see their early-life story, what they studied, and the
        habits they had when they were your age.
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {founders.map((f) => (
          <div
            key={f.id}
            className="rounded-xl border border-slate-700 bg-slate-800/60 overflow-hidden cursor-pointer hover:border-emerald-400"
            onClick={() => navigate(`/founder/${f.id}`)}
          >
            <img
              src={f.youngPhoto}
              alt={`${f.name} young`}
              className="w-full h-40 object-cover bg-slate-700"
            />
            <div className="p-3 space-y-1">
              <div className="font-semibold text-sm">{f.name}</div>
              <div className="text-xs text-slate-300">{f.mainCompany}</div>
              <p className="text-xs text-slate-400">
                {f.shortTagline}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- DETAIL PAGE ---------- */

function FounderDetail() {
  const { id } = useParams();
  const founder = founders.find((f) => f.id === id);

  if (!founder) {
    return (
      <div className="space-y-2">
        <p className="text-sm">Founder not found.</p>
        <Link to="/founders" className="text-sm text-emerald-300">
          Back to list
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => window.history.back()}
        className="text-xs text-slate-300 hover:underline"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="space-y-3 md:w-1/3">
          <img
            src={founder.youngPhoto}
            alt={`${founder.name} young`}
            className="w-full rounded-lg object-cover bg-slate-700"
          />
          <img
            src={founder.adultPhoto}
            alt={founder.name}
            className="w-full rounded-lg object-cover bg-slate-700"
          />
        </div>

        <div className="space-y-4 md:w-2/3">
          <div>
            <h1 className="text-2xl font-bold">{founder.name}</h1>
            <p className="text-sm text-slate-300">{founder.mainCompany}</p>
          </div>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold">Early years</h2>
            <p className="text-sm whitespace-pre-line text-slate-200">
              {founder.earlyStory}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold">What they studied</h2>
            <p className="text-sm text-slate-200">{founder.whatHeStudied}</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold">Key habits when young</h2>
            <ul className="list-disc list-inside text-sm text-slate-200 space-y-1">
              {founder.keyHabits.map((h, idx) => (
                <li key={idx}>{h}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
