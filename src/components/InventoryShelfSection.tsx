import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Package, AlertTriangle, RefreshCw, Layers, CheckCircle2 } from 'lucide-react';

export const InventoryShelfSection: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [restocked, setRestocked] = useState(false);
  const [isRestocking, setIsRestocking] = useState(false);

  const handleSimulateRestock = () => {
    setIsRestocking(true);
    setTimeout(() => {
      setRestocked(true);
      setIsRestocking(false);
    }, 700);
  };

  const shelfItems = [
    {
      sku: 'SKU-8104',
      name: 'Center Wire Basket Goods (Video 1)',
      aisle: 'Promotional Floor Island · Feature Bin 2',
      status: restocked ? 'Restocked (100% capacity)' : 'Depleted (12% remaining)',
      level: restocked ? 100 : 12,
      severity: restocked ? 'normal' : 'critical',
      restockPriority: 'High Priority',
    },
    {
      sku: 'SKU-3391',
      name: 'Chilled Energy & Soda Bottles (Video 2)',
      aisle: 'Concourse Cooler Bay 4',
      status: 'Nominal (88% capacity)',
      level: 88,
      severity: 'normal',
      restockPriority: 'Standard',
    },
    {
      sku: 'SKU-4910',
      name: 'Gondola Shelf Packaged Snacks (Video 2)',
      aisle: 'Main Aisle 1 · Right Wall',
      status: 'Nominal (94% capacity)',
      level: 94,
      severity: 'normal',
      restockPriority: 'Standard',
    },
    {
      sku: 'SKU-7201',
      name: 'Counter Confectionery & Mint Display (Video 1)',
      aisle: 'Register 01 Counter Shelf',
      status: 'Rapid Depletion (28% remaining)',
      level: 28,
      severity: 'warning',
      restockPriority: 'Medium Priority',
    },
  ];

  return (
    <section
      id="inventory-monitoring"
      className={`py-20 border-b transition-colors scroll-mt-20 ${
        isDark ? 'bg-[#0F172A] border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2 font-semibold">
              02. Inventory &amp; Shelf Monitoring
            </div>
            <h2 className="text-3xl font-extrabold font-display">
              Autonomous Shelf Void &amp; Planogram Inspection
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-2xl text-sm leading-relaxed">
              Continuously inspects shelf facings, wire display bins, and beverage coolers in real time.
              Generates early replenishment alerts before shelves run empty.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSimulateRestock}
              disabled={isRestocking}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRestocking ? 'animate-spin' : ''}`} />
              <span>{restocked ? 'Shelf Restocked · Test Again' : 'Simulate Restock Dispatch'}</span>
            </button>
          </div>
        </div>

        {/* 3-Column Enterprise Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
            className={`border rounded-xl p-6 flex flex-col justify-between transition-colors ${
              isDark ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-display mb-2">
                Void &amp; Stockout Detection
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed mb-4">
                Recognizes empty shelf facings instantly using edge spatial bounding boxes, comparing current pixel depth against nominal baseline planograms.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-baseline justify-between text-xs font-mono">
              <span className="text-slate-500">Detection Accuracy:</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold tabular-nums">99.4%</span>
            </div>
          </div>

          <div
            className={`border rounded-xl p-6 flex flex-col justify-between transition-colors ${
              isDark ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-600/10 border border-emerald-600/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-display mb-2">
                Planogram Compliance
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed mb-4">
                Tracks misplaced SKUs, missing price tags, and unauthorized brand encroaching across promotional floor bins and gondola facings.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-baseline justify-between text-xs font-mono">
              <span className="text-slate-500">Compliance Rate:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold tabular-nums">96.8%</span>
            </div>
          </div>

          <div
            className={`border rounded-xl p-6 flex flex-col justify-between transition-colors ${
              isDark ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-600/10 border border-amber-600/20 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-display mb-2">
                Depletion Forecasting
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed mb-4">
                Combines customer pickup velocity and dwell clusters to predict stockouts 20+ minutes in advance, notifying floor associates.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-baseline justify-between text-xs font-mono">
              <span className="text-slate-500">Lead Warning:</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold tabular-nums">22 mins before empty</span>
            </div>
          </div>
        </div>

        {/* Live Shelf Fill Table */}
        <div
          className={`border rounded-xl overflow-hidden transition-colors ${
            isDark ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-sm font-semibold font-mono text-slate-900 dark:text-white">
              MONITORED FIXTURES // REAL-TIME FILL LEVELS
            </span>
            <span className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400">
              {restocked ? 'All Fixtures Stocked' : '1 Fixture Needs Restock'}
            </span>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {shelfItems.map((item) => (
              <div
                key={item.sku}
                className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-500">{item.sku}</span>
                    <span className="font-medium text-sm text-slate-900 dark:text-white">
                      {item.name}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">{item.aisle}</div>
                </div>

                <div className="flex items-center gap-6 sm:w-80">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="text-slate-500">Fill Level</span>
                      <span
                        className={`font-bold tabular-nums ${
                          item.level <= 15
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-emerald-600 dark:text-emerald-400'
                        }`}
                      >
                        {item.level}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${item.level}%` }}
                        className={`h-full rounded-full transition-all duration-500 ${
                          item.level <= 15 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="text-right whitespace-nowrap">
                    <span
                      className={`text-xs font-mono px-2 py-0.5 rounded border font-semibold ${
                        item.severity === 'critical'
                          ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700'
                          : item.severity === 'warning'
                          ? 'bg-yellow-100 dark:bg-yellow-950/40 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700'
                          : 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
                      }`}
                    >
                      {item.restockPriority}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
