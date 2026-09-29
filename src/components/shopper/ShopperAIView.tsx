import React from 'react';
import { useRetail } from '../../context/RetailContext';
import { ShopperModule } from '../../types/retail';
import { StoreHeatmapSection } from '../StoreHeatmapSection';
import {
  Users,
  Clock,
  TrendingUp,
  Flame,
  Compass,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
} from 'lucide-react';

export const ShopperAIView: React.FC = () => {
  const {
    selectedShopperModule,
    setSelectedShopperModule,
    footfall,
    occupancy,
    entryCount,
    exitCount,
    dwellTime,
    selectedStore,
  } = useRetail();

  const subNavItems: { id: ShopperModule; label: string; icon: React.ReactNode }[] = [
    { id: 'footfall', label: 'Footfall', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'dwell', label: 'Dwell Time', icon: <Clock className="w-3.5 h-3.5" /> },
    { id: 'heatmap', label: 'Heatmap', icon: <Flame className="w-3.5 h-3.5" /> },
    { id: 'movement', label: 'Movement', icon: <Compass className="w-3.5 h-3.5" /> },
  ];

  const hourlyTrends = [
    { hour: '09:00', count: 52 },
    { hour: '10:00', count: 88 },
    { hour: '11:00', count: 145 },
    { hour: '12:00', count: 210 },
    { hour: '13:00', count: 185 },
    { hour: '14:00', count: 130 },
    { hour: '15:00', count: 142 },
    { hour: '16:00', count: 195 },
    { hour: '17:00', count: 245 },
    { hour: '18:00', count: 220 },
    { hour: '19:00', count: 165 },
    { hour: '20:00', count: 90 },
  ];
  const maxHourly = Math.max(...hourlyTrends.map((h) => h.count));

  const zoneDwells = [
    { zone: 'Fresh Produce & Fruit', avgDwell: '5m 12s', percentage: 88, status: 'High Dwell' },
    { zone: 'Apparel & Lifestyle', avgDwell: '7m 45s', percentage: 95, status: 'Peak Dwell' },
    { zone: 'Packaged Grocery Aisles', avgDwell: '4m 30s', percentage: 70, status: 'Moderate' },
    { zone: 'Bakery & Deli Bay', avgDwell: '2m 50s', percentage: 48, status: 'Quick Pick' },
    { zone: 'Checkout Concourse', avgDwell: '2m 15s', percentage: 38, status: 'Transient' },
  ];

  const movementRoutes = [
    {
      route: 'Entrance → Fresh Produce → Checkout',
      trafficShare: '38.4%',
      avgTime: '8m 20s',
      intent: 'Daily Fresh Groceries (High Intent)',
      conversionRate: '86.4%',
    },
    {
      route: 'Entrance → Packaged Grocery → Promotions → Checkout',
      trafficShare: '29.1%',
      avgTime: '16m 45s',
      intent: 'Full Weekly Replenishment',
      conversionRate: '92.1%',
    },
    {
      route: 'Entrance → Apparel & Lifestyle → Concourse Exit',
      trafficShare: '18.2%',
      avgTime: '4m 10s',
      intent: 'Casual Window Browsing',
      conversionRate: '24.5%',
    },
    {
      route: 'Entrance → Click & Collect Counter → Exit',
      trafficShare: '14.3%',
      avgTime: '1m 35s',
      intent: 'Express Omnichannel Pickup',
      conversionRate: '100%',
    },
  ];

  return (
    <div className="py-8 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Sub-navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
            SHOPPER INTELLIGENCE
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Customer Behavior &amp; Flow Analysis
          </h1>
          <div className="text-xs text-slate-400 mt-1">
            Active Context: <span className="text-white font-medium">{selectedStore.name}</span> ({selectedStore.location})
          </div>
        </div>

        {/* Sub-navigation Bar */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
          {subNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedShopperModule(item.id)}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
                selectedShopperModule === item.id
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Reactive Module Content */}
      {selectedShopperModule === 'footfall' && (
        <div className="space-y-6">
          {/* Synchronized Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-[#0B111D] border border-slate-800 rounded-xl">
              <div className="text-xs text-slate-400 font-mono mb-1">Total Daily Footfall</div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400 tabular-nums">
                {footfall.toLocaleString()}
              </div>
              <div className="text-[11px] text-emerald-400/90 font-mono mt-1 flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+12.4% vs benchmark</span>
              </div>
            </div>

            <div className="p-4 bg-[#0B111D] border border-slate-800 rounded-xl">
              <div className="text-xs text-slate-400 font-mono mb-1">Current In-Store Occupancy</div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
                {occupancy}
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-1">
                Active anonymous tracks
              </div>
            </div>

            <div className="p-4 bg-[#0B111D] border border-slate-800 rounded-xl">
              <div className="text-xs text-slate-400 font-mono mb-1">Inbound Entrance Count</div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-cyan-400 tabular-nums">
                {entryCount.toLocaleString()}
              </div>
              <div className="text-[11px] text-cyan-400/90 font-mono mt-1">
                Turnstiles A &amp; B
              </div>
            </div>

            <div className="p-4 bg-[#0B111D] border border-slate-800 rounded-xl">
              <div className="text-xs text-slate-400 font-mono mb-1">Outbound Checkout Count</div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-300 tabular-nums">
                {exitCount.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-1">
                Completed store exits
              </div>
            </div>
          </div>

          {/* Footfall Trend Hourly Chart */}
          <div className="bg-[#0B111D] border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <h3 className="text-base font-bold text-white font-display">
                  Hourly Footfall Trends &amp; Traffic Curve
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time footfall intensity distribution throughout operating hours.
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-400">
                Peak: 17:00 (245 shoppers/hr)
              </span>
            </div>

            <div className="h-48 flex items-end gap-2 sm:gap-4 justify-between pt-6">
              {hourlyTrends.map((h) => {
                const heightPercent = (h.count / maxHourly) * 100;
                return (
                  <div key={h.hour} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity tabular-nums">
                      {h.count}
                    </span>
                    <div className="w-full bg-slate-800/80 rounded-t h-full flex items-end overflow-hidden">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-t transition-all duration-300 ${
                          h.count >= 200
                            ? 'bg-gradient-to-t from-emerald-600 to-emerald-400'
                            : 'bg-gradient-to-t from-slate-700 to-slate-500 group-hover:from-emerald-600 group-hover:to-teal-400'
                        }`}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 group-hover:text-emerald-300 transition-colors">
                      {h.hour.split(':')[0]}h
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {selectedShopperModule === 'dwell' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[#0B111D] border border-slate-800 rounded-xl">
              <div className="text-xs text-slate-400 font-mono mb-1">Average Store Dwell Time</div>
              <div className="text-3xl font-bold font-mono text-amber-400 tabular-nums">
                {dwellTime} mins
              </div>
              <div className="text-xs text-slate-500 mt-1">Across all store departments</div>
            </div>
            <div className="p-4 bg-[#0B111D] border border-slate-800 rounded-xl">
              <div className="text-xs text-slate-400 font-mono mb-1">Highest Dwell Department</div>
              <div className="text-3xl font-bold font-mono text-white">Apparel &amp; Life</div>
              <div className="text-xs text-amber-400 font-mono mt-1">7m 45s avg engagement</div>
            </div>
            <div className="p-4 bg-[#0B111D] border border-slate-800 rounded-xl">
              <div className="text-xs text-slate-400 font-mono mb-1">Conversion Correlation</div>
              <div className="text-3xl font-bold font-mono text-emerald-400">+3.8x</div>
              <div className="text-xs text-slate-500 mt-1">When dwell exceeds 6 minutes</div>
            </div>
          </div>

          {/* Zone-wise Dwell Time Table */}
          <div className="bg-[#0B111D] border border-slate-800 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white font-mono uppercase">
                Zone-wise Dwell Time &amp; Engagement Index
              </h3>
              <span className="text-xs font-mono text-slate-400">5 Monitored Departments</span>
            </div>
            <div className="divide-y divide-slate-800/80">
              {zoneDwells.map((zone) => (
                <div key={zone.zone} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="font-semibold text-sm text-white font-display">{zone.zone}</div>
                    <div className="text-xs text-slate-400 mt-0.5">Classification: {zone.status}</div>
                  </div>
                  <div className="flex items-center gap-6 sm:w-72">
                    <div className="flex-1">
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${zone.percentage}%` }}
                          className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full"
                        />
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-white tabular-nums shrink-0">
                      {zone.avgDwell}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedShopperModule === 'heatmap' && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl text-xs text-slate-300 flex items-center justify-between">
            <span>
              Interactive spatial heatmaps generated from camera homography coordinates.
            </span>
            <span className="text-emerald-400 font-mono">Real-time Density Layer</span>
          </div>
          {/* Reusing the existing store floorplan visualization */}
          <StoreHeatmapSection />
        </div>
      )}

      {selectedShopperModule === 'movement' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-[#0B111D] border border-slate-800 rounded-xl">
              <h3 className="text-sm font-bold font-mono text-white mb-2">
                CUSTOMER MOVEMENT PATHS &amp; TRANSITIONS
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Computer vision edge nodes calculate anonymized directional vectors, tracking typical shopper journeys from store entrance through department zones to checkout.
              </p>
            </div>
            <div className="p-5 bg-[#0B111D] border border-slate-800 rounded-xl">
              <h3 className="text-sm font-bold font-mono text-white mb-2">
                ZONE CONVERSION VELOCITY
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Shoppers passing through Fresh Produce first demonstrate 22% higher average basket sizes compared to those entering directly into dry grocery.
              </p>
            </div>
          </div>

          <div className="bg-[#0B111D] border border-slate-800 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between font-mono text-xs">
              <span className="font-bold text-white">POPULAR STORE TRANSITION ROUTES</span>
              <span className="text-slate-400">Ranked by Traffic Share</span>
            </div>
            <div className="divide-y divide-slate-800/80">
              {movementRoutes.map((route, idx) => (
                <div key={idx} className="p-5 hover:bg-slate-900/40 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="font-semibold text-sm text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-[10px] font-mono text-slate-300 flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span>{route.route}</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-emerald-400 tabular-nums">
                      {route.trafficShare} traffic
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono mt-1">
                    <span>Avg Journey: <strong className="text-slate-200">{route.avgTime}</strong></span>
                    <span>·</span>
                    <span>Intent: <strong className="text-slate-200">{route.intent}</strong></span>
                    <span>·</span>
                    <span>Checkout Conversion: <strong className="text-emerald-400">{route.conversionRate}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
