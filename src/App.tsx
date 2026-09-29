/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { OverviewSection } from './components/OverviewSection';
import { LiveMonitoringSection } from './components/LiveMonitoringSection';
import { ShopperAnalyticsSection } from './components/ShopperAnalyticsSection';
import { InventoryShelfSection } from './components/InventoryShelfSection';
import { QueueIntelligenceSection } from './components/QueueIntelligenceSection';
import { StoreHeatmapSection } from './components/StoreHeatmapSection';
import { EdgeAiPrivacySection } from './components/EdgeAiPrivacySection';
import { AiInsightsAndAlertsSection } from './components/AiInsightsAndAlertsSection';
import { HistoricalAnalyticsSection } from './components/HistoricalAnalyticsSection';
import { OperationsConsoleModal } from './components/OperationsConsoleModal';
import { Footer } from './components/Footer';
import { STORE_LOCATIONS } from './data/mockRetailData';
import { StoreLocation } from './types/retail';

function MainApp() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [selectedStore, setSelectedStore] = useState<StoreLocation>(STORE_LOCATIONS[0]);
  const [liveDemoModalOpen, setLiveDemoModalOpen] = useState<boolean>(false);

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isDark
          ? 'bg-[#0B0F19] text-slate-100 selection:bg-blue-600/30 selection:text-blue-200'
          : 'bg-[#F8FAFC] text-slate-900 selection:bg-blue-600/20 selection:text-blue-900'
      }`}
    >
      {/* Sticky Top Navigation with Theme Switcher */}
      <Navbar
        selectedStore={selectedStore}
        onSelectStore={setSelectedStore}
        onOpenLiveDemo={() => setLiveDemoModalOpen(true)}
      />

      {/* Main Homepage Flow */}
      <main className="flex-1">
        {/* Overview Section: RetailSense AI & description, What is RetailSense, Platform Uses & Key Capabilities, FAQ */}
        <OverviewSection
          selectedStore={selectedStore}
          onOpenLiveDemo={() => setLiveDemoModalOpen(true)}
        />

        {/* Live Monitoring Section: Dedicated CCTV Video Surveillance Feeds (WhatsApp Videos) */}
        <LiveMonitoringSection
          selectedStore={selectedStore}
          onOpenLiveDemo={() => setLiveDemoModalOpen(true)}
        />

        {/* 1. Real-time Shopper Analytics & Journey Trajectories */}
        <ShopperAnalyticsSection />

        {/* 2. Inventory & Shelf Monitoring */}
        <InventoryShelfSection />

        {/* 3. Queue Intelligence & Predictive Wait Reduction */}
        <QueueIntelligenceSection />

        {/* 4. Store Heatmaps & Density Floorplan */}
        <StoreHeatmapSection />

        {/* 6. Privacy-Aware Edge AI Processing */}
        <EdgeAiPrivacySection />

        {/* 5 & 7. AI Operational Insights & Real-Time Alert Stream */}
        <AiInsightsAndAlertsSection />

        {/* 8. Historical Analytics & Executive Reports */}
        <HistoricalAnalyticsSection />
      </main>

      {/* Quiet Compliant Footer */}
      <Footer />

      {/* 9. Full Interactive Operations Console & Multi-Store Control Center Modal */}
      <OperationsConsoleModal
        isOpen={liveDemoModalOpen}
        onClose={() => setLiveDemoModalOpen(false)}
        selectedStore={selectedStore}
        onSelectStore={setSelectedStore}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
