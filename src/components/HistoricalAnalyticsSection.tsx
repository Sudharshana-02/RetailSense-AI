import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  Download,
  CheckCircle2,
} from 'lucide-react';

export const HistoricalAnalyticsSection: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [selectedRange, setSelectedRange] = useState<'today' | '7d' | '30d'>('today');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleExport = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2200);
  };

  const departments = [
    { name: 'Pharmacy Mart Front Checkout (Video 1)', footfall: '1,420', dwell: '1m 45s', conversion: '86.4%', trend: '+8.2%' },
    { name: 'Center Island & Wire Baskets (Video 1)', footfall: '980', dwell: '3m 45s', conversion: '74.2%', trend: '+14.5%' },
    { name: 'Concourse ATM Kiosk (Video 2)', footfall: '640', dwell: '48s', conversion: '34.0%', trend: '+3.1%' },
    { name: 'Main Snack & Beverage Gondolas (Video 2)', footfall: '1,120', dwell: '2m 30s', conversion: '71.5%', trend: '+6.4%' },
  ];

  return (
    <section
      id="platform"
      className={`py-20 border-b transition-colors ${
        isDark ? 'bg-[#0B0F19] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2 font-semibold">
              08. Historical Intelligence &amp; Reports
            </div>
            <h2 className="text-3xl font-extrabold font-display">
              Enterprise Executive Telemetry &amp; Department Performance
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-2xl text-sm leading-relaxed">
              Consolidated benchmarks across store departments, checkout lanes, and financial ATM terminals.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-1 p-1 border rounded-lg ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
              }`}
            >
              <button
                onClick={() => setSelectedRange('today')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  selectedRange === 'today'
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setSelectedRange('7d')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  selectedRange === '7d'
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Past 7 Days
              </button>
              <button
                onClick={() => setSelectedRange('30d')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  selectedRange === '30d'
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Past 30 Days
              </button>
            </div>

            <button
              onClick={handleExport}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium border rounded-lg transition-colors ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-slate-200 hover:border-slate-600'
                  : 'bg-white border-slate-300 text-slate-700 hover:border-slate-400 shadow-sm'
              }`}
            >
              {downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Report Generated</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Export Report (CSV/PDF)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 3 Executive Proof Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
            className={`border rounded-xl p-6 transition-colors ${
              isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-slate-50 border-slate-200 shadow-sm'
            }`}
          >
            <div className="text-xs text-slate-500 font-mono mb-1">Queue Delay Reduction</div>
            <div className="text-3xl font-extrabold font-mono text-blue-600 dark:text-blue-400 tabular-nums">
              -62.5%
            </div>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Automated register auxiliary alerts reduced checkout congestion from 3m 40s to 45s at Register 01.
            </p>
          </div>

          <div
            className={`border rounded-xl p-6 transition-colors ${
              isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-slate-50 border-slate-200 shadow-sm'
            }`}
          >
            <div className="text-xs text-slate-500 font-mono mb-1">Promotional Center Island Lift</div>
            <div className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
              +28.4%
            </div>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Placement of wire display baskets in Video 1 generated highest engagement across all store floor fixtures.
            </p>
          </div>

          <div
            className={`border rounded-xl p-6 transition-colors ${
              isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-slate-50 border-slate-200 shadow-sm'
            }`}
          >
            <div className="text-xs text-slate-500 font-mono mb-1">Local Edge Bandwidth Savings</div>
            <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white tabular-nums">
              99.8%
            </div>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Edge inference saves up to 1.8 TB of raw CCTV video uploads per month per location.
            </p>
          </div>
        </div>

        {/* Department Performance Table */}
        <div
          className={`border rounded-xl overflow-hidden transition-colors ${
            isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-sm font-semibold font-mono text-slate-900 dark:text-white">
              DEPARTMENT BENCHMARK SUMMARY
            </span>
            <span className="text-xs font-mono text-slate-500">
              Live Feed Analysis
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead
                className={`font-mono border-b text-slate-500 ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <tr>
                  <th className="py-3 px-6">Department Zone</th>
                  <th className="py-3 px-6">Footfall Count</th>
                  <th className="py-3 px-6">Avg Dwell</th>
                  <th className="py-3 px-6">Conversion %</th>
                  <th className="py-3 px-6 text-right">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono">
                {departments.map((dept) => (
                  <tr
                    key={dept.name}
                    className={`transition-colors ${
                      isDark ? 'hover:bg-slate-900/40' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-4 px-6 font-sans font-medium text-slate-900 dark:text-white text-sm">
                      {dept.name}
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-300 tabular-nums">{dept.footfall}</td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-300 tabular-nums">{dept.dwell}</td>
                    <td className="py-4 px-6 text-blue-600 dark:text-blue-400 font-bold tabular-nums">
                      {dept.conversion}
                    </td>
                    <td
                      className={`py-4 px-6 text-right tabular-nums font-semibold ${
                        dept.trend.startsWith('+') ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'
                      }`}
                    >
                      {dept.trend}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
