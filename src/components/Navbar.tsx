import React, { useState } from 'react';
import { StoreLocation } from '../types/retail';
import { STORE_LOCATIONS } from '../data/mockRetailData';
import { useTheme } from '../context/ThemeContext';
import { Eye, ShieldCheck, Play, Menu, X, MapPin, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  selectedStore: StoreLocation;
  onSelectStore: (store: StoreLocation) => void;
  onOpenLiveDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedStore,
  onSelectStore,
  onOpenLiveDemo,
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [storeDropdownOpen, setStoreDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Overview', href: '#overview' },
    { name: 'Live Monitoring', href: '#live-monitoring' },
    { name: 'Shopper Analytics', href: '#shopper-analytics' },
    { name: 'Inventory Monitoring', href: '#inventory-monitoring' },
    { name: 'Queue Intelligence', href: '#queue-intelligence' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-md border-b transition-colors ${
        isDark
          ? 'bg-[#0B0F19]/90 border-slate-800 text-slate-100'
          : 'bg-white/95 border-slate-200 text-slate-800 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="flex items-center gap-2 group focus:outline-none"
          aria-label="RetailSense AI Home"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-600/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:border-blue-500 transition-colors">
            <Eye className="w-4 h-4" />
          </div>
          <span className="text-xl font-bold tracking-tight font-display text-slate-900 dark:text-white">
            RetailSense <span className="text-blue-600 dark:text-blue-400 font-semibold">AI</span>
          </span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative py-1"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Zone 3: Actions + Theme Selector + Live Demo */}
        <div className="flex items-center gap-2.5">
          {/* Theme Selector Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            className={`p-2 rounded-lg border transition-colors ${
              isDark
                ? 'bg-slate-800/80 border-slate-700 text-amber-300 hover:bg-slate-700'
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Store Switcher */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setStoreDropdownOpen(!storeDropdownOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border rounded-lg transition-colors whitespace-nowrap focus:outline-none ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600'
                  : 'bg-white border-slate-300 text-slate-700 hover:border-slate-400 shadow-sm'
              }`}
              title="Switch Retail Location"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="max-w-[130px] truncate">{selectedStore.name}</span>
              <span className="text-slate-400 text-[10px]">▼</span>
            </button>

            {storeDropdownOpen && (
              <div
                className={`absolute right-0 mt-2 w-64 border rounded-lg shadow-xl py-1.5 z-50 transition-colors ${
                  isDark
                    ? 'bg-[#111827] border-slate-700 text-slate-200'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                <div className="px-3 py-1 text-[11px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                  Select Store Location
                </div>
                {STORE_LOCATIONS.map((store) => (
                  <button
                    key={store.id}
                    onClick={() => {
                      onSelectStore(store);
                      setStoreDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                      store.id === selectedStore.id
                        ? isDark
                          ? 'bg-blue-600/20 text-blue-400 font-semibold'
                          : 'bg-blue-50 text-blue-700 font-semibold'
                        : isDark
                        ? 'text-slate-300 hover:bg-slate-800'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <div className="font-medium">{store.name}</div>
                      <div className="text-[10px] text-slate-400">{store.city}</div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      {store.cameraCount} cams
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Primary Action: Live Demo */}
          <button
            onClick={onOpenLiveDemo}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 shadow-sm active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Live Demo</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive mobile menu drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-b px-4 pt-2 pb-6 space-y-3 transition-colors ${
            isDark ? 'bg-[#0B0F19] border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex flex-col space-y-2 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
            <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2">
              Store Location
            </div>
            <div className="grid grid-cols-2 gap-2">
              {STORE_LOCATIONS.map((store) => (
                <button
                  key={store.id}
                  onClick={() => {
                    onSelectStore(store);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left p-2 rounded border text-xs ${
                    store.id === selectedStore.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <div className="font-medium truncate">{store.name}</div>
                  <div className="text-[10px] text-slate-500">{store.city}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
