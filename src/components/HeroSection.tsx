import React from 'react';
import TechText from '../TechText';
import { CctvFeedViewer } from './CctvFeedViewer';
import { StoreLocation } from '../types/retail';
import { useTheme } from '../context/ThemeContext';
import {
  ShieldCheck,
  Cpu,
  ArrowRight,
  TrendingUp,
  Clock,
  Package,
  Users,
  Play,
  Zap,
} from 'lucide-react';

interface HeroSectionProps {
  selectedStore: StoreLocation;
  onOpenLiveDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedStore,
  onOpenLiveDemo,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      id="overview"
      className={`relative pt-6 pb-20 overflow-hidden border-b transition-colors scroll-mt-20 ${
        isDark ? 'bg-[#0B0F19] border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Subtle pill-free enterprise telemetry header */}
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400 mb-3">
          <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
          <span className="font-semibold">EDGE COMPUTER VISION ARCHITECTURE</span>
          <span aria-hidden="true" className="text-slate-400">·</span>
          <span className="text-slate-500 dark:text-slate-400">ZERO CLOUD STREAMING</span>
          <span aria-hidden="true" className="text-slate-400">·</span>
          <span className="text-slate-500 dark:text-slate-400">TAGGED CCTV FEEDS (CAM 01 &amp; CAM 02)</span>
        </div>

        {/* TechText Hero Typography Container */}
        <div className="w-full flex flex-col items-center justify-center">
          <div style={{ width: '100%', height: '480px', position: 'relative' }}>
            <TechText
              text="RetailSense AI"
              fontWeight={600}
              fontSize={150}
              reveal="letter"
              dashLength={4}
              dashGap={2}
              specks={15}
              selection={true}
              labels={true}
              draggable={true}
              sweep={true}
              color={isDark ? '#ffffff' : '#0f172a'}
              accentColor={isDark ? '#60a5fa' : '#2563eb'}
            />
          </div>
        </div>

        {/* Core Value Proposition Statement */}
        <div className="text-center max-w-3xl mx-auto space-y-4 -mt-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-balance leading-tight text-slate-900 dark:text-white">
            Your store cameras don't just watch.{' '}
            <span className="text-blue-600 dark:text-blue-400">
              They understand.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            RetailSense AI turns existing store CCTV feeds into actionable shopper telemetry,
            checkout queue predictions, and store heatmaps using on-premise edge computing.
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenLiveDemo}
              className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 shadow-md active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Launch Live Monitoring Console</span>
            </button>

            <a
              href="#shopper-analytics"
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-lg border transition-colors ${
                isDark
                  ? 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
                  : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800 shadow-sm'
              }`}
            >
              <span>Explore Capability Suite</span>
              <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </a>
          </div>

          {/* Compliance & Engineering Trust Markers */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>GDPR &amp; CCPA Compliant (Zero Facial PII)</span>
            </span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              <span>Standard RTSP IP Camera Compatible</span>
            </span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>11ms On-Premise Inference</span>
            </span>
          </div>
        </div>

        {/* Live Reactive CCTV Intelligence Visualization */}
        <div id="live-monitoring" className="mt-12 max-w-5xl mx-auto scroll-mt-24">
          <div className="mb-3 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>LIVE VIDEO ANALYSIS FEED</span>
              </span>
              <span className="text-slate-400">·</span>
              <span className="hidden sm:inline">Camera 01 (Pharmacy Mart) &amp; Camera 02 (ATM Concourse)</span>
            </div>
            <div className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <span>● Edge Streaming Active</span>
            </div>
          </div>

          <CctvFeedViewer initialCameraId="cam-01" />

          {/* Real-time Metrics based on the two feeds */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div
              className={`p-3.5 rounded-lg border transition-colors ${
                isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
                <span>Active Shoppers</span>
                <Users className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                {selectedStore.activeShoppers}
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                +4 browsing center floor
              </div>
            </div>

            <div
              className={`p-3.5 rounded-lg border transition-colors ${
                isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
                <span>Avg Checkout Wait</span>
                <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                {selectedStore.avgWaitTime}
              </div>
              <div className="text-[11px] text-blue-600 dark:text-blue-400 font-mono mt-0.5">
                Register 1: Customer paying
              </div>
            </div>

            <div
              className={`p-3.5 rounded-lg border transition-colors ${
                isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
                <span>ATM Utilization</span>
                <Package className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                84.2%
              </div>
              <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                42s dwell · Cash withdrawal
              </div>
            </div>

            <div
              className={`p-3.5 rounded-lg border transition-colors ${
                isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
                <span>Inference Latency</span>
                <Cpu className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-xl font-bold font-mono text-blue-600 dark:text-blue-400 tabular-nums">
                11.4 ms
              </div>
              <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                On-premise edge batch
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
