"use client";

import { useEffect, useState, useRef } from "react";

interface Log {
  id: number;
  message: string;
  source: string;
  timestamp: string;
  level: "info" | "warn" | "critical";
}

export function LogStream() {
  const [logs, setLogs] = useState<Log[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  // Simulate pushing logs every few seconds
  useEffect(() => {
    const IPs = ["192.168.1.105", "10.0.0.42", "172.16.254.1", "8.8.8.8", "unknown"];
    const actions = [
      "DDoS Attack Detected on Port 443",
      "Brute Force Login Attempt Failed",
      "SQLi Injection String Detected",
      "Malware Signature Match: Trojan.Win32",
      "Cross-Site Scripting (XSS) Blocked"
    ];
    
    const interval = setInterval(() => {
      const isCritical = Math.random() > 0.8;
      const isWarn = Math.random() > 0.6;
      
      const newLog: Log = {
        id: Date.now(),
        message: actions[Math.floor(Math.random() * actions.length)],
        source: IPs[Math.floor(Math.random() * IPs.length)],
        timestamp: new Date().toISOString().split('T')[1].substring(0, 8),
        level: isCritical ? "critical" : isWarn ? "warn" : "info"
      };

      setLogs(prev => {
        const newLogs = [...prev, newLog];
        return newLogs.slice(-20); // Keep last 20 logs
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#151923] rounded-xl border border-slate-800/60 p-6 relative flex flex-col h-[350px]">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800/50 pb-4">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          <span className="font-semibold text-slate-200">Log Stream</span>
        </div>
        
        <div className="flex gap-2">
            <button className="text-slate-500 hover:text-slate-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </button>
            <button className="text-slate-500 hover:text-slate-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar font-mono text-sm"
      >
        {logs.map(log => (
          <div key={log.id} className="flex items-start gap-4 hover:bg-slate-800/30 p-1 rounded transition-colors group">
            <span className="text-slate-500 min-w-[70px]">{log.timestamp}</span>
            <span className={`min-w-[70px] ${
                log.level === 'critical' ? 'text-red-400' :
                log.level === 'warn' ? 'text-yellow-400' : 'text-blue-400'
            }`}>
                [{log.level.toUpperCase()}]
            </span>
            <span className="text-slate-300">{log.source}</span>
            <span className="text-slate-400 group-hover:text-slate-200 transition-colors flex-1">{log.message}</span>
          </div>
        ))}
        {logs.length === 0 && (
          <div className="text-slate-600 text-center mt-10 italic">Waiting for initial telemetry data...</div>
        )}
      </div>
    </div>
  );
}
