import React, { useState } from 'react';
import { BookOpen, FileCode, Plus, Trash2, Copy, Check, FileJson, Link, HelpCircle } from 'lucide-react';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'tutorial' | 'generator'>('tutorial');
  const [copied, setCopied] = useState<boolean>(false);

  // Schema state for interactive generator
  const [id, setId] = useState('new-app-id');
  const [name, setName] = useState('نام برنامه');
  const [tagline, setTagline] = useState('توضیح کوتاه و جذاب');
  const [description, setDescription] = useState('توضیح کامل در رابطه با امکانات و کاربردهای اصلی برنامه...');
  const [version, setVersion] = useState('1.0.0');
  const [releaseDate, setReleaseDate] = useState('۱۴۰۵/۰۱/۰۱');
  const [size, setSize] = useState('۷.۵ مگابایت');
  const [category, setCategory] = useState('کاربردی / ابزارها');
  const [icon, setIcon] = useState('https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=256&h=256&q=80');
  const [downloadUrl, setDownloadUrl] = useState('https://drive.google.com/file/d/FILE_ID_HERE/view');
  const [featured, setFeatured] = useState(true);

  // Screenshots
  const [screenshotInput, setScreenshotInput] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&h=1400&q=80');
  const [screenshots, setScreenshots] = useState<string[]>([
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&h=1400&q=80'
  ]);

  // Features
  const [featureInput, setFeatureInput] = useState('');
  const [features, setFeatures] = useState<string[]>([
    'قابلیت کارکرد کامل به صورت ۱۰۰٪ آفلاین',
    'امنیت بالا و فاقد دسترسی‌های اضافی'
  ]);

  // Changelog
  const [historyVer, setHistoryVer] = useState('1.0.0');
  const [historyDate, setHistoryDate] = useState('۱۴۰۵/۰۱/۰۱');
  const [historyChanges, setHistoryChanges] = useState<string[]>(['انتشار نسخه بومی اولیه در استودیو آرسام']);
  const [historyChangeInput, setHistoryChangeInput] = useState('');

  const addScreenshot = () => {
    if (screenshotInput.trim()) {
      setScreenshots([...screenshots, screenshotInput.trim()]);
      setScreenshotInput('');
    }
  };

  const removeScreenshot = (index: number) => {
    setScreenshots(screenshots.filter((_, i) => i !== index));
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput('');
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const addHistoryChange = () => {
    if (historyChangeInput.trim()) {
      setHistoryChanges([...historyChanges, historyChangeInput.trim()]);
      setHistoryChangeInput('');
    }
  };

  const removeHistoryChange = (index: number) => {
    setHistoryChanges(historyChanges.filter((_, i) => i !== index));
  };

  // Compile full object
  const compiledJson = JSON.stringify(
    {
      id: id.trim() || 'app-id',
      name: name.trim() || 'Untitled App',
      tagline: tagline.trim() || 'Tagline',
      description: description.trim() || 'Description',
      version: version.trim() || '1.0.0',
      release_date: releaseDate.trim() || '۱۴۰۵/۰۱/۰۱',
      size: size.trim() || '۰ مگابایت',
      category: category.trim() || 'دسته بندی',
      icon: icon.trim() || '',
      download_url: downloadUrl.trim() || '',
      screenshots: screenshots,
      features: features,
      change_log: [
        {
          version: historyVer.trim() || version.trim() || '1.0.0',
          date: historyDate.trim() || releaseDate.trim() || '۱۴۰۵/۰۱/۰۱',
          changes: historyChanges,
        },
      ],
      featured: featured,
    },
    null,
    2
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(compiledJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-colors duration-300">
      <div className="mb-8 overflow-hidden">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          پنل راه‌نما و مدیریت آرسام استودیو
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-3xl">
          از آنجا که این سایت به صورت کاملاً ایستا (Static) طراحی شده و با گیت‌هاب پیجز هماهنگ است، تمام داده‌ها به راحتی داخل فایل <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-mono">public/apps.json</code> ذخیره می‌شوند. شما می‌توانید از ابزار تولیدکننده این پنل برای ادیت یا فرمت‌دهی بدون اشتباه استفاده کنید. This page is kept internal only.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8">
        <button
          onClick={() => setActiveTab('tutorial')}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'tutorial'
              ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>۱. راهنمای قدم‌به‌قدم ادیت دستی</span>
        </button>

        <button
          onClick={() => setActiveTab('generator')}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'generator'
              ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
          }`}
        >
          <FileCode className="w-4 h-4" />
          <span>۲. تولیدکننده فرمت JSON هوشمند</span>
        </button>
      </div>

      {/* Content 1: Tutorial */}
      {activeTab === 'tutorial' && (
        <div className="space-y-8 animate-fade-in">
          {/* File location card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileJson className="w-5 h-5 text-indigo-500" />
              <span>محل و نحوه ویرایش فایل اطلاعات اپلیکیشن‌ها</span>
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              برای مدیریت برنامه‌ها، کافیست فایل <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-xs">public/apps.json</span> را در مخزن گیت‌هاب یا گیت محلی خود ادیت کنید. ساختار کلی این فایل به شکل یک آرایه حاوی اطلاعات برنامه‌ها است:
            </p>

            <pre className="dir-ltr text-left p-4 rounded-xl bg-slate-950 text-slate-300 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
{`[
  {
    "id": "شناسه ارجاع یکتا بدون فاصله و فارسی - برای نمونه: custom-player",
    "name": "نام اصلی برنامه به فارسی",
    "tagline": "یک جمله کوتاه توصیفی جذاب",
    "description": "متن کامل توضیحات معرفی برنامه و جزئیات آن...",
    "version": "1.0.0",
    "release_date": "۱۴۰۵/۰۱/۰۱",
    "size": "۱۰ مگابایت",
    "category": "ابزارها / مذهبی / کاربردی",
    "icon": "لینک کاور یا لوگوی برنامه (مثلاً ۲۵۶ در ۲۵۶ پیکسل)",
    "download_url": "لینک فایل در گوگل درایو یا هر فضایی",
    "screenshots": [
      "آدرس لینک اسکرین شات اول گوشی",
      "آدرس لینک اسکرین شات دوم گوشی"
    ],
    "features": [
      "ویژگی برجسته اول اپلیکیشن",
      "ویژگی برجسته دوم اپلیکیشن"
    ],
    "change_log": [
      {
        "version": "1.0.0",
        "date": "۱۴۰۵/۰۱/۰۱",
        "changes": [
          "تغییرات این نسخه اول",
          "رفع باگ‌های گزارش شده قبلی"
        ]
      }
    ],
    "featured": true
  }
]`}
            </pre>
          </div>

          {/* Google drive converter guide */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Link className="w-5 h-5 text-primary-500" />
              <span>آموزش قرار دادن فایل دانلود در گوگل درایو (Google Drive Link)</span>
            </h3>
            <div className="text-sm text-slate-600 dark:text-slate-400 space-y-3 leading-relaxed">
              <p>
                هنگامی که فایل <span className="font-bold">APK</span> اپلیکیشن خود را داخل گوگل درایو آپلود می‌کنید، به صورت پیش‌فرض گوگل به شما یک لینک مشاهده می‌دهد:
              </p>
              <div className="dir-ltr text-left p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-xs font-mono text-slate-500">
                https://drive.google.com/file/d/<span className="text-primary-600 font-bold bg-primary-100 dark:bg-primary-950 px-1 rounded">FILE_ID</span>/view?usp=sharing
              </div>
              <p>
                برای تنظیم دکمه دانلود، بهترین کار این است که لینک فوق را مستقیم وارد کنید، یا آی‌دی (<span className="text-primary-600 font-bold dark:text-primary-400">FILE_ID</span>) را کپی کرده و در قالب زیر قرار دهید تا با کلیک بر روی آن دانلود مستقیم آغاز شود:
              </p>
              <div className="dir-ltr text-left p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-xs font-mono text-slate-500">
                https://drive.google.com/uc?export=download&id=<span className="text-primary-600 font-bold bg-primary-100 dark:bg-primary-950 px-1 rounded">FILE_ID</span>
              </div>
              <p className="flex items-start gap-1.5 text-xs text-amber-600 dark:text-amber-400 mt-2 bg-amber-50 dark:bg-amber-950/20 p-3 rounded-xl border border-amber-100 dark:border-amber-900/30">
                <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>نکته مهم: مطمئن شوید دسترسی فایل در گوگل درایو را روی 'Anyone with the link' (هر کسی که لینک را دارد) یا کاملاً عمومی قرار داده‌اید، در غیر این‌صورت کاربر با پیغام عدم دسترسی روبرو خواهد شد.</span>
              </p>
            </div>
          </div>

          {/* Quick instructions block */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800/80">
              <h4 className="font-bold text-slate-950 dark:text-white text-sm mb-2">اضافه کردن یک برنامه جدید</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                یک آکاردئون از مشخصات جدید در انتهای آرایه بنویسید. فراموش نکنید بین آیتم قبلی و آیتم جدید علامت ویرگول (comma) بگذارید تا فرمت JSON متلاشی نشود.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800/80">
              <h4 className="font-bold text-slate-950 dark:text-white text-sm mb-2">اضافه کردن نسخه جدید</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                در برنامه مدنظر، مقدار فیلدهای <code className="font-mono text-xs text-indigo-500">version</code> و <code className="font-mono text-xs text-indigo-500">release_date</code> را تغییر دهید و خطوط جدید را به فیلد لیست باز تغییرات <code className="font-mono text-xs text-indigo-500">change_log</code> الحاق نمایید.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800/80">
              <h4 className="font-bold text-slate-950 dark:text-white text-sm mb-2">تغییر آدرس دانلود</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                در فیلد <code className="font-mono text-xs text-primary-500">download_url</code> لینک مستقیم آپلود شده روی سرور خود یا فرمت ریدایرکت گوگل درایو را جایگذاری کنید.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Content 2: Generator */}
      {activeTab === 'generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
          {/* Creator Form (RTL) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
              مشخصات و ابزار فرمت‌دهی
            </h3>

            {/* Basic Info Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 col-span-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">شناسه انگلیسی برنامه (بدون فاصله)</label>
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="مثال: dynamic-widget"
                  className="w-full text-right px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div className="space-y-1.5 col-span-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">نام کامل فارسی برنامه</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: ویجت ساز هوشمند"
                  className="w-full text-right px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">توضیح کوتاه و شعار تبلیغاتی (Tagline)</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="تلفیقی هماهنگ برای خلق و آفرینش ابزارک موسیقی"
                className="w-full text-right px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">توضیحات معرفی بلند (Description)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="امکانات این برنامه را به طور کامل بنویسید..."
                className="w-full text-right px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:ring-2 focus:ring-primary-500 outline-none resize-none"
              ></textarea>
            </div>

            {/* Versioning Metas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">نسخه انتشار</label>
                <input
                  type="text"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  placeholder="1.0.0"
                  className="w-full text-left font-mono px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">تاریخ انتشار</label>
                <input
                  type="text"
                  value={releaseDate}
                  onChange={(e) => setReleaseDate(e.target.value)}
                  placeholder="۱۴۰۵/۰۱/۰۱"
                  className="w-full text-right px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">حجم فایل نصبی</label>
                <input
                  type="text"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  placeholder="۱۲.۴ مگابایت"
                  className="w-full text-right px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>
            </div>

            {/* Icon, Download URL, featured, category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">لینک تصویر لوگو (Icon URL)</label>
                <input
                  type="text"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  className="w-full text-left font-mono px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">دسته‌بندی اپلیکیشن</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="کاربردی / ابزارها"
                  className="w-full text-right px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">آدرس دانلود گوگل درایو (Download URL)</label>
              <input
                type="text"
                value={downloadUrl}
                onChange={(e) => setDownloadUrl(e.target.value)}
                className="w-full text-left font-mono px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>

            {/* Checkbox featured */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="feat-chk"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4.5 h-4.5 accent-primary-600 rounded bg-slate-100 dark:bg-slate-950 border-slate-200 cursor-pointer"
              />
              <label htmlFor="feat-chk" className="text-sm font-bold text-slate-800 dark:text-slate-300 cursor-pointer select-none">
                برنامه ویژه معرفی در صفحه اصلی (Featured App) باشد؟
              </label>
            </div>

            {/* List items builder (Screenshots) */}
            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">گالری تصاویر اسکرین شات (لینک تصویری)</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={screenshotInput}
                  onChange={(e) => setScreenshotInput(e.target.value)}
                  placeholder="https://..."
                  className="flex-1 text-left font-mono px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                />
                <button
                  type="button"
                  onClick={addScreenshot}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold transform transition-transform duration-150 cursor-pointer shrink-0"
                >
                  اضافه کردن
                </button>
              </div>
              <ul className="flex flex-wrap gap-2 pt-1">
                {screenshots.map((s, idx) => (
                  <li key={idx} className="inline-flex items-center gap-2 text-xs bg-slate-50 border border-slate-150 rounded-lg py-1 px-2.5 font-mono text-slate-600 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400">
                    <span className="max-w-[120px] truncate">{s}</span>
                    <button onClick={() => removeScreenshot(idx)} className="text-red-500 hover:text-red-600">×</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Features list builder */}
            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">ویژگی‌های برجسته اپلیکیشن</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  placeholder="مثال: سرعت بارگیری بالا در شبکه ضعیف"
                  className="flex-1 text-right px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold cursor-pointer shrink-0"
                >
                  افزودن
                </button>
              </div>
              <ul className="space-y-1.5 pt-1">
                {features.map((f, idx) => (
                  <li key={idx} className="flex items-center justify-between text-xs bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl p-2 font-medium text-slate-700 dark:text-slate-300">
                    <span className="leading-normal">{f}</span>
                    <button onClick={() => removeFeature(idx)} className="text-red-500 hover:text-red-600 p-1 font-bold">×</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* ChangeLog builder */}
            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">آخرین لاگ تغییرات نسخه (Changelog)</span>
              
              <div className="grid grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-950/20 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/60 mb-2">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400">نسخه تغییر</span>
                  <input
                    type="text"
                    value={historyVer}
                    onChange={(e) => setHistoryVer(e.target.value)}
                    className="w-full text-left font-mono px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400">تاریخ تغییر</span>
                  <input
                    type="text"
                    value={historyDate}
                    onChange={(e) => setHistoryDate(e.target.value)}
                    className="w-full text-right px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={historyChangeInput}
                  onChange={(e) => setHistoryChangeInput(e.target.value)}
                  placeholder="مثال: برطرف کردن تداخل صفحه نمایش"
                  className="flex-1 text-right px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:ring-2 focus:ring-primary-500 outline-none"
                />
                <button
                  type="button"
                  onClick={addHistoryChange}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold cursor-pointer shrink-0"
                >
                  افزودن لاگ
                </button>
              </div>
              <ul className="space-y-1.5 pt-1">
                {historyChanges.map((c, idx) => (
                  <li key={idx} className="flex items-center justify-between text-xs bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl p-2 font-medium text-slate-700 dark:text-slate-300">
                    <span className="leading-normal">{c}</span>
                    <button onClick={() => removeHistoryChange(idx)} className="text-red-500 hover:text-red-600 p-1 font-bold">×</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Compiled JSON View (Right column, sticky code panel) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 bg-slate-950 text-white rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-indigo-400 flex items-center gap-1.5">
                <FileJson className="w-4 h-4" />
                <span>برگ خروجی ساختار JSON</span>
              </h3>

              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg transition-all focus:ring-1 focus:ring-indigo-500 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'کپی شد!' : 'کپی کل ساختار'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-normal">
              اطلاعات فرم بالا بلافاصله آرایه کامپایل‌شده‌ای در قالب یک شی (App Object) تولید می‌کند. شما می‌توانید این پکیج را در آرایه کلی موجود در فایل <code className="text-amber-400 font-mono text-[11px] bg-slate-900 px-1 py-0.5 rounded">public/apps.json</code> درج نمایید تا برنامه جدید فورا نمایش داده شود.
            </p>

            <pre className="dir-ltr text-left p-4 rounded-2xl bg-black text-emerald-400 font-mono text-xs overflow-x-auto select-all max-h-[480px] border border-slate-900 leading-relaxed scrollbar-thin">
              {compiledJson}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
