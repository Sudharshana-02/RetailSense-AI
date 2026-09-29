import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Shield, ShieldCheck, Lock, EyeOff, Server, Terminal, CheckCircle2 } from 'lucide-react';

export const EdgeAiPrivacySection: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [inspectorMode, setInspectorMode] = useState<'wireframe' | 'json' | 'architecture'>('wireframe');

  return (
    <section
      id="privacy"
      className={`py-20 border-b transition-colors ${
        isDark ? 'bg-[#0F172A] border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2 font-semibold">
              05. Privacy by Architecture
            </div>
            <h2 className="text-3xl font-extrabold font-display">
              Zero-Cloud Streaming. 100% On-Premise Edge AI.
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-2xl text-sm leading-relaxed">
              Traditional cloud systems upload raw CCTV streams, risking GDPR/CCPA violations and consuming excessive network bandwidth.
              RetailSense AI runs local computer vision models on edge hardware inside the store.
            </p>
          </div>

          <div
            className={`flex items-center gap-1 p-1 border rounded-lg ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <button
              onClick={() => setInspectorMode('wireframe')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                inspectorMode === 'wireframe'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Edge Blur Mode
            </button>
            <button
              onClick={() => setInspectorMode('json')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                inspectorMode === 'json'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Telemetry JSON
            </button>
            <button
              onClick={() => setInspectorMode('architecture')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                inspectorMode === 'architecture'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Topology
            </button>
          </div>
        </div>

        {/* 2-Column Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Privacy Viewer (7 Cols) */}
          <div
            className={`lg:col-span-7 border rounded-xl p-6 overflow-hidden transition-colors ${
              isDark ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            {inspectorMode === 'wireframe' && (
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500 mb-4">
                  <span className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                    <EyeOff className="w-4 h-4" />
                    <span>ON-PREMISE FACIAL ANONYMIZATION</span>
                  </span>
                  <span>ZERO BIOMETRICS STORED</span>
                </div>

                <div
                  className={`relative aspect-[16/9] w-full rounded-lg border p-4 flex flex-col justify-between overflow-hidden ${
                    isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-900 border-slate-700 text-white'
                  }`}
                >
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg viewBox="0 0 400 240" className="w-full h-full opacity-80">
                      <g stroke="#38BDF8" strokeWidth="1.5" fill="none">
                        {/* Person 1 Wireframe */}
                        <circle cx="120" cy="70" r="14" fill="rgba(56,189,248,0.15)" strokeDasharray="3 2" />
                        <line x1="120" y1="84" x2="120" y2="150" />
                        <line x1="120" y1="100" x2="95" y2="125" />
                        <line x1="120" y1="100" x2="145" y2="120" />
                        <line x1="120" y1="150" x2="105" y2="200" />
                        <line x1="120" y1="150" x2="135" y2="200" />
                        <text x="120" y="50" fill="#BAE6FD" fontSize="9" textAnchor="middle" fontFamily="monospace">
                          [ANON_TRACK_104]
                        </text>

                        {/* Person 2 Wireframe */}
                        <circle cx="280" cy="85" r="12" fill="rgba(56,189,248,0.15)" strokeDasharray="3 2" />
                        <line x1="280" y1="97" x2="280" y2="155" />
                        <line x1="280" y1="110" x2="260" y2="135" />
                        <line x1="280" y1="110" x2="300" y2="130" />
                        <line x1="280" y1="155" x2="265" y2="200" />
                        <line x1="280" y1="155" x2="295" y2="200" />
                        <text x="280" y="65" fill="#BAE6FD" fontSize="9" textAnchor="middle" fontFamily="monospace">
                          [ANON_TRACK_201]
                        </text>
                      </g>
                    </svg>
                  </div>

                  <div className="z-10 bg-slate-900/90 border border-blue-500/40 rounded p-2 text-[11px] font-mono text-blue-300 max-w-xs backdrop-blur-sm">
                    🔒 Edge Filter: Video 1 &amp; Video 2 facial coordinates stripped before metric output.
                  </div>

                  <div className="z-10 flex justify-between items-center text-[10px] font-mono text-slate-400">
                    <span>PROCESSING CORE: LOCAL HARDWARE ACCELERATOR</span>
                    <span>STORAGE: VOLATILE MEMORY ONLY</span>
                  </div>
                </div>
              </div>
            )}

            {inspectorMode === 'json' && (
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500 mb-4">
                  <span className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                    <Terminal className="w-4 h-4" />
                    <span>OUTBOUND METADATA JSON (ZERO VIDEO TRANSMITTED)</span>
                  </span>
                  <span>1.4 KB / sec</span>
                </div>

                <div className="bg-slate-950 rounded-lg border border-slate-800 p-4 font-mono text-xs text-blue-400 overflow-x-auto">
                  <pre>{`{
  "store_id": "metropolitan-mart-01",
  "camera_feeds": ["CAM_01_PHARMACY", "CAM_02_ATM_CONCOURSE"],
  "timestamp": "2017-12-22T14:18:24.000Z",
  "analytics_events": [
    {
      "anon_track_id": "bb-104",
      "zone": "register_01_checkout",
      "status": "payment_in_progress",
      "dwell_seconds": 88
    },
    {
      "anon_track_id": "bb-201",
      "zone": "atm_kiosk_terminal",
      "status": "cash_transaction_complete",
      "dwell_seconds": 42
    }
  ],
  "video_data_retained": false,
  "biometric_facial_data": false,
  "compliance_audit_hash": "sha256:d894b15c9ff8"
}`}</pre>
                </div>
              </div>
            )}

            {inspectorMode === 'architecture' && (
              <div className="space-y-4">
                <div className="pb-3 border-b border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500">
                  <span>AIR-GAPPED HARDWARE TOPOLOGY</span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div
                    className={`p-3 border rounded-lg ${
                      isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <Server className="w-5 h-5 text-slate-500 mx-auto mb-2" />
                    <div className="font-semibold text-slate-900 dark:text-white">Store Cameras</div>
                    <div className="text-[10px] text-slate-500 mt-1">Local Isolated Subnet</div>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                    <div className="font-semibold text-blue-700 dark:text-blue-300">RetailSense Appliance</div>
                    <div className="text-[10px] text-slate-500 mt-1">In-Memory Edge Model</div>
                  </div>
                  <div
                    className={`p-3 border rounded-lg ${
                      isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <Lock className="w-5 h-5 text-slate-500 mx-auto mb-2" />
                    <div className="font-semibold text-slate-900 dark:text-white">HQ Console</div>
                    <div className="text-[10px] text-slate-500 mt-1">Anonymized Counters Only</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Guarantees (5 Cols) */}
          <div className="lg:col-span-5 space-y-3.5">
            <div
              className={`p-4 border rounded-xl transition-colors ${
                isDark ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3 mb-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold text-sm font-display text-slate-900 dark:text-white">
                  Zero Facial Recognition
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Tracks body coordinates and centroid vectors only. No facial geometry or biometric profiles are ever generated or stored.
              </p>
            </div>

            <div
              className={`p-4 border rounded-xl transition-colors ${
                isDark ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3 mb-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold text-sm font-display text-slate-900 dark:text-white">
                  No Video Uploads to Cloud
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Video frames stay within the store firewall. Only aggregated numbers (headcount, dwell, queue minutes) are synced to cloud consoles.
              </p>
            </div>

            <div
              className={`p-4 border rounded-xl transition-colors ${
                isDark ? 'bg-[#111827] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3 mb-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold text-sm font-display text-slate-900 dark:text-white">
                  GDPR &amp; CCPA Compliant
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Fully compliant with California Consumer Privacy Act and European privacy frameworks without requiring special customer consent waivers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
