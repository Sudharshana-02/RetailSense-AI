import React from 'react';
import { useRetail } from '../context/RetailContext';
import { HeroSection } from './HeroSection';
import { CapabilityCardsSection } from './CapabilityCard';
import { FAQ } from './FAQ';
import { EdgeAiPrivacySection } from './EdgeAiPrivacySection';
import { StoreLocation } from '../types/retail';
import {
  Users,
  Package,
  Clock,
  ArrowRight,
  Eye,
  CheckCircle2,
  Cpu,
  ShieldCheck,
} from 'lucide-react';

interface OverviewViewProps {
  onOpenLiveDemo: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ onOpenLiveDemo }) => {
  const { selectedStore, setSelectedSection, setSelectedShopperModule, setSelectedInventoryModule, setSelectedQueueModule } = useRetail();

  // Compatibility object for HeroSection
  const storeLocationObj: StoreLocation = {
    id: selectedStore.id,
    name: selectedStore.name,
    city: `${selectedStore.city}, ${selectedStore.country}`,
    cameraCount: selectedStore.cameraCount,
    activeShoppers: selectedStore.occupancy,
    avgWaitTime: `${Math.floor(selectedStore.queues[0].waitingTime / 60)}m ${selectedStore.queues[0].waitingTime % 60}s`,
    alertCount: selectedStore.alertsCount,
    shelfHealth: selectedStore.inventory.compliance,
  };

  const handleSelectCapability = (id: string) => {
    if (id === 'shopper') {
      setSelectedSection('shopper');
      setSelectedShopperModule('footfall');
    } else if (id === 'inventory') {
      setSelectedSection('inventory');
      setSelectedInventoryModule('stock-level');
    } else if (id === 'queue') {
      setSelectedSection('queue');
      setSelectedQueueModule('queue-length');
    } else if (id === 'edge') {
      setSelectedSection('live-monitoring');
    } else {
      setSelectedSection('live-monitoring');
    }
  };

  return (
    <div className="space-y-0">
      {/* Existing Hero Section with TechText & Reactive CCTV Live Intelligence Feed (UNTOUCHED) */}
      <HeroSection
        selectedStore={storeLocationObj}
        onOpenLiveDemo={onOpenLiveDemo}
      />

      {/* 2. What Our Platform Does */}
      <section className="py-20 bg-[#090D14] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
              WHAT OUR PLATFORM DOES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display text-balance">
              Retail Intelligence, From Camera to Action
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              RetailSense AI transforms existing retail camera infrastructure into actionable operational intelligence using on-premise edge AI.
              By computing computer vision models directly in-store, we deliver instant visibility across three core retail pillars:
            </p>
          </div>

          {/* Three Major Intelligence Areas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Shopper Intelligence */}
            <div className="bg-[#0B111D] border border-slate-800 rounded-xl p-7 flex flex-col justify-between hover:border-emerald-500/40 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-display mb-2">
                  Shopper Intelligence
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Gain granular visibility into customer traffic flows, interest zones, and navigation patterns without capturing facial identifiers.
                </p>

                <div className="space-y-2.5 pt-4 border-t border-slate-800/80 text-xs">
                  <div className="font-mono text-slate-400 mb-2">Understand:</div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span><strong>Footfall:</strong> Accurate real-time shopper counting</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span><strong>Dwell Time:</strong> Time spent interacting per display</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span><strong>Movement:</strong> Directional customer journeys</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span><strong>Heatmaps:</strong> Store traffic density floorplans</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedSection('shopper');
                  setSelectedShopperModule('footfall');
                }}
                className="mt-6 w-full py-2.5 px-4 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-colors"
              >
                <span>Explore Shopper AI</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            </div>

            {/* Inventory Intelligence */}
            <div className="bg-[#0B111D] border border-slate-800 rounded-xl p-7 flex flex-col justify-between hover:border-cyan-500/40 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5">
                  <Package className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-display mb-2">
                  Inventory Intelligence
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Maintain continuous shelf facing compliance and eliminate lost sales from unexpected product stockouts.
                </p>

                <div className="space-y-2.5 pt-4 border-t border-slate-800/80 text-xs">
                  <div className="font-mono text-slate-400 mb-2">Understand:</div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span><strong>Stock Levels:</strong> Real-time fill percentage</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span><strong>Out-of-Stock:</strong> Instant shelf void alerts</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span><strong>Planograms:</strong> Planogram alignment checks</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span><strong>Shelf Compliance:</strong> Misplaced SKU alerts</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedSection('inventory');
                  setSelectedInventoryModule('stock-level');
                }}
                className="mt-6 w-full py-2.5 px-4 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-cyan-500/50 hover:bg-cyan-500/10 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-colors"
              >
                <span>Explore Inventory AI</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            </div>

            {/* Queue Intelligence */}
            <div className="bg-[#0B111D] border border-slate-800 rounded-xl p-7 flex flex-col justify-between hover:border-amber-500/40 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-display mb-2">
                  Queue Intelligence
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Prevent checkout bottlenecks and cart abandonment with predictive wait time analytics and dynamic lane dispatch.
                </p>

                <div className="space-y-2.5 pt-4 border-t border-slate-800/80 text-xs">
                  <div className="font-mono text-slate-400 mb-2">Understand:</div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span><strong>Queue Length:</strong> Headcounts per active register</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span><strong>Waiting Time:</strong> Real-time checkout wait latency</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span><strong>Congestion:</strong> Bottleneck threshold alerts</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span><strong>Prediction:</strong> 15-minute queue congestion forecasts</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedSection('queue');
                  setSelectedQueueModule('queue-length');
                }}
                className="mt-6 w-full py-2.5 px-4 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-amber-500/50 hover:bg-amber-500/10 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-colors"
              >
                <span>Explore Queue AI</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Platform Uses & Key Capabilities */}
      <section className="py-20 bg-[#070B12] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
              COMPREHENSIVE CAPABILITIES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Platform Uses &amp; Key Capabilities
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore the five interconnected modules delivering end-to-end edge store intelligence.
            </p>
          </div>

          <CapabilityCardsSection onSelectCapability={handleSelectCapability} />
        </div>
      </section>

      {/* Privacy Architecture Guarantee */}
      <EdgeAiPrivacySection />

      {/* 4. Frequently Asked Questions Accordion */}
      <FAQ />
    </div>
  );
};
