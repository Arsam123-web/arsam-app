/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Cpu, 
  ArrowLeft, 
  Send, 
  MessageSquare, 
  CornerDownLeft, 
  Sparkles, 
  FileText, 
  Image, 
  Check, 
  Terminal 
} from 'lucide-react';
import { AIProject } from '../types';

interface AIProjectsViewProps {
  aiProjects: AIProject[];
}

export default function AIProjectsView({ aiProjects }: AIProjectsViewProps) {
  const [selectedProject, setSelectedProject] = useState<AIProject | null>(null);
  
  // Interactive Simulator sandbox state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'assistant', text: string, time: string }>>([
    { 
      sender: 'assistant', 
      text: 'سلام! من دستیار هوش مصنوعی بومی «آرا» هستم. برای گفتگو آماده‌ام. چطور می‌توانم در توسعه بازی، برنامه‌نویسی یا ایده‌پردازی برنامه‌های جدید به شما کمک کنم؟', 
      time: 'ساعت ۱۰:۰۵' 
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const mockPredefinedPrompts = [
    'پیشنهاد ایده برای بازی کلمات اندروید',
    'چگونه مدل زبانی را آفلاین کنم؟',
    'فرمول نویسی اوقات شرعی در جاوا'
  ];

  const handleSendResponse = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const currentTimeStr = `ساعت ${new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}`;
    const newMsgs = [...chatMessages, { sender: 'user' as const, text: textToSend, time: currentTimeStr }];
    setChatMessages(newMsgs);
    setUserInput('');
    setIsTyping(true);

    // Simulate AI response stream
    setTimeout(() => {
      let reply = 'در حال حاضر در حال توسعه هستم!';
      const txt = textToSend.toLowerCase();

      if (txt.includes('ایده') || txt.includes('بازی')) {
        reply = `درست است! برای بازی کلمات فارسی اندروید، ایده «کلمه‌ورز» بسیار جذاب است.\n\n### مکانیزم اصلی بازی:\n۱. نمایش یک تصویر تار شده به تدریج که کاربران با حذف مهره‌ها حروف کلمه‌ را حدس می‌زنند.\n۲. گردونه شانس سکه‌های روزانه و فروشگاه فنت لئوت.\n۳. سازگار با ویجت اندروید ۱۴ جهت پیشنهاد معمای روز بر روی صفحه گوشی!`;
      } else if (txt.includes('آفلاین') || txt.includes('مدل')) {
        reply = `برای آفلاین‌سازی مدل‌های زبانی روی اندروید:\n\n۱. استفاده از **ONNX Runtime Mobile** یا کتابخانه **MediaPipe LLM Inference** توصیه می‌شود.\n۲. فرمت‌های وزن باید به **INT4** کوانتیزه شوند تا حجم آن‌ها زیر ۱.۵ گیگابایت بیاید.\n۳. سیستم رالودر لیمیت جهت پیشگیری از خطای Out of Memory در دستگاه‌های دارای ۴ گیگ رم پیاده شود.`;
      } else if (txt.includes('فرمول') || txt.includes('اوقات') || txt.includes('جاوا')) {
        reply = `در توسعه تقویم شمیم، ما از مدل محاسباتی ژئوفیزیک دانشگاه تهران استفاده کردیم. کد محاسباتی جاوا کارهای نجومی به صورت زیر پیاده می‌شود:\n\n\`\`\`java\npublic double calculateSolarDeclination(double julianDay) {\n    double t = (julianDay - 2451545.0) / 36525.0;\n    double l0 = 280.46607 + 36000.7698 * t;\n    return Math.sin(Math.toRadians(l0));\n}\n\`\`\`\n\nهمگام‌سازی کامل با محاسبات لوکال انجام می‌شود!`;
      } else {
        reply = `ممنون از سوال ارزشمند شما در مورد: «${textToSend}».\n\nمن به عنوان بخشی از اکوسیستم هوش مصنوعی آرسام استودیو، در نسخه‌های بعدی مجهز به هسته اختصاصی پردازش کلامی فارسی خواهم شد تا سریع‌ترین تحلیل‌های کدهای برنامه‌نویسی را به شما ارائه دهم.`;
      }

      setChatMessages(prev => [...prev, { sender: 'assistant', text: reply, time: currentTimeStr }]);
      setIsTyping(false);
    }, 1200);
  };

  // 📝 Project Details modal view
  if (selectedProject) {
    return (
      <div className="space-y-8 py-6 pb-12 animate-fade-in text-zinc-900 dark:text-zinc-100">
        <button
          onClick={() => setSelectedProject(null)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 text-xs sm:text-sm font-semibold rounded-xl border border-zinc-200/50 dark:border-zinc-800/80 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 ml-1" />
          <span>بازگشت به هاب هوش مصنوعی</span>
        </button>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start gap-4 justify-between border-b pb-4 border-zinc-200/80 dark:border-zinc-800/80">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 rounded-full text-xs font-semibold mb-2">
                <span>{selectedProject.status === 'active' ? '● نسخه پایدار فعال' : selectedProject.status === 'beta' ? '● نسخه بتا آزمایشی' : '● در حال توسعه'}</span>
              </div>
              <h1 className="font-sans font-black text-2xl sm:text-3xl text-zinc-900 dark:text-white">
                {selectedProject.name}
              </h1>
            </div>
            <a 
              href={selectedProject.accessUrl}
              onClick={(e) => { e.preventDefault(); alert(`شروع اتصال به سرور سیستم ${selectedProject.name} (آزمایشی)`); }}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-indigo-600 hover:opacity-95 text-white text-xs sm:text-sm font-bold rounded-xl transition shadow-md shadow-indigo-600/10"
            >
              اتصال و اجرای آنلاین ابزار
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-4">
              <h2 className="font-sans font-bold text-lg text-zinc-900 dark:text-white">توضیحات و اهداف سیستم</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-450 leading-relaxed font-sans">
                {selectedProject.description}
              </p>
              <div className="space-y-3">
                <h3 className="font-sans font-semibold text-sm text-zinc-800 dark:text-zinc-300">امکانات ویژه:</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-650 dark:text-zinc-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>بهینه‌سازی شده برای فهم کلمات عامیانه زبان فارسی</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>سرعت استنتاج فوق العاده سریع بدون لگ‌های سرورهای بین‌المللی</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>APIهای آماده سازگار برای سیستم‌عامل‌های ویندوز، مک و اندروید</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-sans font-bold text-lg text-zinc-900 dark:text-white">دموی فنی و معماری</h2>
              <div className="aspect-video rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950">
                <img 
                  src={selectedProject.screenshots[0]} 
                  alt={selectedProject.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 py-6 pb-12 animate-fade-in text-zinc-900 dark:text-zinc-150">
      {/* Introduction */}
      <div className="space-y-2">
        <h1 className="font-sans font-black text-2xl sm:text-3xl text-zinc-900 dark:text-white">
          سامانه‌های هوش مصنوعی بومی آرسام
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-3xl leading-relaxed">
          تلفیق یادگیری ماشین و پردازش زبان طبیعی فارسی برای ساخت مدل‌های دیفیوژن تصویرساز، بهینه‌سازی کلام، خلاصه‌سازی و دستیارهای صوتی هوشمند.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* 🤖 List of AI Projects */}
        <div className="space-y-5">
          <h2 className="font-sans font-extrabold text-lg text-zinc-900 dark:text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-500" />
            <span>پروژه‌ها و مدل‌های توسعه یافته</span>
          </h2>

          <div className="space-y-4">
            {aiProjects.map((proj) => (
              <div 
                key={proj.id}
                className="p-5 border border-zinc-200/60 rounded-2xl bg-white hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-900/30 dark:hover:border-zinc-700/60 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-300 rounded font-bold font-mono">
                      {proj.status === 'active' ? '● فعال' : proj.status === 'beta' ? '● بتا' : '● تحقیق و توسعه'}
                    </span>
                    <span className="text-xs text-zinc-400 font-bold">هاب آرسام</span>
                  </div>
                  <h3 className="font-sans font-bold text-base sm:text-lg text-zinc-800 dark:text-zinc-100">
                    {proj.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {proj.shortDescription}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800/65">
                  <div className="flex flex-wrap gap-1">
                    {proj.tags.slice(0, 3).map((tg, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded">
                        {tg}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="px-3.5 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-bold rounded-lg border border-zinc-200 dark:border-zinc-700 transition cursor-pointer"
                  >
                    بررسی معماری و مشخصات کلیدی
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 💬 Beautiful Live Chat Sandbox simulator */}
        <div className="flex flex-col border border-zinc-200/80 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900/30 overflow-hidden shadow-sm h-full max-h-[600px]">
          {/* Top Panel bar */}
          <div className="p-4 bg-zinc-100 border-b border-zinc-200/80 dark:bg-zinc-950 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-pulse" />
              <div className="flex flex-col text-right">
                <span className="font-sans font-extrabold text-xs sm:text-sm text-zinc-900 dark:text-white">دستیار گفتگوی آرا (Ara Assistant)</span>
                <span className="text-[10px] text-zinc-400 font-mono">Simulated Local LLM v2.5</span>
              </div>
            </div>
            <span className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-sans px-2.5 py-1 bg-zinc-200 dark:bg-zinc-900 border border-zinc-300/40 dark:border-zinc-800 rounded-full font-bold">بخش تست هوش مصنوعی</span>
          </div>

          {/* Interactive Messages Stream Area */}
          <div className="p-4 flex-1 overflow-y-auto space-y-4 max-h-[400px] min-h-[300px] scrollbar-thin">
            {chatMessages.map((msg, index) => {
              const isUser = msg.sender === 'user';
              return (
                <div 
                  key={index}
                  className={`flex flex-col max-w-[85%] ${isUser ? 'mr-auto items-end text-left' : 'ml-auto items-start text-right'}`}
                >
                  <div className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isUser 
                      ? 'bg-gradient-to-r from-emerald-500 to-indigo-600 text-white rounded-tl-none font-semibold' 
                      : 'bg-zinc-100 text-zinc-800 border border-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700/50 rounded-tr-none'
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                  <span className="text-[9px] text-zinc-400 font-mono mt-1 px-1.5">{msg.time}</span>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 max-w-[120px] ml-auto">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" />
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce delay-100" />
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce delay-200" />
                <span className="text-[10px] text-zinc-400 font-bold pr-1 font-mono">Ara typing</span>
              </div>
            )}
          </div>

          {/* Prompt Selector & User Inputs */}
          <div className="p-4 border-t border-zinc-100 bg-zinc-100/50 dark:border-zinc-800 dark:bg-zinc-950/20 space-y-3">
            {/* Clickable prompt suggestions */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-zinc-400 block font-bold">پیشنهاد کارهای پربسامد جهت گفتگو:</span>
              <div className="flex flex-wrap gap-1.5">
                {mockPredefinedPrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendResponse(p)}
                    className="text-[10px] px-2.5 py-1 bg-white hover:bg-zinc-100 border border-zinc-200/60 rounded-lg text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 transition text-right cursor-pointer"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendResponse(userInput); }}
              className="flex gap-2 relative"
            >
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="اینجا بنویسید (مثال: چطور برنامه‌‌های آفلاین بسازم؟)"
                className="w-full pr-4 pl-12 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-900 dark:text-zinc-250"
              />
              <button
                type="submit"
                disabled={isTyping}
                className="absolute left-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition disabled:opacity-40 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
