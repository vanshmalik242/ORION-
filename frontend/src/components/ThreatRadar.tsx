"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function ThreatRadar() {
  const [blips, setBlips] = useState<{ id: number, x: number, y: number, color: string, attack: string }[]>([]);

  // Periodically generate new random blips on the radar
  useEffect(() => {
    const colors = ["#ef4444", "#eab308", "#3b82f6"];
    const interval = setInterval(() => {
      // Create a random blip within the circle (0-100% relative coordinates)
      const angle = Math.random() * Math.PI * 2;
      // Keep within 80% radius to stay inside the radar circle
      const radius = Math.random() * 40; 
      
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle);
      const color = colors[Math.floor(Math.random() * colors.length)];
      const attacks = ["DDoS", "SQLi", "XSS", "Brute Force", "Malware"];
      const attack = attacks[Math.floor(Math.random() * attacks.length)];

      const newBlip = { id: Date.now(), x, y, color, attack };
      
      setBlips(prev => [...prev, newBlip]);

      // Remove the blip after 4 seconds (as it fades out)
      setTimeout(() => {
        setBlips(prev => prev.filter(b => b.id !== newBlip.id));
      }, 4000);

    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#151923] rounded-xl border border-slate-800/60 p-6 relative overflow-hidden h-[350px] flex items-center justify-center">
      <div className="absolute top-6 left-6 flex items-center gap-2 z-10">
        <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" />
        </svg>
        <span className="font-semibold text-slate-200">Threat Radar</span>
      </div>

      <div className="absolute top-6 right-6 z-10 text-slate-500 font-mono text-sm">
        {blips.length} active
      </div>

      {/* Radar Container (250x250) */}
      <div className="relative w-[250px] h-[250px] rounded-full mt-4">
        
        {/* Background grid rings */}
        <div className="absolute inset-0 rounded-full border border-slate-700/50"></div>
        <div className="absolute inset-[15%] rounded-full border border-slate-700/50"></div>
        <div className="absolute inset-[30%] rounded-full border border-slate-700/50"></div>
        <div className="absolute inset-[45%] rounded-full border border-slate-700/50"></div>
        
        {/* Crosshairs */}
        <div className="absolute inset-y-0 left-1/2 w-[1px] bg-slate-700/50 -translate-x-1/2"></div>
        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-slate-700/50 -translate-y-1/2"></div>

        {/* The Sweeping Beam */}
        <motion.div 
          className="absolute inset-0 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{
            background: "conic-gradient(from 0deg, transparent 70%, rgba(59, 130, 246, 0.1) 90%, rgba(59, 130, 246, 0.4) 100%)",
            transformOrigin: "center center"
          }}
        />

        {/* The blips */}
        {blips.map(blip => (
          <motion.div
            key={blip.id}
            className="absolute rounded-full flex items-center gap-1"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [1, 1, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 4, ease: "easeOut" }}
            style={{
              left: `${blip.x}%`,
              top: `${blip.y}%`,
              transform: "translate(-50%, -50%)"
            }}
          >
            <div 
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: blip.color,
                boxShadow: `0 0 10px ${blip.color}`,
              }}
            />
            {/* Blip Label */}
            <span 
              className="text-[10px] font-mono whitespace-nowrap hidden md:block"
              style={{ color: blip.color, textShadow: "0 0 5px rgba(0,0,0,0.8)" }}
            >
              {blip.attack}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
