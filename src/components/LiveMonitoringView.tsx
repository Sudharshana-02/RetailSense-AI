import React from 'react';
import { useRetail } from '../context/RetailContext';
import { CctvFeedViewer } from './CctvFeedViewer';
import {
  Activity,
  Users,
  Clock,
  Shield,
  BellRing,
  CheckCircle2,
  Maximize2,
  Play,
  Zap,
  Cpu,
} from 'lucide-react';

export const LiveMonitoringView: React.FC = () => {
  const {
    selectedStore,
    occupancy,
    footfall,
    queues,
    inventory,
    alerts,
    acknowledgeAlert,
    setLiveDemoModalOpen,
  } = useRetail();

  const activeAlerts = alerts.filter((a) => !a.acknowledged);

  return (
    <div className="py-8 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>REAL-TIME SURVEILLANCE &amp; EDGE CV STREAM</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Live Store Monitoring Console
          </h1>
          <div className="text-xs text-slate-400 mt-1">
            Active Store: <span className="text-white font-medium">{selectedStore.name}</span> ({selectedStore.location}) · {selectedStore.cameraCount} IP/RTSP Feeds
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLiveDemoModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Launch Full-Screen Control Center</span>
          </button>
        </div>
      </div>

      {/* Main CCTV Live Stream Section (Preserving the exact existing CctvFeedViewer) */}
      <div className="space-y-4">
        <CctvFeedViewer initialCameraId="cam-01" />

        {/* Live Synchronized KPI Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 bg-[#0B111D] border border-slate-800 rounded-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Current Occupancy</span>
              <Users className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">
              {occupancy}
            </div>
            <div className="text-[11px] text-emerald-400/90 font-mono mt-0.5">
              Live edge tracks
            </div>
          </div>

          <div className="p-3.5 bg-[#0B111D] border border-slate-800 rounded-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Queue Bottleneck Risk</span>
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">
              {queues.some((q) => q.length >= 5) ? 'Moderate' : 'Low (Nominal)'}
            </div>
            <div className="text-[11px] text-cyan-400/90 font-mono mt-0.5">
              Avg {Math.floor(queues[0].waitingTime / 60)}m {queues[0].waitingTime % 60}s wait
            </div>
          </div>

          <div className="p-3.5 bg-[#0B111D] border border-slate-800 rounded-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Shelf Compliance</span>
              <Activity className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">
              {inventory.compliance}%
            </div>
            <div className="text-[11px] text-amber-400/90 font-mono mt-0.5">
              {inventory.outOfStock} out-of-stock items
            </div>
          </div>

          <div className="p-3.5 bg-[#0B111D] border border-slate-800 rounded-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Edge AI TPU Core</span>
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
              11.2 ms
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
              60.0 FPS · Zero Cloud Lag
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Alerts & Event Feed */}
      <div className="bg-[#0B111D] border border-slate-800 rounded-xl p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <BellRing className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-bold text-white font-display">
              Live Incident &amp; Anomaly Stream
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {activeAlerts.length} Active Notifications
          </span>
        </div>

        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                alert.acknowledged
                  ? 'bg-slate-900/40 border-slate-800/60 opacity-60'
                  : alert.severity === 'critical'
                  ? 'bg-amber-950/20 border-amber-500/40'
                  : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      alert.acknowledged
                        ? 'bg-slate-600'
                        : alert.severity === 'critical'
                        ? 'bg-amber-400 animate-pulse'
                        : 'bg-emerald-400'
                    }`}
                  />
                  <span className="font-semibold text-sm text-white">{alert.title}</span>
                  <span className="text-xs font-mono text-slate-400">({alert.zone})</span>
                </div>
                <div className="text-xs text-slate-300">{alert.detail}</div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-mono text-slate-500">{alert.timestamp}</span>
                {alert.acknowledged ? (
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Handled</span>
                  </span>
                ) : (
                  <button
                    onClick={() => acknowledgeAlert(alert.id)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded transition-colors"
                  >
                    {alert.actionText}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
