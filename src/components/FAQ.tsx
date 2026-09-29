import React, { useState } from 'react';
import { ChevronDown, HelpCircle, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Architecture',
    question: 'What is RetailSense AI?',
    answer:
      'RetailSense AI is an enterprise edge computer vision platform that converts existing in-store CCTV camera streams into actionable operational intelligence. It monitors shopper footfall, customer dwell times, checkout queue build-up, and shelf inventory voids in real time without human monitoring fatigue.',
  },
  {
    id: 'faq-2',
    category: 'Hardware',
    question: 'Does RetailSense AI require new or specialized cameras?',
    answer:
      'No. RetailSense AI is designed to integrate directly with your existing RTSP, ONVIF, and standard CCTV IP camera infrastructure and NVR systems. It requires zero camera replacements—only a lightweight on-premise edge computing appliance or localized server.',
  },
  {
    id: 'faq-3',
    category: 'Cloud & Bandwidth',
    question: 'Does the system stream live video to the cloud?',
    answer:
      'No. Computer vision inference happens 100% on-premise at the edge. Raw video footage never leaves the store premises, preserving WAN bandwidth and eliminating cloud streaming costs. Only lightweight anonymized numeric telemetry (such as footfall counts and dwell times) is synced to central dashboards.',
  },
  {
    id: 'faq-4',
    category: 'Privacy & Compliance',
    question: 'Does RetailSense AI capture faces or personally identifiable information (PII)?',
    answer:
      'No. The system strictly uses anonymized spatial centroid tracking and skeleton bounding boxes. It does not perform facial recognition, iris scanning, or demographic profiling. It is fully compliant with GDPR, CCPA, and global retail privacy regulations by design.',
  },
  {
    id: 'faq-5',
    category: 'Reliability',
    question: 'What happens if the store internet connection goes offline?',
    answer:
      'RetailSense AI runs autonomously on local edge hardware. Even during complete broadband or internet outages, on-premise store cameras continue to process footage, alert cashier staff of queue bottlenecks locally, and store operational telemetry in an encrypted local queue until connectivity is restored.',
  },
  {
    id: 'faq-6',
    category: 'Scale',
    question: 'Can the platform monitor hundreds of multi-chain store locations?',
    answer:
      'Yes. RetailSense AI features multi-store fleet orchestration. Store managers see their local store floor telemetry, while regional directors and C-suite executives access normalized roll-up analytics across all store locations in real time.',
  },
];

export const FAQ: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2 font-semibold">
          <HelpCircle className="w-4 h-4" />
          <span>KNOWLEDGE BASE &amp; ENTERPRISE FAQ</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-2xl mx-auto">
          Common architectural, privacy compliance, and hardware integration answers for retail executives and store operations teams.
        </p>
      </div>

      <div className="space-y-3 max-w-4xl mx-auto">
        {FAQ_DATA.map((item) => {
          const isOpen = openIds.includes(item.id);
          return (
            <div
              key={item.id}
              className={`border rounded-xl transition-all duration-200 overflow-hidden ${
                isOpen
                  ? isDark
                    ? 'bg-slate-900/90 border-blue-500/50 shadow-[0_0_20px_rgba(37,99,235,0.12)]'
                    : 'bg-white border-blue-500/60 shadow-md ring-1 ring-blue-500/20'
                  : isDark
                  ? 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <button
                onClick={() => toggleFAQ(item.id)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded font-medium ${
                      isDark
                        ? 'bg-slate-800 text-blue-400 border border-slate-700'
                        : 'bg-blue-50 text-blue-700 border border-blue-100'
                    }`}
                  >
                    {item.category}
                  </span>
                  <span className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white font-display">
                    {item.question}
                  </span>
                </div>
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-transform duration-200 shrink-0 ${
                    isOpen
                      ? isDark
                        ? 'bg-blue-500/20 text-blue-400 rotate-180'
                        : 'bg-blue-100 text-blue-600 rotate-180'
                      : isDark
                      ? 'bg-slate-800 text-slate-400'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div
                  className={`px-5 pb-5 pt-1 text-sm leading-relaxed border-t transition-colors ${
                    isDark
                      ? 'border-slate-800/80 text-slate-300 bg-slate-950/30'
                      : 'border-slate-100 text-slate-600 bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item.answer}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQ;
