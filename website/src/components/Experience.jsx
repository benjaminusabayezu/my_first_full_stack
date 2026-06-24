import { motion } from "framer-motion";
import { Activity, Zap, Cpu, Flame, Radar } from "lucide-react";

const EXPERIENCE = [
  {
    title: "UI SYSTEM ENGINEER",
    subtitle: "React • Framer Motion • Tailwind",
    power: 45,
    signature: "I don’t design UI. I engineer user attention flow.",
    impact: "Interfaces become instantly more intuitive after my intervention.",
    status: "ACTIVE DOMINANCE",
  },
  {
    title: "FULL STACK TRAINEE (SYSTEM BREAKER MODE)",
    subtitle: "Django • React • PostgreSQL",
    power: 30,
    signature: "I don’t learn backend. I rebuild how systems think.",
    impact: "Every project evolves into scalable architecture patterns.",
    status: "LEARNING → SHIPPING",
  },
  {
    title: "FRONTEND ARCHITECT IN TRAINING",
    subtitle: "Performance • UX Engineering",
    power: 45,
    signature: "Speed, clarity, and obsession with interaction physics.",
    impact: "Pages become faster just by refactoring intent.",
    status: "HIGH EXECUTION STATE",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="relative min-h-screen bg-gradient-to-b from-lime-950 to-zinc-800 text-white px-6 md:px-20 py-24 overflow-hidden">
     
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(132,204,22,0.12),transparent_60%)]" />

      
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-lime-600 via-lime-700 to-zinc-400 bg-clip-text text-transparent tracking-tight">
          EXPERIENCE FIELD
        </h2>
        <p className="text-zinc-500 mt-3">
          Not a Product. it is Just training my self.
        </p>
      </motion.div>


      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {EXPERIENCE.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative group border border-zinc-800 bg-zinc-950/20 rounded-2xl p-6 overflow-hidden shadow-2xl"
          >
           
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-lime-500/10 via-transparent to-transparent" />

            
            <div className="flex items-center justify-between">
              <span className="text-xs text-lime-400 flex items-center gap-2">
                <Radar className="w-4 h-4" />
                {exp.status}
              </span>

              <span className="text-xs text-zinc-500">POWER {exp.power}%</span>
            </div>

           
            <h3 className="text-xl font-bold mt-4 group-hover:text-lime-400 transition">
              {exp.title}
            </h3>

            <p className="text-xs text-zinc-500 mt-1">{exp.subtitle}</p>

            
            <div className="mt-4 h-1 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${exp.power}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-gradient-to-r from-lime-500 to-emerald-400"
              />
            </div>

            {/* SIGNATURE */}
            <div className="mt-5 text-sm text-zinc-300 italic">
            {exp.signature}
            </div>

            {/* IMPACT */}
            <p className="mt-4 text-zinc-500 text-sm leading-relaxed">
              {exp.impact}
            </p>

           
            <div className="absolute bottom-4 right-4 opacity-20 group-hover:opacity-80 transition">
              <Flame className="w-8 h-8 text-lime-400 animate-pulse" />
            </div>
          </motion.div>
        ))}
      </div>

      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-20 text-center text-zinc-600 text-sm"
      >
        SYSTEM STATUS: HIGH PERFORMANCE • UI DOMINANCE ACTIVE • BUILD MODE
        ENGAGED
      </motion.div>
    </section>
  );
};

export default Experience;
