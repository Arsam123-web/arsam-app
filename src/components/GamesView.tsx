/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Gamepad2, 
  Download, 
  ArrowRight, 
  Star, 
  Check, 
  Play, 
  Layers,
  Sword,
  Car,
  ChevronLeft
} from 'lucide-react';
import { GameItem } from '../types';

interface GamesViewProps {
  games: GameItem[];
  selectedGame: GameItem | null;
  onSelectGame: (game: GameItem | null) => void;
}

export default function GamesView({
  games,
  selectedGame,
  onSelectGame
}: GamesViewProps) {
  const [detailTab, setDetailTab] = useState<'info' | 'features'>('info');

  const handleDownload = (gameName: string) => {
    alert(`دانلود دیتا و فایل نصبی بازی ${gameName} آغاز شد (شبیه‌سازی فایل لوکال)!`);
  };

  // 📋 Game Detail View
  if (selectedGame) {
    return (
      <div className="space-y-10 py-6 pb-12 animate-fade-in text-zinc-900 dark:text-zinc-100">
        <button
          onClick={() => {
            onSelectGame(null);
            setDetailTab('info');
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 text-xs sm:text-sm font-semibold rounded-xl border border-zinc-200/50 dark:border-zinc-800/80 transition cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>بازگشت به لیست بازی‌ها</span>
        </button>

        {/* 🎮 Game Hero layout */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-linear-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-xl shadow-indigo-600/10">
            {selectedGame.icon === 'Sword' ? <Sword className="w-12 h-12" /> : <Car className="w-12 h-12" />}
          </div>

          <div className="space-y-4 flex-1">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                {selectedGame.tags.map((tg, idx) => (
                  <span key={idx} className="text-[10px] sm:text-xs font-bold px-2 py-0.5 bg-indigo-500/10 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400 rounded-full">
                    {tg}
                  </span>
                ))}
                <span className="text-xs text-zinc-400 font-mono">آخرین نسخه پایدار: v{selectedGame.version}</span>
              </div>
              <h1 className="font-sans font-black text-2xl sm:text-3xl text-zinc-900 dark:text-white">
                {selectedGame.name}
              </h1>
            </div>

            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl">
              {selectedGame.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 py-1.5 border-y border-zinc-100 dark:border-zinc-800/60 font-mono">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <strong>{selectedGame.rating}</strong> / ۵
              </span>
              <span>•</span>
              <span>ابعاد گرافیک: سه‌بعدی و دوبعدی</span>
              <span>•</span>
              <span>حجم فایل دیتا: <strong>{selectedGame.size}</strong></span>
              <span>•</span>
              <span>تعداد دانلود فعال: <strong>{selectedGame.downloadsCount.toLocaleString('fa-IR')}</strong></span>
            </div>

            {/* Direct download element */}
            <button
              onClick={() => handleDownload(selectedGame.name)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/15 hover:opacity-95 transition-all text-sm cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>دانلود رایگان فایل نصبی بازی مستقیم (APK)</span>
            </button>
          </div>
        </div>

        {/* Gameplay Screenshot Gallery */}
        <div className="space-y-4">
          <h2 className="font-sans font-bold text-lg text-zinc-900 dark:text-white">محیط جذاب گیم‌پلی بازی</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedGame.screenshots.map((scr, i) => (
              <div key={i} className="aspect-video bg-zinc-200 dark:bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm relative group">
                <img 
                  src={scr} 
                  alt="Gameplay screenshot" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Extra Information Panels */}
        <div className="space-y-6">
          <div className="border-b border-zinc-200 dark:border-zinc-800 flex gap-2">
            {[
              { id: 'info', label: 'درباره گیم‌پلی و سناریو' },
              { id: 'features', label: 'ویژگی‌های بازی' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setDetailTab(t.id as any)}
                className={`px-4 py-2 text-sm font-extrabold border-b-2 -mb-px transition-all cursor-pointer ${
                  detailTab === t.id 
                    ? 'border-indigo-600 text-indigo-600 dark:border-emerald-400 dark:text-emerald-400' 
                    : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-zinc-100/50 border border-zinc-200 dark:bg-zinc-900/40 dark:border-zinc-800/80">
            {detailTab === 'info' && (
              <div className="space-y-4">
                <p className="text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed font-sans">
                  {selectedGame.description}
                </p>
                <div className="p-4 bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200/50 dark:border-zinc-800/80 text-xs sm:text-sm">
                  <strong className="text-indigo-600 dark:text-emerald-400 block mb-2 font-sans font-black">حداقل سیستم پیاده‌سازی شده اندروید:</strong>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-500 dark:text-zinc-400 font-sans">
                    <li>پردازنده: چهار هسته‌ای فرکانس ۱.۸ گیگاهرتز</li>
                    <li>میزان حافظه RAM مورد نیاز: ۲ گیگابایت</li>
                    <li>سیستم‌عامل هدف: اندروید نسخه ۸.۰ به بالا</li>
                    <li>رزولوشن: صفحه عریض HD+ مجهزشده</li>
                  </ul>
                </div>
              </div>
            )}

            {detailTab === 'features' && (
              <div className="space-y-4">
                <h3 className="font-sans font-bold text-sm sm:text-base text-zinc-900 dark:text-white">جدول محاسباتی ویژگی‌های کلیدی</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedGame.features.map((feat, i) => (
                    <li key={i} className="flex gap-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 font-bold font-sans">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 📂 Main List view
  return (
    <div className="space-y-8 py-6 pb-12 animate-fade-in text-zinc-900 dark:text-zinc-100">
      <div className="space-y-2">
        <h1 className="font-sans font-black text-2xl sm:text-3xl text-zinc-900 dark:text-white">
          بازی‌های بومی‌سازی شده استودیوی آرسام
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
          دنیایی هیجان‌انگیز از رقابت‌های آنلاین و چالش‌های تعاملی با الهام از شاهنامه فردوسی و رانندگی‌های نوستالژیک داخلی.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {games.map((g) => (
          <div 
            key={g.id}
            className="border border-zinc-200 rounded-2xl bg-white hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/30 dark:hover:border-zinc-700/60 transition-all overflow-hidden flex flex-col justify-between group"
          >
            {/* Upper half: image */}
            <div className="h-48 relative overflow-hidden bg-zinc-200 dark:bg-zinc-950">
              <img 
                src={g.screenshots[0]} 
                alt={g.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur text-white py-1 px-3.5 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 shadow">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{g.rating} / ۵</span>
              </div>
            </div>

            {/* Lower half: details */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {g.tags.map((tg, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 bg-indigo-50 dark:bg-zinc-800 text-indigo-600 dark:text-emerald-400 rounded font-bold">
                      {tg}
                    </span>
                  ))}
                </div>
                <h3 className="font-sans font-extrabold text-base sm:text-lg text-zinc-800 group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-emerald-400 transition-colors">
                  {g.name}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                  {g.shortDescription}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800/70 mt-2 font-mono">
                <span className="text-xs text-zinc-400">حجم بازی: {g.size}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectGame(g)}
                    className="px-3.5 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-bold rounded-lg border border-zinc-200 dark:border-zinc-700 transition cursor-pointer"
                  >
                    سناریو و عکس‌ها
                  </button>
                  <button
                    onClick={() => handleDownload(g.name)}
                    className="p-1.5 bg-gradient-to-r from-emerald-500 to-indigo-600 hover:opacity-90 text-white rounded-lg transition"
                    title="دانلود راحت فایل بازی"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
