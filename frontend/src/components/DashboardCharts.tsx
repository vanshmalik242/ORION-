"use client";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Cell, PieChart, Pie } from 'recharts';

export function DashboardCharts() {
  const radarData = [
    { subject: 'DDoS', A: 120, fullMark: 150 },
    { subject: 'SQLi', A: 98, fullMark: 150 },
    { subject: 'XSS', A: 86, fullMark: 150 },
    { subject: 'Malware', A: 99, fullMark: 150 },
    { subject: 'Brute Force', A: 85, fullMark: 150 },
    { subject: 'Phishing', A: 65, fullMark: 150 },
  ];

  const pieData = [
    { name: 'High', value: 400, color: '#ef4444' },
    { name: 'Medium', value: 300, color: '#eab308' },
    { name: 'Low', value: 300, color: '#3b82f6' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-[300px]">
      <div className="h-full w-full relative group">
        <h3 className="text-sm font-semibold text-slate-400 absolute top-0 left-0 z-10 transition-colors group-hover:text-blue-400">Threat Vectors</h3>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
            <PolarGrid stroke="#1e293b" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
            <Radar name="Threat Matrix" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} strokeWidth={2} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', borderColor: '#1e293b', color: '#f8fafc', backdropFilter: 'blur(8px)', borderRadius: '12px' }} 
              itemStyle={{ color: '#60a5fa' }} 
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="h-full w-full relative flex items-center justify-center group">
        <h3 className="text-sm font-semibold text-slate-400 absolute top-[-5px] left-0 z-10 transition-colors group-hover:text-blue-400">Severity Distribution</h3>
        <div className="relative w-full h-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
                >
                {pieData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      style={{ filter: `drop-shadow(0px 0px 10px ${entry.color}60)` }} 
                    />
                ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', borderColor: '#1e293b', color: '#f8fafc', backdropFilter: 'blur(8px)', borderRadius: '12px' }} 
                  itemStyle={{ color: '#f8fafc' }} 
                />
            </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent transform translate-y-1">ORION</span>
                <span className="text-[10px] text-slate-500 tracking-[0.3em] font-semibold mt-1 uppercase">Active</span>
            </div>
        </div>
      </div>
    </div>
  );
}
