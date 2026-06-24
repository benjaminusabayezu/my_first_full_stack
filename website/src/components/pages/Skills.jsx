import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SKILLS } from "../Store/skills";
import CircularProgress from "../reusables/CircularProgress";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4 },
  },
};

const Skills = () => {
  const [view, setView] = useState("circular");

  return (
    <section id="skills" className="py-20 px-6 bg-zinc-950 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl font-bold text-center mb-6">My Skills</h2>

        {/* Toggle */}
        <motion.div layout className="flex justify-center mb-10">
          <div className="flex gap-2 p-1 bg-zinc-900 rounded-lg border border-zinc-800">
            <button
              onClick={() => setView("circular")}
              className={`px-4 py-2 text-sm rounded-md transition ${
                view === "circular" ? "bg-lime-500 text-black" : "text-zinc-400"
              }`}
            >
              Circular
            </button>

            <button
              onClick={() => setView("bar")}
              className={`px-4 py-2 text-sm rounded-md transition ${
                view === "bar" ? "bg-lime-500 text-black" : "text-zinc-400"
              }`}
            >
              Bars
            </button>
          </div>
        </motion.div>

        {/* CIRCULAR VIEW */}
        <AnimatePresence mode="wait">
          {view === "circular" && (
            <motion.div
              key="circular"
              variants={container}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            >
              {SKILLS.map((skill) => {
                const Icon = skill.icon;

                return (
                  <motion.div
                    key={skill.id}
                    variants={item}
                    className="flex flex-col items-center gap-4 p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-lime-500 transition"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-lime-500" />
                      <span className="text-sm">{skill.name}</span>
                    </div>

                    <CircularProgress value={skill.level} />

                    <span className="text-xs text-zinc-400">
                      {skill.experience}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* BAR VIEW */}
        <AnimatePresence mode="wait">
          {view === "bar" && (
            <motion.div
              key="bar"
              variants={container}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {SKILLS.map((skill) => {
                const Icon = skill.icon;

                return (
                  <motion.div
                    key={skill.id}
                    variants={item}
                    className="p-5 bg-zinc-900 border border-zinc-800 rounded-xl"
                  >
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5 text-lime-500" />
                        <span>{skill.name}</span>
                      </div>
                      <span className="text-lime-400">{skill.level}%</span>
                    </div>

                    <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-lime-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>

                    <p className="text-xs text-zinc-400 mt-2">
                      {skill.experience}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;
