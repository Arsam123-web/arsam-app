/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowRight, 
  Download, 
  Smartphone, 
  FileCode, 
  Star, 
  ChevronDown, 
  Sparkles, 
  Clock, 
  HelpCircle,
  FileCheck2,
  Calendar,
  Layers,
  Search
} from 'lucide-react';
import { AppItem } from '../types';

interface AppsViewProps {
  apps: AppItem[];
  selectedApp: AppItem | null;
  onSelectApp: (app: AppItem | null) => void;
}

export default function AppsView({
  apps,
  selectedApp,
  onSelectApp
}: AppsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('همه');
  const [detailTab, setDetailTab] = useState<'features' | 'changelog' | 'faqs'>('features');

  // Accordion state for FAQ inside details
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(null);

  const categories = ['همه', 'پیام‌رسان', 'ابزارها', 'سفر و مرجع'];

  // Filter apps
  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.englishName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'همه' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownloadAlert = (type: string, name: string) => {
    alert(`دانلود فایل ${type} مربوط به ${name} شروع شد (شبیه‌سازی شده)!`);
  };

  // 📋 App Detail View
  if (selectedApp) {
    return (
      <div className="space-y-10 py-6 pb-12 animate-fade-in text-zinc-900 dark:text-zinc-50">
        {/* Back Button */}
        <button
          onClick={() => {
            onSelectApp(null);
            // Reset detail state
            setDetailTab('features');
            setActiveFaqIdx(null);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 text-xs sm:text-sm font-semibold rounded-xl border border-zinc-200/50 dark:border-zinc-800/80 transition cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>بازگشت به لیست اپلیکیشن‌ها</span>
        </button>

        {/* 🏷️ App Hero Overview */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          {/* Mock Iconic Graphic */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-linear-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-xl shadow-indigo-600/10">
            <Smartphone className="w-12 h-12" />
          </div>

          <div className="space-y-4 flex-1">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold px-2.5 py-0.5 bg-indigo-500/10 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400 rounded-full">
                  {selectedApp.category}
                </span>
                <span className="text-xs text-zinc-500 font-mono font-semibold">
                  آخرین آپدیت: {selectedApp.updatedAt}
                </span>
              </div>
              <h1 className="font-sans font-extrabold text-2xl sm:text-3xl text-zinc-900 dark:text-white">
                {selectedApp.name} <span className="text-zinc-400 font-mono text-xl">({selectedApp.englishName})</span>
              </h1>
            </div>

            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
              {selectedApp.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 py-1.5 border-y border-zinc-100 dark:border-zinc-800/60 font-mono">
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <strong>{selectedApp.rating}</strong> / ۵
              </span>
              <span>•</span>
              <span>حجم فایل: <strong>{selectedApp.size}</strong></span>
              <span>•</span>
              <span>تعداد کل دانلود: <strong>{selectedApp.downloadsCount.toLocaleString('fa-IR')} +</strong></span>
              <span>•</span>
              <span>نسخه: <strong className="text-indigo-600 dark:text-emerald-400">v{selectedApp.version}</strong></span>
            </div>

            {/* Installation Downloader */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleDownloadAlert('APK', selectedApp.name)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/15 hover:opacity-95 transition-all text-sm cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>دانلود مستقیم نسخه اندروید (APK)</span>
              </button>
              <button
                onClick={() => handleDownloadAlert('AAB', selectedApp.name)}
                className="flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white dark:bg-zinc-900 dark:hover:bg-zinc-800 text-sm font-bold rounded-xl border border-zinc-700/50 dark:border-zinc-800 transition-all cursor-pointer"
              >
                <FileCode className="w-4 h-4 text-indigo-400" />
                <span>فرمت ویژه انتشار تلگرام و گوگل‌پلی (AAB)</span>
              </button>
            </div>
          </div>
        </div>

        {/* 📷 Screenshots slider style gallery */}
        <div className="space-y-4">
          <h2 className="font-sans font-bold text-lg text-zinc-900 dark:text-white">گالری تصاویر و اسکرین‌شات‌ها</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" id="screenshot-grid">
            {selectedApp.screenshots.map((shot, idx) => (
              <div key={idx} className="aspect-video rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 group">
                <img 
                  src={shot} 
                  alt={`Screenshot ${idx + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 🗂️ Interactive Info Tabs */}
        <div className="space-y-6">
          <div className="border-b border-zinc-200 dark:border-zinc-800 flex gap-2">
            {[
              { id: 'features', label: 'امکانات و ویژگی‌ها', icon: Sparkles },
              { id: 'changelog', label: 'تاریخچه تغییرات', icon: Clock },
              { id: 'faqs', label: 'سوالات متداول', icon: HelpCircle }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = detailTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setDetailTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 -mb-px text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                    isActive 
                      ? 'border-indigo-600 text-indigo-600 dark:border-emerald-400 dark:text-emerald-400' 
                      : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-6 rounded-2xl bg-zinc-100/55 border border-zinc-200/50 dark:bg-zinc-900/30 dark:border-zinc-800/80">
            {detailTab === 'features' && (
              <div className="space-y-4">
                <h3 className="font-sans font-bold text-sm sm:text-base text-zinc-900 dark:text-white flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-emerald-500" />
                  <span>لیست قابلیت‌های کلیدی برنامه</span>
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedApp.features.map((feat, i) => (
                    <li key={i} className="flex gap-2.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 font-sans font-bold text-xs select-none">
                        ✓
                      </span>
                      <span className="leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {detailTab === 'changelog' && (
              <div className="space-y-6">
                {selectedApp.changelog.map((entry, idx) => (
                  <div key={idx} className="relative pl-6 pb-6 border-r last:border-0 border-zinc-200 dark:border-zinc-800 space-y-2 pr-4">
                    {/* Circle timeline dot */}
                    <div className="absolute top-1.5 -right-1.5 w-3 h-3 rounded-full bg-indigo-600 dark:bg-emerald-500" />
                    
                    <div className="flex items-center gap-3">
                      <span className="font-sans font-black text-sm text-zinc-900 dark:text-white">
                        نسخه {entry.version}
                      </span>
                      <span className="text-xs px-2.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-mono rounded-full flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {entry.date}
                      </span>
                    </div>
                    <ul className="space-y-1.5 pt-1">
                      {entry.changes.map((ch, i) => (
                        <li key={i} className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                          <span className="text-indigo-500 dark:text-emerald-400 mt-0.5">•</span>
                          <span>{ch}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {detailTab === 'faqs' && (
              <div className="space-y-3">
                {selectedApp.faqs.map((faq, idx) => {
                  const isActive = activeFaqIdx === idx;
                  return (
                    <div key={idx} className="border border-zinc-200/50 dark:border-zinc-800/80 rounded-xl overflow-hidden bg-white dark:bg-zinc-950/40">
                      <button
                        onClick={() => setActiveFaqIdx(isActive ? null : idx)}
                        className="w-full flex items-center justify-between p-4 font-sans font-bold text-xs sm:text-sm text-zinc-800 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-white transition text-right cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown className={`w-4 h-4 text-zinc-400 transition-all ${isActive ? 'rotate-180' : ''}`} />
                      </button>
                      {isActive && (
                        <div className="p-4 pt-0 border-t border-zinc-100 dark:border-zinc-800/60 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans mt-2">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 📂 Application List View
  return (
    <div className="space-y-8 py-6 pb-12 animate-fade-in text-zinc-900 dark:text-zinc-100">
      <div className="space-y-2">
        <h1 className="font-sans font-black text-2xl sm:text-3xl text-zinc-900 dark:text-white">
          اپلیکیشن‌های اندروید آرسام
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          لیست پروژه‌های رسمی منتشر شده در بازارهای معتبر به همراه لینک دانلود مستقیم.
        </p>
      </div>

      {/* 🔍 Search & Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        {/* Category Toggles */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-indigo-600 dark:border-indigo-600'
                  : 'bg-white text-zinc-600 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800 dark:hover:bg-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Input searcher */}
        <div className="relative max-w-sm">
          <span className="absolute inset-y-0 right-3.5 flex items-center text-zinc-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجو در اپلیکیشن‌ها..."
            className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
          />
        </div>
      </div>

      {/* 🗂️ Cards lists */}
      {filteredApps.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 text-zinc-500">
          <Layers className="w-12 h-12 mx-auto mb-3 opacity-40 text-indigo-500" />
          <p className="font-sans font-bold text-sm">هیچ اپلیکیشنی متناسب با جستجوی شما یافت نشد.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              className="group border border-zinc-200/80 rounded-2xl bg-white hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800/80 dark:bg-zinc-900/30 dark:hover:border-zinc-700/60 transition-all flex flex-col justify-between overflow-hidden"
            >
              <div className="p-6 space-y-4">
                {/* Header element */}
                <div className="flex items-start justify-between">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-indigo-600/15 text-indigo-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-indigo-500/10 group-hover:scale-105 transition-transform">
                    <Smartphone className="w-7 h-7" />
                  </div>
                  {/* Rating / Version info */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] px-2.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 font-mono font-bold rounded-full">
                      v{app.version}
                    </span>
                    <span className="flex items-center gap-0.5 text-xs text-amber-500 font-bold font-mono">
                      ★ {app.rating}
                    </span>
                  </div>
                </div>

                {/* Name description */}
                <div className="space-y-1">
                  <h3 className="font-sans font-extrabold text-base sm:text-lg text-zinc-800 group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-emerald-400 transition-colors">
                    {app.name}
                  </h3>
                  <p className="text-[10px] text-zinc-400 font-mono tracking-tight">{app.englishName}</p>
                </div>

                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3">
                  {app.shortDescription}
                </p>
              </div>

              {/* Lower Section Footer action panel */}
              <div className="px-6 py-4 bg-zinc-100/50 border-t border-zinc-100 dark:bg-zinc-950/20 dark:border-zinc-850 flex items-center gap-2">
                <button
                  onClick={() => onSelectApp(app)}
                  className="flex-1 px-3 py-2 bg-zinc-200 hover:bg-zinc-300 text-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 dark:text-zinc-200 text-xs font-bold rounded-lg transition-all text-center cursor-pointer"
                >
                  مشاهده این برنامه
                </button>
                <button
                  onClick={() => handleDownloadAlert('APK', app.name)}
                  className="px-3.5 py-2 bg-gradient-to-r from-emerald-500 to-indigo-600 hover:opacity-90 text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>APK دانلود</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
