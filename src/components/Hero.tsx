import React from 'react';
import { Sparkles, ShieldCheck, EyeOff, Smartphone, ArrowRight } from 'lucide-react';
import { ViewType } from '../types';

interface HeroProps {
  setCurrentView: (view: ViewType) => void;
  totalAppsCount: number;
}

export default function Hero({ setCurrentView, totalAppsCount }: HeroProps) {
  const handleBrowseApps = () => {
    setCurrentView('apps');
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 pt-16 pb-20 lg:pt-24 lg:pb-28 transition-colors duration-300">
      {/* Decorative decorative glow */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-primary-400/10 dark:bg-primary-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-400/10 dark:bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
          {/* Main Hero texts */}
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-7 lg:text-right">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/50 border border-primary-100 dark:border-primary-900/50 text-xs font-semibold text-primary-600 dark:text-primary-400 mb-6 sm:justify-center">
              <Sparkles className="w-3.5 h-3.5" />
              <span>انتشار نسخه‌های پایدار ۱۴۰۵ خورشیدی</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.3] sm:leading-[1.25]">
              برنامه‌های هوشمند اندروید،{' '}
              <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-l from-primary-600 to-indigo-600 dark:from-primary-400 dark:to-indigo-400">
                طراحی‌شده برای نیاز شما
              </span>
            </h1>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto lg:mr-0">
              استودیو آرسام به طراحی و انتشار برنامه‌های فوق‌العاده سبک، سریع و کاملاً آفلاین برای سیستم‌عامل اندروید می‌پردازد. امنیت بالا، عدم استفاده از تبلیغات آزاردهنده و هماهنگی کامل فرم بومی با زبان فارسی هدف همیشگی ماست.
            </p>

            <div className="mt-8 sm:flex sm:justify-center lg:justify-start gap-4 space-y-3 sm:space-y-0">
              <button
                onClick={handleBrowseApps}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-2xl bg-gradient-to-l from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white font-medium text-base shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 transition-all duration-300 gap-2 cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>بارگیری و دانلود اپلیکیشن‌ها</span>
                <ArrowRight className="w-4 h-4 turn-180" />
              </button>

              <a
                href="#about-section"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 font-medium text-base transition-all duration-300"
              >
                درباره آرسام استودیو
              </a>
            </div>
          </div>

          {/* Graphical features card mockup */}
          <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-span-5">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              {/* Glassmorphic card */}
              <div className="relative rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                    arsam_manifest.xml
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Stat item 1 */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100/50 dark:border-slate-800/50">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center text-primary-600 dark:text-primary-400">
                      <Smartphone className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        {totalAppsCount} اپلیکیشن فعال و آماده نصب
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        پک‌های تمیز APK آماده دریافت از سرور مگا گوگلی
                      </p>
                    </div>
                  </div>

                  {/* Stat item 2 */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100/50 dark:border-slate-800/50">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        ۱۰۰٪ کد امن و تایید شده
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        تطبیق کامل با Play Protect گوگل و بدون دسترسی بیهوده
                      </p>
                    </div>
                  </div>

                  {/* Stat item 3 */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100/50 dark:border-slate-800/50">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 dark:text-purple-400">
                      <EyeOff className="w-5.5 h-5.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        آفلاین و عاری از تبلیغات
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        آرامش کامل کاربری بدون ردیاب یا تبلیغات پاپ‌آپ
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">
                    میزبانی مستقیم روی پوشه گوگل درایو شخصی (Google Drive Storage)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
