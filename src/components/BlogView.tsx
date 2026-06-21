/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowRight, 
  Search, 
  BookOpen, 
  User, 
  Calendar, 
  Clock, 
  ChevronLeft, 
  Share2,
  Heart
} from 'lucide-react';
import { BlogPost } from '../types';

interface BlogViewProps {
  blogPosts: BlogPost[];
  selectedPost: BlogPost | null;
  onSelectPost: (post: BlogPost | null) => void;
}

export default function BlogView({
  blogPosts,
  selectedPost,
  onSelectPost
}: BlogViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('همه');
  const [isLiked, setIsLiked] = useState(false);

  // Extract all unique tags
  const tagsList = ['همه', ...Array.from(new Set(blogPosts.flatMap(post => post.category)))];

  // Filter posts
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.summary.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'همه' || post.category === selectedTag;
    return matchesSearch && matchesTag;
  });

  const handleShare = (title: string) => {
    alert(`لینک مقاله «${title}» با موفقیت کپی شد!`);
  };

  // 📝 Post Read Mode Subview
  if (selectedPost) {
    return (
      <div className="space-y-8 py-6 pb-12 animate-fade-in text-zinc-900 dark:text-zinc-150">
        <button
          onClick={() => {
            onSelectPost(null);
            setIsLiked(false);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 text-xs sm:text-sm font-semibold rounded-xl border border-zinc-250 dark:border-zinc-800/80 transition cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>بازგشت به آرشیو مقالات وبلاگ</span>
        </button>

        <article className="space-y-6 max-w-4xl mx-auto">
          {/* Header element */}
          <div className="space-y-4">
            <span className="text-xs font-bold px-3 py-1 bg-indigo-500/15 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400 rounded-full">
              {selectedPost.category}
            </span>
            <h1 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl text-zinc-900 dark:text-white leading-tight">
              {selectedPost.title}
            </h1>

            {/* Author Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 border-y py-3.5 border-zinc-100 dark:border-zinc-805/70 font-mono">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4 text-zinc-400" />
                نویسنده مقاله: <strong>{selectedPost.author}</strong>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-zinc-400" />
                تاریخ انتشار: {selectedPost.publishedAt}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-zinc-400" />
                زمان مطالعه تخمینی: {selectedPost.readTime}
              </span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-video w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-805 shadow-md">
            <img 
              src={selectedPost.coverImage} 
              alt={selectedPost.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Main Article Prose Content */}
          <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-350 leading-relaxed space-y-4 font-sans text-xs sm:text-sm">
            {selectedPost.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('###')) {
                return (
                  <h3 key={index} className="font-sans font-black text-lg text-zinc-900 dark:text-white pt-4 pb-1">
                    {paragraph.replace('###', '').trim()}
                  </h3>
                );
              }
              if (paragraph.match(/^\d+\./)) {
                return (
                  <div key={index} className="pl-4 py-1 space-y-1 text-zinc-650 dark:text-zinc-400">
                    <p>{paragraph}</p>
                  </div>
                );
              }
              return (
                <p key={index} className="whitespace-pre-wrap leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Social shares and feedback */}
          <div className="pt-6 border-t border-zinc-100 dark:border-zinc-805 flex items-center justify-between gap-4 py-4">
            <div className="flex items-center gap-2">
              {selectedPost.tags.map((tg, i) => (
                <span key={i} className="text-[10px] px-2.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 rounded font-bold">
                  #{tg}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  isLiked 
                    ? 'bg-rose-50 text-rose-500 border-rose-200 dark:bg-rose-950/20 dark:border-rose-910' 
                    : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200'
                }`}
                title="پسندیدن مقاله"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500' : ''}`} />
              </button>
              <button
                onClick={() => handleShare(selectedPost.title)}
                className="p-2 rounded-xl bg-zinc-100 border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-850 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 transition cursor-pointer"
                title="کپی کردن آدرس برای بازنشر"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </article>
      </div>
    );
  }

  // 📂 Main Archive View
  return (
    <div className="space-y-8 py-6 pb-12 animate-fade-in text-zinc-900 dark:text-zinc-100">
      <div className="space-y-2">
        <h1 className="font-sans font-black text-2xl sm:text-3xl text-zinc-900 dark:text-white">
          دست‌نوشته‌های وبلاگ فناوری آرسام
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          جدیدترین مقالات آموزشی، تجربیات عملی مهندسی اندروید، راهنما‌های یکپارچه‌‌سازی هوش مصنوعی و لاگ توسعه پروژه‌‌ها.
        </p>
      </div>

      {/* Tags Filters and Searches */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        {/* Category toggles */}
        <div className="flex flex-wrap items-center gap-1.5">
          {tagsList.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                selectedTag === tag
                  ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-indigo-600 dark:border-indigo-600'
                  : 'bg-white text-zinc-600 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800 dark:hover:bg-zinc-800'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div className="relative max-w-sm">
          <span className="absolute inset-y-0 right-3.5 flex items-center text-zinc-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجو در مقالات وبلاگ..."
            className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
          />
        </div>
      </div>

      {/* Blog Cards Grid */}
      {filteredPosts.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 text-zinc-500">
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40 text-indigo-500" />
          <p className="font-sans font-bold text-sm">هیچ مقاله‌ای متناسب بامحتوای سرچ شما یافت نشد.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div 
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="group border border-zinc-200 rounded-2xl bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/30 hover:shadow-lg transition-all overflow-hidden cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="h-44 bg-zinc-100 dark:bg-zinc-950 overflow-hidden relative">
                  <img 
                    src={post.coverImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3.5 left-3.5 px-2.5 py-0.5 bg-zinc-950/80 backdrop-blur text-white text-[10px] sm:text-xs rounded-full font-bold">
                    {post.category}
                  </span>
                </div>

                <div className="p-5 space-y-2.5 text-right">
                  <div className="text-[10px] text-zinc-400 font-mono tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span>{post.publishedAt}</span>
                    <span>•</span>
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-sans font-extrabold text-sm sm:text-base text-zinc-800 group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="px-5 py-3.5 border-t border-zinc-100 dark:border-zinc-805/60 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-emerald-400 font-sans mt-2">
                <span>مطالعه کامل مقاله</span>
                <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
