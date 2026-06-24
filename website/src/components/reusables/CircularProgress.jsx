import React from "react";
import { motion } from "framer-motion";

const CircularProgress = ({ value = 0, size = 90, stroke = 7 }) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const gradientId = `grad-${value}-${size}`;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <defs>
        <linearGradient id={gradientId}>
          <stop offset="0%" stopColor="#84cc16" />
          <stop offset="50%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>

      {/* Backgrounds */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#27272a"
        strokeWidth={stroke}
        fill="transparent"
      />

      {/* Progress */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={`url(#${gradientId})`}
        strokeWidth={stroke}
        fill="transparent"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Text */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy="0.35em"
        className="text-xs font-bold fill-white"
      >
        {value}%
      </text>
    </svg>
  );
};

export default CircularProgress;
