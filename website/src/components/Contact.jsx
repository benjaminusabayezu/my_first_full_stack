import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const data = [
  {
    icon: Mail,
    label: "Email",
    value: "benjaminusab@gmail.com",
    color: "text-lime-400",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+250 784 445 193",
    color: "text-blue-400",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Kigali, Rwanda",
    color: "text-purple-400",
  },
];

const Contact = () => {
  const [active, setActive] = useState(null);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-t from-lime-950 via-lime-900 to-zinc-800 overflow-hidden">
      {/*  moving glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{ repeat: Infinity, duration: 10 }}
        className="absolute w-[400px] h-[400px] bg-lime-500/10 blur-3xl rounded-full"
      />

      {/* CENTER  */}
      <div className="relative flex items-center justify-center">
        {/* RING */}
        <div className="relative w-[420px] h-[420px]">
          {data.map((item, i) => {
            const Icon = item.icon;

            const angle = (i / data.length) * 2 * Math.PI;
            const radius = 160;

            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.div
                key={item.label}
                onClick={() => setActive(item)}
                whileHover={{ scale: 1.2 }}
                animate={{
                  x,
                  y,
                }}
                transition={{ type: "spring", stiffness: 80 }}
                className="absolute top-1/2 left-1/2 cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-lg">
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
              </motion.div>
            );
          })}

          {/* CENTER  */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              w-44 h-44 rounded-full bg-zinc-900 border border-zinc-400
              flex items-center justify-center text-center p-4"
          >
            <p className="text-zinc-400 text-sm cursor-pointer">
              Click an icon to explore my contact
            </p>
          </motion.div>
        </div>
      </div>

      {/* EXPANDING PANEL */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2
              w-[360px] bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <active.icon className="text-lime-400 w-5 h-5" />
              <h3 className="text-white font-semibold">{active.label}</h3>
            </div>

            <p className="text-zinc-400 mb-4">{active.value}</p>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-2 bg-lime-400 text-black font-semibold py-2 rounded-lg"
            >
              <Send className="w-4 h-4" />
              Copy / Use
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
