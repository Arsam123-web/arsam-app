/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Smartphone, 
  Cpu, 
  Gamepad2, 
  Download, 
  BookOpen, 
  Layers,
  User, 
  Mail, 
  Lock 
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onChangeTab: (tab: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Navbar({ 
  currentTab, 
  onChangeTab, 
  darkMode, 
  onToggleDarkMode 
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'خانه', icon: Layers },
    { id: 'apps', label: 'اپلیکیشن‌ها', icon: Smartphone },
    { id: 'ai', label: 'پروژه‌های هوش مصنوعی', icon: Cpu },
    { id: 'games', label: 'بازی‌ها', icon: Gamepad2 },
    { id: 'downloads', label: 'دانلودها', icon: Download },
    { id: 'blog', label: 'وبلاگ', icon: BookOpen },
    { id: 'about', label: 'درباره ما', icon: User },
    { id: 'contact', label: 'تماس با ما', icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-md border-slate-200/80 bg-slate-50/85 dark:border-slate-800/80 dark:bg-slate-950/85 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onChangeTab('home')}>
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-500 text-slate-950 font-sans font-black text-xl select-none shadow-[0_0_15px_rgba(34,211,238,0.4)]">
              آ
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-black text-xl tracking-tight text-slate-900 dark:text-white">
                استودیو <span className="text-cyan-600 dark:text-cyan-400">آرسام</span>
              </span>
              <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 tracking-wider">
                Arsam Studio
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 space-x-reverse" id="desktop-menu">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => onChangeTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-cyan-50 text-cyan-600 dark:bg-slate-900/60 dark:text-cyan-400'
                      : 'text-slate-600 hover:text-cyan-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-cyan-400 dark:hover:bg-slate-900/40'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Settings & Admin Profile Controls */}
          <div className="flex items-center gap-2">
            {/* Admin Dashboard Entry Button */}
            <button
              id="nav-admin-btn"
              onClick={() => onChangeTab('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                currentTab === 'admin'
                  ? 'bg-cyan-600 text-white border-cyan-605 shadow-md shadow-cyan-600/10'
                  : 'text-slate-700 bg-slate-100 border-slate-200/60 hover:bg-slate-200 dark:text-slate-200 dark:bg-slate-900/60 dark:border-slate-800 dark:hover:bg-slate-800/80'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">پنل مدیریت</span>
            </button>

            {/* Dark Mode Lever */}
            <button
              id="theme-toggler"
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl transition-all border border-slate-200/60 bg-slate-100/60 text-slate-700 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-800"
              aria-label="تغییر پس‌زمینه"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-500" />}
            </button>

            {/* Mobile Menu Action Button */}
            <button
              id="mobile-drawer-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 lg:hidden rounded-xl border border-slate-200/60 bg-slate-100/60 text-slate-600 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:text-slate-200"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Slide-in View */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-200/80 bg-slate-50 dark:border-slate-800/80 dark:bg-slate-950 p-4 space-y-1.5 shadow-inner" id="mobile-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => {
                  onChangeTab(item.id);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-right text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-cyan-50 text-cyan-600 dark:bg-slate-800 dark:text-cyan-400 font-extrabold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40'
                }`}
              >
                <Icon className="w-4 h-4 text-slate-550 dark:text-slate-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
