import React from 'react';
import { Users, Package, Clock, Cpu, Activity, LucideIcon } from 'lucide-react';

interface CapabilityItem {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
  glowColor: string;
  features: string[];
}

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'shopper',
    title: 'Shopper Analytics',
    subtitle: 'Understand how customers move through the store.',
    icon: Users,
    color: 'text-emerald-400',
    glowColor: 'group-hover:border-emerald-500/50 group-hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]',
    features: ['Footfall', 'Dwell Time', 'Movement', 'Heatmaps'],
  },
  {
    id: 'inventory',
    title: 'Inventory Intelligence',
    subtitle: 'Improve product availability and shelf visibility.',
    icon: Package,
    color: 'text-cyan-400',
    glowColor: 'group-hover:border-cyan-500/50 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]',
    features: ['Stock Level', 'Out-of-Stock Detection', 'Planogram Monitoring', 'Shelf Compliance'],
  },
  {
    id: 'queue',
    title: 'Queue Intelligence',
    subtitle: 'Understand and anticipate checkout congestion.',
    icon: Clock,
    color: 'text-amber-400',
    glowColor: 'group-hover:border-amber-500/50 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.15)]',
    features: ['Queue Length', 'Waiting Time', 'Congestion Detection', 'Congestion Prediction'],
  },
  {
    id: 'edge',
    title: 'Edge AI',
    subtitle: 'Process video intelligence locally at the edge where possible.',
    icon: Cpu,
    color: 'text-emerald-300',
    glowColor: 'group-hover:border-emerald-400/50 group-hover:shadow-[0_0_25px_rgba(52,211,153,0.15)]',
    features: ['Low Latency', 'Reduced Cloud Dependency', 'Local Processing', 'Privacy-Aware Analytics'],
  },
  {
    id: 'operational',
    title: 'Operational Intelligence',
    subtitle: 'Convert analytics into actionable store decisions.',
    icon: Activity,
    color: 'text-teal-300',
    glowColor: 'group-hover:border-teal-400/50 group-hover:shadow-[0_0_25px_rgba(45,212,191,0.15)]',
    features: ['Real-Time Alerts', 'AI Insights', 'Staff Optimization', 'Store Performance Monitoring'],
  },
];

interface CapabilityCardsSectionProps {
  onSelectCapability?: (id: string) => void;
}

export const CapabilityCardsSection: React.FC<CapabilityCardsSectionProps> = ({ onSelectCapability }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {CAPABILITIES.map((cap) => {
        const Icon = cap.icon;
        return (
          <div
            key={cap.id}
            onClick={() => onSelectCapability?.(cap.id)}
            className={`group bg-[#0B111D] border border-slate-800 rounded-xl p-6 transition-all duration-300 cursor-pointer hover:-translate-y-1 ${cap.glowColor}`}
          >
            {/* Icon Header with micro-animation */}
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-700/80 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Icon className={`w-5 h-5 ${cap.color} transition-colors duration-300`} />
              </div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider group-hover:text-slate-400">
                AI MODULE
              </span>
            </div>

            {/* Title & Subtitle */}
            <h3 className="text-base font-bold text-white font-display mb-1.5 group-hover:text-emerald-300 transition-colors">
              {cap.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-5">
              {cap.subtitle}
            </p>

            {/* Features Clean List */}
            <div className="pt-4 border-t border-slate-800/80">
              <div className="text-[11px] font-mono text-slate-400 mb-2">Core Features:</div>
              <ul className="space-y-1.5 text-xs">
                {cap.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 group-hover:scale-125 transition-transform" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};
