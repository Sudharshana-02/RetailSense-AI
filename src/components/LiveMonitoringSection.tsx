import React from 'react';
import { CctvFeedViewer } from './CctvFeedViewer';
import { StoreLocation } from '../types/retail';
import { useTheme } from '../context/ThemeContext';
import {
  Video,
  Play,
  Users,
  Clock,
  Activity,
  Package,
  Shield,
  Layers,
  Radio,
} from 'lucide-react';

interface LiveMonitoringSectionProps {
  selectedStore: StoreLocation;
  onOpenLiveDemo?: () => void;
}

export const LiveMonitoringSection: React.FC<LiveMonitoringSectionProps> = ({
  selectedStore,
  onOpenLiveDemo,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      id="live-monitoring"
      className={`py-16 border-b transition-colors scroll-mt-20 ${
        isDark
          ? 'bg-[#090D16] border-slate-800 text-slate-100'
          : 'bg-slate-100/70 border-slate-200 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2 font-semibold">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
              </span>
              <span>LIVE VIDEO SURVEILLANCE &amp; EDGE CV STREAM</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white">
              Live Video Monitoring Console
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
              Real-time surveillance feeds streaming directly from store cameras with on-premise edge tracking.
            </p>
          </div>

          {onOpenLiveDemo && (
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenLiveDemo}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 shadow-sm active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Launch Interactive Operations Console</span>
              </button>
            </div>
          )}
        </div>

        {/* Real HTML5 Live Video Analysis Player (The videos from home page) */}
        <div className="w-full">
          <CctvFeedViewer initialCameraId="cam-01" />
        </div>

        {/* Live Synchronized Camera & Store Telemetry Cards */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div
            className={`p-4 rounded-xl border transition-colors ${
              isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1">
              <span>Shoppers In View</span>
              <Users className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
              11
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono mt-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>7 in Cam 01 · 4 in Cam 02</span>
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border transition-colors ${
              isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1">
              <span>Avg Dwell Duration</span>
              <Clock className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
              2m 42s
            </div>
            <div className="text-[11px] text-blue-600 dark:text-blue-400 font-mono mt-0.5">
              Normal checkout pacing
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border transition-colors ${
              isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1">
              <span>Active IP Streams</span>
              <Radio className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
              2 Streams
            </div>
            <div className="text-[11px] text-purple-600 dark:text-purple-400 font-mono mt-0.5">
              Dual WhatsApp Video Feeds
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border transition-colors ${
              isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1">
              <span>Shelf Compliance</span>
              <Package className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
              94.2%
            </div>
            <div className="text-[11px] text-amber-600 dark:text-amber-400 font-mono mt-0.5">
              1 restocking alert queued
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveMonitoringSection;
