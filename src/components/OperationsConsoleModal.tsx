import React, { useState } from 'react';
import { StoreLocation, CameraFeed } from '../types/retail';
import { CAMERA_FEEDS, STORE_LOCATIONS, INITIAL_ALERTS } from '../data/mockRetailData';
import { CctvFeedViewer } from './CctvFeedViewer';
import { useTheme } from '../context/ThemeContext';
import {
  X,
  Activity,
  MapPin,
  CheckCircle2,
  Video,
} from 'lucide-react';

interface OperationsConsoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStore: StoreLocation;
  onSelectStore: (store: StoreLocation) => void;
}

export const OperationsConsoleModal: React.FC<OperationsConsoleModalProps> = ({
  isOpen,
  onClose,
  selectedStore,
  onSelectStore,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeCam, setActiveCam] = useState<CameraFeed>(CAMERA_FEEDS[0]);
  const [viewMode, setViewMode] = useState<'single' | 'quad'>('single');
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState<string[]>([]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col overflow-hidden animate-in fade-in duration-200 transition-colors ${
        isDark ? 'bg-[#0B0F19]/95 text-slate-100' : 'bg-slate-900/80 backdrop-blur-md text-slate-900'
      }`}
    >
      {/* Top Operations Header */}
      <header
        className={`px-6 py-3 border-b flex items-center justify-between transition-colors ${
          isDark
            ? 'bg-[#0F172A] border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-blue-600/10 border border-blue-600/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-bold font-mono flex items-center gap-2">
              <span>RETAILSENSE AI // LIVE SURVEILLANCE CONSOLE</span>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 px-1.5 py-0.5 rounded font-semibold">
                LIVE RTSP
              </span>
            </div>
            <div className="text-xs text-slate-500">
              Tagged Store Video Analysis · Camera 01 (Pharmacy Mart) &amp; Camera 02 (ATM &amp; Aisle)
            </div>
          </div>
        </div>

        {/* Store Tabs */}
        <div
          className={`hidden lg:flex items-center gap-1.5 p-1 border rounded-lg ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}
        >
          {STORE_LOCATIONS.map((store) => (
            <button
              key={store.id}
              onClick={() => onSelectStore(store)}
              className={`px-3 py-1 text-xs font-mono font-medium rounded transition-colors flex items-center gap-1.5 ${
                store.id === selectedStore.id
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <MapPin className="w-3 h-3" />
              <span>{store.name}</span>
            </button>
          ))}
        </div>

        {/* View Mode & Close Action */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-1 border rounded p-0.5 text-xs font-mono ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}
          >
            <button
              onClick={() => setViewMode('single')}
              className={`px-2.5 py-1 rounded transition-colors ${
                viewMode === 'single'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Single Feed
            </button>
            <button
              onClick={() => setViewMode('quad')}
              className={`px-2.5 py-1 rounded transition-colors ${
                viewMode === 'quad'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Both Feeds (Dual)
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors"
            title="Exit Operations Console"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Console Viewport */}
      <div
        className={`flex-1 p-4 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-4 ${
          isDark ? 'bg-[#0B0F19]' : 'bg-slate-100'
        }`}
      >
        {/* Left Column: Video Feeds (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {viewMode === 'single' ? (
            <div className="w-full">
              <CctvFeedViewer
                initialCameraId={activeCam.id}
                onCameraChange={(c) => setActiveCam(c)}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CAMERA_FEEDS.map((cam) => (
                <div
                  key={cam.id}
                  onClick={() => {
                    setActiveCam(cam);
                    setViewMode('single');
                  }}
                  className={`cursor-pointer border rounded-lg overflow-hidden transition-all ${
                    isDark
                      ? 'bg-[#111827] border-slate-800 hover:border-blue-500'
                      : 'bg-white border-slate-200 hover:border-blue-500 shadow-sm'
                  }`}
                >
                  <div
                    className={`px-3 py-1.5 border-b flex justify-between items-center text-[11px] font-mono ${
                      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <span className="font-semibold truncate">{cam.name}</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">60 FPS</span>
                  </div>
                  <div className="relative aspect-[16/9] bg-black">
                    <video
                      src={cam.videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute top-2 left-2 text-[10px] font-mono bg-emerald-600/90 text-white px-1.5 py-0.5 rounded flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                      <span>LIVE</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Location Key Performance Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div
              className={`p-3 border rounded-lg ${
                isDark ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="text-[11px] font-mono text-slate-500">Camera Feeds</div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">
                2 Live (Tagged)
              </div>
              <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
                100% Operational
              </div>
            </div>

            <div
              className={`p-3 border rounded-lg ${
                isDark ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="text-[11px] font-mono text-slate-500">Active Shoppers</div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">
                {selectedStore.activeShoppers}
              </div>
              <div className="text-[10px] font-mono text-slate-500 mt-0.5">Across both feeds</div>
            </div>

            <div
              className={`p-3 border rounded-lg ${
                isDark ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="text-[11px] font-mono text-slate-500">Register Queue</div>
              <div className="text-xl font-bold font-mono text-blue-600 dark:text-blue-400 mt-1">
                {selectedStore.avgWaitTime}
              </div>
              <div className="text-[10px] font-mono text-slate-500 mt-0.5">Under 90s SLA</div>
            </div>

            <div
              className={`p-3 border rounded-lg ${
                isDark ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="text-[11px] font-mono text-slate-500">ATM Dwell</div>
              <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                42s
              </div>
              <div className="text-[10px] font-mono text-slate-500 mt-0.5">Normal transaction</div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Incident Feed & Actions (4 Cols) */}
        <div
          className={`lg:col-span-4 border rounded-xl p-4 flex flex-col justify-between ${
            isDark ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 text-xs font-mono">
              <span className="font-semibold text-slate-900 dark:text-white">
                LIVE INCIDENTS // {selectedStore.name}
              </span>
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                {selectedStore.alertCount} Active
              </span>
            </div>

            <div className="mt-3 space-y-3">
              {INITIAL_ALERTS.map((alert) => {
                const isAck = acknowledgedAlerts.includes(alert.id);
                return (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-lg border text-xs ${
                      isAck
                        ? isDark
                          ? 'bg-slate-900/40 border-slate-800 opacity-60'
                          : 'bg-slate-100 border-slate-200 opacity-60'
                        : isDark
                        ? 'bg-slate-900/80 border-slate-700'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[10px] text-slate-500 mb-1">
                      <span>{alert.zone}</span>
                      <span>{alert.timestamp}</span>
                    </div>
                    <div className="font-semibold text-slate-900 dark:text-white mb-1">
                      {alert.title}
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed mb-2">
                      {alert.detail}
                    </p>
                    <div className="flex justify-end">
                      {isAck ? (
                        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Acknowledged</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => setAcknowledgedAlerts([...acknowledgedAlerts, alert.id])}
                          className="px-2.5 py-1 text-[11px] font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors shadow-xs"
                        >
                          {alert.actionText}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-500 flex items-center justify-between">
            <span>Hardware Enclave Status:</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Edge TPU Cluster Healthy</span>
          </div>
        </div>
      </div>
    </div>
  );
};
