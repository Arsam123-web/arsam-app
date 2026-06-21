/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Layers, 
  Smartphone, 
  Cpu, 
  Gamepad2, 
  Download, 
  BookOpen, 
  Trash2, 
  Plus, 
  Edit2, 
  Mail, 
  Check, 
  X,
  FileCheck2,
  FileCode,
  Image,
  PieChart,
  UserCheck2
} from 'lucide-react';
import { AppItem, AIProject, GameItem, DownloadFile, BlogPost, ContactMessage } from '../types';

interface AdminPanelProps {
  apps: AppItem[];
  aiProjects: AIProject[];
  games: GameItem[];
  downloads: DownloadFile[];
  blogPosts: BlogPost[];
  
  onUpdateApps: (apps: AppItem[]) => void;
  onUpdateAI: (ai: AIProject[]) => void;
  onUpdateGames: (games: GameItem[]) => void;
  onUpdateDownloads: (dl: DownloadFile[]) => void;
  onUpdateBlogs: (blog: BlogPost[]) => void;
}

type AdminTab = 'overview' | 'apps' | 'ai' | 'games' | 'downloads' | 'blogs' | 'messages';

export default function AdminPanel({
  apps,
  aiProjects,
  games,
  downloads,
  blogPosts,
  onUpdateApps,
  onUpdateAI,
  onUpdateGames,
  onUpdateDownloads,
  onUpdateBlogs
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  // Form edit states
  const [editingAppId, setEditingAppId] = useState<string | null>(null);
  const [appForm, setAppForm] = useState<Partial<AppItem>>({
    name: '', englishName: '', shortDescription: '', description: '', version: '', size: '', Category: 'ابزارها' as any
  } as any);

  const [editingAIId, setEditingAIId] = useState<string | null>(null);
  const [aiForm, setAIForm] = useState<Partial<AIProject>>({
    name: '', shortDescription: '', description: '', accessUrl: '', tags: [], status: 'active', isFeatured: false
  });

  const [editingGameId, setEditingGameId] = useState<string | null>(null);
  const [gameForm, setGameForm] = useState<Partial<GameItem>>({
    name: '', shortDescription: '', description: '', version: '', size: '', tags: []
  });

  const [editingDlId, setEditingDlId] = useState<string | null>(null);
  const [dlForm, setDlForm] = useState<Partial<DownloadFile>>({
    title: '', description: '', version: '', size: '', fileType: 'ZIP', category: 'ابزار توسعه'
  });

  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState<Partial<BlogPost>>({
    title: '', summary: '', content: '', category: 'توسعه اندروید', coverImage: '', tags: []
  });

  // Load localstorage messages
  useEffect(() => {
    const existingStr = localStorage.getItem('arsam_messages');
    if (existingStr) {
      setMessages(JSON.parse(existingStr));
    } else {
      // Seed initial mock message
      const seed: ContactMessage[] = [
        {
          id: 'msg-seed-1',
          name: 'امیرحسین رضایی',
          email: 'amir@example.com',
          subject: 'درخواست همکاری در برنامه‌نویسی اندروید',
          message: 'سلام جناب آرسام، من کارهای شما در تقویم شمیم را بررسی کردم. بسیار پکیج راست‌چین کارآمدی بود. تمایل به همکاری دورکاری در بازی جدید نبرد کتیبه‌ها دارم.',
          createdAt: '۱۴۰۵/۰۳/۱۸',
          status: 'unread'
        }
      ];
      localStorage.setItem('arsam_messages', JSON.stringify(seed));
      setMessages(seed);
    }
  }, [activeTab]);

  const handleDeleteMessage = (id: string) => {
    const fresh = messages.filter(m => m.id !== id);
    localStorage.setItem('arsam_messages', JSON.stringify(fresh));
    setMessages(fresh);
  };

  const handleToggleMessageRead = (id: string) => {
    const fresh = messages.map(m => m.id === id ? { ...m, status: (m.status === 'read' ? 'unread' : 'read') as any } : m);
    localStorage.setItem('arsam_messages', JSON.stringify(fresh));
    setMessages(fresh);
  };

  // --- CRUD APPS ---
  const handleSaveApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAppId) {
      // Update
      const updated = apps.map(app => app.id === editingAppId ? { 
        ...app, 
        name: appForm.name!,
        englishName: appForm.englishName!,
        shortDescription: appForm.shortDescription!,
        description: appForm.description!,
        version: appForm.version!,
        size: appForm.size!,
        category: appForm.category || 'ابزارها'
      } : app);
      onUpdateApps(updated);
      setEditingAppId(null);
    } else {
      // Add
      const newApp: AppItem = {
        id: `app-${Date.now()}`,
        name: appForm.name || 'برنامه جدید آرسام',
        englishName: appForm.englishName || 'ArsamApp',
        shortDescription: appForm.shortDescription || 'توضیح کوتاه برنامه.',
        description: appForm.description || 'توضیحات تکمیلی برنامه.',
        version: appForm.version || '1.0.0',
        size: appForm.size || '15 MB',
        icon: 'Smartphone',
        downloadApkUrl: '#dl-apk',
        downloadAabUrl: '#dl-aab',
        screenshots: [
          'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80'
        ],
        features: ['امکان همگام‌سازی ابری سریع اطلاعات و ذخیره ایمن فایل‌ها', 'رندرینگ راست‌چین فارسی صوتی'],
        changelog: [{ version: appForm.version || '1.0.0', date: '۱۴۰۵/۰۳/۲۰', changes: ['انتشار اولیه در هاب آرسام'] }],
        faqs: [{ question: 'آیا این ابزار کاملاً رایگان است؟', answer: 'بله نسخه پایه بصورت متن باز در دسترس است.' }],
        category: appForm.category || 'ابزارها',
        downloadsCount: 150,
        rating: 4.8,
        isFeatured: true,
        updatedAt: '۱۴۰۵/۰۳/۲۰'
      };
      onUpdateApps([newApp, ...apps]);
    }
    // Reset form
    setAppForm({ name: '', englishName: '', shortDescription: '', description: '', version: '', size: '', category: 'ابزارها' });
    alert('اطلاعات اپلیکیشن با موفقیت ثبت شد!');
  };

  const handleDeleteApp = (id: string) => {
    if (window.confirm('آیا از حذف این اپلیکیشن اطمینان دارید؟')) {
      const filtered = apps.filter(app => app.id !== id);
      onUpdateApps(filtered);
    }
  };

  const handleEditAppClick = (app: AppItem) => {
    setEditingAppId(app.id);
    setAppForm(app);
  };

  // --- CRUD AI ---
  const handleSaveAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAIId) {
      const updated = aiProjects.map(ai => ai.id === editingAIId ? {
        ...ai,
        name: aiForm.name!,
        shortDescription: aiForm.shortDescription!,
        description: aiForm.description!,
        accessUrl: aiForm.accessUrl!,
        status: aiForm.status || 'active'
      } : ai);
      onUpdateAI(updated);
      setEditingAIId(null);
    } else {
      const newAI: AIProject = {
        id: `ai-${Date.now()}`,
        name: aiForm.name || 'مدل هوش مصنوعی جدید',
        shortDescription: aiForm.shortDescription || 'توضیحات کوتاه مدل بومی.',
        description: aiForm.description || 'توضیحات کامل یادگیری عمیق سیستم.',
        accessUrl: aiForm.accessUrl || '#ai-access',
        icon: 'Cpu',
        screenshots: ['https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=800&q=80'],
        tags: ['مدل بومی', 'هوش مصنوعی'],
        status: aiForm.status || 'active',
        isFeatured: true
      };
      onUpdateAI([newAI, ...aiProjects]);
    }
    setAIForm({ name: '', shortDescription: '', description: '', accessUrl: '', tags: [], status: 'active' });
    alert('اطلاعات سیستم هوش مصنوعی ذخیره شد!');
  };

  const handleDeleteAI = (id: string) => {
    if (window.confirm('آیا مایل به حذف این مدل هستید؟')) {
      onUpdateAI(aiProjects.filter(a => a.id !== id));
    }
  };

  // --- CRUD GAMES ---
  const handleSaveGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGameId) {
      const updated = games.map(g => g.id === editingGameId ? {
        ...g,
        name: gameForm.name!,
        shortDescription: gameForm.shortDescription!,
        description: gameForm.description!,
        version: gameForm.version!,
        size: gameForm.size!
      } : g);
      onUpdateGames(updated);
      setEditingGameId(null);
    } else {
      const newGame: GameItem = {
        id: `game-${Date.now()}`,
        name: gameForm.name || 'بازی بومی جدید',
        shortDescription: gameForm.shortDescription || 'توضیح کوتاه بازی.',
        description: gameForm.description || 'توضیح کامل سناریو.',
        version: gameForm.version || '1.0.0',
        size: gameForm.size || '75 MB',
        icon: 'Gamepad2',
        screenshots: ['https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80'],
        downloadUrl: '#game-dl',
        features: ['گیم‌پلی روان'],
        tags: ['تفننی'],
        downloadsCount: 120,
        rating: 4.8
      };
      onUpdateGames([newGame, ...games]);
    }
    setGameForm({ name: '', shortDescription: '', description: '', version: '', size: '' });
    alert('اطلاعات بازی ذخیره شد!');
  };

  const handleDeleteGame = (id: string) => {
    if (window.confirm('آیا مایل به حذف این بازی هستید؟')) {
      onUpdateGames(games.filter(g => g.id !== id));
    }
  };

  // --- CRUD DOWNLOADS ---
  const handleSaveDl = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDlId) {
      const updated = downloads.map(d => d.id === editingDlId ? {
        ...d,
        title: dlForm.title!,
        description: dlForm.description!,
        version: dlForm.version!,
        size: dlForm.size!,
        fileType: dlForm.fileType!,
        category: dlForm.category!
      } : d);
      onUpdateDownloads(updated);
      setEditingDlId(null);
    } else {
      const newDl: DownloadFile = {
        id: `dl-${Date.now()}`,
        title: dlForm.title || 'فایل توسعه جدید',
        description: dlForm.description || 'توضیحات کوتاه ابزار توسعه.',
        version: dlForm.version || '1.0',
        size: dlForm.size || '10 MB',
        fileType: dlForm.fileType || 'ZIP',
        downloadUrl: '#dl-link',
        downloadsCount: 1,
        updatedAt: '۱۴۰۵/۰۳/۲۰',
        category: dlForm.category || 'ابزار توسعه'
      };
      onUpdateDownloads([newDl, ...downloads]);
    }
    setDlForm({ title: '', description: '', version: '', size: '', fileType: 'ZIP', category: 'ابزار توسعه' });
    alert('اطلاعات فایل دانلود ذخیره گردید!');
  };

  const handleDeleteDl = (id: string) => {
    if (window.confirm('حذف این پکیج تایید شود؟')) {
      onUpdateDownloads(downloads.filter(d => d.id !== id));
    }
  };

  // --- CRUD BLOG ---
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBlogId) {
      const updated = blogPosts.map(b => b.id === editingBlogId ? {
        ...b,
        title: blogForm.title!,
        summary: blogForm.summary!,
        content: blogForm.content!,
        category: blogForm.category!
      } : b);
      onUpdateBlogs(updated);
      setEditingBlogId(null);
    } else {
      const newBlog: BlogPost = {
        id: `blog-${Date.now()}`,
        title: blogForm.title || 'عنوان پست آموزشی جدید',
        summary: blogForm.summary || 'خلاصه مقاله جدید آرسام استودیو.',
        content: blogForm.content || 'محتوای متنی بلاگ فناوری.',
        author: 'آرسام',
        publishedAt: '۱۴۰۵/۰۳/۲۰',
        readTime: '۵ دقیقه',
        coverImage: blogForm.coverImage || 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
        category: blogForm.category || 'توسعه اندروید',
        tags: ['فناوری']
      };
      onUpdateBlogs([newBlog, ...blogPosts]);
    }
    setBlogForm({ title: '', summary: '', content: '', category: 'توسعه اندروید', coverImage: '' });
    alert('مقاله با موفقیت منتشر شد!');
  };

  const handleDeleteBlog = (id: string) => {
    if (window.confirm('حذف پست مجله تایید شود؟')) {
      onUpdateBlogs(blogPosts.filter(b => b.id !== id));
    }
  };

  return (
    <div className="space-y-8 py-6 pb-12 animate-fade-in text-zinc-900 dark:text-zinc-100">
      
      {/* Upper Meta panel */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b pb-4 border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-600 rounded-xl text-white">
            <Lock className="w-6 h-6" />
          </div>
          <div className="text-right">
            <h1 className="font-sans font-black text-2xl text-zinc-900 dark:text-white">
              پنل مدیریت پروژه آرسام استودیو
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              ویرایشگر مرکزی اضافه کردن، آپلود شبیه‌سازهای مستقیم، مانیتور پیام‌های دریافتی کاربران و تنظیم مقالات.
            </p>
          </div>
        </div>

        {/* User Identity tag inside page margins */}
        <span className="text-xs px-3.5 py-1.5 bg-emerald-500/10 text-emerald-700 dark:bg-emerald-550/20 dark:text-emerald-400 border border-emerald-500/15 rounded-xl font-semibold flex items-center gap-1.5">
          <UserCheck2 className="w-4 h-4" />
          <span>ادمین فعال: paintparastoo@gmail.com</span>
        </span>
      </div>

      {/* Control Tabs Selector rail */}
      <div className="bg-zinc-100 p-1.5 rounded-2xl dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/85 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-1">
        {[
          { id: 'overview', label: 'نمای کلی', icon: PieChart },
          { id: 'apps', label: 'اپلیکیشن‌ها', icon: Smartphone },
          { id: 'ai', label: 'هوش مصنوعی', icon: Cpu },
          { id: 'games', label: 'مدیریت بازی', icon: Gamepad2 },
          { id: 'downloads', label: 'دانلودها', icon: Download },
          { id: 'blogs', label: 'وبلاگ', icon: BookOpen },
          { id: 'messages', label: 'پیام‌ها', icon: Mail, badge: messages.filter(m=>m.status==='unread').length }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                // Reset editing states
                setEditingAppId(null);
                setEditingAIId(null);
                setEditingGameId(null);
                setEditingDlId(null);
                setEditingBlogId(null);
              }}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer relative ${
                isActive
                  ? 'bg-zinc-900 text-white dark:bg-indigo-600'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">{tab.label}</span>
              {!!tab.badge && (
                <span className="absolute -top-1 -left-1 w-5 h-5 bg-rose-500 text-white font-sans text-[10px] flex items-center justify-center rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 📊 Tab 1: Overview Panel */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-fade-in" id="admin-overview">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'کل اپ‌های اندروید', value: apps.length, color: 'text-indigo-600 border-indigo-500/20 bg-indigo-500/5' },
              { label: 'سیستم‌های هوش مصنوعی', value: aiProjects.length, color: 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5' },
              { label: 'کل بازی‌ها', value: games.length, color: 'text-amber-500 border-amber-500/20 bg-amber-500/5' },
              { label: 'نوشته‌های وبلاگی', value: blogPosts.length, color: 'text-violet-500 border-violet-500/20 bg-violet-500/5' }
            ].map((stat, i) => (
              <div key={i} className={`p-5 rounded-2xl border ${stat.color} text-center space-y-1`}>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-sans block">{stat.label}</span>
                <strong className="font-sans font-black text-2xl tracking-tight block">{stat.value} قلم</strong>
              </div>
            ))}
          </div>

          {/* Quick actions box */}
          <div className="p-6 rounded-2xl bg-zinc-100/50 border border-zinc-200 dark:bg-zinc-900/40 dark:border-zinc-800/80 text-right space-y-4">
            <h3 className="font-sans font-extrabold text-base text-zinc-900 dark:text-white">میانبرهای طلایی آپلود سریع</h3>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
              شما می‌توانید از زبانه فوقانی جهت ویرایش و ثبت اطلاعات و آپلود عکس‌ها استفاده کنید. داده‌ها بلادرنگ به صورت لوکال در حافظه مرورگر ذخیره شده و فیلترها بلافاصله در وب‌سایت اعمال می‌شوند تا پیش نمایش دقیقی به شما تحویل داده شود.
            </p>
          </div>
        </div>
      )}

      {/* 📱 Tab 2: Apps CRUD forms */}
      {activeTab === 'apps' && (
        <div className="space-y-8 animate-fade-in" id="admin-apps-crud">
          <div className="p-6 rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/30">
            <h2 className="font-sans font-extrabold text-base sm:text-lg text-zinc-900 dark:text-white mb-4">
              {editingAppId ? 'ویرایش مشخصات برنامه' : 'ثبت اپلیکیشن اندروید جدید'}
            </h2>
            <form onSubmit={handleSaveApp} className="space-y-4 font-sans text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 font-semibold block">نام برنامه (فارسی):</label>
                  <input
                    type="text"
                    required
                    value={appForm.name || ''}
                    onChange={(e) => setAppForm({ ...appForm, name: e.target.value })}
                    placeholder="مثال: آریاگرام"
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-550"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 font-semibold block">نام انگلیسی برنامه:</label>
                  <input
                    type="text"
                    required
                    value={appForm.englishName || ''}
                    onChange={(e) => setAppForm({ ...appForm, englishName: e.target.value })}
                    placeholder="مثال: Ariagram"
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-550 mr-1"
                    dir="ltr"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 font-semibold block">دسته بندی موضوعی:</label>
                  <select
                    value={appForm.category || 'ابزارها'}
                    onChange={(e) => setAppForm({ ...appForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-550"
                  >
                    <option value="پیام‌رسان">پیام‌رسان</option>
                    <option value="ابزارها">ابزارها</option>
                    <option value="سفر و مرجع">سفر و مرجع</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 font-semibold block">نسخه انتشار:</label>
                  <input
                    type="text"
                    required
                    value={appForm.version || ''}
                    onChange={(e) => setAppForm({ ...appForm, version: e.target.value })}
                    placeholder="مثال: 5.2.0"
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border dark:border-zinc-800 rounded-lg"
                    dir="ltr"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 font-semibold block">حجم فایل فیزیکی اندروید:</label>
                  <input
                    type="text"
                    required
                    value={appForm.size || ''}
                    onChange={(e) => setAppForm({ ...appForm, size: e.target.value })}
                    placeholder="مثال: 45.2 MB"
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border dark:border-zinc-800 rounded-lg"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-400 font-semibold block">توضیح کوتاه برنامه (کارت‌ها):</label>
                <input
                  type="text"
                  required
                  value={appForm.shortDescription || ''}
                  onChange={(e) => setAppForm({ ...appForm, shortDescription: e.target.value })}
                  placeholder="توضیحی حداکثر در یک خط برای کارت برنامه بنویسید..."
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border dark:border-zinc-800 rounded-lg"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-400 font-semibold block">شرح تفصیلی برنامه (بخش جزئیات):</label>
                <textarea
                  required
                  rows={3}
                  value={appForm.description || ''}
                  onChange={(e) => setAppForm({ ...appForm, description: e.target.value })}
                  placeholder="توضیحات کامل در خصوص ویژگی‌ها، فواید و چگونگی کارکرد سیستم بنویسید..."
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border dark:border-zinc-800 rounded-lg"
                />
              </div>

              {/* Simulated APK & screenshots uploads layout */}
              <div className="p-4 rounded-xl bg-zinc-100/50 dark:bg-zinc-950/80 border dark:border-zinc-805 text-xs sm:text-sm space-y-3">
                <h4 className="font-sans font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-emerald-500" />
                  <span>آپلودر شبیه‌ساز فایل APK و تصاویر</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 border border-dashed rounded-lg text-center cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-900 transition flex flex-col items-center justify-center gap-1">
                    <Smartphone className="w-6 h-6 text-indigo-500" />
                    <span>آپلود فایل نصبی برنامه (.apk)</span>
                    <span className="text-[10px] text-zinc-400 font-mono">Simulated APK Loader</span>
                  </div>
                  <div className="p-3 border border-dashed rounded-lg text-center cursor-pointer hover:bg-zinc-200/50 dark:hover:bg-zinc-900 transition flex flex-col items-center justify-center gap-1">
                    <Image className="w-6 h-6 text-emerald-500" />
                    <span>آپلود اسکرین‌شات‌ها (حداکثر ۳ تصویر)</span>
                    <span className="text-[10px] text-zinc-400 font-mono">PNG or WGBA format</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                {editingAppId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingAppId(null);
                      setAppForm({ name: '', englishName: '', shortDescription: '', description: '', version: '', size: '', category: 'ابزارها' });
                    }}
                    className="px-4 py-2 bg-zinc-200 text-zinc-800 rounded-lg text-xs"
                  >
                    انصراف
                  </button>
                )}
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-indigo-600 text-white font-bold rounded-xl text-xs sm:text-sm"
                >
                  {editingAppId ? 'به‌روزرسانی اپلیکیشن' : 'انتشار عمومی اپلیکیشن در پلتفرم'}
                </button>
              </div>
            </form>
          </div>

          {/* List of current apps with update delete links */}
          <div className="space-y-3">
            <h3 className="font-sans font-black text-sm text-zinc-500 tracking-wider uppercase">اپ‌های فعلی پلتفرم</h3>
            
            <div className="grid grid-cols-1 gap-2">
              {apps.map(app => (
                <div key={app.id} className="flex justify-between items-center bg-white dark:bg-zinc-900/30 p-4 rounded-xl border border-zinc-250/50 dark:border-zinc-800">
                  <div className="text-right">
                    <strong className="font-sans font-bold text-sm text-zinc-800 dark:text-zinc-150 block">{app.name}</strong>
                    <span className="text-xs text-zinc-400 font-mono">v{app.version} | حجم: {app.size}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleEditAppClick(app)}
                      className="p-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 text-indigo-500 dark:text-emerald-400 rounded-lg text-xs"
                      title="ویرایش برنامه"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteApp(app.id)}
                      className="p-2 bg-rose-50 hover:bg-rose-100 dark:bg-zinc-800 text-rose-500 rounded-lg text-xs"
                      title="حذف برنامه"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 🔮 Tab 3: AI Projects Manager */}
      {activeTab === 'ai' && (
        <div className="space-y-6 animate-fade-in" id="admin-ai-crud">
          <div className="p-6 rounded-2xl border border-zinc-200 bg-white dark:border-zinc-805/85 dark:bg-zinc-900/30">
            <h2 className="font-sans font-black text-base sm:text-lg mb-4">آپلود و مدیریت پروژه‌های هوش مصنوعی</h2>
            <form onSubmit={handleSaveAI} className="space-y-4 font-sans text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 font-semibold block">عنوان پروژه یادگیری عمیق:</label>
                  <input
                    type="text"
                    required
                    value={aiForm.name || ''}
                    onChange={(e) => setAIForm({ ...aiForm, name: e.target.value })}
                    placeholder="مثال: نویسا - هوش مصنوعی صوتی"
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border dark:border-zinc-800 rounded-lg"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 font-semibold block">وضعیت توسعه سیستم:</label>
                  <select
                    value={aiForm.status || 'active'}
                    onChange={(e) => setAIForm({ ...aiForm, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border dark:border-zinc-800 rounded-lg"
                  >
                    <option value="active">فعال (پایدار)</option>
                    <option value="beta">آزمایشی (بتا)</option>
                    <option value="development">در حال طراحی</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-400 font-semibold block">توضیح فشرده:</label>
                <input
                  type="text"
                  required
                  value={aiForm.shortDescription || ''}
                  onChange={(e) => setAIForm({ ...aiForm, shortDescription: e.target.value })}
                  placeholder="کاربردهای کلیدی روی پردازش کلمات..."
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border dark:border-zinc-800 rounded-lg"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-400 font-semibold block">لینک یا مسیر شبیه‌ساز دسترسی برخط:</label>
                <input
                  type="text"
                  required
                  value={aiForm.accessUrl || ''}
                  onChange={(e) => setAIForm({ ...aiForm, accessUrl: e.target.value })}
                  placeholder="مثال: #ai-nevisa"
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border dark:border-zinc-800 rounded-lg"
                  dir="ltr"
                />
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-indigo-600 text-white font-bold rounded-xl text-xs"
                >
                  ذخیره پروژه هوش مصنوعی
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-2">
            {aiProjects.map(ai => (
              <div key={ai.id} className="flex justify-between items-center bg-white dark:bg-zinc-900/30 p-4 rounded-xl border border-zinc-250/50 dark:border-zinc-800">
                <div className="text-right">
                  <strong className="font-sans font-bold text-sm text-zinc-850 dark:text-zinc-100 block">{ai.name}</strong>
                  <span className="text-xs text-zinc-400">وضعیت: {ai.status === 'active' ? 'فعال' : 'بتا / تست'}</span>
                </div>
                <button
                  onClick={() => handleDeleteAI(ai.id)}
                  className="p-2 bg-rose-50 hover:bg-rose-100 dark:bg-zinc-800 text-rose-500 rounded-lg text-xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 🎮 Tab 4: Games Manager */}
      {activeTab === 'games' && (
        <div className="space-y-6 animate-fade-in" id="admin-games-crud">
          <div className="p-6 rounded-2xl border border-zinc-200 bg-white dark:border-zinc-805/85 dark:bg-zinc-900/30">
            <h2 className="font-sans font-black text-base mb-4">آپلود و مدیریت بازی‌های موبایلی</h2>
            <form onSubmit={handleSaveGame} className="space-y-4 font-sans text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 font-semibold block">نام بازی:</label>
                  <input
                    type="text"
                    required
                    value={gameForm.name || ''}
                    onChange={(e) => setGameForm({ ...gameForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border dark:border-zinc-800 rounded-lg"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 font-semibold block">حجم فایل بازی:</label>
                  <input
                    type="text"
                    required
                    value={gameForm.size || ''}
                    onChange={(e) => setGameForm({ ...gameForm, size: e.target.value })}
                    placeholder="مثال: 120 MB"
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border dark:border-zinc-800 rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-400 font-semibold block">شرح تفصیلی گیم‌پلی:</label>
                <textarea
                  required
                  rows={2}
                  value={gameForm.description || ''}
                  onChange={(e) => setGameForm({ ...gameForm, description: e.target.value })}
                  placeholder="درباره سناریوی بازی توضیح دهید..."
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border dark:border-zinc-800 rounded-lg"
                />
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-indigo-650 text-white font-bold rounded-xl text-xs"
                >
                  ذخیره اطلاعات بازی
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-2">
            {games.map(game => (
              <div key={game.id} className="flex justify-between items-center bg-white dark:bg-zinc-900/30 p-4 rounded-xl border border-zinc-250/50 dark:border-zinc-800">
                <span className="font-sans font-bold text-sm text-zinc-800 dark:text-zinc-100">{game.name}</span>
                <button
                  onClick={() => handleDeleteGame(game.id)}
                  className="p-2 bg-rose-50 hover:bg-rose-100 dark:bg-zinc-800 text-rose-500 rounded-lg text-xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 📥 Tab 5: Downloads Manager */}
      {activeTab === 'downloads' && (
        <div className="space-y-6 animate-fade-in" id="admin-downloads-crud">
          <div className="p-6 rounded-2xl border border-zinc-200 bg-white dark:border-zinc-805/85 dark:bg-zinc-900/30">
            <h2 className="font-sans font-black text-base mb-4">مدیریت فایل‌ها و کتابخانه‌های توسعه</h2>
            <form onSubmit={handleSaveDl} className="space-y-4 font-sans text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 font-semibold block">عنوان بسته دانلود:</label>
                  <input
                    type="text"
                    required
                    value={dlForm.title || ''}
                    onChange={(e) => setDlForm({ ...dlForm, title: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border dark:border-zinc-800 rounded-lg"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 font-semibold block">دسته بندی ابزار فیزیکی:</label>
                  <select
                    value={dlForm.category || 'ابزار توسعه'}
                    onChange={(e) => setDlForm({ ...dlForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border dark:border-zinc-800 rounded-lg"
                  >
                    <option value="ابزار توسعه">ابزار توسعه</option>
                    <option value="بازی‌سازی">بازی‌سازی</option>
                    <option value="گرافیک">گرافیک</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 font-semibold block">حجم:</label>
                  <input
                    type="text"
                    required
                    value={dlForm.size || ''}
                    onChange={(e) => setDlForm({ ...dlForm, size: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border dark:border-zinc-800 rounded-lg"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 font-semibold block">پسوند فایل فیزیکی:</label>
                  <input
                    type="text"
                    required
                    value={dlForm.fileType || ''}
                    onChange={(e) => setDlForm({ ...dlForm, fileType: e.target.value })}
                    placeholder="مثال: ZIP"
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border dark:border-zinc-800 rounded-lg"
                    dir="ltr"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 font-semibold block">نسخه انتشار:</label>
                  <input
                    type="text"
                    required
                    value={dlForm.version || ''}
                    onChange={(e) => setDlForm({ ...dlForm, version: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border dark:border-zinc-800 rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-400 font-semibold block">توضیح کوتاه فنی:</label>
                <input
                  type="text"
                  required
                  value={dlForm.description || ''}
                  onChange={(e) => setDlForm({ ...dlForm, description: e.target.value })}
                  placeholder="اهداف ابزار و برنامه‌های آماده آن..."
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border dark:border-zinc-800 rounded-lg"
                />
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-indigo-650 text-white font-bold rounded-xl text-xs"
                >
                  ذخیره فایل در دیتابیس
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-2">
            {downloads.map(dl => (
              <div key={dl.id} className="flex justify-between items-center bg-white dark:bg-zinc-900/30 p-4 rounded-xl border border-zinc-250/50 dark:border-zinc-800">
                <span className="font-sans font-bold text-sm text-zinc-800 dark:text-zinc-100">{dl.title}</span>
                <button
                  onClick={() => handleDeleteDl(dl.id)}
                  className="p-2 bg-rose-50 hover:bg-rose-100 dark:bg-zinc-800 text-rose-500 rounded-lg text-xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 🖊️ Tab 6: Manage Blog Posts */}
      {activeTab === 'blogs' && (
        <div className="space-y-6 animate-fade-in" id="admin-blog-crud">
          <div className="p-6 rounded-2xl border border-zinc-200 bg-white dark:border-zinc-805/85 dark:bg-zinc-900/30">
            <h2 className="font-sans font-black text-base mb-4">انتشار مقاله و آموزش جدید در وبلاگ آرشیو</h2>
            <form onSubmit={handleSaveBlog} className="space-y-4 font-sans text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 font-semibold block">عنوان مقاله:</label>
                  <input
                    type="text"
                    required
                    value={blogForm.title || ''}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border dark:border-zinc-800 rounded-lg"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 font-semibold block">دسته بندی مطلب:</label>
                  <select
                    value={blogForm.category || 'توسعه اندروید'}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border dark:border-zinc-800 rounded-lg"
                  >
                    <option value="توسعه اندروید">توسعه اندروید</option>
                    <option value="هوش مصنوعی">هوش مصنوعی</option>
                    <option value="بازی‌سازی">بازی‌سازی</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-400 font-semibold block">آدرس تصویر شاخص (URL باکیفیت):</label>
                <input
                  type="text"
                  value={blogForm.coverImage || ''}
                  onChange={(e) => setBlogForm({ ...blogForm, coverImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border dark:border-zinc-800 rounded-lg"
                  dir="ltr"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-400 font-semibold block">خلاصه چند کلمه‌ای مقاله:</label>
                <input
                  type="text"
                  required
                  value={blogForm.summary || ''}
                  onChange={(e) => setBlogForm({ ...blogForm, summary: e.target.value })}
                  placeholder="توضیح مینیاتوری در دو سطر..."
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border dark:border-zinc-800 rounded-lg"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-400 font-semibold block">بدنه متنی کامل مقاله (با پشتیبانی از سرفصل‌های ###):</label>
                <textarea
                  required
                  rows={4}
                  value={blogForm.content || ''}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  placeholder="متن کامل آموزش را اینجا بنویسید..."
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border dark:border-zinc-800 rounded-lg"
                />
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-indigo-650 text-white font-bold rounded-xl text-xs"
                >
                  انتشار عمومی مقاله کتبی
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-2">
            {blogPosts.map(post => (
              <div key={post.id} className="flex justify-between items-center bg-white dark:bg-zinc-900/30 p-4 rounded-xl border border-zinc-250/50 dark:border-zinc-800">
                <span className="font-sans font-bold text-sm text-zinc-800 dark:text-zinc-100">{post.title}</span>
                <button
                  onClick={() => handleDeleteBlog(post.id)}
                  className="p-2 bg-rose-50 hover:bg-rose-100 dark:bg-zinc-800 text-rose-500 rounded-lg text-xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 📬 Tab 7: Manage Contact Messages */}
      {activeTab === 'messages' && (
        <div className="space-y-4 animate-fade-in" id="admin-messages-crud">
          <div className="space-y-1">
            <h2 className="font-sans font-black text-sm text-zinc-500 uppercase tracking-widest">صندوق ورودی بازخوردهای کاربران</h2>
            <p className="text-xs text-zinc-400">مرور بلادرنگ درخواست‌ها و پیغام‌هایی که کاربران از صفحه ارتباط با ما ارسال کرده اند.</p>
          </div>

          {messages.length === 0 ? (
            <div className="p-12 text-center rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-805 text-zinc-500 font-sans">
              <Mail className="w-12 h-12 mx-auto mb-3 opacity-40 text-indigo-500" />
              <p className="font-bold text-sm">هیچ پیغامی یافت نگردید!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`p-5 rounded-2xl border text-right transition-all flex flex-col justify-between ${
                    msg.status === 'unread' 
                      ? 'bg-indigo-50/20 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900 shadow-xs' 
                      : 'bg-white border-zinc-200/50 dark:bg-zinc-900/30 dark:border-zinc-800/80 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-4 border-b pb-3 border-zinc-200/40 dark:border-zinc-800/60 text-xs text-zinc-500 dark:text-zinc-400">
                    <div className="space-y-1">
                      <strong className="text-sm font-sans font-black text-zinc-900 dark:text-white block">{msg.subject}</strong>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-sans text-xs text-zinc-650 dark:text-zinc-300 font-bold bg-zinc-150/55 dark:bg-zinc-800 px-2 py-0.5 rounded">فرستنده: {msg.name}</span>
                        <span className="font-mono text-zinc-400 dark:text-zinc-400 text-xs">ایمیل: {msg.email}</span>
                      </div>
                    </div>
                    <span className="font-mono text-xs">{msg.createdAt}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-350 leading-relaxed font-sans mb-4 whitespace-pre-wrap">
                    {msg.message}
                  </p>

                  <div className="flex gap-2 justify-end pt-3 border-t border-zinc-150/40 dark:border-zinc-800/60 text-xs">
                    <button
                      onClick={() => handleToggleMessageRead(msg.id)}
                      className={`px-3 py-1.5 rounded-lg border transition cursor-pointer font-bold ${
                        msg.status === 'unread' 
                          ? 'bg-emerald-500 text-white border-emerald-500' 
                          : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 border-zinc-200 dark:border-zinc-700'
                      }`}
                    >
                      {msg.status === 'unread' ? 'علامت به عنوان خوانده شده' : 'تغییر به خوانده نشده'}
                    </button>
                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="px-3 py-1.5 bg-rose-50 border border-rose-100 hover:bg-rose-100 dark:bg-zinc-850 dark:border-zinc-800 text-rose-500 rounded-lg cursor-pointer"
                    >
                      حذف دائم پیام
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
