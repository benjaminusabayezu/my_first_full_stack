import React from "react";
import { motion } from "framer-motion";
import { Lock, Bubbles, Bell } from "lucide-react";

const UnderDevelopment = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0a0909] overflow-hidden px-6">
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute w-[500px] h-[500px] bg-lime-500/10 blur-3xl rounded-full"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative text-center max-w-xl"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="flex justify-center mb-6"
        >
          <div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
            <Lock className="text-lime-400 w-7 h-7" />
          </div>
        </motion.div>

        {/* Main message */}
        <h1 className="text-4xl font-bold text-white mb-3">
          This Section i am still developing.
        </h1>

        <p className="text-zinc-400 mb-8">
          You’ve reached a part is still under construction.
          <br />
          Please an advice to promote my frontend UI/UX.
        </p>

        {/* Status badge */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Bell className="w-4 h-4 text-lime-400" />
          <span className="text-sm text-zinc-400">Page: In Progress</span>
        </div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1 }}
          className="h-[2px] bg-gradient-to-r from-transparent via-lime-400 to-transparent mb-6"
        />

        <p className="text-zinc-500 text-sm">
          Access will be added once better UI/UX standards are met.
        </p>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 right-10"
        >
          <Bubbles className="text-lime-400/40 w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default UnderDevelopment;
