import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MainSection,
  ShopperModule,
  InventoryModule,
  QueueModule,
  StoreData,
  RetailAlert,
} from '../types/retail';
import { INDIAN_DEMO_STORES, INITIAL_ALERTS } from '../data/mockRetailData';

interface RetailContextType {
  selectedSection: MainSection;
  setSelectedSection: (section: MainSection) => void;
  selectedShopperModule: ShopperModule;
  setSelectedShopperModule: (mod: ShopperModule) => void;
  selectedInventoryModule: InventoryModule;
  setSelectedInventoryModule: (mod: InventoryModule) => void;
  selectedQueueModule: QueueModule;
  setSelectedQueueModule: (mod: QueueModule) => void;
  selectedStore: StoreData;
  setSelectedStore: (store: StoreData) => void;
  stores: StoreData[];
  simulationRunning: boolean;
  setSimulationRunning: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSimulation: () => void;
  // Shared Live Metrics
  footfall: number;
  occupancy: number;
  entryCount: number;
  exitCount: number;
  dwellTime: number;
  queues: StoreData['queues'];
  inventory: StoreData['inventory'];
  alerts: RetailAlert[];
  acknowledgeAlert: (id: string) => void;
  dispatchRestockItem: (id: string) => void;
  toggleLane4: () => void;
  liveDemoModalOpen: boolean;
  setLiveDemoModalOpen: (open: boolean) => void;
}

const RetailContext = createContext<RetailContextType | undefined>(undefined);

export const RetailProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedSection, setSelectedSection] = useState<MainSection>('overview');
  const [selectedShopperModule, setSelectedShopperModule] = useState<ShopperModule>('footfall');
  const [selectedInventoryModule, setSelectedInventoryModule] = useState<InventoryModule>('stock-level');
  const [selectedQueueModule, setSelectedQueueModule] = useState<QueueModule>('queue-length');

  const [selectedStore, setSelectedStoreState] = useState<StoreData>(INDIAN_DEMO_STORES[0]);
  const [simulationRunning, setSimulationRunning] = useState<boolean>(true);
  const [liveDemoModalOpen, setLiveDemoModalOpen] = useState<boolean>(false);

  // Synchronized state seeded from selectedStore
  const [footfall, setFootfall] = useState<number>(selectedStore.footfall);
  const [occupancy, setOccupancy] = useState<number>(selectedStore.occupancy);
  const [entryCount, setEntryCount] = useState<number>(selectedStore.entryCount);
  const [exitCount, setExitCount] = useState<number>(selectedStore.exitCount);
  const [dwellTime, setDwellTime] = useState<number>(selectedStore.dwellTime);
  const [queues, setQueues] = useState<StoreData['queues']>(selectedStore.queues);
  const [inventory, setInventory] = useState<StoreData['inventory']>(selectedStore.inventory);
  const [alerts, setAlerts] = useState<RetailAlert[]>(INITIAL_ALERTS);

  // When store changes, synchronize all live shared metrics
  const setSelectedStore = (newStore: StoreData) => {
    setSelectedStoreState(newStore);
    setFootfall(newStore.footfall);
    setOccupancy(newStore.occupancy);
    setEntryCount(newStore.entryCount);
    setExitCount(newStore.exitCount);
    setDwellTime(newStore.dwellTime);
    setQueues(newStore.queues);
    setInventory(newStore.inventory);
  };

  // Organic real-time simulation tick: keeps data alive and synchronised across all pages
  useEffect(() => {
    if (!simulationRunning) return;

    const interval = setInterval(() => {
      // Natural footfall fluctuation
      const deltaIn = Math.random() > 0.4 ? 1 : 0;
      const deltaOut = Math.random() > 0.6 ? 1 : 0;

      setEntryCount((prev) => prev + deltaIn);
      setExitCount((prev) => prev + deltaOut);
      setFootfall((prev) => prev + deltaIn);
      setOccupancy((prev) => Math.max(12, prev + deltaIn - deltaOut));

      // Occasional gentle queue jitter
      if (Math.random() > 0.7) {
        setQueues((prevQueues) =>
          prevQueues.map((q) => {
            if (q.status === 'standby') return q;
            const lengthDelta = Math.random() > 0.5 ? (Math.random() > 0.5 ? 1 : -1) : 0;
            const newLength = Math.max(1, Math.min(8, q.length + lengthDelta));
            const newWait = newLength * (25 + Math.floor(Math.random() * 8));
            return {
              ...q,
              length: newLength,
              waitingTime: newWait,
              status: newLength >= 5 ? 'warning' : 'active',
            };
          })
        );
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [simulationRunning]);

  const toggleSimulation = () => {
    setSimulationRunning((prev) => !prev);
  };

  const acknowledgeAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a))
    );
  };

  const dispatchRestockItem = (id: string) => {
    acknowledgeAlert(id);
    setInventory((prev) => ({
      ...prev,
      outOfStock: Math.max(0, prev.outOfStock - 1),
      inStock: prev.inStock + 1,
      compliance: Math.min(99.9, +(prev.compliance + 0.3).toFixed(1)),
    }));
  };

  const toggleLane4 = () => {
    setQueues((prev) =>
      prev.map((q) => {
        if (q.counter === 4) {
          const isStandby = q.status === 'standby';
          return {
            ...q,
            status: isStandby ? 'active' : 'standby',
            length: isStandby ? 2 : 0,
            waitingTime: isStandby ? 45 : 0,
          };
        }
        // If lane 4 opened, relieve load on other lanes
        return {
          ...q,
          length: Math.max(1, q.length - 1),
          waitingTime: Math.max(20, Math.floor(q.waitingTime * 0.75)),
        };
      })
    );
  };

  return (
    <RetailContext.Provider
      value={{
        selectedSection,
        setSelectedSection,
        selectedShopperModule,
        setSelectedShopperModule,
        selectedInventoryModule,
        setSelectedInventoryModule,
        selectedQueueModule,
        setSelectedQueueModule,
        selectedStore,
        setSelectedStore,
        stores: INDIAN_DEMO_STORES,
        simulationRunning,
        setSimulationRunning,
        toggleSimulation,
        footfall,
        occupancy,
        entryCount,
        exitCount,
        dwellTime,
        queues,
        inventory,
        alerts,
        acknowledgeAlert,
        dispatchRestockItem,
        toggleLane4,
        liveDemoModalOpen,
        setLiveDemoModalOpen,
      }}
    >
      {children}
    </RetailContext.Provider>
  );
};

export const useRetail = () => {
  const context = useContext(RetailContext);
  if (!context) {
    throw new Error('useRetail must be used within a RetailProvider');
  }
  return context;
};
