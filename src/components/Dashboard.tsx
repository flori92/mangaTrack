import React from 'react';
import { 
  BookOpenIcon, 
  CheckCircleIcon, 
  ClockIcon,
  ChartBarIcon,
  FireIcon,
  TrendingUpIcon
} from '@heroicons/react/24/outline';
import { Manga, Notification } from '../types/manga';
import { MangaCard } from './MangaCard';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface DashboardProps {
  manga: Manga[];
  notifications: Notification[];
  stats: {
    totalManga: number;
    chaptersRead: number;
    completedManga: number;
    readingManga: number;
    averageRating: number;
  };
  onStatusChange: (id: string, status: any) => void;
  onProgressUpdate: (id: string, chapter: number) => void;
  onRatingChange: (id: string, rating: number) => void;
  onMangaClick: (manga: Manga) => void;
}

export function Dashboard({ 
  manga, 
  notifications, 
  stats, 
  onStatusChange, 
  onProgressUpdate, 
  onRatingChange,
  onMangaClick 
}: DashboardProps) {
  const recentlyRead = manga
    .filter(m => m.status === 'reading')
    .sort((a, b) => new Date(b.lastRead).getTime() - new Date(a.lastRead).getTime())
    .slice(0, 6);

  const recentNotifications = notifications
    .filter(n => !n.isRead)
    .slice(0, 3);

  const topRated = manga
    .filter(m => m.rating > 0)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-accent-600/20 to-accent-800/20 rounded-xl p-6 border border-accent-500/20">
        <h1 className="text-3xl font-bold text-white mb-2">
          Bon retour ! 👋
        </h1>
        <p className="text-dark-300">
          Vous avez {recentNotifications.length} nouvelles notifications et {stats.readingManga} séries en cours.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-400 text-sm">Total Manga</p>
              <p className="text-2xl font-bold text-white">{stats.totalManga}</p>
            </div>
            <BookOpenIcon className="w-8 h-8 text-accent-500" />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-400 text-sm">Chapitres Lus</p>
              <p className="text-2xl font-bold text-white">{stats.chaptersRead}</p>
            </div>
            <ChartBarIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-400 text-sm">Terminés</p>
              <p className="text-2xl font-bold text-white">{stats.completedManga}</p>
            </div>
            <CheckCircleIcon className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-400 text-sm">Note Moyenne</p>
              <p className="text-2xl font-bold text-white">{stats.averageRating}/10</p>
            </div>
            <TrendingUpIcon className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Recent Notifications */}
      {recentNotifications.length > 0 && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center">
              <FireIcon className="w-6 h-6 text-accent-500 mr-2" />
              Nouveaux Chapitres
            </h2>
            <span className="text-accent-500 text-sm font-medium">
              {recentNotifications.length} nouveau{recentNotifications.length > 1 ? 'x' : ''}
            </span>
          </div>
          
          <div className="space-y-3">
            {recentNotifications.map((notification) => (
              <div key={notification.id} className="flex items-center justify-between p-3 bg-dark-800 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-white">{notification.title}</h3>
                  <p className="text-dark-400 text-sm">{notification.message}</p>
                  <p className="text-dark-500 text-xs mt-1">
                    {format(notification.timestamp, 'dd MMM à HH:mm', { locale: fr })}
                  </p>
                </div>
                <button className="btn-primary text-sm">
                  Lire
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Continue Reading */}
      {recentlyRead.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <ClockIcon className="w-6 h-6 text-blue-500 mr-2" />
              Continuer la Lecture
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {recentlyRead.map((mangaItem) => (
              <MangaCard
                key={mangaItem.id}
                manga={mangaItem}
                onStatusChange={onStatusChange}
                onProgressUpdate={onProgressUpdate}
                onRatingChange={onRatingChange}
                onClick={onMangaClick}
              />
            ))}
          </div>
        </div>
      )}

      {/* Top Rated */}
      {topRated.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <TrendingUpIcon className="w-6 h-6 text-yellow-500 mr-2" />
              Mes Favoris
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topRated.map((mangaItem) => (
              <MangaCard
                key={mangaItem.id}
                manga={mangaItem}
                onStatusChange={onStatusChange}
                onProgressUpdate={onProgressUpdate}
                onRatingChange={onRatingChange}
                onClick={onMangaClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}