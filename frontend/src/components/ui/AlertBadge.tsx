interface AlertBadgeProps {
  severity: "High" | "Medium" | "Low" | string;
}

export function AlertBadge({ severity }: AlertBadgeProps) {
  let colorClass = "";
  let glowClass = "";
  
  switch (severity.toLowerCase()) {
    case "high":
      colorClass = "text-red-400 bg-red-500/10 border-red-500/30";
      glowClass = "neon-glow-red hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]";
      break;
    case "medium":
      colorClass = "text-yellow-400 bg-yellow-500/10 border-yellow-500/30";
      glowClass = "neon-glow-yellow hover:shadow-[0_0_15px_rgba(234,179,8,0.5)]";
      break;
    case "low":
    default:
      colorClass = "text-green-400 bg-green-500/10 border-green-500/30";
      break;
  }

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${colorClass} ${glowClass}`}>
      {severity}
    </span>
  );
}
