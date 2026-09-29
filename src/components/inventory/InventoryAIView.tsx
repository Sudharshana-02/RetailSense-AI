import React, { useState } from 'react';
import { useRetail } from '../../context/RetailContext';
import { InventoryModule } from '../../types/retail';
import {
  Package,
  AlertTriangle,
  Layers,
  CheckCircle2,
  RefreshCw,
  Clock,
  ArrowRight,
  ShieldCheck,
  Send,
} from 'lucide-react';

interface OutOfStockItem {
  id: string;
  name: string;
  sku: string;
  shelfLocation: string;
  timeDetected: string;
  replenishmentStatus: 'Pending Dispatch' | 'Restocking' | 'Restocked';
  bayIndex: string;
}

export const InventoryAIView: React.FC = () => {
  const {
    selectedInventoryModule,
    setSelectedInventoryModule,
    inventory,
    dispatchRestockItem,
    selectedStore,
  } = useRetail();

  const [outOfStockList, setOutOfStockList] = useState<OutOfStockItem[]>([
    {
      id: 'oos-1',
      name: 'Organic Oat Milk 1L',
      sku: 'SKU-4892',
      shelfLocation: 'Aisle 03 · Refrigerated Bay 2',
      timeDetected: '11:22 AM (18m ago)',
      replenishmentStatus: 'Pending Dispatch',
      bayIndex: 'Shelf Tier 2 · Facing 3',
    },
    {
      id: 'oos-2',
      name: 'Artisan Cold Brew Coffee 330ml',
      sku: 'SKU-7721',
      shelfLocation: 'Aisle 03 · Chilled Beverage Bay 1',
      timeDetected: '11:05 AM (35m ago)',
      replenishmentStatus: 'Pending Dispatch',
      bayIndex: 'Shelf Tier 1 · Facing 4',
    },
    {
      id: 'oos-3',
      name: 'Almond Butter Crunch Bars 6pk',
      sku: 'SKU-3109',
      shelfLocation: 'Aisle 01 · Granola & Healthy Snacks',
      timeDetected: '10:48 AM (52m ago)',
      replenishmentStatus: 'Pending Dispatch',
      bayIndex: 'Shelf Tier 3 · Facing 2',
    },
    {
      id: 'oos-4',
      name: 'Sparkling Mineral Water 750ml',
      sku: 'SKU-8910',
      shelfLocation: 'Aisle 04 · Beverage Endcap',
      timeDetected: '10:15 AM (1h 25m ago)',
      replenishmentStatus: 'Restocking',
      bayIndex: 'Shelf Tier 2 · Facing 1',
    },
  ]);

  const subNavItems: { id: InventoryModule; label: string; icon: React.ReactNode }[] = [
    { id: 'stock-level', label: 'Stock Level', icon: <Package className="w-3.5 h-3.5" /> },
    { id: 'out-of-stock', label: 'Out of Stock', icon: <AlertTriangle className="w-3.5 h-3.5" /> },
    { id: 'planogram', label: 'Planogram', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'compliance', label: 'Compliance', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
  ];

  const handleRestock = (item: OutOfStockItem) => {
    setOutOfStockList((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, replenishmentStatus: 'Restocked' } : i))
    );
    dispatchRestockItem(item.id);
  };

  const categories = [
    { name: 'Refrigerated Dairy & Alternatives', count: 320, available: 308, rate: 96.2 },
    { name: 'Packaged Grocery & Snacks', count: 480, available: 462, rate: 96.3 },
    { name: 'Beverages & Functional Drinks', count: 290, available: 275, rate: 94.8 },
    { name: 'Fresh Bakery & Pastries', count: 180, available: 174, rate: 96.7 },
    { name: 'Personal Care & Household', count: 210, available: 206, rate: 98.1 },
  ];

  return (
    <div className="py-8 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Sub-navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
            INVENTORY INTELLIGENCE
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Autonomous Shelf Visibility &amp; Void Detection
          </h1>
          <div className="text-xs text-slate-400 mt-1">
            Store Location: <span className="text-white font-medium">{selectedStore.name}</span> ({selectedStore.location})
          </div>
        </div>

        {/* Sub-navigation Bar */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
          {subNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedInventoryModule(item.id)}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
                selectedInventoryModule === item.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Reactive Content */}
      {selectedInventoryModule === 'stock-level' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-[#0B111D] border border-slate-800 rounded-xl">
              <div className="text-xs text-slate-400 font-mono mb-1">Total Monitored SKUs</div>
              <div className="text-3xl font-bold font-mono text-white tabular-nums">
                {inventory.totalMonitored.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-1">Across 48 shelf bays</div>
            </div>

            <div className="p-4 bg-[#0B111D] border border-slate-800 rounded-xl">
              <div className="text-xs text-slate-400 font-mono mb-1">In-Stock Products</div>
              <div className="text-3xl font-bold font-mono text-emerald-400 tabular-nums">
                {inventory.inStock.toLocaleString()}
              </div>
              <div className="text-[11px] text-emerald-400/90 font-mono mt-1">Optimal facing density</div>
            </div>

            <div className="p-4 bg-[#0B111D] border border-slate-800 rounded-xl">
              <div className="text-xs text-slate-400 font-mono mb-1">Low-Stock Warnings</div>
              <div className="text-3xl font-bold font-mono text-amber-400 tabular-nums">
                {inventory.lowStock}
              </div>
              <div className="text-[11px] text-amber-400/90 font-mono mt-1">&lt; 20% remaining</div>
            </div>

            <div className="p-4 bg-[#0B111D] border border-slate-800 rounded-xl">
              <div className="text-xs text-slate-400 font-mono mb-1">Stock Availability %</div>
              <div className="text-3xl font-bold font-mono text-cyan-400 tabular-nums">
                {((inventory.inStock / inventory.totalMonitored) * 100).toFixed(1)}%
              </div>
              <div className="text-[11px] text-cyan-400/90 font-mono mt-1">SLA Target: &gt; 95%</div>
            </div>
          </div>

          {/* Department Breakdown */}
          <div className="bg-[#0B111D] border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-white font-mono uppercase mb-4">
              Category Stock Availability Breakdown
            </h3>
            <div className="space-y-4">
              {categories.map((cat) => (
                <div key={cat.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">{cat.name}</span>
                    <span className="font-mono text-cyan-400 font-bold tabular-nums">
                      {cat.rate}% ({cat.available}/{cat.count} SKUs)
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${cat.rate}%` }}
                      className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedInventoryModule === 'out-of-stock' && (
        <div className="space-y-6">
          <div className="p-4 bg-amber-950/20 border border-amber-500/40 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <div>
                <div className="text-sm font-bold text-amber-200">
                  {outOfStockList.filter((i) => i.replenishmentStatus !== 'Restocked').length} Out-of-Stock Events Detected
                </div>
                <div className="text-xs text-slate-400">
                  Computer vision detected depleted shelf facings with 0 units available.
                </div>
              </div>
            </div>
            <div className="text-xs font-mono text-amber-400">
              Avg Restock SLA: 6 mins
            </div>
          </div>

          {/* Out of Stock Table */}
          <div className="bg-[#0B111D] border border-slate-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/80 font-mono text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-5">Product Name &amp; SKU</th>
                    <th className="py-3 px-5">Shelf &amp; Bay Location</th>
                    <th className="py-3 px-5">Detected Time</th>
                    <th className="py-3 px-5">Replenishment Status</th>
                    <th className="py-3 px-5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {outOfStockList.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-4 px-5">
                        <div className="font-semibold text-white text-sm">{item.name}</div>
                        <div className="text-[11px] font-mono text-slate-400">{item.sku}</div>
                      </td>
                      <td className="py-4 px-5">
                        <div className="text-slate-300">{item.shelfLocation}</div>
                        <div className="text-[11px] font-mono text-slate-500">{item.bayIndex}</div>
                      </td>
                      <td className="py-4 px-5 font-mono text-slate-400">
                        {item.timeDetected}
                      </td>
                      <td className="py-4 px-5">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
                            item.replenishmentStatus === 'Restocked'
                              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                              : item.replenishmentStatus === 'Restocking'
                              ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                              : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                          }`}
                        >
                          {item.replenishmentStatus}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right">
                        {item.replenishmentStatus === 'Restocked' ? (
                          <span className="text-emerald-400 font-mono text-xs flex items-center justify-end gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Replenished</span>
                          </span>
                        ) : (
                          <button
                            onClick={() => handleRestock(item)}
                            className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded transition-colors inline-flex items-center gap-1.5"
                          >
                            <Send className="w-3 h-3" />
                            <span>Dispatch Restock</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {selectedInventoryModule === 'planogram' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[#0B111D] border border-slate-800 rounded-xl">
              <div className="text-xs text-slate-400 font-mono mb-1">Planogram Compliance Rate</div>
              <div className="text-3xl font-bold font-mono text-emerald-400 tabular-nums">
                {inventory.compliance}%
              </div>
              <div className="text-xs text-slate-500 mt-1">Target threshold: 92%</div>
            </div>
            <div className="p-4 bg-[#0B111D] border border-slate-800 rounded-xl">
              <div className="text-xs text-slate-400 font-mono mb-1">Detected Misplaced SKUs</div>
              <div className="text-3xl font-bold font-mono text-amber-400 tabular-nums">
                6 Units
              </div>
              <div className="text-xs text-slate-500 mt-1">Across 3 beverage bays</div>
            </div>
            <div className="p-4 bg-[#0B111D] border border-slate-800 rounded-xl">
              <div className="text-xs text-slate-400 font-mono mb-1">Facing Alignment Accuracy</div>
              <div className="text-3xl font-bold font-mono text-white tabular-nums">
                98.8%
              </div>
              <div className="text-xs text-slate-500 mt-1">Verified via camera homography</div>
            </div>
          </div>

          <div className="bg-[#0B111D] border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-white font-mono uppercase mb-3">
              Expected vs Detected Shelf Arrangement
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              RetailSense AI continuously compares real-time CCTV imagery against master merchandising planograms (JSON / CAD) to identify unauthorized placement, brand drift, and missing promotional banners.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 bg-slate-900 rounded-lg border border-slate-800">
                <div className="text-slate-400 mb-2 font-bold flex items-center justify-between">
                  <span>MASTER PLANOGRAM EXPECTED</span>
                  <span className="text-emerald-400">NOMINAL</span>
                </div>
                <div className="space-y-1.5 text-slate-300">
                  <div>Tier 1: Sparkling Water (4 facings)</div>
                  <div>Tier 2: Cold Brew Espresso (3 facings)</div>
                  <div>Tier 3: Organic Oat Milk 1L (5 facings)</div>
                </div>
              </div>

              <div className="p-4 bg-slate-900 rounded-lg border border-slate-800">
                <div className="text-slate-400 mb-2 font-bold flex items-center justify-between">
                  <span>CAMERA DETECTED ARRANGEMENT</span>
                  <span className="text-amber-400">DEVIATION FOUND</span>
                </div>
                <div className="space-y-1.5 text-slate-300">
                  <div>Tier 1: Sparkling Water (4 facings) ✓</div>
                  <div className="text-amber-300">Tier 2: Cold Brew + 2 Misplaced Energy Cans ⚠️</div>
                  <div className="text-rose-300">Tier 3: Organic Oat Milk (Void Detected, 0 facings) ✕</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedInventoryModule === 'compliance' && (
        <div className="space-y-6">
          <div className="p-5 bg-[#0B111D] border border-slate-800 rounded-xl">
            <h3 className="text-base font-bold text-white font-display mb-2">
              Shelf Compliance &amp; Product Placement Integrity
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Maintain supplier contract commitments and merchandising standards. Real-time compliance scoring allows store managers to verify brand facing guarantees without manual clipboard audits.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-[#0B111D] border border-slate-800 rounded-xl">
              <div className="text-xs text-slate-400 font-mono mb-1">Facing Compliance</div>
              <div className="text-2xl font-bold font-mono text-emerald-400">97.2%</div>
              <div className="text-[11px] text-slate-400 mt-1">Contractually compliant</div>
            </div>
            <div className="p-4 bg-[#0B111D] border border-slate-800 rounded-xl">
              <div className="text-xs text-slate-400 font-mono mb-1">Missing Price Tags</div>
              <div className="text-2xl font-bold font-mono text-amber-400">2 Items</div>
              <div className="text-[11px] text-slate-400 mt-1">Aisle 02 &amp; Aisle 05</div>
            </div>
            <div className="p-4 bg-[#0B111D] border border-slate-800 rounded-xl">
              <div className="text-xs text-slate-400 font-mono mb-1">Endcap Promotional Health</div>
              <div className="text-2xl font-bold font-mono text-cyan-400">100%</div>
              <div className="text-[11px] text-slate-400 mt-1">All 6 endcaps fully stocked</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
