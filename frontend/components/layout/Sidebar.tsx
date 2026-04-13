'use client';

import { Building, LayoutDashboard, DoorOpen, Bed, Users, Sparkles } from 'lucide-react';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, gradient: 'from-blue-500 to-cyan-500' },
  { id: 'flats', label: 'Flats', icon: Building, gradient: 'from-emerald-500 to-teal-500' },
  { id: 'rooms', label: 'Rooms', icon: DoorOpen, gradient: 'from-violet-500 to-purple-500' },
  { id: 'beds', label: 'Beds', icon: Bed, gradient: 'from-amber-500 to-orange-500' },
  { id: 'tenants', label: 'Tenants', icon: Users, gradient: 'from-rose-500 to-pink-500' },
];

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col shadow-2xl z-10">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-7 h-7 text-indigo-400" />
          <span className="text-2xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
            BedR Suite
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">Property Management System</p>
      </div>
      <nav className="flex-1 p-5 space-y-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                relative w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${isActive 
                  ? `bg-gradient-to-r ${tab.gradient} shadow-lg shadow-${tab.id.split('-')[0]}-500/20 text-white` 
                  : 'hover:bg-white/10 text-slate-300 hover:text-white'
                }
              `}
            >
              <tab.icon size={20} />
              <span className="font-medium">{tab.label}</span>
              {isActive && (
                <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>
      <div className="p-5 border-t border-white/10 text-xs text-slate-400">
        <p>© 2025 BedR Suite</p>
        <p className="mt-1">v2.0 — Real-time occupancy</p>
      </div>
    </aside>
  );
}