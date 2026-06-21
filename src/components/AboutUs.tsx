import React from 'react';
import { ShieldCheck, Flame, Heart, Sparkles, AlertCircle } from 'lucide-react';

export default function AboutUs() {
  return (
    <section id="about-section" className="py-20 bg-slate-50 dark:bg-slate-950/20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Column 1: Principles and Vision */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/50 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>درباره استودیو آرسام</span>
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-[1.3]">
              توسعه مستقل و بومی برنامه‌های اندرویدی با رویکرد حفظ حریم خصوصی داده‌ها
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              استودیو آرسام فعالیت خود را با هدف ایجاد تحول فکری و ظاهری در توسعه برنامه‌های تحت موبایل فارسی‌زبان آغاز کرد. ما متعهد هستیم تا محصولاتی بسازیم که فراتر از رفع نیاز روزمره، تجربه‌ای عاری از شلوغی‌های بازاریابی دیجیتال و سیستم‌های ردیابی اطلاعات ارائه دهند.
            </p>

            {/* Sub Core principles grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">امنیت عالی و احترام به مجوزها</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-normal">
                    ما پیش از هر دانلودی اطمینان می‌دهیم محصولات فاقد هرگونه دسترسی غیرضروری به مخاطبین یا فایل‌های شخصی باشند.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">سرعت استثنایی و کدهای بهینه</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-normal">
                    با بازنویسی چندین‌باره ساختار فرانت‌اند اندروید، حجم فایل APK را به حداقل ممکن رسانده‌ایم.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">طراحی بومی و راست‌چین (RTL)</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-normal">
                    رابط‌های کاربری بر اساس نیاز بصری و الگوهای خوانایی فارسی‌زبانان به طور اختصاصی چینش می‌شوند.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-pink-100 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">توسعه ۱۰۰٪ مستقل و آزاد</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-normal">
                    بودجه ما تنها از طرف رضایت و همراهی کاربران تامین می‌شود و هیچ سرمایه‌گذار تبلیغاتی بر کار ما تاثیرگذار نیست.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: visual boxed block */}
          <div className="lg:col-span-5 bg-gradient-to-br from-primary-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 left-0 w-44 h-44 bg-white/5 rounded-full blur-2xl"></div>
            <div className="relative space-y-6">
              <h3 className="text-xl font-bold">چرا گوگل درایو؟</h3>
              <p className="text-xs text-primary-100 leading-relaxed">
                برنامه‌های ساخته شده در استودیو آرسام به دلیل دارا بودن ویژگی‌های بومی توسعه‌یافته و عدم همگام‌سازی با پلتفرم‌های دولتی، مستقیماً روی بستر ابری گوگل درایو آپلود می‌شوند. 
              </p>
              <p className="text-xs text-primary-100 leading-relaxed">
                این موضوع دو فایده بزرگ دارد: اول اینکه سرعت دانلود بالایی دارند و دوم اینکه فایل‌ها به راحتی و به طور منظم توسط مکانیزم‌های بومی آنتی‌ویروس گوگل درایو به طور مداوم برای تامین ۱۰۰٪ امنیت اسکن می‌شوند.
              </p>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-200 leading-normal">
                  هنگام نصب هر فایل <span className="font-mono">APK</span> خارج از بازارهای رسمی، اندروید ممکن است پیامی مبنی بر تغییر ناشناس منبع بدهد. با خیالی آسوده گزینه 'Install anyway' را تایید کنید.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
