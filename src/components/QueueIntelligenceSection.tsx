import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Clock, AlertCircle, CheckCircle2, Zap } from 'lucide-react';

export const QueueIntelligenceSection: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [auxRegisterOpen, setAuxRegisterOpen] = useState(false);

  const lanes = [
    {
      id: 'POS-01',
      name: 'Register 01 · Main Counter (Video 1)',
      status: 'active',
      queueLength: auxRegisterOpen ? 1 : 3,
      avgWaitSeconds: auxRegisterOpen ? 45 : 105,
      throughputPerHour: 36,
      risk: auxRegisterOpen ? 'nominal' : 'attention',
      note: 'Customer #104 payment in progress',
    },
    {
      id: 'POS-02',
      name: 'Register 02 · Auxiliary Counter (Video 1)',
      status: auxRegisterOpen ? 'active' : 'standby',
      queueLength: auxRegisterOpen ? 1 : 0,
      avgWaitSeconds: auxRegisterOpen ? 35 : 0,
      throughputPerHour: auxRegisterOpen ? 32 : 0,
      risk: 'nominal',
      note: auxRegisterOpen ? 'Assisting overflow queue' : 'On standby',
    },
    {
      id: 'ATM-01',
      name: 'ATM Kiosk Terminal (Video 2)',
      status: 'active',
      queueLength: 1,
      avgWaitSeconds: 42,
      throughputPerHour: 48,
      risk: 'nominal',
      note: 'Customer #201 cash transaction (42s)',
    },
    {
      id: 'SRV-01',
      name: 'Rear Service Counter (Video 2)',
      status: 'active',
      queueLength: 0,
      avgWaitSeconds: 0,
      throughputPerHour: 18,
      risk: 'nominal',
      note: 'Zero queue · Open for assistance',
    },
  ];

  return (
    <section
      id="queue-intelligence"
      className={`py-20 border-b transition-colors scroll-mt-20 ${
        isDark ? 'bg-[#0B0F19] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2 font-semibold">
              03. Queue Intelligence
            </div>
            <h2 className="text-3xl font-extrabold font-display">
              Checkout &amp; Service Friction Reduction
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-2xl text-sm leading-relaxed">
              Monitors front-end register queues and ATM dwell times in real time.
              Dynamically alerts staff when a line exceeds 2 persons or wait time surpasses 90 seconds.
            </p>
          </div>

          {/* Interactive Dynamic Register Opening Control */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAuxRegisterOpen(!auxRegisterOpen)}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg transition-all text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
            >
              <Zap className="w-4 h-4" />
              <span>{auxRegisterOpen ? 'Register 02 Active · Close Lane' : 'Open Auxiliary Register 02'}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Queue Status Banner */}
        <div
          className={`mb-8 p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 ${
            auxRegisterOpen
              ? isDark
                ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                : 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : isDark
              ? 'bg-amber-950/20 border-amber-500/40 text-amber-200'
              : 'bg-amber-50 border-amber-300 text-amber-900'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                auxRegisterOpen
                  ? 'bg-emerald-600/20 text-emerald-600 dark:text-emerald-400'
                  : 'bg-amber-600/20 text-amber-600 dark:text-amber-400'
              }`}
            >
              {auxRegisterOpen ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            </div>
            <div>
              <div className="text-sm font-semibold">
                {auxRegisterOpen
                  ? 'Checkout Queue SLA Optimal: Average wait dropped to 40 seconds'
                  : 'Checkout Queue Alert: 3 customers waiting at Register 01 in Video 1'}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {auxRegisterOpen
                  ? 'Queue distributed evenly between Register 01 and Register 02'
                  : 'Opening Register 02 eliminates queue wait friction by 58%'}
              </div>
            </div>
          </div>

          <div className="text-right sm:border-l sm:border-slate-300 dark:sm:border-slate-800 sm:pl-6">
            <div className="text-xs font-mono text-slate-500">Average Wait</div>
            <div
              className={`text-xl font-bold font-mono tabular-nums ${
                auxRegisterOpen
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-amber-600 dark:text-amber-400'
              }`}
            >
              {auxRegisterOpen ? '40s' : '1m 45s'}
            </div>
          </div>
        </div>

        {/* Grid of Lanes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {lanes.map((lane) => {
            const isStandby = lane.status === 'standby';
            return (
              <div
                key={lane.id}
                className={`border rounded-xl p-5 flex flex-col justify-between transition-all ${
                  isStandby
                    ? 'opacity-60 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40'
                    : lane.risk === 'attention'
                    ? 'border-amber-300 dark:border-amber-600 bg-white dark:bg-[#111827] shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-slate-500">{lane.id}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-semibold ${
                        isStandby
                          ? 'border-slate-300 text-slate-500'
                          : 'border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                      }`}
                    >
                      {lane.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    {lane.name}
                  </h3>
                  <div className="text-[11px] text-slate-500 mb-4">{lane.note}</div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-slate-500">
                      <span>Queue Count:</span>
                      <span className="font-mono text-slate-900 dark:text-white font-semibold tabular-nums">
                        {isStandby ? '—' : `${lane.queueLength} shopper${lane.queueLength === 1 ? '' : 's'}`}
                      </span>
                    </div>

                    <div className="flex justify-between text-slate-500">
                      <span>Service Duration:</span>
                      <span
                        className={`font-mono font-semibold tabular-nums ${
                          isStandby
                            ? 'text-slate-400'
                            : lane.avgWaitSeconds > 90
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-emerald-600 dark:text-emerald-400'
                        }`}
                      >
                        {isStandby
                          ? '—'
                          : `${lane.avgWaitSeconds}s`}
                      </span>
                    </div>

                    <div className="flex justify-between text-slate-500">
                      <span>Capacity:</span>
                      <span className="font-mono text-slate-700 dark:text-slate-300 tabular-nums">
                        {isStandby ? '—' : `${lane.throughputPerHour} / hr`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] font-mono flex items-center justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span
                    className={
                      isStandby
                        ? 'text-slate-400'
                        : lane.risk === 'attention'
                        ? 'text-amber-600 dark:text-amber-400 font-semibold'
                        : 'text-emerald-600 dark:text-emerald-400 font-semibold'
                    }
                  >
                    {isStandby ? 'OFFLINE' : lane.risk.toUpperCase()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
