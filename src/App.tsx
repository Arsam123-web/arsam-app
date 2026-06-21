import React, { useState, useEffect } from 'react';
import { Application, ViewType } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import AppCard from './components/AppCard';
import AppDetails from './components/AppDetails';
import AdminPanel from './components/AdminPanel';
import LatestUpdates from './components/LatestUpdates';
import AboutUs from './components/AboutUs';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Grid, Compass, RefreshCw, AlertCircle } from 'lucide-react';

const FALLBACK_APPS: Application[] = [
  {
    "id": "pars-calendar",
    "name": "پارس تقویم",
    "tagline": "تقویم هوشمند فارسی با اوقات شرعی و ابزارک‌های زیبا",
    "description": "نرم‌افزار پارس تقویم، یک ابزار جامع و کاملاً رایگان برای مدیریت زمان، نمایش تاریخ‌های خورشیدی، قمری و میلادی به همراه اوقات شرعی دقیق بیش از ۵۰۰ شهر ایران است. این برنامه با دارا بودن ابزارک‌های (ویجت) متنوع و زیبا، به شما اجازه می‌دهد بدون نیاز به باز کردن برنامه، از خورشیدی بودن روز مطلع شوید. همچنین قابلیت ثبت یادداشت، یادآور تولدها و مناسبت‌ها، پشتیبانی از رویدادهای ملی و مذهبی و قبله‌نما از دیگر ویژگی‌های بارز این اپلیکیشن است.",
    "version": "2.4.1",
    "release_date": "۱۴۰۵/۰۳/۱۵",
    "size": "۸.۴ مگابایت",
    "category": "کاربردی / ابزارها",
    "icon": "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=256&h=256&q=80",
    "download_url": "https://drive.google.com/file/d/1A_zBcD9Er12345_pars_calendar_apk/view",
    "screenshots": [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&h=1400&q=80",
      "https://images.unsplash.com/photo-1626379953822-baec19c3bbcd?auto=format&fit=crop&w=800&h=1400&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=1400&q=80"
    ],
    "features": [
      "رویدادشمار خورشیدی، قمری و میلادی به‌روز",
      "نمایش اوقات شرعی دقیق بر اساس موقعیت جغرافیایی یا شهر انتخابی",
      "یادآور پیشرفته رویدادها و مناسبت‌های شخصی",
      "ابزارک‌های هماهنگ با تم گوشی (تیره و روشن)",
      "دارای ابزار حرفه‌ای قبله‌نما و قطب‌نما",
      "کاملاً آفلاین و بدون تبلیغات مزاحم"
    ],
    "change_log": [
      {
        "version": "2.4.1",
        "date": "۱۴۰۵/۰۳/۱۵",
        "changes": [
          "بهبود کارایی و سرعت لود ابزارک‌ها",
          "حل مشکل ویجت در اندروید ۱۳ و ۱۴",
          "به‌روزرسانی مناسبت‌های رسمی کشور"
        ]
      },
      {
        "version": "2.3.0",
        "date": "۱۴۰۴/۱۲/۲۰",
        "changes": [
          "افزودن بیش از ۱۰۰ شهر جدید به دیتابیس اوقات شرعی",
          "امکان تغییر رنگ و ظاهر ویجت‌ها به صورت سفارشی",
          "رفع باگ قبله‌نما در دستگاه‌های فاقد ژیروسکوپ"
        ]
      }
    ],
    "featured": true
  },
  {
    "id": "pishkar-notes",
    "name": "پیشکار آرسام",
    "tagline": "مدیریت کارهای روزانه و یادداشت‌برداری سریع و آفلاین",
    "description": "با اپلیکیشن پیشکار آرسام، به کارهای روزمره خود نظم بدهید. این اپلیکیشن با تکیه بر اصول ساده‌گرایی (Minimalism) طراحی شده تا به شما کمک کند بدون شلوغی‌های اضافه، وظایف (To-Do List) و یادداشت‌های روزانه‌تان را ثبت و پیگیری کنید. همچنین با استفاده از سیستم دسته‌بندی رنگی، اولویت‌بندی تسک‌ها بسیار ساده خواهد بود. اطلاعات شما به صورت کاملاً امن روی حافظه گوشی ذخیره شده و نیازی به اینترنت ندارد.",
    "version": "1.2.0",
    "release_date": "۱۴۰۵/۰۲/۱۰",
    "size": "۵.۲ مگابایت",
    "category": "بهره‌وری / یادداشت",
    "icon": "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=256&h=256&q=80",
    "download_url": "https://drive.google.com/file/d/1B_yXcE8Er54321_pishkar_notes_apk/view",
    "screenshots": [
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&h=1400&q=80",
      "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&h=1400&q=80"
    ],
    "features": [
      "تعریف وظایف روزانه با قابلیت تعیین اولویت و تاریخ سررسید",
      "امکان دسته‌بندی یادداشت‌ها با رنگ‌های متفاوت",
      "تاریک‌سازی صفحه به صورت خودکار متناسب با شب",
      "قابلیت خروجی گرفتن و بکاپ‌گیری از داده‌ها به صورت فایل آفلاین",
      "جستجوی آنی در میان تمام تسک‌ها و یادداشت‌ها"
    ],
    "change_log": [
      {
        "version": "1.2.0",
        "date": "۱۴۰۵/۰۲/۱۰",
        "changes": [
          "بازنویسی رابط کاربری بر اساس متریال یو (Material You)",
          "افزودن امکان پین کردن یادداشت‌های مهم به بالای لیست",
          "اضافه شدن قابلیت یادآوری با ویبره هوشمند"
        ]
      },
      {
        "version": "1.0.0",
        "date": "۱۴۰۴/۱۰/۰۵",
        "changes": [
          "انتشار عمومی نسخه اول اپلیکیشن در استودیو آرسام"
        ]
      }
    ],
    "featured": true
  },
  {
    "id": "ava-media",
    "name": "آوا مدیا پلیر",
    "tagline": "پخش‌کننده موسیقی ساده، پرقدرت و بهینه‌سازی شده",
    "description": "آوا مدیا پلیر یک پخش‌کننده موسیقی آفلاین، زیبا و با کیفیت خروجی بسیار بالاست. این نرم‌افزار مجهز به اکولایزر ۵ بانده به همراه تقویت‌کننده بیس و شبیه‌ساز صدای سه‌بعدی است. آوا مدیا پلیر تمام فرمت‌های رایج صوتی مانند MP3، WAV، FLAC و AAC را پخش می‌کند و به شما اجازه می‌دهد تا تگ‌های موسیقی (نام خواننده، البوم، کاور) را به طور مستقیم ویرایش کنید.",
    "version": "3.1.0",
    "release_date": "۱۴۰۵/۰۱/۳۰",
    "size": "۱۲.۶ مگابایت",
    "category": "موسیقی و صدا",
    "icon": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=256&h=256&q=80",
    "download_url": "https://drive.google.com/file/d/1C_zWdE9Er98765_ava_media_apk/view",
    "screenshots": [
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&h=1400&q=80",
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&h=1400&q=80"
    ],
    "features": [
      "اکولایزر ۵ بانده پیشرفته با ۷ پیش‌فرض پیش‌ساخته",
      "ویرایشگر حرفه‌ای تگ‌های موسیقی صوتی (تگ ادیتور)",
      "تایمر زمان‌بندی خواب برای توقف خودکار موسیقی",
      "تشخیص کاور آلبوم گمشده به صورت آفلاین",
      "لیست‌های پخش پویا و هوشمند (بیشترین پخش‌شده، اخیراً اضافه‌شده)"
    ],
    "change_log": [
      {
        "version": "3.1.0",
        "date": "۱۴۰۵/۰۱/۳۰",
        "changes": [
          "رفع مشکل متوقف شدن ناگهانی برنامه در پس‌زمینه",
          "کاهش چشمگیر مصرف باتری و منابع سیستمی",
          "ایجاد سیستم اکولایزر فرکانسی دقیق‌تر"
        ]
      },
      {
        "version": "3.0.0",
        "date": "۱۴۰۴/۰۹/۱5",
        "changes": [
          "تغییر دیزاین اساسی به طراحی شیشه‌ای (Glassmorphism)",
          "پشتیبانی کامل از اندروید اتو (Android Auto)"
        ]
      }
    ],
    "featured": false
  }
];

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [apps, setApps] = useState<Application[]>(FALLBACK_APPS);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  // Search & Category states for Apps page
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('همه');

  // Dark mode toggle with local storage persistence
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return true; // Deep and rich dark mode by default for tech feels
  });

  // Apply dark mode styling class to root HTML
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Fetch apps data from local public JSON
  useEffect(() => {
    setLoading(true);
    fetch('/apps.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('فایل اطلاعات پیدا نشد. اطلاعات پیش‌فرض آفلاین بارگذاری شد.');
        }
        return res.json();
      })
      .then((data: Application[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setApps(data);
        } else {
          setApps(FALLBACK_APPS);
        }
        setLoading(false);
      })
      .catch((err) => {
        // Fallback is already configured, notify user.
        console.warn('Using offline data fallback:', err.message);
        setApps(FALLBACK_APPS);
        setLoading(false);
      });
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Selected App reference
  const selectedApp = apps.find((app) => app.id === selectedAppId) || apps[0];

  // Dynamically obtain unique major category prefixes for tabs
  const categories = ['همه', ...new Set(apps.map((app) => app.category.split(' / ')[0]))];

  // Filtering search results
  const filteredApps = apps.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'همه' ||
      app.category.startsWith(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  const featuredApps = apps.filter((app) => app.featured);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 font-sans flex flex-col justify-between transition-colors duration-300 antialiased selection:bg-primary-500/30">
      {/* Header element */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        setSelectedAppId={setSelectedAppId}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Main Container */}
      <main className="flex-1 pb-16">
        <AnimatePresence mode="wait">
          {/* 1. HOME VIEW */}
          {currentView === 'home' && (
            <motion.div
              key="home-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="space-y-4"
            >
              {/* Hero Section */}
              <Hero setCurrentView={setCurrentView} totalAppsCount={apps.length} />

              {/* Featured Apps grid */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                      <Grid className="w-6 h-6 text-primary-500" />
                      <span>اپلیکیشن‌های برگزیده استودیو</span>
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      گلچینی از کاربردی‌ترین برنامه‌های منتشر شده با نظارت کیفی تک‌تک بخش‌ها
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentView('apps');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1 text-sm font-bold text-primary-600 dark:text-primary-400 hover:underline cursor-pointer group"
                  >
                    <span>امکانات و آرشیو همه برنامه‌ها</span>
                    <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
                  </button>
                </div>

                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
                    <RefreshCw className="w-8 h-8 animate-spin text-primary-500" />
                    <span className="text-sm">در حال بارگذاری کاتالوگ...</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {featuredApps.map((app) => (
                      <AppCard
                        key={app.id}
                        app={app}
                        onSelectApp={setSelectedAppId}
                        setCurrentView={setCurrentView}
                      />
                    ))}
                  </div>
                )}
              </section>

              {/* Latest Updates Log Section */}
              <LatestUpdates
                apps={apps}
                onSelectApp={setSelectedAppId}
                setCurrentView={setCurrentView}
              />

              {/* About Studio section */}
              <AboutUs />
            </motion.div>
          )}

          {/* 2. APPLICATIONS ARCHIVE VIEW */}
          {currentView === 'apps' && (
            <motion.div
              key="apps-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
            >
              {/* Filter, categories, and Search Header */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 mb-10 shadow-sm space-y-6">
                <div className="space-y-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    آرشیو کامل اپلیکیشن‌های آرسام
                  </h1>
                  <p className="text-sm text-slate-550 dark:text-slate-400">
                    جدیدترین نرم‌افزارهای ساخته شده را فیلتر، جستجو و به طور کاملاً مستقیم دانلود کنید.
                  </p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  {/* Category Buttons Tabs */}
                  <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                          selectedCategory === cat
                            ? 'bg-primary-600 text-white shadow-md shadow-primary-500/10'
                            : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-350'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Search Bar Input */}
                  <div className="relative w-full md:max-w-xs shrink-0">
                    <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 dark:text-slate-500" />
                    <input
                      type="text"
                      placeholder="جستجوی نام یا قابلیت برنامه..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full text-right pr-11 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:ring-2 focus:ring-primary-500 outline-none placeholder-slate-400 dark:placeholder-slate-600"
                    />
                  </div>
                </div>
              </div>

              {/* Apps grid display */}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-3 text-slate-400">
                  <RefreshCw className="w-8 h-8 animate-spin text-primary-500" />
                  <span className="text-sm">در حال دریافت و فیلترینگ لیست برنامه‌ها...</span>
                </div>
              ) : filteredApps.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-3xl space-y-3">
                  <AlertCircle className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
                  <h3 className="font-bold text-slate-800 dark:text-slate-200">برنامه‌ای با این مشخصات یافت نشد</h3>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    عبارت جستجوی خود را تغییر دهید یا تب دسته‌بندی دیگری را انتخاب نمایید.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredApps.map((app) => (
                    <AppCard
                      key={app.id}
                      app={app}
                      onSelectApp={setSelectedAppId}
                      setCurrentView={setCurrentView}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* 3. APPLICATION DEEP SPEC DETAILS VIEW */}
          {currentView === 'details' && selectedAppId && (
            <motion.div
              key="details-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <AppDetails app={selectedApp} onGoBack={() => setCurrentView('apps')} />
            </motion.div>
          )}

          {/* 4. ADMIN INSTRUCTIONS MODE VIEW */}
          {currentView === 'admin' && (
            <motion.div
              key="admin-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <AdminPanel />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer element */}
      <Footer setCurrentView={setCurrentView} setSelectedAppId={setSelectedAppId} />
    </div>
  );
}
