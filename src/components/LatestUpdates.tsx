import React from 'react';
import { Application, ViewType } from '../types';
import { Sparkles, ArrowLeft, RefreshCw, Smartphone } from 'lucide-react';

interface LatestUpdatesProps {
  apps: Application[];
  onSelectApp: (id: string) => void;
  setCurrentView: (view: ViewType) => void;
}

export default function LatestUpdates({ apps, onSelectApp, setCurrentView }: LatestUpdatesProps) {
  // Flatten changelogs to find the absolute latest updates across all apps
  const updates = apps.flatMap((app) =>
    app.change_log.map((log) => ({
      appId: app.id,
      appName: app.name,
      appIcon: app.icon,
      ...log,
    }))
  ).sort((a, b) => {
    // Sort roughly by date or version. Since they are Persian dates, we can sorting them descending.
    return b.date.localeCompare(a.date);
  }).slice(0, 3); // Get the 3 latest updates

  const handleAppClick = (appId: string) => {
    onSelectApp(appId);
    setCurrentView('details');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-t border-b border-slate-100 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <RefreshCw className="w-6 h-6 text-indigo-500 animate-spin-slow" />
              <span>آخرین به‌روزرسانی برنامه‌ها</span>
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              گزارش زنده فعالیت‌ها، بهبود کیفیت و تغییرات نسخه‌های جدید استودیو آرسام
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {updates.map((up, idx) => (
            <div
              key={idx}
              onClick={() => handleAppClick(up.appId)}
              className="group p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl hover:border-primary-100 dark:hover:border-primary-900/45 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Product Identifier */}
                <div className="flex items-center gap-3">
                  <img
                    src={up.appIcon}
                    alt={up.appName}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-xl object-contain border border-slate-100 dark:border-slate-800"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {up.appName}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-slate-400 font-mono">
                      <span>نسخه {up.version}</span>
                      <span>•</span>
                      <span>تاریخ: {up.date}</span>
                    </div>
                  </div>
                </div>

                {/* Specific bullets */}
                <ul className="space-y-2 pr-1">
                  {up.changes.map((txt, cIdx) => (
                    <li
                      key={cIdx}
                      className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></span>
                      <span>{txt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Back to details link */}
              <div className="pt-5 border-t border-slate-200/50 dark:border-slate-800/50 mt-5 flex justify-end items-center gap-1 text-[11px] font-bold text-slate-500 dark:text-slate-400 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                <span>توضیحات تکمیلی محصول</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
