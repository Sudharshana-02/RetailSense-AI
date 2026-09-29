import React from 'react';
import { useRetail } from '../context/RetailContext';
import { MapPin, Building2, Check, Radio } from 'lucide-react';

export const TopLocationSelector: React.FC = () => {
  const { selectedStore, setSelectedStore, stores } = useRetail();

  return (
    <div className="w-full bg-[#080D16] border-b border-slate-800/90 py-2.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Label & Active Context Indicator */}
        <div className="flex items-center gap-2.5 text-xs">
          <div className="flex items-center gap-1.5 font-mono text-emerald-400 font-semibold uppercase tracking-wider text-[11px]">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Active Store Location:</span>
          </div>
          <span className="text-white font-medium flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <span>{selectedStore.name}</span>
            <span className="text-slate-500">({selectedStore.city}, India)</span>
          </span>
        </div>

        {/* Location Options as prominent interactive buttons on top */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-mono text-slate-500 mr-1 hidden sm:inline">Switch:</span>
          {stores.map((store) => {
            const isSelected = store.id === selectedStore.id;
            return (
              <button
                key={store.id}
                onClick={() => setSelectedStore(store)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                  isSelected
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.2)] font-semibold'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <MapPin className={`w-3 h-3 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span>{store.city}</span>
                {isSelected && <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
