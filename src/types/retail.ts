export interface StoreData {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  country: string;
  cameraCount: number;
  footfall: number;
  occupancy: number;
  entryCount: number;
  exitCount: number;
  dwellTime: number; // in minutes
  queues: {
    counter: number;
    name: string;
    length: number;
    waitingTime: number; // seconds
    status: 'active' | 'warning' | 'standby';
  }[];
  inventory: {
    totalMonitored: number;
    inStock: number;
    lowStock: number;
    outOfStock: number;
    compliance: number; // percentage
  };
  alertsCount: number;
  coordinates: { x: number; y: number }; // SVG map percentage
}

export type MainSection = 'overview' | 'live-monitoring' | 'shopper' | 'inventory' | 'queue';
export type ShopperModule = 'footfall' | 'dwell' | 'heatmap' | 'movement';
export type InventoryModule = 'stock-level' | 'out-of-stock' | 'planogram' | 'compliance';
export type QueueModule = 'queue-length' | 'waiting-time' | 'congestion' | 'prediction';

export interface StoreLocation {
  id: string;
  name: string;
  city: string;
  cameraCount: number;
  activeShoppers: number;
  avgWaitTime: string;
  alertCount: number;
  shelfHealth: number;
}

export interface BoundingBox {
  id: string;
  label: string;
  type: 'shopper' | 'cart' | 'shelf_empty' | 'queue_person' | 'staff';
  confidence: number;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  width: number;
  height: number;
  dwellSeconds?: number;
  status?: string;
  sentiment?: 'browsing' | 'purchasing' | 'hesitating' | 'waiting';
}

export interface CameraFeed {
  id: string;
  name: string;
  zone: string;
  image: string;
  videoUrl: string;
  fps: number;
  shoppersInView: number;
  dwellTimeAvg: string;
  anomalies: number;
  shelfAlerts: number;
  boundingBoxes: BoundingBox[];
}

export interface RetailAlert {
  id: string;
  title: string;
  zone: string;
  camera: string;
  timestamp: string;
  severity: 'critical' | 'warning' | 'info';
  type: 'inventory' | 'queue' | 'dwell' | 'security' | 'anomaly';
  detail: string;
  acknowledged: boolean;
  actionText: string;
}

export interface OperationalInsight {
  id: string;
  category: 'Staffing' | 'Restocking' | 'Layout' | 'Queue';
  summary: string;
  impact: string;
  confidence: number;
  recommendedAction: string;
  timeframe: string;
}

export interface HeatmapZone {
  id: string;
  name: string;
  type: 'entrance' | 'grocery' | 'fresh' | 'apparel' | 'checkout' | 'promotions';
  x: number;
  y: number;
  width: number;
  height: number;
  trafficScore: number; // 0-100
  dwellTimeMinutes: number;
  conversionRate: number;
  shopperCount: number;
}
