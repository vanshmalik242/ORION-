"use client";

import { motion } from "framer-motion";

export function SecurityScore({ score = 87 }: { score?: number }) {
  // SVG arc calculation parameters
  const radius = 100;
  const strokeWidth = 12;
  // A half circle arc (actually slightly more like 3/4 circle for aesthetic)
  const circumference = 2 * Math.PI * radius;
  // Let's create an arc that covers 75% of the circle (giving that bottom opening)
  const arcLength = circumference * 0.75; 
  // Offset to start at bottom-left and end at bottom-right
  const arcOffset = circumference * 0.25;

  const scoreArcLength = (score / 100) * arcLength;

  return (
    <div className="w-full bg-[#151923] rounded-xl border border-slate-800/60 p-6 relative overflow-hidden h-[350px] flex items-center justify-center">
      <div className="absolute top-6 left-6 flex items-center gap-2 z-10">
        <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="font-semibold text-slate-200">Security Score</span>
      </div>

      <div className="relative w-full h-full flex flex-col items-center mt-12">
        <svg className="w-[250px] h-[250px]" style={{ transform: 'rotate(135deg)' }} overflow="visible">
          {/* Background track arc */}
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="#1e293b" // slate-800
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />

          {/* Active green foreground arc */}
          <motion.circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="#22c55e" // green-500
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${scoreArcLength} ${circumference}`}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - scoreArcLength }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ filter: "drop-shadow(0px 0px 8px rgba(34, 197, 94, 0.4))" }}
          />
        </svg>

        {/* Center Score Text */}
        <div className="absolute top-[40%] text-center">
          <motion.div 
            className="text-6xl font-bold tracking-tighter text-slate-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            {score}
            <span className="text-xl text-slate-500 ml-1">/ 100</span>
          </motion.div>
        </div>

        {/* Bottom scale labels */}
        <div className="flex justify-between w-48 px-2 absolute bottom-8 text-xs font-mono text-slate-500">
          <span>0</span>
          <span>100</span>
        </div>
      </div>
    </div>
  );
}
