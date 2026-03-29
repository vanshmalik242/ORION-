"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, AlertTriangle, Map, LogOut } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Alerts", href: "/alerts", icon: AlertTriangle },
    { name: "Geomap", href: "/map", icon: Map },
  ];

  return (
    <aside className="w-64 h-screen glass border-r border-slate-800 flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent flex items-center gap-2">
          <AlertTriangle className="text-blue-500" />
          IDS Portal
        </h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
              }`}
            >
              <Icon size={20} className={isActive ? "text-blue-400" : ""} />
              <span className="font-medium">{link.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <Link href="/login" className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Logout / Login</span>
        </Link>
      </div>
    </aside>
  );
}
