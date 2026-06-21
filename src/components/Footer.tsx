import React from 'react';
import { Smartphone, Mail, Globe, Github, ShieldAlert } from 'lucide-react';
import { ViewType } from '../types';

interface FooterProps {
  setCurrentView: (view: ViewType) => void;
  setSelectedAppId: (id: string | null) => void;
}

export default function Footer({ setCurrentView, setSelectedAppId }: FooterProps) {
  const navigateTo = (view: ViewType) => {
    setCurrentView(view);
    setSelectedAppId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 dark:bg-slate-950 border-t border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Main info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center cursor-pointer" onClick={() => navigateTo('home')}>
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-600 to-indigo-500 text-white ml-2">
                <Smartphone className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white">استودیو نرم‌افزاری آرسام</span>
            </div>
            <p className="text-sm dark:text-slate-400 text-slate-300 leading-relaxed text-slate-400/90 max-w-md">
              آرسام استودیو، به عنوان یک مرکز توسعه مستقل نرم‌افزارهای اندرویدی، همواره در تلاش است تا با طراحی رابط‌های کاربری چشم‌نواز، بهینه‌سازی کدهای فرانت‌اند و ارائه امکانات کاربردی و کاملاً آفلاین، گام موثری در راحتی کاربران فارسی‌زبان بردارد.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wider">دسترسی سریع</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-primary-400 transition-colors text-right"
                >
                  صفحه اصلی
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('apps')}
                  className="hover:text-primary-400 transition-colors text-right"
                >
                  تمام اپلیکیشن‌ها
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('admin')}
                  className="hover:text-indigo-400 transition-colors text-right"
                >
                  پنل مدیریت
                </button>
              </li>
            </ul>
          </div>

          {/* Contact/Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wider">تماس و پشتیبانی</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="font-mono text-xs">support@arsamstudio.example.ir</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0" />
                <span>برنامه‌های امن و تایید شده آنتی‌ویروس</span>
              </li>
            </ul>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://github.com/paintparastoo"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                title="گیت‌هاب"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                title="سایت تفصیلی"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center sm:text-right">
            © {new Date().getFullYear()} استودیو آرسام. کلیه حقوق مادی و معنوی برای توسعه‌دهنده محفوظ است.
          </p>
          <p className="font-mono text-center sm:text-left text-[11px] opacity-80">
            Designed for secure Google Drive distribution. Fast & RTL Native.
          </p>
        </div>
      </div>
    </footer>
  );
}
