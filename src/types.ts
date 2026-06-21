export interface ChangeLogItem {
  version: string;
  date: string;
  changes: string[];
}

export interface Application {
  id: string;
  name: string;
  tagline: string;
  description: string;
  version: string;
  release_date: string;
  size: string;
  category: string;
  icon: string;
  download_url: string;
  screenshots: string[];
  features: string[];
  change_log: ChangeLogItem[];
  featured: boolean;
}

export type ViewType = 'home' | 'apps' | 'details' | 'admin';
