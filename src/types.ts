/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ChangelogEntry {
  version: string;
  date: string;
  changes: string[];
}

export interface FAQEntry {
  question: string;
  answer: string;
}

export interface AppItem {
  id: string;
  name: string;
  englishName: string;
  shortDescription: string;
  description: string;
  version: string;
  size: string;
  icon: string; // Icon name from lucide or emoji/image URL
  downloadApkUrl: string;
  downloadAabUrl: string;
  screenshots: string[];
  features: string[];
  changelog: ChangelogEntry[];
  faqs: FAQEntry[];
  category: string;
  downloadsCount: number;
  rating: number;
  isFeatured: boolean;
  updatedAt: string;
}

export interface AIProject {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  accessUrl: string;
  icon: string;
  screenshots: string[];
  tags: string[];
  status: 'active' | 'beta' | 'development';
  isFeatured: boolean;
}

export interface GameItem {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  version: string;
  size: string;
  icon: string;
  screenshots: string[];
  downloadUrl: string;
  features: string[];
  tags: string[];
  downloadsCount: number;
  rating: number;
}

export interface DownloadFile {
  id: string;
  title: string;
  description: string;
  version: string;
  size: string;
  fileType: string; // ZIP, EXE, APK, PDF, etc.
  downloadUrl: string;
  downloadsCount: number;
  updatedAt: string;
  category: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: string;
  coverImage: string;
  category: string;
  tags: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read';
}
