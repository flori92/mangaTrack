import { useState, useEffect } from 'react';
import { Manga, ReadingStatus, Notification, Recommendation } from '../types/manga';
import { mockManga, mockNotifications, mockRecommendations } from '../data/mockData';

export function useManga() {
  const [manga, setManga] = useState<Manga[]>(mockManga);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [recommendations, setRecommendations] = useState<Recommendation[]>(mockRecommendations);
  const [loading, setLoading] = useState(false);

  const updateMangaStatus = (id: string, status: ReadingStatus) => {
    setManga(prev => prev.map(m => 
      m.id === id ? { ...m, status, lastRead: new Date() } : m
    ));
  };

  const updateMangaProgress = (id: string, chapter: number) => {
    setManga(prev => prev.map(m => 
      m.id === id ? { 
        ...m, 
        currentChapter: chapter, 
        lastRead: new Date(),
        status: chapter >= m.totalChapters ? 'completed' : m.status
      } : m
    ));
  };

  const updateMangaRating = (id: string, rating: number) => {
    setManga(prev => prev.map(m => 
      m.id === id ? { ...m, rating } : m
    ));
  };

  const addManga = (newManga: Omit<Manga, 'id' | 'dateAdded'>) => {
    const manga: Manga = {
      ...newManga,
      id: Date.now().toString(),
      dateAdded: new Date()
    };
    setManga(prev => [manga, ...prev]);
  };

  const deleteManga = (id: string) => {
    setManga(prev => prev.filter(m => m.id !== id));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const getStats = () => {
    const totalManga = manga.length;
    const chaptersRead = manga.reduce((sum, m) => sum + m.currentChapter, 0);
    const completedManga = manga.filter(m => m.status === 'completed').length;
    const readingManga = manga.filter(m => m.status === 'reading').length;
    const averageRating = manga.filter(m => m.rating > 0).reduce((sum, m) => sum + m.rating, 0) / manga.filter(m => m.rating > 0).length || 0;

    return {
      totalManga,
      chaptersRead,
      completedManga,
      readingManga,
      averageRating: Math.round(averageRating * 10) / 10
    };
  };

  return {
    manga,
    notifications,
    recommendations,
    loading,
    updateMangaStatus,
    updateMangaProgress,
    updateMangaRating,
    addManga,
    deleteManga,
    markNotificationAsRead,
    getStats
  };
}