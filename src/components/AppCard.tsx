import React from 'react';
import { Application, ViewType } from '../types';
import { Download, Info, Calendar, Disc, ArrowLeft } from 'lucide-react';

interface AppCardProps {
  key?: string;
  app: Application;
  onSelectApp: (id: string) => void;
  setCurrentView: (view: ViewType) => void;
}

export default function AppCard({ app, onSelectApp, setCurrentView }: AppCardProps) {
  const handleOpenDetails = () => {
    onSelectApp(app.id);
    setCurrentView('details');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering card details click
    window.open(app.download_url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={handleOpenDetails}
      className="group relative flex flex-col h-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-md hover:shadow-xl hover:border-primary-200 dark:hover:border-primary-900/50 transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          {app.category}
        </span>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        {/* App Meta Header */}
        <div className="flex items-start gap-4 mb-5">
          <img
            src={app.icon}
            alt={app.name}
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-2xl object-cover shadow-inner border border-slate-100 dark:border-slate-800 shrink-0 transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="space-y-1 overflow-hidden">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
              {app.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono tracking-wider">
              نسخه {app.version}
            </p>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-relaxed mb-2">
          {app.tagline}
        </p>

        {/* Shortened description */}
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 mb-6 flex-1">
          {app.description}
        </p>

        {/* Specific App Specs (Size, Version, Release Date) */}
        <div className="grid grid-cols-2 gap-3 mb-6 p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100/50 dark:border-slate-800/30 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1.5 min-w-0">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">انتشار: {app.release_date}</span>
          </div>
          <div className="flex items-center gap-1.5 min-w-0">
            <Disc className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">حجم: {app.size}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons Container */}
      <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800/60 mt-auto bg-slate-50/50 dark:bg-slate-950/10 flex items-center justify-between gap-3">
        {/* Detail Button */}
        <button
          onClick={handleOpenDetails}
          className="flex-1 inline-flex items-center justify-center py-2.5 px-4 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all gap-1 cursor-pointer"
        >
          <Info className="w-3.5 h-3.5" />
          <span>جزئیات و تصاویر</span>
        </button>

        {/* Direct Download Button */}
        <button
          onClick={handleDownload}
          className="flex-1 inline-flex items-center justify-center py-2.5 px-4 rounded-xl text-xs font-semibold bg-primary-600 hover:bg-primary-500 hover:shadow-md hover:shadow-primary-500/10 text-white transition-all gap-1 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>دانلود مستقیم APK</span>
        </button>
      </div>
    </div>
  );
}
