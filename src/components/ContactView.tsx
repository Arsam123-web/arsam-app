/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  MessageSquare,
  Facebook,
  Instagram,
  Twitter
} from 'lucide-react';
import { ContactMessage } from '../types';

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      // Build a message object
      const messageObj: ContactMessage = {
        id: `msg-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        createdAt: new Date().toLocaleDateString('fa-IR'),
        status: 'unread'
      };

      // Push message into localstorage array to let our Admin Panel view it in real time
      const existingStr = localStorage.getItem('arsam_messages');
      const currentMsgs: ContactMessage[] = existingStr ? JSON.parse(existingStr) : [];
      localStorage.setItem('arsam_messages', JSON.stringify([messageObj, ...currentMsgs]));

      setIsLoading(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Automatically dismiss the success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1200);
  };

  return (
    <div className="space-y-12 py-6 pb-12 animate-fade-in text-zinc-900 dark:text-zinc-100">
      <div className="space-y-2">
        <h1 className="font-sans font-black text-2xl sm:text-3xl text-zinc-900 dark:text-white">
          ارتباط با استودیوی آرسام
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          انتقادات، پیشنهادات، ایده برای همکاری در پروژه‌های هوش مصنوعی یا استخدام خود را برای ما ارسال کنید.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-2">
        
        {/* 📱 Contact details panels */}
        <div className="lg:col-span-1 space-y-4">
          <div className="p-6 rounded-2xl border border-zinc-200/50 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/30 space-y-6">
            <h2 className="font-sans font-extrabold text-sm sm:text-base text-zinc-900 dark:text-white border-b pb-3 border-zinc-100 dark:border-zinc-800">
              اطلاعات تماس رسمی
            </h2>

            <div className="space-y-4 text-xs sm:text-sm font-sans flex flex-col justify-start">
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-zinc-800 flex items-center justify-center text-indigo-600 dark:text-emerald-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-right">
                  <span className="text-zinc-400 block text-[10px]">نشانی ایمیل مدیریت</span>
                  <a href="mailto:paintparastoo@gmail.com" className="font-mono hover:underline font-semibold text-zinc-700 dark:text-zinc-300">
                    paintparastoo@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-zinc-800 flex items-center justify-center text-indigo-600 dark:text-emerald-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-right">
                  <span className="text-zinc-400 block text-[10px]">تماس با روابط عمومی</span>
                  <span className="font-mono font-semibold text-zinc-750 dark:text-zinc-300">
                    ۰۲۱-۷۶۲۵۰۰۰۰
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-zinc-800 flex items-center justify-center text-indigo-600 dark:text-emerald-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-right leading-snug">
                  <span className="text-zinc-400 block text-[10px]">استفاده از جی‌پی‌اس</span>
                  <span className="text-zinc-750 dark:text-zinc-300 font-bold block">
                    پارک فناوری پردیس، مرکز آرسام.
                  </span>
                </div>
              </div>
            </div>

            {/* Social handles */}
            <div className="pt-2 border-t border-zinc-150/50 dark:border-zinc-800 space-y-2">
              <span className="text-xs text-zinc-400 block font-semibold">پروفایل‌های رسمی ما در وب:</span>
              <div className="flex items-center gap-2">
                {['تلگرام', 'اینستاگرام', 'گیت‌هاب', 'یوتوب'].map((scl) => (
                  <span key={scl} className="text-[10px] px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 rounded-md text-zinc-650 cursor-pointer font-semibold">
                    {scl}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 📩 Farsi dispatch message form */}
        <div className="lg:col-span-2">
          <div className="p-6 rounded-2xl border border-zinc-200/50 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/30">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Notification Banner alerts */}
              {isSuccess && (
                <div className="p-4 rounded-xl bg-emerald-500/10 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 flex items-center gap-2 text-xs sm:text-sm font-semibold mb-2" id="contact-success-notification">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>پیام شما با موفقیت ثبت شد! می‌توانید آن را در بخش پیام‌های پنل مدیریت آرسام استودیو مشاهده نمایید.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="contact-name" className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold block">نام و نام خانوادگی شما:</label>
                  <input
                    type="text"
                    id="contact-name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="مثال: پرهام اکبری"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-550 focus:border-transparent dark:bg-zinc-900 dark:text-zinc-250"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="contact-email" className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold block">نشانی ایمیل ارتباطی:</label>
                  <input
                    type="email"
                    id="contact-email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="مثال: custom@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-550 focus:border-transparent dark:bg-zinc-900 dark:text-zinc-250"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="contact-subject" className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold block">موضوع پیام شما:</label>
                <input
                  type="text"
                  id="contact-subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="مثال: پیشنهاد همکاری در توسعه مدل‌های هوش مصنوعی بومی"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-550 focus:border-transparent dark:bg-zinc-900 dark:text-zinc-250"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="contact-message" className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold block">شرح کامل پیام:</label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="متن پیام خود را اینجا تایپ کنید..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-550 focus:border-transparent dark:bg-zinc-900 dark:text-zinc-250"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-indigo-650 hover:opacity-95 text-white font-bold rounded-xl transition shadow-lg shadow-indigo-600/15 disabled:opacity-50 text-xs sm:text-sm cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-zinc-350 animate-ping" />
                    <span>در حال ارسال پیام...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>ارسال پیام مستقیم برای مدیریت آرسام</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
