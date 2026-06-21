import React, { useState } from 'react';
import { Application } from '../types';
import { Download, Calendar, Disc, Star, CheckCircle, ChevronRight, Maximize2, X, History, Layers } from 'lucide-react';

interface AppDetailsProps {
  app: Application;
  onGoBack: () => void;
}

export default function AppDetails({ app, onGoBack }: AppDetailsProps) {
  const [activeScreenshot, setActiveScreenshot] = useState<string | null>(null);

  const handleDownload = () => {
    window.open(app.download_url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-colors duration-300">
      {/* Navigation Breadcrumb / Back Button */}
      <button
        onClick={onGoBack}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all mb-8 cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />
        <span>بازگشت به لیست اپلیکیشن‌ها</span>
      </button>

      {/* Hero Header Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* App Icon, Name & Download Details Block */}
        <div className="lg:col-span-8 flex flex-col md:flex-row gap-6 items-start bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm w-full">
          <img
            src={app.icon}
            alt={app.name}
            referrerPolicy="no-referrer"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover shadow-md border border-slate-100 dark:border-slate-800 shrink-0 self-center md:self-start"
          />
          <div className="space-y-4 flex-1">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400">
                  {app.category}
                </span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                  بازبینی‌شده و امن
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {app.name}
              </h1>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                {app.tagline}
              </p>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {app.description}
            </p>

            {/* Micro Metadata Grid */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex flex-col gap-1 p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100/50 dark:border-slate-800/30">
                <span className="text-slate-400">نسخه فعلی</span>
                <span className="font-bold font-mono text-slate-800 dark:text-slate-200 text-sm mt-0.5">
                  {app.version}
                </span>
              </div>
              <div className="flex flex-col gap-1 p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100/50 dark:border-slate-800/30">
                <span className="text-slate-400">حجم فایل APK</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm mt-0.5">
                  {app.size}
                </span>
              </div>
              <div className="flex flex-col gap-1 p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100/50 dark:border-slate-800/30">
                <span className="text-slate-400">آخرین به‌روزرسانی</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-xs mt-1">
                  {app.release_date}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action / Information Bar (Right-side on Desktop) */}
        <div className="lg:col-span-4 bg-gradient-to-tr from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full min-h-[240px] shadow-lg">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">دانلود امن فرکانس بالا</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              این اپلیکیشن مستقیماً روی سرور گوگل درایو بارگذاری شده است. با کلیک بر روی دکمه زیر، فایل نصبی استاندارد با فرمت <span className="font-semibold text-primary-400">APK</span> را دریافت کنید.
            </p>
          </div>

          <div className="space-y-3 pt-6.5">
            <button
              onClick={handleDownload}
              className="w-full inline-flex items-center justify-center py-4 px-6 rounded-2xl bg-primary-500 hover:bg-primary-400 hover:shadow-xl hover:shadow-primary-600/20 text-white font-bold transition-all gap-2 cursor-pointer"
            >
              <Download className="w-5 h-5" />
              <span>دانلود فایل APK با حجم {app.size}</span>
            </button>
            <div className="text-center">
              <span className="text-[10px] text-slate-400">
                سپر امنیتی Google Play Protect تایید کننده اصالت فایل است.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Screen Shots Carousel */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <Layers className="w-5 h-5 text-primary-500" />
          <span>تصاویر و نمایی از اپلیکیشن</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 overflow-x-auto pb-2">
          {app.screenshots.map((screen, idx) => (
            <div
              key={idx}
              onClick={() => setActiveScreenshot(screen)}
              className="relative group rounded-2xl aspect-[9/16] overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 cursor-zoom-in"
            >
              <img
                src={screen}
                alt={`Screenshot ${idx + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform group-hover:scale-105 duration-300 transition-transform"
              />
              <div className="absolute inset-0 bg-slate-950/10 dark:bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/95 text-slate-900 flex items-center justify-center shadow">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main App Content: Left Column (Features) & Right Column (Version History) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Features Checklist */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            <span>ویژگی‌ها و قابلیت‌های کلیدی</span>
          </h2>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {app.features.map((feat, idx) => (
              <li
                key={idx}
                className="flex gap-2 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/50"
              >
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 dark:text-slate-300 leading-normal">
                  {feat}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ChangeLog/Version History timeline */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
            <History className="w-5 h-5 text-primary-500" />
            <span>تاریخچه تغییرات برنامه‌ (کامل)</span>
          </h2>

          <div className="space-y-6 relative border-r-2 border-slate-100 dark:border-slate-800 pr-5 mr-3">
            {app.change_log.map((change, idx) => (
              <div key={idx} className="relative space-y-2">
                {/* Timeline Dot */}
                <div className="absolute -right-[27px] top-1.5 w-3.5 h-3.5 rounded-full bg-primary-500 border-2 border-white dark:border-slate-900 shadow"></div>

                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-primary-50 dark:bg-primary-950 text-primary-600 dark:text-primary-400">
                    نسخه {change.version}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">تاریخ: {change.date}</span>
                </div>

                <ul className="space-y-1.5 mr-2">
                  {change.changes.map((txt, cIdx) => (
                    <li key={cIdx} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1.5 leading-normal">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 shrink-0 mt-1.5"></span>
                      <span>{txt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Screen Shot Modal Zoom Overlay */}
      {activeScreenshot && (
        <div
          onClick={() => setActiveScreenshot(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 animate-fade-in"
        >
          <div className="relative max-w-lg w-full max-h-[85vh] flex flex-col items-center">
            <button
              onClick={() => setActiveScreenshot(null)}
              className="absolute -top-12 left-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={activeScreenshot}
              alt="Zoomed Screenshot"
              className="max-w-full max-h-[75vh] rounded-2xl object-contain shadow-2xl border border-white/10"
            />
          </div>
        </div>
      )}
    </div>
  );
}
