import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import IPhonePortfolio from "./IPhonePortfolio";
import { useNavigate } from "react-router-dom";
import LoadingModal from "./reusables/LoadingModal";
import { TypeAnimation } from "react-type-animation";


const spring = { type: "spring", stiffness: 38, damping: 22 };


const STACK = [
  { label: "React", angle: 0, r: 180, color: "#61DAFB22", text: "#61DAFB" },
  { label: "Node.js", angle: 55, r: 200, color: "#3C873A22", text: "#6cc24a" },
  {
    label: "Tailwind",
    angle: 118,
    r: 175,
    color: "#38bdf822",
    text: "#38bdf8",
  },
  { label: "Django", angle: 178, r: 195, color: "#0C4B3322", text: "#44B78B" },
  {
    label: "PostgreSQL",
    angle: 238,
    r: 178,
    color: "#336791AA",
    text: "#a8d4f5",
  },
  {
    label: "TypeScript",
    angle: 300,
    r: 190,
    color: "#3178C622",
    text: "#5fa8f5",
  },
];


const toXY = (angleDeg, r) => {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: Math.cos(rad) * r, y: Math.sin(rad) * r };
};

const OrbitPill = ({ label, angle, r, color, text, reducedMotion }) => {
  const { x, y } = toXY(angle, r);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ...spring, delay: 0.8 + angle / 600 }}
      whileHover={{ scale: 1.12 }}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        background: color,
        border: `1px solid ${text}44`,
        color: text,
        borderRadius: "9999px",
        padding: "5px 14px",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.05em",
        whiteSpace: "nowrap",
        backdropFilter: "blur(6px)",
        cursor: "default",
        userSelect: "none",
      }}
    >
      {label}
    </motion.div>
  );
};


const OrbitRing = ({ r, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.6 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1.2, delay, ease: "easeOut" }}
    style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      width: r * 2,
      height: r * 2,
      transform: "translate(-50%, -50%)",
      borderRadius: "50%",
      border: "1px dashed rgba(163,230,53,0.12)",
      pointerEvents: "none",
    }}
  />
);


const SlowRotate = ({ children, reducedMotion }) => {
  const ref = useRef(null);
  const frame = useRef(null);
  const angle = useRef(0);

  useEffect(() => {
    if (reducedMotion) return;
    const tick = () => {
      angle.current += 0.018;
      if (ref.current) {
        ref.current.style.transform = `rotate(${angle.current}deg)`;
      }
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
    >
      {children}
    </div>
  );
};

// ─── hero 
const HeroSection = () => {
  const shouldReduce = useReducedMotion();
  const navigate =useNavigate();
  const [loading,setLoading] =useState (false);
  const [message,setMessage] =useState("");

 const handleGetInTouch =()=>{
  setLoading(true);
  setMessage("Wecome! ..")


  setTimeout (() =>{
    navigate("/home")

  },2000)
  
 }

 const handleViewWork =()=>{
  setLoading(true),
  setMessage("View my Activities...")

  setTimeout(()=>{
    navigate("/activities")
  },2000)
 }


  const fadeUp = shouldReduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
    : { initial: { opacity: 0, y: 56 }, animate: { opacity: 1, y: 0 } };

  return (
    <>
      <LoadingModal isOpen={loading} message={message} />
      <section
        id="home"
        className="relative min-h-screen overflow-hidden bg-gradient-to-b from-zinc-900 via-lime-950 to-zinc-800 flex items-center"
      >
        {/*  behind right side  */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(132,204,22,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="container mx-auto px-6 lg:px-20 xl:px-28 flex flex-col xl:flex-row items-center justify-between gap-16 py-24">
          {/* LEFT: text  */}
          <div className="flex-1 max-w-xl z-10">
            <motion.div
              {...fadeUp}
              transition={{ ...spring, delay: 0.05 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-6 h-px bg-lime-400" />
              <span className="text-lime-400 text-xs font-semibold tracking-widest uppercase">
                Frontend Developer · QA Tester
              </span>
            </motion.div>

            {/* headline */}
            <motion.h1
              {...fadeUp}
              transition={{ ...spring, delay: 0.18 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              <span className="text-zinc-100 p-2">
                <span className="text-yellow-600">Lear</span>n Digit<span className="text-lime-500">al, Mo</span>dern</span>

              <br />

              <TypeAnimation
                sequence={[
                  "Interfaces",
                  2000,
                  "interactive UX",
                  2000,
                  "Full-Stack App",
                  2000,
                  "Products",
                  2000,
                ]}
                speed={45}
                repeat={Infinity}
                className="bg-linear-to-r from-lime-300 via-lime-400 to-yellow-500 bg-clip-text text-transparent"
              />
            </motion.h1>

            {/* bio */}
            <motion.p
              {...fadeUp}
              transition={{ ...spring, delay: 0.32 }}
              className="text-base md:text-lg text-zinc-500 leading-relaxed max-w-md mb-10"
            >
              Passionate about building responsive, accessible, and
              user-friendly web applications with modern technologies.
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...fadeUp}
              transition={{ ...spring, delay: 0.44 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={handleViewWork}
                className="px-7 py-3 rounded-full bg-yellow-500 text-zinc-900 font-semibold text-sm
                hover:bg-yellow-300 active:scale-95 transition-all duration-200"
              >
                View my work
              </button>
              <button
                type="button"
                onClick={handleGetInTouch}
                className="px-7 py-3 rounded-full border border-zinc-600 text-zinc-300 font-semibold text-sm
                hover:border-lime-400 hover:text-lime-400 active:scale-95 transition-all duration-200
                cursor-pointer"
              >
                Get in touch
              </button>
            </motion.div>

            {/* stat row */}
            <motion.div
              {...fadeUp}
              transition={{ ...spring, delay: 0.56 }}
              className="flex gap-8 mt-12"
            >
              {[
                { n: "6+", label: "Technologies" },
                { n: "10+", label: "Projects built" },
                { n: "2+", label: "Years learning" },
              ].map(({ n, label }) => (
                <div key={label}>
                  <p className="text-2xl font-bold text-yellow-500">{n}</p>
                  <p className="text-xs text-zinc-600 mt-0.5">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: orbital showcase ── */}
          <div
            className="relative flex-shrink-0 z-10"
            style={{ width: 420, height: 520 }}
          >
            {/* orbit rings — static, behind rotation */}
            <OrbitRing r={178} delay={0.5} />
            <OrbitRing r={200} delay={0.65} />

            {/* rotating pill layer */}
            <SlowRotate reducedMotion={shouldReduce}>
              {STACK.map((s) => (
                <OrbitPill key={s.label} {...s} reducedMotion={shouldReduce} />
              ))}
            </SlowRotate>

            {/* phone — counter-rotates to stay upright */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ ...spring, delay: 0.3 }}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 10,
              }}
            >
              {/* subtle glow behind phone */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: "-24px",
                  borderRadius: "40px",
                  background:
                    "radial-gradient(circle, rgba(132,204,22,0.13) 0%, transparent 70%)",
                  filter: "blur(16px)",
                  zIndex: -1,
                }}
              />
              <IPhonePortfolio />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
