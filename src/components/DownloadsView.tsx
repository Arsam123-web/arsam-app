/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Download, 
  Search, 
  FileBox, 
  Layers, 
  File, 
  Calendar, 
  ChevronsUpDown,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { DownloadFile } from '../types';

interface DownloadsViewProps {
  downloads: DownloadFile[];
}

export default function DownloadsView({ downloads }: DownloadsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('همه');
  
  // Real-time progress simulator states
  const [downloadingFileId, setDownloadingFileId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [successFileId, setSuccessFileId] = useState<string | null>(null);

  const categories = ['همه', 'ابزار توسعه', 'بازی‌سازی', 'گرافیک'];

  const filtered = downloads.filter((file) => {
    const matchesSearch = file.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          file.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'همه' || file.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const triggerDownloadSimulation = (file: DownloadFile) => {
    if (downloadingFileId) {
      alert('لطفاً تا اتمام دانلود فایل قبلی صبور باشید!');
      return;
    }

    setSuccessFileId(null);
    setDownloadingFileId(file.id);
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadingFileId(null);
          setSuccessFileId(file.id);
          // Auto-increment the count locally
          file.downloadsCount += 1;
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);
  };

  return (
    <div className="space-y-8 py-6 pb-12 animate-fade-in text-zinc-900 dark:text-zinc-100">
      <div className="space-y-2">
        <h1 className="font-sans font-black text-2xl sm:text-3xl text-zinc-900 dark:text-white">
          مرکز دانلود فایل و ابزارها
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          کیت‌های برنامه‌نویسی تخصصی، الگو‌های آماده سورس کدهای کاتلین، پکیج‌های یونیتی و والپیپرهای اختصاصی آرسام استودیو.
        </p>
      </div>

      {/* Search & Categories Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        {/* Category filters */}
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

        {/* Input fields */}
        <div className="relative max-w-sm">
          <span className="absolute inset-y-0 right-3.5 flex items-center text-zinc-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجو در فایل‌ها..."
            className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
          />
        </div>
      </div>

      {/* 📥 Live Download Progress Bar Banner (if active) */}
      {downloadingFileId && (
        <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900 flex flex-col gap-2.5" id="download-progress-bar">
          <div className="flex items-center justify-between text-xs font-semibold text-indigo-900 dark:text-indigo-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
              <span>در حال دانلود مطمئن فایل انتخابی بر روی مرورگر شما...</span>
            </span>
            <span className="font-mono">{downloadProgress}%</span>
          </div>
          <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-400 to-indigo-600 h-full transition-all duration-150"
              style={{ width: `${downloadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* 📂 Flat File Cards Grid */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 text-zinc-500">
          <File className="w-12 h-12 mx-auto mb-3 opacity-40 text-indigo-500" />
          <p className="font-sans font-bold text-sm">هیچ فایل متناسب با فیلترینگ شما یافت نشد.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((file) => {
            const isThisDownloading = downloadingFileId === file.id;
            const isThisSuccess = successFileId === file.id;
            
            return (
              <div 
                key={file.id}
                className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-5 rounded-xl border border-zinc-200/60 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/30 hover:border-zinc-300 dark:hover:border-zinc-750 transition-all shadow-xs relative"
              >
                {/* Left information columns */}
                <div className="flex items-start sm:items-center gap-4">
                  {/* File icon badge */}
                  <div className="w-11 h-11 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 shrink-0 border border-zinc-200/50 dark:border-zinc-700/55">
                    <span className="font-mono text-2s font-bold text-indigo-600 dark:text-emerald-400 uppercase">
                      {file.fileType}
                    </span>
                  </div>

                  <div className="space-y-1 text-right">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 border dark:border-zinc-800 rounded">
                        {file.category}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-mono tracking-wider flex items-center gap-1">
                        <Calendar className="w-2.5 h-2.5" />
                        آخرین بروزرسانی: {file.updatedAt}
                      </span>
                    </div>
                    <h3 className="font-sans font-bold text-sm sm:text-base text-zinc-900 dark:text-white leading-snug">
                      {file.title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans max-w-xl">
                      {file.description}
                    </p>
                  </div>
                </div>

                {/* Right size indicators and CTA Button */}
                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0 border-zinc-100 dark:border-zinc-800/70 shrink-0 font-mono">
                  <div className="flex flex-col text-right md:text-left gap-1">
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">حجم: <strong className="text-zinc-800 dark:text-zinc-200">{file.size}</strong></span>
                    <span className="text-[10px] text-zinc-400">تعداد کل دریافت: {file.downloadsCount.toLocaleString('fa-IR')} بار</span>
                  </div>

                  <button
                    onClick={() => triggerDownloadSimulation(file)}
                    disabled={!!downloadingFileId}
                    className={`px-5 py-2.5 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                      isThisDownloading 
                        ? 'bg-zinc-100 text-zinc-400 dark:bg-zinc-850 dark:text-zinc-600 cursor-not-allowed'
                        : isThisSuccess
                        ? 'bg-emerald-500 text-white'
                        : 'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-indigo-650 dark:hover:bg-indigo-705 shadow'
                    }`}
                  >
                    {isThisDownloading ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-ping" />
                        <span>دریافت...</span>
                      </>
                    ) : isThisSuccess ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-white" />
                        <span>دانلود شد!</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>دریافت فایل</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
