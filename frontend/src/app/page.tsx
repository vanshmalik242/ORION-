import { NetworkMap } from "@/components/NetworkMap";
import { ThreatRadar } from "@/components/ThreatRadar";
import { SecurityScore } from "@/components/SecurityScore";
import { LogStream } from "@/components/LogStream";
import { StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";

export const revalidate = 0; // Disable static caching

export default async function Dashboard() {
  return (
    <div className="w-full h-full min-h-screen">
      <header className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
             Dashboard Overview
          </h1>
        </div>
      </header>

      <StaggerContainer className="flex flex-col gap-6">
        {/* Top: Massive Network Map spanning full width */}
        <StaggerItem className="w-full">
            <NetworkMap />
        </StaggerItem>

        {/* Middle: 2 Columns for Radar and Score */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            <StaggerItem className="w-full h-full">
                <ThreatRadar />
            </StaggerItem>

            <StaggerItem className="w-full h-full">
                <SecurityScore score={87} />
            </StaggerItem>
        </div>

        {/* Bottom: Wide Log Stream spanning full width */}
        <StaggerItem className="w-full mb-10">
            <div className="h-[250px]">
               <LogStream />
            </div>
        </StaggerItem>
      </StaggerContainer>
    </div>
  );
}
