import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  Users,
  Clock,
  Compass,
  BarChart3,
  CheckCircle2,
} from 'lucide-react';

export const ShopperAnalyticsSection: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [timeFilter, setTimeFilter] = useState<'today' | 'rush' | 'week'>('today');
  const [selectedTrajectory, setSelectedTrajectory] = useState<string>('checkout_wire_baskets');

  const trafficData = [
    { hour: '09:00', count: 12, dwell: '1m 40s' },
    { hour: '10:00', count: 18, dwell: '2m 10s' },
    { hour: '11:00', count: 24, dwell: '2m 30s' },
    { hour: '12:00', count: 36, dwell: '3m 15s' },
    { hour: '13:00', count: 32, dwell: '2m 50s' },
    { hour: '14:00', count: 28, dwell: '3m 18s' }, // Current video hour: 14:18 (Video 1 & 2)
    { hour: '15:00', count: 26, dwell: '2m 45s' },
    { hour: '16:00', count: 34, dwell: '3m 10s' },
    { hour: '17:00', count: 42, dwell: '3m 40s' },
    { hour: '18:00', count: 38, dwell: '3m 05s' },
  ];

  const maxCount = Math.max(...trafficData.map((d) => d.count));

  // Trajectories grounded in Video 1 & Video 2
  const trajectories = [
    {
      id: 'checkout_wire_baskets',
      title: 'Entrance → Center Wire Baskets → Checkout (Video 1)',
      percentage: '41.2%',
      avgDwell: '3m 45s',
      conversion: '86.4%',
      type: 'Impulse Basket Selection & Checkout',
    },
    {
      id: 'atm_banking_flow',
      title: 'Entrance → ATM Kiosk Terminal → Exit (Video 2)',
      percentage: '27.5%',
      avgDwell: '48s',
      conversion: '34.0%',
      type: 'Direct Financial Banking Transaction',
    },
    {
      id: 'rear_aisle_cooler',
      title: 'Main Aisle → Beverage Coolers → Rear Counter (Video 2)',
      percentage: '19.8%',
      avgDwell: '2m 20s',
      conversion: '71.5%',
      type: 'Chilled Refreshment & Snack Run',
    },
    {
      id: 'aisle_carton_retrieval',
      title: 'Aisle 2 Shelves → Large Box SKU → Register 1 (Video 1)',
      percentage: '11.5%',
      avgDwell: '4m 10s',
      conversion: '95.0%',
      type: 'Targeted High-Value Goods Purchase',
    },
  ];

  return (
    <section
      id="shopper-analytics"
      className={`py-20 border-b transition-colors scroll-mt-20 ${
        isDark ? 'bg-[#0B0F19] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2 font-semibold">
              01. Shopper Telemetry
            </div>
            <h2 className="text-3xl font-extrabold font-display">
              Shopper Analytics &amp; Journey Trajectories
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-2xl text-sm leading-relaxed">
              Analyzed in real time from Camera 01 (Pharmacy Mart) and Camera 02 (Concourse ATM).
              Track path flows, customer dwell times, and transaction conversions without recording facial identities.
            </p>
          </div>

          {/* Interactive filter control */}
          <div
            className={`flex items-center gap-1 p-1 border rounded-lg ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}
          >
            <button
              onClick={() => setTimeFilter('today')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                timeFilter === 'today'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Current Feeds (14:18)
            </button>
            <button
              onClick={() => setTimeFilter('rush')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                timeFilter === 'rush'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Peak Rush
            </button>
            <button
              onClick={() => setTimeFilter('week')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                timeFilter === 'week'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              7-Day Benchmark
            </button>
          </div>
        </div>

        {/* 2-Column Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Live Traffic Chart (7 Cols) */}
          <div
            className={`lg:col-span-7 border rounded-xl p-6 flex flex-col justify-between transition-colors ${
              isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-slate-50 border-slate-200 shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-semibold font-mono text-slate-900 dark:text-white">
                    HOURLY IN-STORE FOOTFALL
                  </span>
                </div>
                <div className="text-xs font-mono text-slate-500">
                  Current: <span className="font-semibold text-blue-600 dark:text-blue-400">14:18 (28 shoppers)</span>
                </div>
              </div>

              {/* Bar Chart Visualization */}
              <div className="pt-8 pb-4">
                <div className="h-44 flex items-end gap-2 sm:gap-3 justify-between">
                  {trafficData.map((d) => {
                    const heightPercent = (d.count / maxCount) * 100;
                    const isCurrent = d.hour === '14:00';
                    return (
                      <div key={d.hour} className="flex-1 flex flex-col items-center gap-2 group">
                        <div className="text-[10px] font-mono text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity tabular-nums">
                          {d.count}
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-t h-full flex items-end overflow-hidden">
                          <div
                            style={{ height: `${heightPercent}%` }}
                            className={`w-full rounded-t transition-all duration-300 ${
                              isCurrent
                                ? 'bg-blue-600'
                                : 'bg-slate-400 dark:bg-slate-600 group-hover:bg-blue-500'
                            }`}
                          />
                        </div>
                        <div
                          className={`text-[10px] font-mono ${
                            isCurrent
                              ? 'font-bold text-blue-600 dark:text-blue-400'
                              : 'text-slate-500'
                          }`}
                        >
                          {d.hour.split(':')[0]}h
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* In-depth Funnel Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs">
              <div className="p-3 bg-white dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 block mb-1">Conversion Rate</span>
                <span className="text-lg font-bold font-mono text-blue-600 dark:text-blue-400 tabular-nums">
                  78.2%
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">+4.1% vs average</span>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 block mb-1">Average Dwell Time</span>
                <span className="text-lg font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                  3m 18s
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">High basket correlation</span>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900/60 rounded-lg border border-slate-800 dark:border-slate-800">
                <span className="text-slate-500 block mb-1">ATM Service Time</span>
                <span className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
                  42s
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Standard transaction</span>
              </div>
            </div>
          </div>

          {/* Right Column: Customer Path Trajectory Breakdown (5 Cols) */}
          <div
            className={`lg:col-span-5 border rounded-xl p-6 flex flex-col justify-between transition-colors ${
              isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-slate-50 border-slate-200 shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-semibold font-mono text-slate-900 dark:text-white">
                    PATH TRAJECTORY CLUSTERS
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-500">From Camera Feeds</span>
              </div>

              <div className="mt-4 space-y-3">
                {trajectories.map((traj) => {
                  const isSelected = selectedTrajectory === traj.id;
                  return (
                    <div
                      key={traj.id}
                      onClick={() => setSelectedTrajectory(traj.id)}
                      className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? isDark
                            ? 'border-blue-500/60 bg-blue-950/20'
                            : 'border-blue-500 bg-blue-50/70'
                          : isDark
                          ? 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-xs text-slate-900 dark:text-white">
                          {traj.title}
                        </span>
                        <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tabular-nums">
                          {traj.percentage}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mb-2">{traj.type}</div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-800">
                        <span>
                          Dwell: <span className="text-slate-800 dark:text-slate-200 font-semibold">{traj.avgDwell}</span>
                        </span>
                        <span>
                          Conversion: <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{traj.conversion}</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 p-3 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-600 dark:text-slate-400 flex items-center justify-between">
              <span>Customer Identification:</span>
              <span className="text-blue-600 dark:text-blue-400 font-medium">100% Anonymized at Edge</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
