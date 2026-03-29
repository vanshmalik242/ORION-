import { InfoCard } from "@/components/ui/InfoCard";
import { AlertBadge } from "@/components/ui/AlertBadge";
import { Activity, ShieldAlert, Wifi, Server } from "lucide-react";
import Link from "next/link";
import { DashboardCharts } from "@/components/DashboardCharts";

interface AlertData {
  id: number;
  type: string;
  severity: string;
  timestamp: string;
  source_ip: string;
  latitude: number | null;
  longitude: number | null;
}

export const revalidate = 0; // Disable static caching

async function getAlerts(): Promise<AlertData[]> {
  try {
    const res = await fetch("http://127.0.0.1:8000/alerts", { cache: "no-store", next: { revalidate: 0 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.alerts || [];
  } catch (error) {
    console.error("Failed to fetch alerts:", error);
    return [];
  }
}

export default async function Dashboard() {
  const alerts = await getAlerts();
  
  const highSeverityCount = alerts.filter(a => a.severity.toLowerCase() === "high").length;
  const recentAlerts = alerts.slice(0, 5);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-50">System Overview</h1>
        <p className="text-slate-400 mt-2">Real-time threat monitoring and analytics.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <InfoCard title="Total Alerts" value={alerts.length} icon={<ShieldAlert size={28} />} trend="+12%" trendUp={false} />
        <InfoCard title="High Severity" value={highSeverityCount} icon={<Activity size={28} className="text-red-400" />} />
        <InfoCard title="Active Sensors" value="5" icon={<Wifi size={28} className="text-green-400" />} />
        <InfoCard title="Network Load" value="45%" icon={<Server size={28} />} trend="-3%" trendUp={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="glass rounded-2xl p-6 lg:col-span-2 shadow-lg relative overflow-hidden group border-slate-700/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 relative z-10">
            <Activity className="text-blue-400" size={20} /> Threat Analytics Overview
          </h2>
          <div className="mt-4 pt-4 relative z-10 border-t border-slate-800/50">
             <DashboardCharts />
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 blur-[120px] pointer-events-none rounded-full group-hover:bg-blue-500/10 transition-colors duration-1000"></div>
        </div>

        <div className="glass rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
               <ShieldAlert className="text-red-400" size={20} /> Recent Threats
            </h2>
            <Link href="/alerts" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">View All</Link>
          </div>
          
          <div className="space-y-4">
            {recentAlerts.length > 0 ? recentAlerts.map(alert => (
              <div key={alert.id} className="p-3 bg-slate-900/50 rounded-xl border border-slate-800 flex justify-between items-start hover:border-slate-700 transition-colors group">
                 <div>
                   <p className="font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">{alert.type || "Unknown Threat"}</p>
                   <p className="text-xs text-slate-500 mt-1">{alert.source_ip} • {alert.timestamp}</p>
                 </div>
                 <AlertBadge severity={alert.severity} />
              </div>
            )) : (
              <p className="text-slate-500 text-sm text-center py-8">No recent alerts found<br/>(API could be offline)</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
