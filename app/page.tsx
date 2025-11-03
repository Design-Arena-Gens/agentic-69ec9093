"use client";

import { useMemo, useState } from "react";

type IntelCard = {
  id: string;
  title: string;
  summary: string;
  detail: string;
};

const data: IntelCard[] = [
  {
    id: "guardian",
    title: "Guardian Protocol",
    summary: "Activate the shield lattice that protects the ringworld perimeter.",
    detail:
      "When the Guardian Protocol engages, adaptive shields reinforce defensive choke-points. It is powered by a lattice of dormant slipspace reactors brought online in sequence."
  },
  {
    id: "archives",
    title: "Forerunner Archives",
    summary: "Recover the fragmented knowledge etched into luminary shards.",
    detail:
      "Each shard contains stratified hologlyphs. Reassembling them unlocks coordinates to hidden cartographer nodes embedded beneath the ring's crust."
  },
  {
    id: "spartans",
    title: "Spartan Fireteam",
    summary: "Deploy a precision strike unit to neutralize Covenant incursions.",
    detail:
      "The deployed fireteam operates with integrated VI assistance, enabling rapid threat prioritization and synchronized motion tracking within hostile environments."
  }
];

const haloPalette = {
  primary: "#26ffe6",
  glow: "0 0 25px rgba(38, 255, 230, 0.45)",
  surface: "rgba(5, 12, 24, 0.76)",
  border: "rgba(38, 255, 230, 0.35)"
} as const;

const instructions = [
  "Scan the orbital map for Covenant signatures.",
  "Calibrate energy shields to 117% capacity.",
  "Synchronize with UNSC Infinity command uplink."
];

export default function HomePage() {
  const [selectedIntel, setSelectedIntel] = useState<IntelCard>(data[0]);

  const instructionsRendered = useMemo(
    () =>
      instructions.map((step, index) => (
        <li key={step}>
          <strong>/{index + 1}</strong>
          <span>{step}</span>
        </li>
      )),
    []
  );

  const intelCardsRendered = useMemo(
    () =>
      data.map((intel) => {
        const active = intel.id === selectedIntel.id;
        return (
          <button
            key={intel.id}
            onClick={() => setSelectedIntel(intel)}
            className={`intel-card${active ? " intel-card--active" : ""}`}
            type="button"
          >
            <span className="intel-card__label">{intel.title}</span>
            <span className="intel-card__summary">{intel.summary}</span>
          </button>
        );
      }),
    [selectedIntel]
  );

  return (
    <main className="container">
      <div className="holo-ring" aria-hidden />
      <header className="hero">
        <h1>Halo Command Console</h1>
        <p>
          UNSC Infinity uplink established. Mission-critical systems are
          synchronized with the ring&apos;s Cartographer. Operate the console
          to deploy strategic responses across the Halo array.
        </p>
        <div className="hero__cta">
          <a className="cta-button" href="#intel">
            Access Mission Briefing
          </a>
          <a className="cta-button cta-button--secondary" href="#protocols">
            View Protocols
          </a>
        </div>
      </header>

      <section id="protocols" className="protocols">
        <h2>Operational Protocols</h2>
        <ol>{instructionsRendered}</ol>
      </section>

      <section id="intel" className="intel">
        <aside className="intel__options">{intelCardsRendered}</aside>
        <article className="intel__detail">
          <h3>{selectedIntel.title}</h3>
          <p>{selectedIntel.detail}</p>
          <div className="intel__status">
            <span className="status-dot" />
            <span>Priority Link Active</span>
          </div>
        </article>
      </section>

      <footer className="footer">
        <span>UNSC SAI · Section 117 · Secure uplink channel</span>
      </footer>
    </main>
  );
}

const styles = `
.container {
  display: grid;
  grid-template-columns: minmax(0, 840px);
  gap: 3rem;
  position: relative;
}

.holo-ring {
  position: absolute;
  inset: -20vh auto auto -10vw;
  width: min(70vw, 600px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(38, 255, 230, 0.35) 0%,
    rgba(38, 255, 230, 0.05) 46%,
    transparent 65%
  );
  filter: blur(12px);
  z-index: -1;
  transform: rotateX(60deg);
  box-shadow: inset 0 -2px 40px rgba(38, 255, 230, 0.35);
}

.hero {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2.5rem;
  border-radius: 24px;
  background: ${haloPalette.surface};
  border: 1px solid ${haloPalette.border};
  backdrop-filter: blur(30px);
  box-shadow: ${haloPalette.glow};
}

.hero h1 {
  font-size: clamp(2.4rem, 3vw, 3.2rem);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero p {
  line-height: 1.7;
  color: rgba(237, 244, 255, 0.72);
}

.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.cta-button {
  padding: 0.9rem 1.7rem;
  border-radius: 999px;
  background: linear-gradient(135deg, ${haloPalette.primary}, #4af0ff);
  color: #090e17;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transition: transform 160ms ease, filter 160ms ease;
}

.cta-button:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
}

.cta-button--secondary {
  background: transparent;
  color: ${haloPalette.primary};
  border: 1px solid ${haloPalette.border};
}

.protocols {
  padding: 2rem 2.5rem;
  border-radius: 24px;
  background: rgba(9, 20, 38, 0.65);
  border: 1px solid rgba(38, 255, 230, 0.25);
}

.protocols h2 {
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 1.2rem;
}

.protocols ol {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 1rem;
}

.protocols li {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 1.3rem;
  border-radius: 16px;
  background: rgba(5, 15, 28, 0.5);
  border: 1px solid rgba(38, 255, 230, 0.2);
}

.protocols strong {
  color: ${haloPalette.primary};
  letter-spacing: 0.08em;
}

.protocols span {
  flex: 1;
  color: rgba(237, 244, 255, 0.75);
}

.intel {
  display: grid;
  gap: 1.5rem;
  padding: 2.2rem;
  border-radius: 24px;
  background: rgba(6, 13, 28, 0.75);
  border: 1px solid rgba(38, 255, 230, 0.2);
}

.intel {
  grid-template-columns: minmax(0, 260px) minmax(0, 1fr);
}

.intel__options {
  display: grid;
  gap: 1rem;
}

.intel-card {
  all: unset;
  cursor: pointer;
  padding: 1.2rem 1.4rem;
  border-radius: 18px;
  background: rgba(8, 18, 34, 0.65);
  border: 1px solid rgba(38, 255, 230, 0.15);
  transition: border 160ms ease, transform 160ms ease, box-shadow 160ms ease;
  display: grid;
  gap: 0.6rem;
}

.intel-card:hover {
  transform: translateX(4px);
  border-color: ${haloPalette.border};
}

.intel-card__label {
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  color: rgba(237, 244, 255, 0.8);
}

.intel-card__summary {
  color: rgba(237, 244, 255, 0.6);
  font-size: 0.95rem;
  line-height: 1.5;
}

.intel-card--active {
  border-color: ${haloPalette.primary};
  box-shadow: ${haloPalette.glow};
  transform: translateX(6px);
}

.intel__detail {
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 18px;
  background: rgba(5, 12, 24, 0.82);
  border: 1px solid rgba(38, 255, 230, 0.25);
  box-shadow: inset 0 0 18px rgba(38, 255, 230, 0.08);
}

.intel__detail h3 {
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.intel__detail p {
  line-height: 1.6;
  color: rgba(237, 244, 255, 0.76);
}

.intel__status {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  background: rgba(18, 38, 52, 0.75);
  border: 1px solid rgba(38, 255, 230, 0.4);
  width: fit-content;
  letter-spacing: 0.06em;
  color: ${haloPalette.primary};
}

.status-dot {
  width: 0.6rem;
  aspect-ratio: 1;
  background: ${haloPalette.primary};
  border-radius: 50%;
  box-shadow: ${haloPalette.glow};
}

.footer {
  display: flex;
  justify-content: center;
  color: rgba(237, 244, 255, 0.45);
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

@media (max-width: 960px) {
  body {
    padding: 1.5rem;
  }

  .container {
    grid-template-columns: minmax(0, 1fr);
  }

  .intel {
    grid-template-columns: minmax(0, 1fr);
  }
}
`;

if (typeof window !== "undefined") {
  const id = "halo-inline-style";
  if (!document.getElementById(id)) {
    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = styles;
    document.head.appendChild(style);
  }
}
