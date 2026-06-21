/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Github, Send, MessageSquare, Heart, Mail, Smartphone, Cpu, Gamepad2, Download } from 'lucide-react';

interface FooterProps {
  onChangeTab: (tab: string) => void;
}

export default function Footer({ onChangeTab }: FooterProps) {
  const currentYearPersian = '۱۴۰۵';

  return (
    <footer className="border-t border-slate-200/80 bg-slate-100 text-slate-600 dark:border-slate-900 dark:bg-slate-950 text-sm transition-colors py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Bio & Intro Column */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500 text-slate-950 font-sans font-bold text-base select-none shadow-[0_0_10px_rgba(34,211,238,0.3)]">
              آ
            </div>
            <span className="font-sans font-black text-base text-slate-900 dark:text-slate-100 leading-none">
              استودیوی نرم‌افزاری آرسام
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-450 text-xs sm:text-sm leading-relaxed max-w-md">
            هاب مرکزی طراحی و توسعه نرم‌افزار‌های مدرن اندروید، سامانه‌های پردازش محلی با هوش مصنوعی و بازی‌های دوبعدی هیجان‌انگیز بر پایه اساطیر و نوستالژی‌های ارزشمند ایرانی. هدف ما خلق بهترین تجربه کاربری با بهترین مهندسی بومی است.
          </p>
          <div className="flex items-center gap-3.5 pt-2">
            <a href="#github" className="p-2 rounded-lg bg-slate-205/50 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-805 text-slate-700 dark:text-slate-300 transition-colors" aria-label="گیت‌هاب">
              <Github className="w-4 h-4" />
            </a>
            <a href="#telegram" className="p-2 rounded-lg bg-slate-205/50 hover:bg-slate-205 dark:bg-slate-900 dark:hover:bg-slate-805 text-slate-700 dark:text-slate-300 transition-colors" aria-label="تلگرام">
              <Send className="w-4 h-4" />
            </a>
            <a href="#chat" className="p-2 rounded-lg bg-slate-205/50 hover:bg-slate-250 dark:bg-slate-900 dark:hover:bg-slate-805 text-slate-700 dark:text-slate-300 transition-colors" aria-label="گفتگو">
              <MessageSquare className="w-4 h-4" />
            </a>
            <a href="mailto:paintparastoo@gmail.com" className="p-2 rounded-lg bg-slate-205/50 hover:bg-slate-250 dark:bg-slate-900 dark:hover:bg-slate-805 text-slate-700 dark:text-slate-300 transition-colors" aria-label="ایمیل">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Categories / Directory Links */}
        <div className="space-y-3">
          <h3 className="font-sans font-extrabold text-sm text-slate-900 dark:text-slate-100">بخش‌های وب‌سایت</h3>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>
              <button onClick={() => onChangeTab('apps')} className="flex items-center gap-1.5 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all text-right cursor-pointer">
                <Smartphone className="w-3.5 h-3.5 shrink-0 text-cyan-500" />
                <span>اپلیکیشن‌های اندروید</span>
              </button>
            </li>
            <li>
              <button onClick={() => onChangeTab('ai')} className="flex items-center gap-1.5 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all text-right cursor-pointer">
                <Cpu className="w-3.5 h-3.5 shrink-0 text-cyan-500" />
                <span>پروژه‌های مجهز به هوش مصنوعی</span>
              </button>
            </li>
            <li>
              <button onClick={() => onChangeTab('games')} className="flex items-center gap-1.5 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all text-right cursor-pointer">
                <Gamepad2 className="w-3.5 h-3.5 shrink-0 text-cyan-500" />
                <span>بازی‌های بومی سازی شده</span>
              </button>
            </li>
            <li>
              <button onClick={() => onChangeTab('downloads')} className="flex items-center gap-1.5 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all text-right cursor-pointer">
                <Download className="w-3.5 h-3.5 shrink-0 text-cyan-500" />
                <span>ابزارها و فایل‌های دانلود</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Legal & Info Column */}
        <div className="space-y-3">
          <h3 className="font-sans font-extrabold text-sm text-slate-900 dark:text-slate-100">آدرس و ارتباطات</h3>
          <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed">
            ایران، تهران، پارک فناوری پردیس، ساختمان شتابدهی استودیوی آرسام.
          </p>
          <p className="text-xs text-slate-550 dark:text-slate-400">
            پشتیبانی کاربران: <span className="font-mono text-cyan-600 dark:text-cyan-400">paintparastoo@gmail.com</span>
          </p>
          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 bg-slate-200 dark:bg-slate-900 rounded border border-slate-350/30 dark:border-slate-800 text-slate-550 dark:text-slate-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              مددکار ۲۴ ساعته برخط فعال
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-slate-250 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold">
        <div className="flex gap-4 text-slate-500 dark:text-slate-400">
          <span>کپی‌رایت © {currentYearPersian} آرسام استودیو</span>
          <span>•</span>
          <span>تمامی حقوق مادی و معنوی محفوظ است</span>
        </div>
        <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            سرور آنلاین است
          </span>
          <span className="font-mono text-[10px] tracking-wide text-slate-400 dark:text-slate-500">V 4.2.0-STABLE</span>
        </div>
      </div>
    </footer>
  );
}
