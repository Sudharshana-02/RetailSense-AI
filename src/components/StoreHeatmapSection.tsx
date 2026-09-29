import React, { useState } from 'react';
import { STORE_HEATMAP_ZONES } from '../data/mockRetailData';
import { HeatmapZone } from '../types/retail';
import { useTheme } from '../context/ThemeContext';
import { Flame, Clock, ShoppingCart, Map, Compass } from 'lucide-react';

export const StoreHeatmapSection: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeLayer, setActiveLayer] = useState<'traffic' | 'dwell' | 'conversion' | 'cold'>('traffic');
  const [selectedZone, setSelectedZone] = useState<HeatmapZone>(STORE_HEATMAP_ZONES[0]);

  const getZoneColor = (zone: HeatmapZone) => {
    if (activeLayer === 'traffic') {
      if (zone.trafficScore > 90) return 'fill-blue-500/30 stroke-blue-500';
      if (zone.trafficScore > 75) return 'fill-blue-500/20 stroke-blue-400';
      return 'fill-slate-500/10 stroke-slate-400';
    }
    if (activeLayer === 'dwell') {
      if (zone.dwellTimeMinutes > 3) return 'fill-amber-500/30 stroke-amber-500';
      return 'fill-slate-500/10 stroke-slate-400';
    }
    if (activeLayer === 'conversion') {
      if (zone.conversionRate > 70) return 'fill-emerald-500/30 stroke-emerald-500';
      return 'fill-slate-500/10 stroke-slate-400';
    }
    // cold
    if (zone.trafficScore < 80) return 'fill-rose-500/30 stroke-rose-500';
    return 'fill-slate-500/10 stroke-slate-400';
  };

  return (
    <section
      id="heatmaps"
      className={`py-20 border-b transition-colors ${
        isDark ? 'bg-[#0B0F19] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2 font-semibold">
              04. Spatial Intelligence
            </div>
            <h2 className="text-3xl font-extrabold font-display">
              Store Heatmaps &amp; Floorplan Density
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-2xl text-sm leading-relaxed">
              Spatial tracking calibrated across Camera 01 (Pharmacy Mart Checkout &amp; Floor Island) and Camera 02 (ATM &amp; Concourse Aisle).
            </p>
          </div>

          {/* Heatmap Layer Selector */}
          <div
            className={`flex items-center gap-1 p-1 border rounded-lg flex-wrap ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}
          >
            <button
              onClick={() => setActiveLayer('traffic')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                activeLayer === 'traffic'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Traffic Density</span>
            </button>
            <button
              onClick={() => setActiveLayer('dwell')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                activeLayer === 'dwell'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Dwell Time</span>
            </button>
            <button
              onClick={() => setActiveLayer('conversion')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                activeLayer === 'conversion'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Conversion %</span>
            </button>
            <button
              onClick={() => setActiveLayer('cold')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                activeLayer === 'cold'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>Cold Spots</span>
            </button>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Floorplan (8 Cols) */}
          <div
            className={`lg:col-span-8 border rounded-xl p-6 relative overflow-hidden transition-colors ${
              isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-slate-50 border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500">
              <span className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  STORE FLOORPLAN // VIDEO FEEDS CALIBRATION
                </span>
              </span>
              <span>SELECT ZONE TO INSPECT</span>
            </div>

            {/* SVG Floorplan Canvas */}
            <div
              className={`relative aspect-[16/10] w-full rounded-lg border overflow-hidden p-4 ${
                isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Store Perimeter */}
                <rect
                  x="2"
                  y="2"
                  width="96"
                  height="96"
                  fill="none"
                  stroke={isDark ? '#334155' : '#CBD5E1'}
                  strokeWidth="0.8"
                  strokeDasharray="2 1"
                />

                {/* Grid Divisions */}
                <line x1="2" y1="55" x2="98" y2="55" stroke={isDark ? '#1E293B' : '#E2E8F0'} strokeWidth="0.5" />
                <line x1="40" y1="2" x2="40" y2="98" stroke={isDark ? '#1E293B' : '#E2E8F0'} strokeWidth="0.5" />

                {/* Zones */}
                {STORE_HEATMAP_ZONES.map((zone) => {
                  const isSelected = selectedZone.id === zone.id;
                  const colorClass = getZoneColor(zone);

                  return (
                    <g
                      key={zone.id}
                      onClick={() => setSelectedZone(zone)}
                      className="cursor-pointer group transition-all"
                    >
                      <rect
                        x={zone.x}
                        y={zone.y}
                        width={zone.width}
                        height={zone.height}
                        rx="1.5"
                        strokeWidth={isSelected ? '1.8' : '0.8'}
                        className={`transition-all duration-300 ${colorClass} ${
                          isSelected ? (isDark ? 'stroke-white' : 'stroke-blue-700') : ''
                        }`}
                      />

                      <text
                        x={zone.x + zone.width / 2}
                        y={zone.y + zone.height / 2 - 2}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill={isDark ? '#F8FAFC' : '#0F172A'}
                        fontSize="3.2"
                        fontFamily="'Plus Jakarta Sans', sans-serif"
                        fontWeight="600"
                        className="pointer-events-none select-none"
                      >
                        {zone.name.split('(')[0]}
                      </text>

                      <text
                        x={zone.x + zone.width / 2}
                        y={zone.y + zone.height / 2 + 3}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill={isDark ? '#93C5FD' : '#2563EB'}
                        fontSize="2.6"
                        fontFamily="'JetBrains Mono', monospace"
                        fontWeight="600"
                        className="pointer-events-none select-none tabular-nums"
                      >
                        {activeLayer === 'traffic' && `${zone.trafficScore} traffic index`}
                        {activeLayer === 'dwell' && `${zone.dwellTimeMinutes}m dwell`}
                        {activeLayer === 'conversion' && `${zone.conversionRate}% conv`}
                        {activeLayer === 'cold' && `${zone.shopperCount} in zone`}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Floorplan Legend */}
            <div className="mt-4 flex flex-wrap items-center justify-between text-xs font-mono text-slate-500 gap-2">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <span>High Activity</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                  <span>Standard Circulation</span>
                </span>
              </div>
              <span>Ground Truth: Video 1 &amp; Video 2 Feeds</span>
            </div>
          </div>

          {/* Right Column: Selected Zone Deep Dive (4 Cols) */}
          <div
            className={`lg:col-span-4 border rounded-xl p-6 transition-colors ${
              isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-slate-50 border-slate-200 shadow-sm'
            }`}
          >
            <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="text-[11px] font-mono text-blue-600 dark:text-blue-400 uppercase font-semibold">
                Zone Metrics
              </div>
              <h3 className="text-xl font-bold font-display mt-1 text-slate-900 dark:text-white">
                {selectedZone.name}
              </h3>
            </div>

            <div className="mt-5 space-y-3.5">
              <div
                className={`p-3 rounded-lg border transition-colors ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="text-xs text-slate-500 mb-1">Active Headcount</div>
                <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                  {selectedZone.shopperCount}{' '}
                  <span className="text-xs font-normal text-slate-500">shoppers</span>
                </div>
              </div>

              <div
                className={`p-3 rounded-lg border transition-colors ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="text-xs text-slate-500 mb-1">Average Dwell Time</div>
                <div className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400 tabular-nums">
                  {selectedZone.dwellTimeMinutes}{' '}
                  <span className="text-xs font-normal text-slate-500">minutes</span>
                </div>
              </div>

              <div
                className={`p-3 rounded-lg border transition-colors ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="text-xs text-slate-500 mb-1">Zone Conversion Rate</div>
                <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
                  {selectedZone.conversionRate}%
                </div>
              </div>

              <div
                className={`p-3 rounded-lg border transition-colors ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="text-xs text-slate-500 mb-1">Traffic Density Score</div>
                <div className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400 tabular-nums">
                  {selectedZone.trafficScore}{' '}
                  <span className="text-xs font-normal text-slate-500">/ 100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
