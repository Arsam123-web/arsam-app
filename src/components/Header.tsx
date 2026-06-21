import React, { useState } from 'react';
import { ViewType } from '../types';
import { Menu, X, Sun, Moon, Smartphone, Settings } from 'lucide-react';

interface HeaderProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  setSelectedAppId: (id: string | null) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({
  currentView,
  setCurrentView,
  setSelectedAppId,
  darkMode,
  toggleDarkMode,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateTo = (view: ViewType) => {
    setCurrentView(view);
    setSelectedAppId(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-100 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Studio Name */}
          <div className="flex items-center cursor-pointer" onClick={() => navigateTo('home')}>
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-indigo-500 shadow-md shadow-primary-500/20 text-white ml-3">
              <Smartphone className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-500 dark:from-primary-400 dark:to-indigo-300">
                استودیو آرسام
              </span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono tracking-wider text-right">
                Arsam Studio
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav role="navigation" className="hidden md:flex items-center gap-1">
            <button
              id="nav-home"
              onClick={() => navigateTo('home')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                currentView === 'home'
                  ? 'bg-primary-50 text-primary-600 dark:bg-primary-950/40 dark:text-primary-400'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              صفحه اصلی
            </button>
            <button
              id="nav-apps"
              onClick={() => navigateTo('apps')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                currentView === 'apps' || currentView === 'details'
                  ? 'bg-primary-50 text-primary-600 dark:bg-primary-950/40 dark:text-primary-400'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              اپلیکیشن‌ها
            </button>
            <button
              id="nav-admin"
              onClick={() => navigateTo('admin')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                currentView === 'admin'
                  ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <Settings className="w-4 h-4" />
              پنل مدیریت (JSON)
            </button>
          </nav>

          {/* Theme Switcher & Mobile Menu Trigger */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button
              id="theme-toggler"
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 shadow-lg px-4 py-3 space-y-2">
          <button
            id="mobile-nav-home"
            onClick={() => navigateTo('home')}
            className={`w-full text-right px-4 py-3 rounded-xl text-base font-medium transition-all block ${
              currentView === 'home'
                ? 'bg-primary-50 text-primary-600 dark:bg-primary-950/40 dark:text-primary-400'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            صفحه اصلی
          </button>
          <button
            id="mobile-nav-apps"
            onClick={() => navigateTo('apps')}
            className={`w-full text-right px-4 py-3 rounded-xl text-base font-medium transition-all block ${
              currentView === 'apps' || currentView === 'details'
                ? 'bg-primary-50 text-primary-600 dark:bg-primary-950/40 dark:text-primary-400'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            اپلیکیشن‌ها
          </button>
          <button
            id="mobile-nav-admin"
            onClick={() => navigateTo('admin')}
            className={`w-full text-right px-4 py-3 rounded-xl text-base font-medium transition-all flex items-center justify-between ${
              currentView === 'admin'
                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            <span className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              پنل مدیریت و تولید برنامه‌ها
            </span>
          </button>
        </div>
      )}
    </header>
  );
}
