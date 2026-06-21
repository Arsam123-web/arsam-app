/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AppsView from './components/AppsView';
import AIProjectsView from './components/AIProjectsView';
import GamesView from './components/GamesView';
import DownloadsView from './components/DownloadsView';
import BlogView from './components/BlogView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import AdminPanel from './components/AdminPanel';

import { 
  INITIAL_APPS, 
  INITIAL_AI_PROJECTS, 
  INITIAL_GAMES, 
  INITIAL_DOWNLOADS, 
  INITIAL_BLOG 
} from './data/initialData';

import { AppItem, AIProject, GameItem, DownloadFile, BlogPost } from './types';

export default function App() {
  // Navigation / View states
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);
  const [selectedGame, setSelectedGame] = useState<GameItem | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Light/Dark Theme states
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('arsam_theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Database states with LocalStorage persistence to remember CRUD actions
  const [apps, setApps] = useState<AppItem[]>(() => {
    const saved = localStorage.getItem('db_apps');
    return saved ? JSON.parse(saved) : INITIAL_APPS;
  });

  const [aiProjects, setAiProjects] = useState<AIProject[]>(() => {
    const saved = localStorage.getItem('db_ai');
    return saved ? JSON.parse(saved) : INITIAL_AI_PROJECTS;
  });

  const [games, setGames] = useState<GameItem[]>(() => {
    const saved = localStorage.getItem('db_games');
    return saved ? JSON.parse(saved) : INITIAL_GAMES;
  });

  const [downloads, setDownloads] = useState<DownloadFile[]>(() => {
    const saved = localStorage.getItem('db_downloads');
    return saved ? JSON.parse(saved) : INITIAL_DOWNLOADS;
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('db_blog');
    return saved ? JSON.parse(saved) : INITIAL_BLOG;
  });

  // Sync Dark Mode class on Document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('arsam_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('arsam_theme', 'light');
    }
  }, [darkMode]);

  // Sync state modifications onto LocalStorage
  useEffect(() => {
    localStorage.setItem('db_apps', JSON.stringify(apps));
  }, [apps]);

  useEffect(() => {
    localStorage.setItem('db_ai', JSON.stringify(aiProjects));
  }, [aiProjects]);

  useEffect(() => {
    localStorage.setItem('db_games', JSON.stringify(games));
  }, [games]);

  useEffect(() => {
    localStorage.setItem('db_downloads', JSON.stringify(downloads));
  }, [downloads]);

  useEffect(() => {
    localStorage.setItem('db_blog', JSON.stringify(blogPosts));
  }, [blogPosts]);

  // Sync URL search queries for back-forward button friendliness
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tabFromUrl = queryParams.get('tab');
    if (tabFromUrl) {
      setCurrentTab(tabFromUrl);
    }
  }, []);

  const handleChangeTab = (tab: string) => {
    setCurrentTab(tab);
    // Clear individual selections when navigating tabs
    setSelectedApp(null);
    setSelectedGame(null);
    setSelectedPost(null);

    // Update query params without causing full page reload
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    window.history.pushState({}, '', url.toString());

    // Scroll gracefully to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectApp = (app: AppItem | null) => {
    setSelectedApp(app);
    if (app) {
      setCurrentTab('apps');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectGame = (game: GameItem | null) => {
    setSelectedGame(game);
    if (game) {
      setCurrentTab('games');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectBlog = (post: BlogPost | null) => {
    setSelectedPost(post);
    if (post) {
      setCurrentTab('blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300 antialiased font-sans" dir="rtl">
      
      {/* 🔮 Translucent Glass Header Bar */}
      <Navbar 
        currentTab={currentTab} 
        onChangeTab={handleChangeTab} 
        darkMode={darkMode} 
        onToggleDarkMode={() => setDarkMode(!darkMode)} 
      />

      {/* 📂 Main Content Viewport */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {currentTab === 'home' && (
          <HomeView 
            apps={apps}
            aiProjects={aiProjects}
            blogPosts={blogPosts}
            games={games}
            onChangeTab={handleChangeTab}
            onSelectApp={handleSelectApp}
            onSelectGame={handleSelectGame}
            onSelectBlog={handleSelectBlog}
          />
        )}

        {currentTab === 'apps' && (
          <AppsView 
            apps={apps}
            selectedApp={selectedApp}
            onSelectApp={handleSelectApp}
          />
        )}

        {currentTab === 'ai' && (
          <AIProjectsView 
            aiProjects={aiProjects} 
          />
        )}

        {currentTab === 'games' && (
          <GamesView 
            games={games}
            selectedGame={selectedGame}
            onSelectGame={handleSelectGame}
          />
        )}

        {currentTab === 'downloads' && (
          <DownloadsView 
            downloads={downloads} 
          />
        )}

        {currentTab === 'blog' && (
          <BlogView 
            blogPosts={blogPosts}
            selectedPost={selectedPost}
            onSelectPost={handleSelectBlog}
          />
        )}

        {currentTab === 'about' && (
          <AboutView />
        )}

        {currentTab === 'contact' && (
          <ContactView />
        )}

        {currentTab === 'admin' && (
          <AdminPanel 
            apps={apps}
            aiProjects={aiProjects}
            games={games}
            downloads={downloads}
            blogPosts={blogPosts}
            onUpdateApps={setApps}
            onUpdateAI={setAiProjects}
            onUpdateGames={setGames}
            onUpdateDownloads={setDownloads}
            onUpdateBlogs={setBlogPosts}
          />
        )}

      </main>

      {/*  Footer and developer credentials */}
      <Footer onChangeTab={handleChangeTab} />
    </div>
  );
}
