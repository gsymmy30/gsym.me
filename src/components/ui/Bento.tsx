'use client';

const STYLES = `
  @keyframes gs-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  @keyframes gs-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.55; transform: scale(0.8); }
  }

  .gs-bento-root {
    position: fixed;
    inset: 0;
    top: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 24px 24px;
    overflow-y: auto;
    z-index: 10;
  }

  .gs-bento-grid {
    display: grid;
    width: 100%;
    max-width: 980px;
    grid-template-columns: 260px 1fr 1fr;
    grid-template-rows: auto auto auto;
    gap: 10px;
  }

  .gs-bc {
    background: rgba(12, 30, 22, 0.82);
    backdrop-filter: blur(20px) saturate(160%);
    -webkit-backdrop-filter: blur(20px) saturate(160%);
    border: 1px solid rgba(218,215,205,0.12);
    border-top-color: rgba(218,215,205,0.24);
    border-radius: 18px;
    box-shadow:
      0 2px 4px rgba(0,0,0,0.15),
      0 8px 24px rgba(0,0,0,0.4),
      0 24px 48px rgba(0,0,0,0.25),
      inset 0 1px 0 rgba(218,215,205,0.05);
    overflow: hidden;
  }

  /* HEADSHOT */
  .gs-bc-headshot {
    grid-column: 1;
    grid-row: 1 / 3;
    display: flex;
    flex-direction: column;
    min-height: 280px;
  }

  .gs-bc-mac {
    display: flex;
    gap: 6px;
    padding: 12px 14px 0;
    flex-shrink: 0;
  }

  .gs-bc-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  .gs-bc-headshot img {
    flex: 1;
    width: 100%;
    min-height: 0;
    object-fit: cover;
    object-position: center top;
    display: block;
    margin-top: 10px;
  }

  /* NAME */
  .gs-bc-name {
    grid-column: 2 / 4;
    grid-row: 1;
    display: flex;
    align-items: flex-end;
    padding: 28px 32px 24px;
  }

  .gs-bc-name-text {
    font-family: var(--font-barlow);
    font-weight: 900;
    font-size: 72px;
    line-height: 0.88;
    letter-spacing: -0.01em;
    text-transform: uppercase;
    color: #dad7cd;
    white-space: nowrap;
  }

  /* ROLE */
  .gs-bc-role {
    grid-column: 2 / 4;
    grid-row: 2;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px 28px;
  }

  .gs-bc-role-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #4ade80;
    flex-shrink: 0;
    animation: gs-pulse 2.4s ease-in-out infinite;
    box-shadow: 0 0 6px rgba(74,222,128,0.6);
  }

  .gs-bc-role-text {
    font-family: var(--font-barlow);
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0.01em;
    color: rgba(218,215,205,0.6);
    white-space: nowrap;
  }

  .gs-bc-role-rule {
    width: 1px;
    height: 18px;
    background: rgba(218,215,205,0.15);
    flex-shrink: 0;
  }

  .gs-bc-role-link {
    font-family: 'Google Sans', sans-serif;
    font-size: 18px;
    font-weight: 500;
    text-decoration: none;
    white-space: nowrap;
    background: linear-gradient(
      90deg,
      rgba(218,215,205,0.5) 0%,
      rgba(218,215,205,1) 40%,
      rgba(218,215,205,1) 60%,
      rgba(218,215,205,0.5) 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gs-shimmer 4s linear infinite;
  }

  /* TEXT CARDS */
  .gs-bc-about {
    grid-column: 1 / 3;
    grid-row: 3;
    padding: 24px 28px;
    display: flex;
    flex-direction: column;
  }

  .gs-bc-personal {
    grid-column: 3;
    grid-row: 3;
    padding: 24px 28px;
    display: flex;
    flex-direction: column;
  }

  .gs-bc-text-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
  }

  .gs-bc-text-label {
    font-family: var(--font-jakarta);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(218,215,205,0.45);
  }

  .gs-bc-text-num {
    font-family: var(--font-geist-mono);
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.08em;
    color: rgba(218,215,205,0.2);
  }

  .gs-bc-text-hr {
    width: 100%;
    height: 1px;
    background: rgba(218,215,205,0.09);
    margin-bottom: 16px;
  }

  .gs-bc-text-body {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .gs-bc-para {
    font-family: var(--font-jakarta);
    font-size: 13px;
    font-weight: 400;
    line-height: 1.7;
    color: rgba(218,215,205,0.75);
    margin: 0;
  }

  .gs-bc-para-rule {
    width: 100%;
    height: 1px;
    background: rgba(218,215,205,0.07);
  }

  /* MOBILE */
  @media (max-width: 700px) {
    .gs-bento-root {
      top: 70px;
      align-items: flex-start;
      padding: 12px;
    }
    .gs-bento-grid {
      grid-template-columns: 1fr;
      grid-template-rows: auto;
    }
    .gs-bc-headshot {
      grid-column: 1;
      grid-row: auto;
      min-height: 220px;
    }
    .gs-bc-name,
    .gs-bc-role,
    .gs-bc-about,
    .gs-bc-personal {
      grid-column: 1;
      grid-row: auto;
    }
    .gs-bc-name-text {
      font-size: clamp(36px, 11vw, 72px);
      white-space: normal;
    }
  }
`;

const aboutParas = [
  'Previously Product Manager at Microsoft Azure, working on Azure Observability and AIOps.',
  'CS + Design at Georgia Tech. Founded a scooter-safety startup, built a lot at HackGT, and did computer vision research.',
  'Raised in Delhi, grew up on science fairs and competitive quizzing.',
];

const personalParas = [
  'In college I spelled out "Hire Me" with sticky notes on my dorm window. It went viral and got covered in the New York Post.',
  'At 14, I built wearable glasses to aid the visually impaired using a Raspberry Pi. The project earned me an award from Michael Phelps.',
  "Fitness is a big part of my life. Over the past few years I've lost weight, built muscle, and tracked progress obsessively on Strava and Hevy. I've trained in boxing and CrossFit, and spend a lot of time kayaking or on the rowing erg.",
  "I'm a big sports fan and love watching live games. My favorite teams are the LA Clippers and the Philadelphia Eagles. By pure luck, I've been interviewed a few times on ESPN and TNT during games.",
];

export default function Bento() {
  return (
    <>
      <style>{STYLES}</style>
      <div className="gs-bento-root">
        <div className="gs-bento-grid">

          {/* Headshot */}
          <div className="gs-bc gs-bc-headshot">
            <div className="gs-bc-mac">
              <span className="gs-bc-dot" style={{ background: '#ff5f57' }} />
              <span className="gs-bc-dot" style={{ background: '#febc2e' }} />
              <span className="gs-bc-dot" style={{ background: '#28c840' }} />
            </div>
            <img src="/headshot.jpg" alt="Headshot" draggable={false} />
          </div>

          {/* Name */}
          <div className="gs-bc gs-bc-name">
            <span className="gs-bc-name-text">Gursimran Singh</span>
          </div>

          {/* Role */}
          <div className="gs-bc gs-bc-role">
            <span className="gs-bc-role-dot" />
            <span className="gs-bc-role-text">Technical Program Manager</span>
            <span className="gs-bc-role-rule" />
            <a
              href="https://deepmind.google"
              target="_blank"
              rel="noopener noreferrer"
              className="gs-bc-role-link"
            >
              Google DeepMind
            </a>
          </div>

          {/* About */}
          <div className="gs-bc gs-bc-about">
            <div className="gs-bc-text-header">
              <span className="gs-bc-text-label">About</span>
              <span className="gs-bc-text-num">02</span>
            </div>
            <div className="gs-bc-text-hr" />
            <div className="gs-bc-text-body">
              {aboutParas.map((p, i) => (
                <>
                  <p key={i} className="gs-bc-para">{p}</p>
                  {i < aboutParas.length - 1 && <div key={`r${i}`} className="gs-bc-para-rule" />}
                </>
              ))}
            </div>
          </div>

          {/* Personal */}
          <div className="gs-bc gs-bc-personal">
            <div className="gs-bc-text-header">
              <span className="gs-bc-text-label">Personal</span>
              <span className="gs-bc-text-num">03</span>
            </div>
            <div className="gs-bc-text-hr" />
            <div className="gs-bc-text-body">
              {personalParas.map((p, i) => (
                <>
                  <p key={i} className="gs-bc-para">{p}</p>
                  {i < personalParas.length - 1 && <div key={`r${i}`} className="gs-bc-para-rule" />}
                </>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
