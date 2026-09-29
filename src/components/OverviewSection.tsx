import React from 'react';
import TechText from '../TechText';
import { StoreLocation } from '../types/retail';
import { useTheme } from '../context/ThemeContext';
import { FAQ } from './FAQ';
import {
  ShieldCheck,
  Cpu,
  ArrowRight,
  TrendingUp,
  Clock,
  Package,
  Users,
  Video,
  Zap,
  Activity,
  Layers,
  CheckCircle2,
  Lock,
  Eye,
  BarChart3,
  Sparkles,
} from 'lucide-react';

interface OverviewSectionProps {
  selectedStore?: StoreLocation;
  onOpenLiveDemo?: () => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  onOpenLiveDemo,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div id="overview" className="w-full scroll-mt-20">
      {/* ========================================================================= */}
      {/* 1. RETAILSENSE AI & DESCRIPTION (HERO BLOCK)                              */}
      {/* ========================================================================= */}
      <section
        className={`relative pt-6 pb-20 overflow-hidden border-b transition-colors ${
          isDark
            ? 'bg-[#0B0F19] border-slate-800 text-slate-100'
            : 'bg-slate-50 border-slate-200 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Edge Architecture Telemetry Bar */}
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400 mb-3 flex-wrap">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
            <span className="font-semibold">EDGE COMPUTER VISION PLATFORM</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span className="text-slate-500 dark:text-slate-400">ZERO CLOUD STREAMING</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span className="text-slate-500 dark:text-slate-400">ON-PREMISE INFERENCE</span>
          </div>

          {/* TechText Hero Typography */}
          <div className="w-full flex flex-col items-center justify-center">
            <div style={{ width: '100%', height: '440px', position: 'relative' }}>
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

          {/* Headline and Description */}
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

            {/* Quick Action Navigation Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#live-monitoring"
                className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 shadow-md active:scale-95"
              >
                <Video className="w-4 h-4" />
                <span>Go to Live Monitoring Feeds</span>
              </a>

              <a
                href="#what-is-retailsense"
                className={`flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-lg border transition-colors ${
                  isDark
                    ? 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
                    : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800 shadow-sm'
                }`}
              >
                <span>What is RetailSense?</span>
                <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </a>
            </div>

            {/* Engineering Trust Markers */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-3 text-xs text-slate-500 dark:text-slate-400">
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
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. WHAT IS RETAILSENSE?                                                   */}
      {/* ========================================================================= */}
      <section
        id="what-is-retailsense"
        className={`py-20 border-b transition-colors scroll-mt-20 ${
          isDark
            ? 'bg-[#0E1526] border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2 font-semibold">
              <Eye className="w-4 h-4" />
              <span>PLATFORM INTRODUCTION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white">
              What is RetailSense?
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              RetailSense is an intelligent edge computer vision software layer that connects directly
              to a store's existing CCTV security cameras to extract anonymous operational metrics
              in real time—transforming passive video feeds into live retail analytics.
            </p>
          </div>

          {/* Three Structural Architecture Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div
              className={`p-7 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                isDark
                  ? 'bg-slate-900/80 border-slate-800 hover:border-blue-500/40'
                  : 'bg-slate-50 border-slate-200 hover:border-blue-500/40 shadow-sm'
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-5">
                  <Video className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2">
                  Works With Existing Cameras
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  No costly hardware rip-and-replace. RetailSense connects to standard RTSP, ONVIF,
                  and IP camera feeds already installed in retail ceilings and checkout terminals.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Zero hardware obsolescence</span>
              </div>
            </div>

            <div
              className={`p-7 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                isDark
                  ? 'bg-slate-900/80 border-slate-800 hover:border-blue-500/40'
                  : 'bg-slate-50 border-slate-200 hover:border-blue-500/40 shadow-sm'
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-600/10 border border-emerald-600/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-5">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2">
                  100% On-Premise Edge AI
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Video processing runs on local store edge hardware. Video frames are computed in
                  under 15 milliseconds and never stream across the public internet, slashing WAN bandwidth.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Zero WAN video streaming costs</span>
              </div>
            </div>

            <div
              className={`p-7 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                isDark
                  ? 'bg-slate-900/80 border-slate-800 hover:border-blue-500/40'
                  : 'bg-slate-50 border-slate-200 hover:border-blue-500/40 shadow-sm'
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-600/10 border border-purple-600/20 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-5">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2">
                  Privacy by Design (Zero-PII)
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Shoppers are tracked purely as anonymous spatial coordinates and centroid boxes.
                  No facial recognition, biometric logging, or persistent customer profiling is ever performed.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Strict GDPR &amp; CCPA compliance</span>
              </div>
            </div>
          </div>

          {/* Operational Impact Benchmarks */}
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              className={`p-5 rounded-xl border text-center transition-colors ${
                isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="text-3xl font-extrabold font-mono text-blue-600 dark:text-blue-400">
                -34%
              </div>
              <div className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-1">
                Checkout Wait Times
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">Automated lane call-ups</div>
            </div>

            <div
              className={`p-5 rounded-xl border text-center transition-colors ${
                isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                99.4%
              </div>
              <div className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-1">
                Edge Processing Uptime
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">Continuous local inference</div>
            </div>

            <div
              className={`p-5 rounded-xl border text-center transition-colors ${
                isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="text-3xl font-extrabold font-mono text-purple-600 dark:text-purple-400">
                0%
              </div>
              <div className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-1">
                Facial Biometrics Captured
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">100% Anonymous tracking</div>
            </div>

            <div
              className={`p-5 rounded-xl border text-center transition-colors ${
                isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="text-3xl font-extrabold font-mono text-amber-600 dark:text-amber-400">
                +18%
              </div>
              <div className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-1">
                On-Shelf Availability
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">Rapid stockout alerts</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. PLATFORM USES & KEY CAPABILITIES                                       */}
      {/* ========================================================================= */}
      <section
        id="capabilities"
        className={`py-20 border-b transition-colors scroll-mt-20 ${
          isDark
            ? 'bg-[#0B0F19] border-slate-800 text-slate-100'
            : 'bg-slate-50 border-slate-200 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2 font-semibold">
              <Layers className="w-4 h-4" />
              <span>CORE ARCHITECTURAL PILLARS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white">
              Platform Uses &amp; Key Capabilities
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Explore the modular computer vision capability suite designed to optimize customer experiences,
              prevent stockouts, and streamline store management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Capability 1: Shopper Traffic & Footfall */}
            <div
              className={`p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between group hover:-translate-y-1 ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800 hover:border-emerald-500/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.12)]'
                  : 'bg-white border-slate-200 hover:border-emerald-500/50 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    MODULE 01
                  </span>
                </div>
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-2 group-hover:text-emerald-500 transition-colors">
                  Shopper Traffic &amp; Journey Analytics
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  Real-time footfall counting, trajectory tracking, and customer dwell duration analysis across high-priority aisles and entrance corridors.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Real-time entrance &amp; exit conversion</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Zone-level dwell time breakdown</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Customer flow velocity maps</span>
                </div>
              </div>
            </div>

            {/* Capability 2: Shelf & Inventory Monitoring */}
            <div
              className={`p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between group hover:-translate-y-1 ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.12)]'
                  : 'bg-white border-slate-200 hover:border-cyan-500/50 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
                    <Package className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    MODULE 02
                  </span>
                </div>
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-2 group-hover:text-cyan-500 transition-colors">
                  Shelf Inventory &amp; Void Detection
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  Autonomous computer vision shelf scanning that identifies out-of-stock items, facing irregularities, and planogram compliance gaps instantly.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                  <span>Automated stockout alerts to stockroom</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                  <span>Planogram compliance verification</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                  <span>Shelf gap duration tracking</span>
                </div>
              </div>
            </div>

            {/* Capability 3: Queue Intelligence */}
            <div
              className={`p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between group hover:-translate-y-1 ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800 hover:border-amber-500/50 hover:shadow-[0_0_25px_rgba(245,158,11,0.12)]'
                  : 'bg-white border-slate-200 hover:border-amber-500/50 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    MODULE 03
                  </span>
                </div>
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-2 group-hover:text-amber-500 transition-colors">
                  Predictive Queue &amp; Wait Reduction
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  Continuously calculates checkout queue lengths and service speeds, forecasting bottlenecks 4–6 minutes in advance to dispatch cashier backup.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>Real-time queue length tracking</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>Predictive register opening triggers</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>Wait time SLA violation monitors</span>
                </div>
              </div>
            </div>

            {/* Capability 4: Floor Heatmaps */}
            <div
              className={`p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between group hover:-translate-y-1 ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800 hover:border-blue-500/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.12)]'
                  : 'bg-white border-slate-200 hover:border-blue-500/50 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-500">
                    <Activity className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    MODULE 04
                  </span>
                </div>
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">
                  Store Floorplan &amp; Heatmap Density
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  High-fidelity 2D density maps showing customer browsing hotspots, dead zones, and promotional display engagement over time.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>End-cap promotional engagement</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>Aisle congestion bottleneck analysis</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>Planogram merchandising optimization</span>
                </div>
              </div>
            </div>

            {/* Capability 5: Privacy-First Edge AI */}
            <div
              className={`p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between group hover:-translate-y-1 ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800 hover:border-purple-500/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.12)]'
                  : 'bg-white border-slate-200 hover:border-purple-500/50 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-500">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    MODULE 05
                  </span>
                </div>
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-2 group-hover:text-purple-500 transition-colors">
                  Privacy-First Edge Processing
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  Edge inference runs within the store firewall. Only aggregated statistics are published upstream; zero raw video or identifiable imagery is stored.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>Zero facial recognition technology</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>Sub-15ms local tensor execution</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>Full GDPR &amp; CCPA safe certification</span>
                </div>
              </div>
            </div>

            {/* Capability 6: Multi-Store Executive Operations */}
            <div
              className={`p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between group hover:-translate-y-1 ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800 hover:border-rose-500/50 hover:shadow-[0_0_25px_rgba(244,63,94,0.12)]'
                  : 'bg-white border-slate-200 hover:border-rose-500/50 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    MODULE 06
                  </span>
                </div>
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-2 group-hover:text-rose-500 transition-colors">
                  Staff Optimization &amp; Operations
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  Correlates shopper volume with associate shifts. Automatically dispatches floor staff to high-demand restocking zones and opening registers.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  <span>Predictive labor shift scheduling</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  <span>Cross-store KPI benchmarking</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  <span>Automated manager shift reports</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FREQUENTLY ASKED QUESTIONS (FAQ)                                       */}
      {/* ========================================================================= */}
      <section
        id="faq"
        className={`py-20 border-b transition-colors scroll-mt-20 ${
          isDark
            ? 'bg-[#0E1526] border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQ />
        </div>
      </section>
    </div>
  );
};

export default OverviewSection;
