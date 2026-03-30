"use client";

import { ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

interface InfoCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  trendUp?: boolean;
}

export function InfoCard({ title, value, icon, trend, trendUp }: InfoCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  function handleMouseMove({ clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Values from -1 to 1 based on mouse position
    const relX = (clientX - rect.left) / rect.width;
    const relY = (clientY - rect.top) / rect.height;

    // Set Max Tilt Degrees
    const tiltMax = 15;
    
    x.set((relY - 0.5) * -tiltMax); // Rotate X based on Y mouse pos
    y.set((relX - 0.5) * tiltMax);  // Rotate Y based on X mouse pos
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // Dynamic glow effect that follows the cursor
  const background = useMotionTemplate`radial-gradient(
    300px circle at calc(50% + ${y}px * 5) calc(50% + ${x}px * -5), 
    rgba(59, 130, 246, 0.15),
    transparent 80%
  )`;

  return (
    <div className="perspective-1000 h-full w-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: mouseX,
          rotateY: mouseY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="glass p-6 rounded-2xl relative overflow-hidden shadow-lg h-full border border-slate-700/50 group"
      >
        {/* Dynamic Glow Background */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background }}
        />

        <div 
          className="flex justify-between items-start relative z-10" 
          style={{ transform: "translateZ(50px)" }}
        >
          <div className="relative z-10">
            <p className="text-sm font-medium text-slate-400 mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-slate-50">{value}</h3>
            
            {trend && (
              <p className={`text-sm mt-2 flex items-center gap-1 ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
                <span className="font-semibold">{trend}</span> vs last week
              </p>
            )}
          </div>
          <div 
            className="p-3 bg-slate-800/50 rounded-xl text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)] relative z-10"
            style={{ transform: "translateZ(75px)" }}
          >
            {icon}
          </div>
        </div>

        {/* Decorative corner glow */}
        <div 
          className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-500 pointer-events-none"
          style={{ transform: "translateZ(10px)" }}
        ></div>
      </motion.div>
    </div>
  );
}
