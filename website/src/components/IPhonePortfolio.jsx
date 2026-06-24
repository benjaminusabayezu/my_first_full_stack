import { useState, useEffect, useRef, useCallback } from "react";



const DEVELOPER = {
  initials: "BE",
  name: "Benjamin",
  role: "Frontend Dev · QA Tester",
  openToWork: true,
  stats: [
    { value: "2+", label: "Projects" },
    { value: "4w", label: "Learning" },
    { value: "3+", label: "Tech" },
  ],
  skills: [
    { name: "React / Tailwind CSS", pct: 88 },
    { name: "Node.js / Django", pct: 75 },
    { name: "PostgreSQL / Testing", pct: 70 },
  ],
  projects: [
    {
      icon: "..",
      name: "Portfolio v2",
      tech: "React · Tailwind · GSAP",
      status: "live",
    },
    {
      icon: "...",
      name: "QA Dashboard",
      tech: "Django · PostgreSQL · REST",
      status: "building",
    },
  ],
};


const ZINC_THEMES = [
  {
    bg: "linear-gradient(160deg,#27272a,#18181b,#09090b)",
    frame: "rgba(161,161,170,0.18)",
    label: "Obsidian",
  },
  {
    bg: "linear-gradient(160deg,#3f3f46,#27272a,#18181b)",
    frame: "rgba(161,161,170,0.22)",
    label: "Graphite",
  },
  {
    bg: "linear-gradient(160deg,#52525b,#3f3f46,#27272a)",
    frame: "rgba(212,212,216,0.20)",
    label: "Slate",
  },
  {
    bg: "linear-gradient(160deg,#71717a,#52525b,#3f3f46)",
    frame: "rgba(228,228,231,0.25)",
    label: "Silver",
  },
];


const LIME = {
  base: "#a3e635", // lime-400
  bright: "#bef264", // lime-300
  dim: "#65a30d", // lime-600
  faint: "rgba(163,230,53,0.12)",
  faintMid: "rgba(163,230,53,0.22)",
};


const ACTIVITY_LEVELS = [
  "rgba(163,230,53,0.10)",
  "rgba(163,230,53,0.25)",
  "rgba(163,230,53,0.48)",
  "rgba(163,230,53,0.75)",
  "#a3e635",
];

function generateActivity(count = 56) {
  const w = [0.28, 0.26, 0.22, 0.15, 0.09];
  return Array.from({ length: count }, () => {
    let acc = 0;
    const r = Math.random();
    for (let i = 0; i < w.length; i++) {
      acc += w[i];
      if (r < acc) return i;
    }
    return 0;
  });
}

//Status bar 
function StatusBar() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 52,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        padding: "0 20px 6px",
        fontFamily: "Inter,system-ui,sans-serif",
        fontSize: 11,
        fontWeight: 600,
        color: "#fff",
        zIndex: 15,
      }}
    >
      <span style={{ letterSpacing: "-0.2px" }}>9:41</span>
      <span style={{ display: "flex", gap: 5, alignItems: "center" }}>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <rect
            x="0"
            y="4"
            width="3"
            height="7"
            rx="1"
            fill="rgba(255,255,255,0.9)"
          />
          <rect
            x="4"
            y="2.5"
            width="3"
            height="8.5"
            rx="1"
            fill="rgba(255,255,255,0.9)"
          />
          <rect
            x="8"
            y="1"
            width="3"
            height="10"
            rx="1"
            fill="rgba(255,255,255,0.9)"
          />
          <rect
            x="12"
            y="0"
            width="3"
            height="11"
            rx="1"
            fill="rgba(255,255,255,0.3)"
          />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="21"
            height="11"
            rx="3.5"
            stroke="rgba(255,255,255,0.3)"
          />
          <rect x="2" y="2" width="16" height="8" rx="2" fill="white" />
          <path d="M23 4.5v3a1.5 1.5 0 000-3z" fill="rgba(255,255,255,0.35)" />
        </svg>
      </span>
    </div>
  );
}


function DynamicIsland() {
  return (
    <div
      style={{
        position: "absolute",
        top: 12,
        left: "50%",
        transform: "translateX(-50%)",
        width: 90,
        height: 28,
        background: "#000",
        borderRadius: 20,
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      <div
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "#1a1a1a",
        }}
      />
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "#111",
          border: "1.5px solid #2a2a2a",
        }}
      />
    </div>
  );
}


function Label({ children }) {
  return (
    <div
      style={{
        fontSize: 9,
        fontWeight: 700,
        color: "rgba(255,255,255,0.35)",
        textTransform: "uppercase",
        letterSpacing: "1px",
        marginTop: 4,
        fontFamily: "Inter,system-ui,sans-serif",
      }}
    >
      {children}
    </div>
  );
}


function SkillBar({ name, pct }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: 10,
            color: "rgba(255,255,255,0.65)",
            fontFamily: "Inter,system-ui,sans-serif",
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontSize: 10,
            color: LIME.base,
            fontWeight: 600,
            fontFamily: "Inter,system-ui,sans-serif",
          }}
        >
          {pct}%
        </span>
      </div>
      <div
        style={{
          height: 3,
          background: "rgba(255,255,255,0.07)",
          borderRadius: 99,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            borderRadius: 99,
            background: `linear-gradient(90deg,${LIME.dim},${LIME.base})`,
          }}
        />
      </div>
    </div>
  );
}

//Project card 
function ProjectCard({ icon, name, tech, status }) {
  const isLive = status === "live";
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${isLive ? "rgba(163,230,53,0.18)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 10,
        padding: "7px 10px",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 8,
          flexShrink: 0,
          background: isLive ? LIME.faint : "rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "#fff",
            fontFamily: "Inter,system-ui,sans-serif",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: 9,
            color: "rgba(255,255,255,0.35)",
            marginTop: 1,
            fontFamily: "Inter,system-ui,sans-serif",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {tech}
        </div>
      </div>
      <span
        style={{
          fontSize: 8,
          padding: "2px 7px",
          borderRadius: 99,
          fontWeight: 700,
          fontFamily: "Inter,system-ui,sans-serif",
          whiteSpace: "nowrap",
          flexShrink: 0,
          background: isLive ? LIME.faint : "rgba(255,255,255,0.06)",
          color: isLive ? LIME.base : "rgba(255,255,255,0.45)",
          border: `1px solid ${isLive ? "rgba(163,230,53,0.3)" : "rgba(255,255,255,0.1)"}`,
        }}
      >
        {isLive ? "● Live" : "◐ WIP"}
      </span>
    </div>
  );
}

//  Portfolio screen content
function PortfolioScreen({ developer }) {
  const [activity] = useState(() => generateActivity(56));

  return (
    <div
      style={{
        position: "absolute",
        inset: "52px 0 0",
        padding: "10px 14px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        overflow: "hidden",
      }}
    >
      {/* Profile header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Avatar */}
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            flexShrink: 0,
            background: `linear-gradient(135deg,${LIME.dim},${LIME.base})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 13,
            color: "#09090b",
            border: `2px solid ${LIME.base}`,
            fontFamily: "Inter,system-ui,sans-serif",
            boxShadow: `0 0 16px ${LIME.faintMid}`,
          }}
        >
          {developer.initials}
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.2,
              fontFamily: "Inter,system-ui,sans-serif",
            }}
          >
            {developer.name}
          </div>
          <div
            style={{
              fontSize: 9.5,
              color: LIME.base,
              fontWeight: 600,
              letterSpacing: "0.2px",
              fontFamily: "Inter,system-ui,sans-serif",
            }}
          >
            {developer.role}
          </div>
        </div>

        {developer.openToWork && (
          <div
            style={{
              fontSize: 8,
              padding: "3px 7px",
              borderRadius: 99,
              background: LIME.faint,
              color: LIME.base,
              border: `1px solid rgba(163,230,53,0.28)`,
              fontWeight: 700,
              fontFamily: "Inter,system-ui,sans-serif",
              letterSpacing: "0.3px",
              whiteSpace: "nowrap",
            }}
          >
            ✦ Open
          </div>
        )}
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

      {/* Stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 5,
        }}
      >
        {developer.stats.map((s) => (
          <div
            key={s.label}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 10,
              padding: "7px 4px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: LIME.base,
                lineHeight: 1,
                fontFamily: "Inter,system-ui,sans-serif",
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontSize: 8,
                color: "rgba(255,255,255,0.35)",
                marginTop: 2,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                fontFamily: "Inter,system-ui,sans-serif",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <Label>Top Skills</Label>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {developer.skills.map((sk) => (
          <SkillBar key={sk.name} {...sk} />
        ))}
      </div>

      {/* Projects */}
      <Label>Projects</Label>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {developer.projects.map((p) => (
          <ProjectCard key={p.name} {...p} />
        ))}
      </div>

      {/* Commit activity */}
      <Label>Activity</Label>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(14,1fr)",
          gap: 2.5,
        }}
      >
        {activity.map((lvl, i) => (
          <div
            key={i}
            style={{
              aspectRatio: 1,
              borderRadius: 2,
              background: ACTIVITY_LEVELS[lvl],
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function IPhonePortfolio({
  developer = DEVELOPER,
  autoSpeed = 3200,
  startTheme = 0,
  className = "",
  style = {},
}) {
  const [themeIdx, setThemeIdx] = useState(startTheme);
  const autoRef = useRef(null);
  const wrapperRef = useRef(null);
  const drag = useRef({
    active: false,
    startX: 0,
    startY: 0,
    rotX: 6,
    rotY: -20,
  });

  
  const startAuto = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(
      () => setThemeIdx((p) => (p + 1) % ZINC_THEMES.length),
      autoSpeed,
    );
  }, [autoSpeed]);

  useEffect(() => {
    startAuto();
    return () => clearInterval(autoRef.current);
  }, [startAuto]);

  const pickTheme = (i) => {
    setThemeIdx(i);
    clearInterval(autoRef.current);
    startAuto();
  };

  // 3-D drag
  const onPointerDown = (e) => {
    drag.current.active = true;
    drag.current.startX = e.clientX;
    drag.current.startY = e.clientY;
    if (wrapperRef.current) wrapperRef.current.style.animation = "none";
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    const dy = e.clientY - drag.current.startY;
    drag.current.rotY += dx * 0.4;
    drag.current.rotX = Math.max(
      -30,
      Math.min(30, drag.current.rotX - dy * 0.3),
    );
    drag.current.startX = e.clientX;
    drag.current.startY = e.clientY;
    if (wrapperRef.current)
      wrapperRef.current.style.transform = `rotateY(${drag.current.rotY}deg) rotateX(${drag.current.rotX}deg)`;
  };
  const onPointerUp = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setTimeout(() => {
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = "";
        wrapperRef.current.style.animation = "";
      }
    }, 1600);
  };

  const theme = ZINC_THEMES[themeIdx];

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        userSelect: "none",
        ...style,
      }}
    >
      {/* 3-D scene */}
      <div style={{ perspective: 1100 }}>
        <div
          ref={wrapperRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          style={{
            transformStyle: "preserve-3d",
            animation: "iphoneFloat 14s ease-in-out infinite",
            cursor: "grab",
            position: "relative",
          }}
        >
          {/* Lime ambient glow — the signature detail */}
          <div
            style={{
              position: "absolute",
              inset: -28,
              borderRadius: 70,
              background: `radial-gradient(ellipse, ${LIME.base} 0%, transparent 72%)`,
              opacity: 0.1,
              filter: "blur(24px)",
              zIndex: -1,
              pointerEvents: "none",
            }}
          />

          {/* Phone body */}
          <div
            style={{
              width: 268,
              height: 560,
              borderRadius: 46,
              background: theme.bg,
              position: "relative",
              transformStyle: "preserve-3d",
              transition: "background 0.7s ease",
            }}
          >
            {/* Outer frame ring */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 46,
                border: `1.5px solid ${theme.frame}`,
                pointerEvents: "none",
                zIndex: 10,
              }}
            />

            {/* Lime accent ring — signature touch */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 46,
                border: `1px solid rgba(163,230,53,0.08)`,
                pointerEvents: "none",
                zIndex: 11,
              }}
            />

            {/* Side edges (depth) */}
            <div
              style={{
                position: "absolute",
                left: -5,
                top: 44,
                bottom: 44,
                width: 5,
                borderRadius: "3px 0 0 3px",
                background: "inherit",
                filter: "brightness(0.55)",
                transform: "translateZ(-3px)",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: -5,
                top: 44,
                bottom: 44,
                width: 5,
                borderRadius: "0 3px 3px 0",
                background: "inherit",
                filter: "brightness(0.5)",
                transform: "translateZ(-3px)",
              }}
            />

            {/* Buttons */}
            {[
              { left: -7, top: 108, width: 3, height: 26 },
              { left: -7, top: 148, width: 3, height: 42 },
              { left: -7, top: 198, width: 3, height: 42 },
              { right: -7, top: 148, width: 3, height: 62 },
            ].map((btn, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  background: "inherit",
                  filter: "brightness(0.65)",
                  borderRadius: 2,
                  ...btn,
                }}
              />
            ))}

            {/* Screen */}
            <div
              style={{
                position: "absolute",
                inset: 10,
                borderRadius: 38,
                overflow: "hidden",
                background: "#080808",
                zIndex: 5,
              }}
            >
              {/* Screen glare */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 38,
                  zIndex: 30,
                  pointerEvents: "none",
                  background:
                    "linear-gradient(140deg,rgba(255,255,255,0.055) 0%,transparent 48%)",
                }}
              />

              <DynamicIsland />
              <StatusBar />
              <PortfolioScreen developer={developer} />

              {/* Home indicator */}
              <div
                style={{
                  position: "absolute",
                  bottom: 7,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 88,
                  height: 4,
                  background: "rgba(255,255,255,0.25)",
                  borderRadius: 99,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      
      <div
        style={{
          display: "flex",
          gap: 10,
          marginTop: 20,
          alignItems: "center",
        }}
      >
        {ZINC_THEMES.map((t, i) => (
          <button
            key={t.label}
            title={t.label}
            onClick={() => pickTheme(i)}
            style={{
              width: 13,
              height: 13,
              borderRadius: "50%",
              cursor: "pointer",
              padding: 0,
              background:
                i === 0
                  ? "#18181b"
                  : i === 1
                    ? "#3f3f46"
                    : i === 2
                      ? "#71717a"
                      : "#a1a1aa",
              border:
                themeIdx === i
                  ? `2px solid ${LIME.base}`
                  : "2px solid rgba(255,255,255,0.15)",
              transform: themeIdx === i ? "scale(1.4)" : "scale(1)",
              transition: "transform 0.2s, border-color 0.2s",
              outline: "none",
            }}
          />
        ))}
        <span
          style={{
            fontSize: 10,
            color: "rgba(255,255,255,0.28)",
            fontFamily: "Inter,system-ui,sans-serif",
            marginLeft: 4,
            letterSpacing: "0.3px",
          }}
        >
          {ZINC_THEMES[themeIdx].label}
        </span>
      </div>

      <p
        style={{
          fontSize: 10,
          color: "rgba(255,255,255,0.22)",
          marginTop: 8,
          fontFamily: "Inter,system-ui,sans-serif",
          letterSpacing: "0.4px",
        }}
      >
        Drag to rotate
      </p>

      <style>{`
        @keyframes iphoneFloat {
          0%   { transform: rotateY(-20deg) rotateX(6deg)  translateY(0px);   }
          25%  { transform: rotateY(2deg)   rotateX(3deg)  translateY(-10px); }
          50%  { transform: rotateY(20deg)  rotateX(6deg)  translateY(0px);   }
          75%  { transform: rotateY(2deg)   rotateX(3deg)  translateY(10px);  }
          100% { transform: rotateY(-20deg) rotateX(6deg)  translateY(0px);   }
        }
      `}</style>
    </div>
  );
}

export { DEVELOPER, ZINC_THEMES };
