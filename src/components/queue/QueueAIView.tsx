import React from 'react';
import { useRetail } from '../../context/RetailContext';
import { QueueModule } from '../../types/retail';
import {
  Clock,
  Users,
  AlertCircle,
  TrendingDown,
  TrendingUp,
  Zap,
  Activity,
  CheckCircle2,
  Info,
  Sparkles,
} from 'lucide-react';

export const QueueAIView: React.FC = () => {
  const {
    selectedQueueModule,
    setSelectedQueueModule,
    queues,
    toggleLane4,
    selectedStore,
  } = useRetail();

  const subNavItems: { id: QueueModule; label: string; icon: React.ReactNode }[] = [
    { id: 'queue-length', label: 'Queue Length', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'waiting-time', label: 'Waiting Time', icon: <Clock className="w-3.5 h-3.5" /> },
    { id: 'congestion', label: 'Congestion', icon: <Activity className="w-3.5 h-3.5" /> },
    { id: 'prediction', label: 'Prediction', icon: <Sparkles className="w-3.5 h-3.5" /> },
  ];

  const totalInQueue = queues.reduce((sum, q) => sum + (q.status !== 'standby' ? q.length : 0), 0);
  const avgWaitSec = Math.round(
    queues.filter((q) => q.status !== 'standby').reduce((sum, q) => sum + q.waitingTime, 0) /
      Math.max(1, queues.filter((q) => q.status !== 'standby').length)
  );

  const lane4 = queues.find((q) => q.counter === 4);
  const isLane4Active = lane4?.status === 'active';

  // Overall Congestion Level
  const maxQueue = Math.max(...queues.map((q) => (q.status !== 'standby' ? q.length : 0)));
  const congestionLevel = maxQueue >= 6 ? 'Critical' : maxQueue >= 4 ? 'Warning' : 'Normal';

  return (
    <div className="py-8 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Sub-navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">
            QUEUE INTELLIGENCE
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Checkout Friction &amp; Queue Congestion Anticipation
          </h1>
          <div className="text-xs text-slate-400 mt-1">
            Current Counter Cluster: <span className="text-white font-medium">{selectedStore.name}</span>
          </div>
        </div>

        {/* Sub-navigation Bar */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
          {subNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedQueueModule(item.id)}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
                selectedQueueModule === item.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
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
      {selectedQueueModule === 'queue-length' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-[#0B111D] border border-slate-800 rounded-xl">
              <div className="text-xs text-slate-400 font-mono mb-1">Total Shoppers in Queue</div>
              <div className="text-3xl font-bold font-mono text-white tabular-nums">
                {totalInQueue}
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-1">Across active registers</div>
            </div>

            <div className="p-4 bg-[#0B111D] border border-slate-800 rounded-xl">
              <div className="text-xs text-slate-400 font-mono mb-1">Active Billing Counters</div>
              <div className="text-3xl font-bold font-mono text-emerald-400 tabular-nums">
                {queues.filter((q) => q.status !== 'standby').length} / {queues.length}
              </div>
              <div className="text-[11px] text-emerald-400/90 font-mono mt-1">
                {isLane4Active ? 'Overflow Express Online' : '1 Lane on Standby'}
              </div>
            </div>

            <div className="p-4 bg-[#0B111D] border border-slate-800 rounded-xl">
              <div className="text-xs text-slate-400 font-mono mb-1">Maximum Queue Depth</div>
              <div className="text-3xl font-bold font-mono text-amber-400 tabular-nums">
                {maxQueue} shoppers
              </div>
              <div className="text-[11px] text-amber-400/90 font-mono mt-1">Peak at Lane 2</div>
            </div>

            <div className="p-4 bg-[#0B111D] border border-slate-800 rounded-xl">
              <div className="text-xs text-slate-400 font-mono mb-1">Average Wait Time</div>
              <div className="text-3xl font-bold font-mono text-cyan-400 tabular-nums">
                {Math.floor(avgWaitSec / 60)}m {avgWaitSec % 60}s
              </div>
              <div className="text-[11px] text-cyan-400/90 font-mono mt-1">Target SLA &lt; 2m 00s</div>
            </div>
          </div>

          {/* Counter by Counter Breakdown */}
          <div className="bg-[#0B111D] border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <h3 className="text-base font-bold text-white font-display">
                  Queue Length by Billing Counter
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time shopper headcounts standing in checkout lanes.
                </p>
              </div>
              <button
                onClick={toggleLane4}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  isLane4Active
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>{isLane4Active ? 'Register 4 Active · Close' : 'Open Express Register 4'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {queues.map((q) => {
                const isStandby = q.status === 'standby';
                return (
                  <div
                    key={q.counter}
                    className={`p-4 rounded-xl border transition-all ${
                      isStandby
                        ? 'border-slate-800/60 bg-slate-900/30 opacity-60'
                        : q.status === 'warning'
                        ? 'border-amber-500/50 bg-amber-950/10'
                        : 'border-slate-800 bg-slate-900/70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs text-slate-400">Lane 0{q.counter}</span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${
                          isStandby
                            ? 'border-slate-700 text-slate-500'
                            : q.status === 'warning'
                            ? 'border-amber-500/40 text-amber-300 bg-amber-500/10'
                            : 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10'
                        }`}
                      >
                        {q.status}
                      </span>
                    </div>

                    <div className="font-semibold text-sm text-white mb-3">{q.name}</div>

                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Queue:</span>
                        <span className="font-bold text-white tabular-nums">
                          {isStandby ? '—' : `${q.length} shoppers`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Wait:</span>
                        <span
                          className={`font-bold tabular-nums ${
                            isStandby ? 'text-slate-500' : q.waitingTime > 120 ? 'text-amber-400' : 'text-emerald-400'
                          }`}
                        >
                          {isStandby ? '—' : `${Math.floor(q.waitingTime / 60)}m ${q.waitingTime % 60}s`}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {selectedQueueModule === 'waiting-time' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[#0B111D] border border-slate-800 rounded-xl">
              <div className="text-xs text-slate-400 font-mono mb-1">Average Wait Time</div>
              <div className="text-3xl font-bold font-mono text-emerald-400 tabular-nums">
                {Math.floor(avgWaitSec / 60)}m {avgWaitSec % 60}s
              </div>
              <div className="text-xs text-slate-500 mt-1">Target SLA: &lt; 2m 00s</div>
            </div>

            <div className="p-4 bg-[#0B111D] border border-slate-800 rounded-xl">
              <div className="text-xs text-slate-400 font-mono mb-1">Average Service Time</div>
              <div className="text-3xl font-bold font-mono text-cyan-400 tabular-nums">
                32 seconds
              </div>
              <div className="text-xs text-slate-500 mt-1">Per transaction scan &amp; payment</div>
            </div>

            <div className="p-4 bg-[#0B111D] border border-slate-800 rounded-xl">
              <div className="text-xs text-slate-400 font-mono mb-1">Abandonment Risk</div>
              <div className="text-3xl font-bold font-mono text-white tabular-nums">
                {avgWaitSec > 120 ? 'Elevated (+18%)' : 'Nominal (&lt; 2%)'}
              </div>
              <div className="text-xs text-slate-500 mt-1">Based on wait duration curve</div>
            </div>
          </div>

          <div className="bg-[#0B111D] border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-white font-mono uppercase mb-3">
              Counter-wise Waiting Time Analysis
            </h3>
            <div className="space-y-4">
              {queues.map((q) => (
                <div key={q.counter} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-white">{q.name}</span>
                    <span className={q.waitingTime > 120 ? 'text-amber-400' : 'text-emerald-400'}>
                      {q.status === 'standby' ? 'Offline' : `${Math.floor(q.waitingTime / 60)}m ${q.waitingTime % 60}s`}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${q.status === 'standby' ? 0 : Math.min(100, (q.waitingTime / 180) * 100)}%` }}
                      className={`h-full rounded-full transition-all duration-300 ${
                        q.waitingTime > 120 ? 'bg-amber-400' : 'bg-emerald-400'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedQueueModule === 'congestion' && (
        <div className="space-y-6">
          <div
            className={`p-5 rounded-xl border flex items-center justify-between ${
              congestionLevel === 'Critical'
                ? 'bg-rose-950/20 border-rose-500/40 text-rose-200'
                : congestionLevel === 'Warning'
                ? 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                : 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6" />
              <div>
                <div className="text-base font-bold font-display">
                  Current Congestion State: {congestionLevel.toUpperCase()}
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  {congestionLevel === 'Normal'
                    ? 'All checkout lines operating comfortably within SLA standards.'
                    : 'Checkout volume approaching queue density threshold. Secondary express lanes recommended.'}
                </div>
              </div>
            </div>
            <div className="text-xs font-mono px-3 py-1 rounded bg-black/40 border border-slate-700">
              Max Queue: {maxQueue}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[#0B111D] border border-slate-800 rounded-xl">
              <div className="text-xs text-slate-400 font-mono mb-1">Normal Operating Hours</div>
              <div className="text-xl font-bold font-mono text-emerald-400">09:00 - 11:30</div>
              <div className="text-xs text-slate-500 mt-1">Avg 1.2 customers / counter</div>
            </div>
            <div className="p-4 bg-[#0B111D] border border-slate-800 rounded-xl">
              <div className="text-xs text-slate-400 font-mono mb-1">Peak Lunch Rush</div>
              <div className="text-xl font-bold font-mono text-amber-400">12:00 - 13:45</div>
              <div className="text-xs text-slate-500 mt-1">Avg 4.8 customers / counter</div>
            </div>
            <div className="p-4 bg-[#0B111D] border border-slate-800 rounded-xl">
              <div className="text-xs text-slate-400 font-mono mb-1">Evening Replenishment</div>
              <div className="text-xl font-bold font-mono text-amber-400">17:00 - 19:15</div>
              <div className="text-xs text-slate-500 mt-1">Peak daily basket volume</div>
            </div>
          </div>
        </div>
      )}

      {selectedQueueModule === 'prediction' && (
        <div className="space-y-6">
          {/* Main Predictive Alert Card */}
          <div className="p-6 bg-[#0B111D] border border-amber-500/50 rounded-xl relative overflow-hidden shadow-[0_0_25px_rgba(245,158,11,0.1)]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase">
                <Sparkles className="w-4 h-4" />
                <span>PREDICTED QUEUE CONGESTION (15-MIN FORECAST)</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Model Confidence: 96.4%</span>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-white font-display">
                "Checkout 03 is approaching the congestion threshold."
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                Inbound footfall velocity in Aisle 03 and Fresh Produce indicates a surge of approximately 24 checkout arrivals over the next 12 minutes.
                Opening Register 04 proactively will prevent wait times from compounding past 3m 40s.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-5 border-t border-slate-800 font-mono text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Current Queue:</span>
                <span className="text-base font-bold text-white tabular-nums">
                  {queues.find((q) => q.counter === 3)?.length || 2} shoppers (nominal)
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Predicted Queue:</span>
                <span className="text-base font-bold text-amber-400 tabular-nums">
                  6 shoppers (+200% surge)
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Prediction Window:</span>
                <span className="text-base font-bold text-cyan-400 tabular-nums">
                  Next 12–15 mins
                </span>
              </div>
            </div>

            {/* Disclaimer pill */}
            <div className="mt-5 p-2.5 bg-slate-900/80 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>
                Demonstration Notice: Simulated prediction telemetry demonstrating edge queue forecasting algorithms.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
