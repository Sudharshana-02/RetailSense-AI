import React, { useState } from 'react';
import { INITIAL_ALERTS, OPERATIONAL_INSIGHTS } from '../data/mockRetailData';
import { RetailAlert } from '../types/retail';
import { useTheme } from '../context/ThemeContext';
import {
  BellRing,
  Bot,
  CheckCircle2,
  Send,
} from 'lucide-react';

export const AiInsightsAndAlertsSection: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [alerts, setAlerts] = useState<RetailAlert[]>(INITIAL_ALERTS);
  const [dispatchedId, setDispatchedId] = useState<string | null>(null);

  const handleAcknowledge = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, acknowledged: true } : a))
    );
  };

  const handleDispatch = (alertId: string) => {
    setDispatchedId(alertId);
    setTimeout(() => {
      setAlerts((prev) =>
        prev.map((a) => (a.id === alertId ? { ...a, acknowledged: true } : a))
      );
      setDispatchedId(null);
    }, 600);
  };

  return (
    <section
      id="alerts"
      className={`py-20 border-b transition-colors ${
        isDark ? 'bg-[#0B0F19] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2 font-semibold">
              06 &amp; 07. Operational AI &amp; Live Alerts
            </div>
            <h2 className="text-3xl font-extrabold font-display">
              Autonomous Operational Briefs &amp; Incident Stream
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-2xl text-sm leading-relaxed">
              Synthesized directly from live activity in Camera 01 (Pharmacy Mart Checkout) and Camera 02 (Concourse ATM &amp; Snack Aisle).
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
            <span className="font-semibold">ACTIVE TELEMETRY STREAM</span>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Operational Insights (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 text-xs font-mono">
              <span className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                <Bot className="w-4 h-4" />
                <span>OPERATIONAL DIRECTIVES // RECOMMENDED ACTIONS</span>
              </span>
              <span className="text-slate-500">Refreshed: 14:18:24</span>
            </div>

            <div className="space-y-4">
              {OPERATIONAL_INSIGHTS.map((insight) => (
                <div
                  key={insight.id}
                  className={`border rounded-xl p-5 transition-all ${
                    isDark ? 'bg-[#111827] border-slate-800' : 'bg-slate-50 border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded border border-blue-300 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold">
                      {insight.category} Recommendation
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      Window: {insight.timeframe}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                    {insight.summary}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    {insight.impact}
                  </p>

                  <div
                    className={`p-2.5 rounded-lg border text-xs font-mono flex items-center justify-between ${
                      isDark
                        ? 'bg-slate-900 border-slate-800 text-blue-300'
                        : 'bg-white border-slate-200 text-blue-700 shadow-xs'
                    }`}
                  >
                    <span className="truncate pr-2 font-medium">👉 Action: {insight.recommendedAction}</span>
                    <span className="text-[10px] text-slate-500 shrink-0 tabular-nums">
                      {insight.confidence}% conf
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Live Alert Queue (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 text-xs font-mono mb-4">
                <span className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold">
                  <BellRing className="w-4 h-4" />
                  <span>LIVE INCIDENT STREAM</span>
                </span>
                <span className="text-slate-500">
                  {alerts.filter((a) => !a.acknowledged).length} Pending Dispatch
                </span>
              </div>

              <div className="space-y-3">
                {alerts.map((alert) => {
                  const isWarning = alert.severity === 'warning';
                  const isDispatching = dispatchedId === alert.id;

                  return (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-xl border transition-all ${
                        alert.acknowledged
                          ? isDark
                            ? 'bg-[#111827]/50 border-slate-800 opacity-60'
                            : 'bg-slate-100/60 border-slate-200 opacity-60'
                          : isWarning
                          ? isDark
                            ? 'bg-amber-950/20 border-amber-500/40'
                            : 'bg-amber-50/70 border-amber-300'
                          : isDark
                          ? 'bg-[#111827] border-slate-800'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              alert.acknowledged
                                ? 'bg-slate-400'
                                : isWarning
                                ? 'bg-amber-500'
                                : 'bg-blue-500'
                            }`}
                          />
                          <span className="text-xs font-bold font-mono text-slate-900 dark:text-white">
                            {alert.title}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-500 shrink-0">
                          {alert.timestamp}
                        </span>
                      </div>

                      <div className="text-[11px] font-mono text-slate-500 mb-2 flex items-center gap-2">
                        <span>Zone: {alert.zone}</span>
                        <span>·</span>
                        <span>Source: {alert.camera}</span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                        {alert.detail}
                      </p>

                      <div className="flex items-center justify-between pt-2.5 border-t border-slate-200 dark:border-slate-800 text-xs">
                        {alert.acknowledged ? (
                          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Acknowledged</span>
                          </span>
                        ) : (
                          <div className="flex items-center gap-2 w-full justify-end">
                            <button
                              onClick={() => handleAcknowledge(alert.id)}
                              className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white rounded"
                            >
                              Dismiss
                            </button>
                            <button
                              onClick={() => handleDispatch(alert.id)}
                              disabled={isDispatching}
                              className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                            >
                              <Send className={`w-3 h-3 ${isDispatching ? 'animate-spin' : ''}`} />
                              <span>{isDispatching ? 'Dispatching...' : alert.actionText}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className={`mt-4 p-3 border rounded-lg text-xs font-mono text-slate-500 flex items-center justify-between ${
                isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <span>Incident Resolution Time:</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold tabular-nums">1m 15s avg</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
