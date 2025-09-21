export interface Manga {
  id: string;
  title: string;
  author: string;
  cover: string;
  status: ReadingStatus;
  currentChapter: number;
  totalChapters: number;
  rating: number;
  genres: string[];
  platform: Platform;
  dateAdded: Date;
  lastRead: Date;
  notes: string;
  tags: string[];
  type: 'manga' | 'manhwa' | 'manhua';
  description: string;
  year: number;
  isCompleted: boolean;
}

export type ReadingStatus = 'to-read' | 'reading' | 'completed' | 'dropped' | 'on-hold';

export type Platform = 'webtoon' | 'mangadex' | 'asura' | 'reaper' | 'physical' | 'other';

export interface Collection {
  id: string;
  name: string;
  description: string;
  mangaIds: string[];
  color: string;
  isPublic: boolean;
}

export interface Notification {
  id: string;
  mangaId: string;
  title: string;
  message: string;
  chapter: number;
  timestamp: Date;
  isRead: boolean;
  platform: Platform;
  directUrl: string;
}

export interface Recommendation {
  manga: Manga;
  score: number;
  reason: string;
  basedOn: string[];
}

export interface ReadingStats {
  totalManga: number;
  chaptersRead: number;
  hoursRead: number;
  averageRating: number;
  favoriteGenres: string[];
  readingStreak: number;
  monthlyProgress: { month: string; chapters: number }[];
}