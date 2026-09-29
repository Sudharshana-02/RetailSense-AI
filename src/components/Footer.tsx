import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Eye, ShieldCheck, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer
      className={`border-t text-xs py-12 transition-colors ${
        isDark
          ? 'bg-[#080C14] border-slate-800 text-slate-400'
          : 'bg-white border-slate-200 text-slate-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-200 dark:border-slate-800">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600/10 border border-blue-600/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Eye className="w-3.5 h-3.5" />
              </div>
              <span className="text-base font-bold font-display text-slate-900 dark:text-white">
                RetailSense <span className="text-blue-600 dark:text-blue-400">AI</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              Your store cameras don't just watch. They understand.
              Edge computer vision platform transforming standard retail CCTV infrastructure into real-time operational intelligence.
            </p>
          </div>

          {/* Solutions Col */}
          <div>
            <div className="font-mono uppercase tracking-wider mb-3 text-[11px] font-bold text-slate-700 dark:text-slate-300">
              Capabilities
            </div>
            <ul className="space-y-2">
              <li><a href="#shopper-intelligence" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Shopper Analytics &amp; Dwell</a></li>
              <li><a href="#inventory" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Shelf Void &amp; Planogram</a></li>
              <li><a href="#queue-intelligence" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Queue Intelligence</a></li>
              <li><a href="#heatmaps" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Store Heatmaps</a></li>
              <li><a href="#alerts" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Operational AI Directives</a></li>
            </ul>
          </div>

          {/* Architecture & Privacy Col */}
          <div>
            <div className="font-mono uppercase tracking-wider mb-3 text-[11px] font-bold text-slate-700 dark:text-slate-300">
              Architecture &amp; Privacy
            </div>
            <ul className="space-y-2">
              <li><a href="#privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Zero-Cloud Streaming</a></li>
              <li><a href="#privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">GDPR &amp; CCPA Compliance</a></li>
              <li><a href="#privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Hardware Enclave Acceleration</a></li>
              <li><a href="#privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">RTSP &amp; IP Camera Support</a></li>
              <li><a href="#platform" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Multi-Store Hub</a></li>
            </ul>
          </div>

          {/* Compliance & Hardware */}
          <div>
            <div className="font-mono uppercase tracking-wider mb-3 text-[11px] font-bold text-slate-700 dark:text-slate-300">
              Hardware Certifications
            </div>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>NDAA Compliant Edge Processing</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>SOC 2 Type II Certified Pipeline</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                <Cpu className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                <span>Intel OpenVINO &amp; NVIDIA Jetson</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Quiet Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-xs gap-4">
          <div>
            © {new Date().getFullYear()} RetailSense AI Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-800 dark:hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-800 dark:hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-800 dark:hover:text-slate-300 cursor-pointer">Enterprise SLA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
