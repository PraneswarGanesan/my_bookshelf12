/**
 * Intro.jsx  ·  Awwwards-level rewrite
 *
 * Aesthetic direction: Editorial Brutalism × Kinetic Luxury
 * — Ink-bleed canvas cursor trail
 * — Char-scramble text reveals (no extra libs)
 * — Magnetic name hover
 * — Horizontal panel journey → vertical final reveal
 * — Film-grain SVG overlay (existing pattern, kept)
 * — Zero new runtime deps (framer-motion + react already present)
 */

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

import eye       from "../assets/introsection/eye.jpg";
import plant     from "../assets/introsection/plant.jpg";
import sculpture from "../assets/introsection/sculpture.jpg";
import whiteplant from "../assets/introsection/whiteplantbranch.jpg";
import shotofme  from "../assets/introsection/shotofme.jpeg";

/* ─── constants ──────────────────────────────────────────────── */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
const EASE_EXPO = [0.16, 1, 0.3, 1];

/* ─── Film grain ─────────────────────────────────────────────── */
const Grain = () => (
  <div style={{
    position: "fixed", inset: 0, zIndex: 9999,
    pointerEvents: "none", mixBlendMode: "overlay", opacity: 0.18,
  }}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.78" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  </div>
);

/* ─── Canvas ink-bleed cursor trail ─────────────────────────── */
const InkTrail = () => {
  const canvasRef = useRef(null);
  const drops = useRef([]);
  const mouse = useRef({ x: -999, y: -999 });
  const raf   = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      for (let i = 0; i < 3; i++) {
        drops.current.push({
          x: e.clientX + (Math.random() - 0.5) * 18,
          y: e.clientY + (Math.random() - 0.5) * 18,
          r: Math.random() * 7 + 3,
          alpha: Math.random() * 0.55 + 0.25,
          vx: (Math.random() - 0.5) * 0.6,
          vy: Math.random() * 0.8 + 0.3,
          life: 1,
        });
      }
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drops.current = drops.current.filter(d => d.life > 0.01);
      for (const d of drops.current) {
        d.x    += d.vx;
        d.y    += d.vy;
        d.r    *= 1.018;
        d.life *= 0.91;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${d.alpha * d.life})`;
        ctx.fill();
      }
      raf.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "fixed", inset: 0, zIndex: 9998,
      pointerEvents: "none", mixBlendMode: "screen",
    }} />
  );
};

/* ─── Char-scramble hook ─────────────────────────────────────── */
function useScramble(target, { trigger = true, speed = 40, delay = 0 } = {}) {
  const [text, setText] = useState("");
  const frame = useRef(0);
  const timer = useRef(null);

  useEffect(() => {
    if (!trigger) return;
    let iteration = 0;
    clearInterval(timer.current);
    const start = () => {
      timer.current = setInterval(() => {
        setText(
          target.split("").map((char, i) => {
            if (i < iteration) return char;
            if (char === " ") return " ";
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join("")
        );
        if (iteration >= target.length) clearInterval(timer.current);
        iteration += 0.6;
      }, speed);
    };
    const t = setTimeout(start, delay);
    return () => { clearTimeout(t); clearInterval(timer.current); };
  }, [trigger, target, speed, delay]);

  return text || target.split("").map(() => " ").join("");
}

/* ─── ScrambleText component ─────────────────────────────────── */
const ScrambleText = ({ children, trigger, delay = 0, className = "", style = {} }) => {
  const text = useScramble(children, { trigger, delay, speed: 35 });
  return <span className={className} style={style}>{text}</span>;
};

/* ─── Magnetic element ───────────────────────────────────────── */
const Magnetic = ({ children, strength = 0.35, className = "" }) => {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 160, damping: 22 });
  const y = useSpring(0, { stiffness: 160, damping: 22 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, display: "inline-block" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
};

/* ─── Thin horizontal rule ───────────────────────────────────── */
const Rule = ({ delay = 0, color = "rgba(255,255,255,0.15)" }) => (
  <motion.div
    initial={{ scaleX: 0, originX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ duration: 1.4, delay, ease: EASE_EXPO }}
    style={{ height: "0.5px", background: color, width: "100%" }}
  />
);

/* ─── Panel image with deep parallax ────────────────────────── */
const PanelImage = ({ src, grayscale = false, xOffset = "0%", style = {} }) => (
  <motion.div
    className="absolute inset-0"
    initial={{ scale: 1.15 }}
    animate={{ scale: 1 }}
    transition={{ duration: 2.2, ease: EASE_EXPO }}
    style={style}
  >
    <img
      src={src}
      className="w-full h-full object-cover"
      style={{
        transform: `translateX(${xOffset})`,
        filter: grayscale ? "grayscale(1) contrast(1.1)" : "contrast(1.05) brightness(0.88)",
        transition: "transform 0.1s",
      }}
      alt=""
      draggable={false}
    />
  </motion.div>
);

/* ─── Large display label ────────────────────────────────────── */
const DisplayLabel = ({ children, size = "clamp(3.5rem,8vw,9rem)", color = "#fff",
  weight = 900, tracking = "-0.03em", className = "", delay = 0, trigger = true }) => {
  const text = useScramble(children, { trigger, delay, speed: 28 });
  return (
    <motion.div
      initial={{ y: "110%", opacity: 0 }}
      animate={trigger ? { y: "0%", opacity: 1 } : {}}
      transition={{ duration: 1.1, delay, ease: EASE_EXPO }}
      style={{ overflow: "hidden" }}
    >
      <div style={{
        fontSize: size, color, fontWeight: weight,
        letterSpacing: tracking, lineHeight: 0.92,
        fontFamily: "'Helvetica Neue', 'Arial Black', sans-serif",
      }} className={className}>
        {text}
      </div>
    </motion.div>
  );
};

/* ─── Counter badge ──────────────────────────────────────────── */
const Badge = ({ n, total }) => (
  <div style={{
    fontFamily: "monospace", fontSize: "0.65rem",
    color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em",
  }}>
    {String(n).padStart(2, "0")} / {String(total).padStart(2, "0")}
  </div>
);

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function Intro() {
  const [activePanel, setActivePanel] = useState(0);
  const [entered,     setEntered]     = useState(false);
  const [finalVisible,setFinalVisible]= useState(false);
  const [finalHovered,setFinalHovered]= useState(false);

  const wrapRef   = useRef(null);
  const finalRef  = useRef(null);
  const totalPanels = 5;

  /* ── Scroll → panel index ─────────────────────────────────── */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const sectionH = (scrollHeight - clientHeight) / (totalPanels + 1);
      const idx = Math.min(Math.floor(scrollTop / sectionH), totalPanels - 1);
      setActivePanel(idx);
      const finalThreshold = sectionH * totalPanels;
      setFinalVisible(scrollTop >= finalThreshold - 80);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Enter animation trigger ──────────────────────────────── */
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 300);
    return () => clearTimeout(t);
  }, []);

  /* ── Panel data ───────────────────────────────────────────── */
  const panels = [
    {
      img: sculpture,
      label: "WAIT",
      sub: "Loading presence…",
      caption: "§ 001 — Arrival",
      bg: "#050505",
      grayscale: false,
    },
    {
      img: whiteplant,
      label: "LOOKING",
      sub: "for someone?",
      caption: "§ 002 — Question",
      bg: "#0c0c0c",
      grayscale: true,
    },
    {
      img: plant,
      label: "TASTE",
      sub: "Someone with —",
      caption: "§ 003 — Calibration",
      bg: "#0e110e",
      grayscale: false,
    },
    {
      img: eye,
      label: "BUILDS",
      sub: "Someone who —",
      caption: "§ 004 — Vision",
      bg: "#0b0b10",
      grayscale: false,
    },
    {
      label: "someone",
      sub: "Developer · Designer · Writer · Open Source",
      caption: "§ 005 — Identity",
      bg: "#080808",
      grayscale: false,
      isText: true,
    },
  ];

  const activeP = panels[activePanel] || panels[0];

  return (
    <div
      ref={wrapRef}
      style={{
        position: "relative",
        height: "100vh",
        overflowY: "scroll",
        background: "#050505",
        scrollSnapType: "y mandatory",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
      }}
    >
      <Grain />
      <InkTrail />

      {/* ── Scroll sections (snapped) ──────────────────────────*/}
      {panels.map((p, i) => (
        <div key={i} style={{
          height: "100vh",
          scrollSnapAlign: "start",
          position: "relative",
          overflow: "hidden",
          background: p.bg,
        }}>
          {/* Background image */}
          {!p.isText && (
            <>
              <PanelImage src={p.img} grayscale={p.grayscale} />
              {/* Deep vignette */}
              <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: "radial-gradient(ellipse at center, transparent 18%, rgba(0,0,0,0.82) 100%)",
              }} />
              <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 28%, transparent 65%, rgba(0,0,0,0.95) 100%)",
              }} />
            </>
          )}

          {/* Pure text panel (panel 5) */}
          {p.isText && (
            <div style={{
              position: "absolute", inset: 0,
              background: "repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(255,255,255,0.025) 60px)",
            }} />
          )}

          {/* Top bar */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0,
            padding: "1.8rem 2.4rem",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            zIndex: 10,
          }}>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={activePanel === i ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE_EXPO }}
              style={{ fontFamily: "monospace", fontSize: "0.65rem",
                color: "rgba(255,255,255,0.3)", letterSpacing: "0.18em", textTransform: "uppercase" }}
            >
              {p.caption}
            </motion.div>
            <Badge n={i + 1} total={totalPanels} />
          </div>

          {/* Main label — giant */}
          <div style={{
            position: "absolute",
            left: "2.4rem", right: "2.4rem",
            bottom: p.isText ? "auto" : "6rem",
            top: p.isText ? "50%" : "auto",
            transform: p.isText ? "translateY(-50%)" : "none",
            zIndex: 10,
          }}>
            {p.isText ? (
              /* Identity panel: stacked roles */
              <div style={{ textAlign: "center" }}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={activePanel === i ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1.2, ease: EASE_EXPO }}
                >
                  <div style={{
                    fontSize: "clamp(0.6rem, 1.1vw, 0.8rem)",
                    letterSpacing: "0.55em",
                    color: "rgba(255,255,255,0.28)",
                    textTransform: "uppercase",
                    marginBottom: "2.5rem",
                    fontFamily: "monospace",
                  }}>
                    <ScrambleText trigger={activePanel === i} delay={100}>Developer</ScrambleText>
                    {" · "}
                    <ScrambleText trigger={activePanel === i} delay={300}>Designer</ScrambleText>
                    {" · "}
                    <ScrambleText trigger={activePanel === i} delay={500}>Writer</ScrambleText>
                    {" · "}
                    <ScrambleText trigger={activePanel === i} delay={700}>Open Source</ScrambleText>
                  </div>
                </motion.div>

                <Magnetic strength={0.28}>
                  <DisplayLabel
                    size="clamp(5rem,13vw,13rem)"
                    trigger={activePanel === i}
                    delay={0.1}
                    color="#fff"
                  >
                    {p.label}
                  </DisplayLabel>
                </Magnetic>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={activePanel === i ? { scaleX: 1 } : {}}
                  transition={{ duration: 1.6, delay: 0.5, ease: EASE_EXPO }}
                  style={{
                    height: "0.5px", background: "rgba(255,255,255,0.12)",
                    width: "100%", marginTop: "2.5rem",
                    transformOrigin: "left",
                  }}
                />
              </div>
            ) : (
              /* Normal panel: huge label */
              <>
                <div style={{
                  fontSize: "clamp(0.6rem, 1vw, 0.75rem)",
                  letterSpacing: "0.45em",
                  color: "rgba(255,255,255,0.38)",
                  textTransform: "uppercase",
                  marginBottom: "0.8rem",
                }}>
                  <ScrambleText trigger={activePanel === i} delay={0}>
                    {p.sub}
                  </ScrambleText>
                </div>

                <div style={{ overflow: "hidden" }}>
                  <DisplayLabel
                    size="clamp(4.5rem,11vw,11rem)"
                    trigger={activePanel === i}
                    delay={0.12}
                  >
                    {p.label}
                  </DisplayLabel>
                </div>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={activePanel === i ? { scaleX: 1 } : {}}
                  transition={{ duration: 1.4, delay: 0.4, ease: EASE_EXPO }}
                  style={{
                    height: "0.5px",
                    background: "rgba(255,255,255,0.1)",
                    width: "clamp(80px,18vw,240px)",
                    marginTop: "1.4rem",
                    transformOrigin: "left",
                  }}
                />
              </>
            )}
          </div>

          {/* Scroll indicator — only panel 0 */}
          {i === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 1 }}
              style={{
                position: "absolute", bottom: "2rem", right: "2.4rem",
                display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
                zIndex: 10,
              }}
            >
              <div style={{
                fontFamily: "monospace", fontSize: "0.58rem",
                color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em",
                writingMode: "vertical-rl", textTransform: "uppercase",
              }}>
                Scroll
              </div>
              <motion.div
                style={{ width: "0.5px", background: "rgba(255,255,255,0.2)", originY: 0 }}
                animate={{ scaleY: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div style={{ width: 1, height: 48 }} />
              </motion.div>
            </motion.div>
          )}
        </div>
      ))}

      {/* ── Final reveal section ───────────────────────────────── */}
      <div
        ref={finalRef}
        style={{
          height: "100vh",
          scrollSnapAlign: "start",
          position: "relative",
          overflow: "hidden",
          background: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Ambient grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }} />

        {/* Corner marks */}
        {[
          { top: "1.5rem", left: "1.5rem" },
          { top: "1.5rem", right: "1.5rem" },
          { bottom: "1.5rem", left: "1.5rem" },
          { bottom: "1.5rem", right: "1.5rem" },
        ].map((pos, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={finalVisible ? { opacity: 1 } : {}}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            style={{
              position: "absolute", width: 20, height: 20,
              borderColor: "rgba(255,255,255,0.12)", borderStyle: "solid",
              borderWidth: pos.bottom ? "0 0 0.5px 0.5px" : pos.top && pos.right ? "0.5px 0.5px 0 0" : pos.top ? "0.5px 0 0 0.5px" : "0 0.5px 0.5px 0",
              ...pos,
            }}
          />
        ))}

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.94 }}
          animate={finalVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1.4, ease: EASE_EXPO, delay: 0.2 }}
          onHoverStart={() => setFinalHovered(true)}
          onHoverEnd={() => setFinalHovered(false)}
          whileHover={{ scale: 1.04 }}
          style={{
            position: "relative",
            cursor: "none",
            zIndex: 2,
          }}
        >
          {/* Photo frame */}
          <div style={{
            width: "clamp(180px,22vw,310px)",
            position: "relative",
            outline: "0.5px solid rgba(255,255,255,0.08)",
          }}>
            <img
              src={shotofme}
              alt="Praneswar"
              style={{ width: "100%", display: "block", aspectRatio: "3/4", objectFit: "cover" }}
              draggable={false}
            />

            {/* Hover sheen */}
            <motion.div
              animate={{
                opacity: finalHovered ? 1 : 0,
                background: finalHovered
                  ? "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 55%)"
                  : "transparent",
              }}
              style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Side label */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={finalVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.8, ease: EASE_EXPO }}
            style={{
              position: "absolute",
              right: "calc(-1 * clamp(100px,14vw,200px))",
              top: "50%",
              transform: "translateY(-50%)",
              writingMode: "vertical-rl",
              fontSize: "clamp(0.55rem,0.85vw,0.72rem)",
              letterSpacing: "0.35em",
              color: "rgba(255,255,255,0.2)",
              textTransform: "uppercase",
              fontFamily: "monospace",
            }}
          >
            Praneswar · 2025
          </motion.div>
        </motion.div>

        {/* Name — bottom center */}
        <div style={{
          position: "absolute",
          bottom: "3.5rem", left: 0, right: 0,
          textAlign: "center",
          zIndex: 10,
        }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={finalVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: EASE_EXPO, delay: 0.5 }}
          >
            <Magnetic strength={0.22}>
              <div style={{
                fontSize: "clamp(0.65rem,1.2vw,0.85rem)",
                letterSpacing: "0.55em",
                color: "rgba(255,255,255,0.38)",
                textTransform: "uppercase",
                fontFamily: "monospace",
                marginBottom: "0.5rem",
              }}>
                Hi, I&apos;m
              </div>
              <div style={{
                fontSize: "clamp(2.8rem,6vw,6rem)",
                fontWeight: 900,
                color: "#fff",
                letterSpacing: "-0.03em",
                lineHeight: 0.9,
                fontFamily: "'Helvetica Neue', 'Arial Black', sans-serif",
                textShadow: finalHovered
                  ? "0 0 80px rgba(255,255,255,0.18)"
                  : "none",
                transition: "text-shadow 0.4s",
              }}>
                <ScrambleText trigger={finalVisible} delay={400}>
                  Hi Im Praneswar
                </ScrambleText>
              </div>
            </Magnetic>
          </motion.div>
        </div>

        {/* Micro caption */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={finalVisible ? { opacity: 1 } : {}}
          transition={{ delay: 1.6, duration: 0.8 }}
          style={{
            position: "absolute",
            top: "1.8rem", left: 0, right: 0,
            textAlign: "center",
            fontFamily: "monospace",
            fontSize: "0.58rem",
            letterSpacing: "0.22em",
            color: "rgba(255,255,255,0.18)",
            textTransform: "uppercase",
            zIndex: 10,
          }}
        >
          § 006 — Presence
        </motion.div>
      </div>

      {/* ── Panel nav dots ─────────────────────────────────────── */}
      <div style={{
        position: "fixed",
        left: "1.6rem",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        zIndex: 100,
      }}>
        {[...panels, { caption: "Final" }].map((_, i) => (
          <motion.button
            key={i}
            onClick={() => {
              const el = wrapRef.current;
              if (!el) return;
              const sectionH = el.scrollHeight / (totalPanels + 1);
              el.scrollTo({ top: sectionH * i, behavior: "smooth" });
            }}
            animate={{
              width: (i === totalPanels ? finalVisible : activePanel === i && !finalVisible) ? 24 : 4,
              background: (i === totalPanels ? finalVisible : activePanel === i && !finalVisible)
                ? "rgba(255,255,255,0.9)"
                : "rgba(255,255,255,0.2)",
            }}
            style={{
              height: 4,
              borderRadius: 99,
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
            transition={{ duration: 0.4, ease: EASE_EXPO }}
          />
        ))}
      </div>
    </div>
  );
}