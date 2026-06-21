/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  User, 
  Code2, 
  Terminal, 
  Cpu, 
  Workflow, 
  Smartphone, 
  Award, 
  Compass,
  MessageSquare
} from 'lucide-react';

export default function AboutView() {
  const developersBio = 'آرسام یک مهندس نرم‌افزار خلاق، طراح بازی‌های ویدیویی بومی و توسعه‌دهنده با انگیزه سامانه‌های هوش مصنوعی است. تمرکز او بر ایجاد محصولاتی است که تجربه کاربری کاربران فارسی‌زبان را چندین سطح ارتقا داده و از قابلیت‌های پردازش بر روی دستگاه بهره‌مند باشد.';

  return (
    <div className="space-y-12 py-6 pb-12 animate-fade-in text-zinc-900 dark:text-zinc-100">
      {/* 🚀 Hero profile title */}
      <section className="flex flex-col md:flex-row gap-8 items-center border border-zinc-200/80 bg-white dark:border-zinc-805/85 dark:bg-zinc-900/40 p-8 rounded-2xl">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white shrink-0 shadow-lg text-4xl select-none select-none font-bold">
          آر
        </div>
        <div className="space-y-3 flex-1 text-center md:text-right">
          <h1 className="font-sans font-black text-2xl sm:text-3xl text-zinc-900 dark:text-white">
            درباره استودیوی نرم‌افزاری آرسام
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
            {developersBio}
          </p>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-1.5">
            <span className="text-xs px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full font-semibold">بنیان‌گذار و توسعه‌دهنده ارشد</span>
            <span className="text-xs px-3 py-1 bg-zinc-105/95 dark:bg-zinc-800 rounded-full font-semibold">توسعه اندروید و هوش مصنوعی</span>
          </div>
        </div>
      </section>

      {/* 🛠️ Technologies & Programming Stacks */}
      <section className="space-y-6">
        <h2 className="font-sans font-extrabold text-lg text-zinc-900 dark:text-white flex items-center gap-2 border-b pb-3 border-zinc-100 dark:border-zinc-800">
          <Code2 className="w-5 h-5 text-indigo-500" />
          <span>تکنولوژی‌ها و ابزارهای مورد استفاده</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: 'اندروید نیتیو (Native)', level: 'کاتلین، جاوا، جت‌پک کامپوز، گلنس', icon: Smartphone, color: 'text-emerald-505 bg-emerald-50 dark:bg-zinc-900/60' },
            { title: 'مدل‌سازی هوش‌مصنوعی', level: 'PyTorch, Gemini SDK, ONNX Runtime', icon: Cpu, color: 'text-indigo-505 bg-indigo-50 dark:bg-zinc-900/60' },
            { title: 'موتورهای بازی‌سازی', level: 'Unity Engine, Blender سه‌بعدی', icon: Compass, color: 'text-amber-505 bg-amber-50 dark:bg-zinc-900/60' },
            { title: 'مهندسی وب زنده', level: 'React, TypeScript, Next.js, Tailwind', icon: Workflow, color: 'text-violet-505 bg-violet-50 dark:bg-zinc-900/60' }
          ].map((stack, i) => {
            const Icon = stack.icon;
            return (
              <div key={i} className="p-5 rounded-xl border border-zinc-200/50 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/20 text-center space-y-2">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto ${stack.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-sans font-bold text-xs sm:text-sm text-zinc-800 dark:text-zinc-150">
                  {stack.title}
                </h3>
                <p className="text-[10px] text-zinc-400 font-sans leading-relaxed">
                  {stack.level}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 📈 Timeline roadmaps */}
      <section className="space-y-6">
        <h2 className="font-sans font-extrabold text-lg text-zinc-900 dark:text-white flex items-center gap-2 border-b pb-3 border-zinc-100 dark:border-zinc-800">
          <Award className="w-5 h-5 text-amber-500" />
          <span>خط زمانی دستاوردهای استودیو آرسام</span>
        </h2>

        <div className="space-y-6 pl-4 pr-1">
          {[
            { year: '۱۴۰۵', title: 'توسعه موتور گفتار و پردازش محلی پارس', details: 'ادغام موفق مدل‌های زبانی کوچک با فریم‌ورک‌های بومی اندروید جهت محافظت صد در صد از حریم خصوصی فایل‌های مکالمه.' },
            { year: '۱۴۰۴', title: 'انتشار رسمی تقویم هوشمند شمیم', details: 'رسیدن به رکورد ۱۰۰ هزار بار نصب فعال در مارکت بازار و مایکت به همراه دریافت نشان تقویم کاندید برتر سال.' },
            { year: '۱۴۰۳', title: 'ورود به دنیای باز‌ی‌سازی اساطیری', details: 'استارت اولیه به کار بردن المان‌های گیم پلی حماسی و شاهنامه‌ای در بازی نبرد کتیبه‌ها با موسیقی سنتی ایرانی.' }
          ].map((item, idx) => (
            <div key={idx} className="relative pr-6 pb-4 border-r last:border-0 border-zinc-200 dark:border-zinc-800 space-y-1">
              <div className="absolute top-1.5 -right-1.5 w-3 h-3 rounded-full bg-indigo-600 dark:bg-emerald-500" />
              <div className="flex items-center gap-2 font-mono">
                <span className="text-sm font-bold text-indigo-600 dark:text-emerald-400">{item.year}</span>
                <span className="text-zinc-400 font-sans font-bold">| {item.title}</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans pr-2">
                {item.details}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
