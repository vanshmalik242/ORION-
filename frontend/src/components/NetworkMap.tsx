"use client";

import { motion } from "framer-motion";

export function NetworkMap() {
  const nodes = [
    { id: "internet", label: "Internet", x: 50, y: 90, color: "#eab308" },
    { id: "firewall", label: "Firewall", x: 50, y: 15, color: "#818cf8" },
    { id: "core_router", label: "Core Router", x: 50, y: 35, color: "#22c55e", size: 6 },
    { id: "switch_a", label: "Switch A", x: 30, y: 55, color: "#22c55e", size: 6 },
    { id: "switch_b", label: "Switch B", x: 75, y: 55, color: "#22c55e", size: 6 },
    { id: "web_server", label: "Web Server", x: 20, y: 75, color: "#a855f7" },
    { id: "db_server", label: "DB Server", x: 40, y: 75, color: "#a855f7" },
    { id: "app_server", label: "App Server", x: 65, y: 75, color: "#a855f7" },
    { id: "ids", label: "ORION IDS", x: 85, y: 75, color: "#818cf8" },
  ];

  const connections = [
    { from: "internet", to: "firewall" },
    { from: "firewall", to: "core_router" },
    { from: "core_router", to: "switch_a" },
    { from: "core_router", to: "switch_b" },
    { from: "switch_a", to: "web_server" },
    { from: "switch_a", to: "db_server" },
    { from: "switch_b", to: "app_server" },
    { from: "switch_b", to: "ids" },
  ];

  // Helper function to map positions (0-100 to actual SVG coordinates)
  // SVG viewBox is 0 0 1000 500
  const getX = (pct: number) => (pct / 100) * 1000;
  const getY = (pct: number) => (pct / 100) * 500;

  return (
    <div className="w-full bg-[#151923] rounded-xl border border-slate-800/60 p-6 relative overflow-hidden h-[450px]">
      <div className="absolute top-6 left-6 flex items-center gap-2 z-10">
        <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span className="font-semibold text-slate-200">Network Map</span>
      </div>

      <div className="absolute top-6 right-6 z-10">
        <span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-xs font-bold tracking-wider uppercase">
          Live
        </span>
      </div>

      <svg className="w-full h-full" viewBox="0 0 1000 500">
        {/* Draw connections */}
        {connections.map((conn, i) => {
          const startNode = nodes.find(n => n.id === conn.from)!;
          const endNode = nodes.find(n => n.id === conn.to)!;
          
          return (
            <g key={`conn-${i}`}>
              <line
                x1={getX(startNode.x)}
                y1={getY(startNode.y)}
                x2={getX(endNode.x)}
                y2={getY(endNode.y)}
                stroke="#334155"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="opacity-50"
              />
              
              {/* Traffic packet animation looping along the path */}
              <motion.circle
                r="3"
                fill={startNode.color}
                initial={{ cx: getX(startNode.x), cy: getY(startNode.y), opacity: 0 }}
                animate={{ 
                  cx: [getX(startNode.x), getX(endNode.x)], 
                  cy: [getY(startNode.y), getY(endNode.y)],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: Math.random() * 2 + 1.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 2
                }}
                style={{ filter: `drop-shadow(0 0 4px ${startNode.color})` }}
              />
            </g>
          );
        })}

        {/* Draw Nodes */}
        {nodes.map(node => (
          <g key={node.id}>
            {/* Outer glow ring for certain nodes */}
            <motion.circle
              cx={getX(node.x)}
              cy={getY(node.y)}
              r={(node.size || 8) * 1.5}
              fill="none"
              stroke={node.color}
              strokeWidth="1"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            {/* Core dot */}
            <circle
              cx={getX(node.x)}
              cy={getY(node.y)}
              r={node.size || 8}
              fill={node.color}
              style={{ filter: `drop-shadow(0 0 8px ${node.color})` }}
            />
            {/* Label */}
            <text
              x={getX(node.x)}
              y={getY(node.y) - 20}
              fill="#94a3b8"
              fontSize="12"
              textAnchor="middle"
              className="font-medium select-none"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
