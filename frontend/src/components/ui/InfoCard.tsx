"use client";

import { ReactNode, MouseEvent, useState, useRef } from "react";

interface InfoCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  trendUp?: boolean;
}

export function InfoCard({ title, value, icon, trend, trendUp }: InfoCardProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -15; // Max 15 degree tilt
    const rotateY = ((x - centerX) / centerX) * 15;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className="perspective-1000">
      <div 
        ref={cardRef}
        className="glass p-6 rounded-2xl relative overflow-hidden group shadow-lg transition-transform duration-200 ease-out h-full border border-slate-700/50"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${rotation.x ? 1.05 : 1}, ${rotation.x ? 1.05 : 1}, 1)`,
          transformStyle: "preserve-3d"
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex justify-between items-start relative z-10" style={{ transform: "translateZ(30px)" }}>
          <div>
            <p className="text-sm font-medium text-slate-400 mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-slate-50">{value}</h3>
            
            {trend && (
              <p className={`text-sm mt-2 flex items-center gap-1 ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
                <span className="font-semibold">{trend}</span> vs last week
              </p>
            )}
          </div>
          <div className="p-3 bg-slate-800/50 rounded-xl text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            {icon}
          </div>
        </div>
        
        {/* Decorative gradient blob */}
        <div 
          className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/30 transition-all duration-500 pointer-events-none"
          style={{ transform: "translateZ(10px)" }}
        ></div>
      </div>
    </div>
  );
}
