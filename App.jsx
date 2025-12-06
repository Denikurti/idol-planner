import React from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "system-ui", color: "white", background: "#020617", minHeight: "100vh" }}>
      <h1>Router Test</h1>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "10px", color: "#22c55e" }}>Home</Link>
        <Link to="/founder/zuckerberg" style={{ color: "#22c55e" }}>Zuckerberg page</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/founder/:id" element={<FounderPage />} />
      </Routes>
    </div>
  );
}

function Home() {
  return <p>This is the HOME page. Click "Zuckerberg page" above.</p>;
}

function FounderPage() {
  const { id } = useParams();
  return (
    <div>
      <h2>Founder page</h2>
      <p>You are on founder: <strong>{id}</strong></p>
      <Link to="/" style={{ color: "#22c55e" }}>Back to home</Link>
    </div>
  );
}

export default App;
