/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ArrowLeft, 
  Smartphone, 
  Cpu, 
  Gamepad2, 
  Download, 
  Code2, 
  TrendingUp, 
  Award, 
  ChevronLeft,
  Users2,
  Tv
} from 'lucide-react';
import { AppItem, AIProject, GameItem, BlogPost } from '../types';

interface HomeViewProps {
  apps: AppItem[];
  aiProjects: AIProject[];
  blogPosts: BlogPost[];
  games: GameItem[];
  onChangeTab: (tab: string) => void;
  onSelectApp: (app: AppItem) => void;
  onSelectGame: (game: GameItem) => void;
  onSelectBlog: (post: BlogPost) => void;
}

export default function HomeView({
  apps,
  aiProjects,
  blogPosts,
  games,
  onChangeTab,
  onSelectApp,
  onSelectGame,
  onSelectBlog
}: HomeViewProps) {
  // Get featured items
  const featuredApps = apps.filter(a => a.isFeatured).slice(0, 2);
  const featuredAI = aiProjects.filter(p => p.isFeatured).slice(0, 2);
  const latestBlogs = blogPosts.slice(0, 2);

  return (
    <div className="space-y-16 py-6 pb-12 animate-fade-in">
      {/* 🚀 Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-850 bg-gradient-to-br from-white via-slate-100 to-slate-50 dark:bg-gradient-to-l dark:from-slate-900 dark:to-slate-950 p-8 sm:p-12 md:p-16 text-center shadow-lg">
        {/* Sleek Interface Decorative elements */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -left-20 top-0 h-full w-96 bg-slate-300/10 dark:bg-slate-800/10 skew-x-12 border-l border-slate-250/30 dark:border-slate-700/30 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-100/80 text-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-300 rounded-full text-xs font-bold border border-cyan-200 dark:border-cyan-900/65 transition-all">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span>راه‌اندازی نسخه جدید پلتفرم آرسام</span>
          </div>

          <h1 className="font-sans font-black text-3.5xl sm:text-4xl md:text-5xl leading-tight text-slate-900 dark:text-white">
            به اکوسیستم نرم‌افزاری <br className="hidden sm:inline"/>
            <span className="text-cyan-600 dark:text-cyan-400">آرسام</span> خوش آمدید
          </h1>

          <p className="text-slate-650 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            محیطی خلاقانه برای ارائه اپلیکیشن‌های نوآورانه اندروید، سرویس‌های بومی‌سازی شده هوش مصنوعی، بازی‌های نوستالژیک ایرانی و دانلود ابزارهای کاربردی متناسب با نیاز جوانان و توسعه‌دهندگان کشور.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <button
              onClick={() => onChangeTab('apps')}
              className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-full shadow-lg shadow-cyan-900/20 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <Smartphone className="w-4 h-4" />
              <span>مشاهده اپلیکیشن‌ها</span>
              <ArrowLeft className="w-4 h-4 mr-1" />
            </button>
            <button
              onClick={() => onChangeTab('ai')}
              className="flex items-center gap-2 px-6 py-3 bg-slate-200 hover:bg-slate-350 text-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-200 font-bold rounded-full border border-slate-300/60 dark:border-slate-800 transition-all cursor-pointer"
            >
              <Cpu className="w-4 h-4" />
              <span>پروژه‌های هوش مصنوعی</span>
            </button>
          </div>
        </div>
      </section>

      {/* 📊 Statistics Counter Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { icon: Users2, count: '۲۵۰,۰۰۰+', label: 'دانلود کل از مارکت‌ها' },
          { icon: Cpu, count: '۳ پروژه', label: 'سیستم هوش مصنوعی بومی' },
          { icon: Gamepad2, count: '۲ بازی داستانی', label: 'افسانه‌های شاهنامه و نوستالژی' },
          { icon: Download, count: '۱,۰۰۰+', label: 'دانلود فعال ابزار توسعه' }
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div 
              key={i} 
              className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white dark:border-slate-800/80 dark:bg-slate-900/60 text-center space-y-2 hover:border-cyan-550/40 dark:hover:border-cyan-500/50 hover:shadow-lg transition-all group"
            >
              <div className="mx-auto flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-cyan-50 text-cyan-600 dark:bg-slate-800 dark:text-cyan-400 group-hover:scale-105 transition-transform shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="font-sans font-black text-xl sm:text-2xl text-slate-100 dark:text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-950 to-slate-800 dark:from-slate-100 dark:to-slate-300">
                {stat.count}
              </div>
              <div className="text-xs text-slate-550 dark:text-slate-400 font-semibold">
                {stat.label}
              </div>
            </div>
          );
        })}
      </section>

      {/* 📱 Featured Applications */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b pb-4 border-zinc-200/85 dark:border-zinc-800/80">
          <div>
            <h2 className="font-sans font-extrabold text-xl sm:text-2xl text-zinc-900 dark:text-white flex items-center gap-2">
              <Smartphone className="w-6 h-6 text-indigo-500" />
              <span>اپلیکیشن‌های برگزیده</span>
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">تولیدات شاخص نرم‌افزاری با استانداردهای بین‌المللی</p>
          </div>
          <button 
            onClick={() => onChangeTab('apps')} 
            className="flex items-center gap-1 text-sm font-semibold text-indigo-600 dark:text-emerald-400 hover:opacity-80 transition"
          >
            <span>نمایش همه</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredApps.map((app) => (
            <div 
              key={app.id}
              className="flex flex-col sm:flex-row gap-5 p-6 rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700/65 transition-all shadow-sm relative group"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-zinc-800 dark:to-zinc-800/50 flex items-center justify-center shrink-0 shadow-inner group-hover:-translate-y-1 transition-transform">
                <span className="text-3xl text-indigo-600 dark:text-emerald-400">⚡</span>
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-sans font-bold text-lg text-zinc-900 dark:text-white">
                    {app.name}
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-full font-mono">
                    v{app.version}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {app.shortDescription}
                </p>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => onSelectApp(app)}
                    className="px-3.5 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 dark:text-emerald-400 text-xs font-bold rounded-lg transition"
                  >
                    جزئیات بیشتر
                  </button>
                  <a
                    href={app.downloadApkUrl}
                    className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-500 to-indigo-500 text-white text-xs font-bold rounded-lg transition hover:opacity-90 flex items-center gap-1.5"
                  >
                    <Download className="w-3 h-3" />
                    دانلود مستقیم
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔮 Featured AI Systems */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b pb-4 border-zinc-200/85 dark:border-zinc-800/80">
          <div>
            <h2 className="font-sans font-extrabold text-xl sm:text-2xl text-zinc-900 dark:text-white flex items-center gap-2">
              <Cpu className="w-6 h-6 text-emerald-500" />
              <span>سامانه‌های هوش مصنوعی</span>
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">مدل‌های شبکه‌های عصبی عمیق کالیبره‌شده برای وب و موبایل</p>
          </div>
          <button 
            onClick={() => onChangeTab('ai')} 
            className="flex items-center gap-1 text-sm font-semibold text-indigo-600 dark:text-emerald-400 hover:opacity-80 transition"
          >
            <span>نمایش همه</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredAI.map((ai) => (
            <div 
              key={ai.id}
              className="border border-zinc-200/80 rounded-2xl bg-white dark:border-zinc-800/85 dark:bg-zinc-900/20 overflow-hidden hover:shadow-lg transition-all flex flex-col group"
            >
              <div className="h-44 overflow-hidden relative">
                <img 
                  src={ai.screenshots[0]} 
                  alt={ai.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-zinc-900/85 text-emerald-400 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider">
                  {ai.status === 'active' ? '● فعال' : ai.status === 'beta' ? '● آزمایشی (بتا)' : '● در حال توسعه'}
                </div>
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-sans font-bold text-base sm:text-lg text-zinc-900 dark:text-white">
                    {ai.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {ai.shortDescription}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800/60 mt-2">
                  <div className="flex flex-wrap gap-1">
                    {ai.tags.slice(0, 2).map((tg, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded">
                        {tg}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => onChangeTab('ai')}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 rounded-lg text-xs font-bold hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 transition-colors"
                  >
                    <span>دسترسی به سیستم</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🖊️ Latest Blog Posts */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b pb-4 border-zinc-200/85 dark:border-zinc-800/80">
          <div>
            <h2 className="font-sans font-extrabold text-xl sm:text-2xl text-zinc-900 dark:text-white flex items-center gap-2">
              <Code2 className="w-6 h-6 text-violet-500" />
              <span>آخرین نوشته‌های فنی</span>
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">آموزش‌ها، لاگ‌های توسعه و اخبار دنیای فناوری</p>
          </div>
          <button 
            onClick={() => onChangeTab('blog')} 
            className="flex items-center gap-1 text-sm font-semibold text-indigo-600 dark:text-emerald-400 hover:opacity-80 transition"
          >
            <span>نمایش همه مقالات</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {latestBlogs.map((post) => (
            <div 
              key={post.id}
              onClick={() => onSelectBlog(post)}
              className="flex gap-4 p-4 rounded-xl border border-zinc-200/50 bg-white dark:border-zinc-800/50 dark:bg-zinc-900/40 hover:border-indigo-200 dark:hover:border-zinc-700 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                <img 
                  src={post.coverImage} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col justify-between py-1 flex-1">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-indigo-600 dark:text-emerald-400 font-bold px-1.5 py-0.5 bg-indigo-50 dark:bg-zinc-800 rounded">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">{post.publishedAt}</span>
                  </div>
                  <h3 className="font-sans font-bold text-sm sm:text-base text-zinc-800 group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {post.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {post.summary}
                  </p>
                </div>
                <div className="text-[11px] text-zinc-400 font-mono">زمان مطالعه: {post.readTime}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 📩 Newsletter CTA Panel */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-8 sm:p-12">
        <div className="relative z-10 max-w-2xl text-right space-y-4">
          <h2 className="font-sans font-black text-xl sm:text-2xl text-slate-950 dark:text-white">
            پیشرفت‌ها و پروژه‌های جدید در صندوق ورودی شما
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            با مشترک شدن در خبرنامه ما، آخرین برنامه‌های توسعه‌یافته، آپدیت مستقیم اپلیکیشن‌های اندروید و تکنیک‌های پیاده‌سازی هوش مصنوعی را قبل از دیگران رایگان دریافت کنید.
          </p>
          <form 
            onSubmit={(e) => { e.preventDefault(); alert('ایمیل شما با موفقیت در خبرنامه ثبت شد!'); }}
            className="flex flex-col sm:flex-row gap-2 max-w-md pt-2"
          >
            <input 
              type="email" 
              required
              placeholder="نشانی ایمیل شما (مثال: email@domain.com)"
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white/70 text-sm dark:border-slate-800 dark:bg-slate-950/70 focus:outline-none focus:ring-2 focus:ring-cyan-500 grow dark:text-slate-200"
              dir="ltr"
            />
            <button 
              type="submit"
              className="px-6 py-2.5 bg-cyan-650 hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white text-xs sm:text-sm font-bold rounded-xl transition shadow-lg shadow-cyan-950/20"
            >
              عضویت در خبرنامه
            </button>
          </form>
        </div>
        <div className="absolute top-1/2 left-8 md:left-16 -translate-y-1/2 hidden md:block text-slate-250 dark:text-slate-800/15 antialiased font-mono font-black text-8xl select-none">
          ARSAM
        </div>
      </section>
    </div>
  );
}
