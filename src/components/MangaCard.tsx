import React from 'react';
import { StarIcon, ClockIcon, BookOpenIcon } from '@heroicons/react/24/solid';
import { EyeIcon, PlayIcon } from '@heroicons/react/24/outline';
import { Manga, ReadingStatus } from '../types/manga';
import { cn } from '../utils/cn';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface MangaCardProps {
  manga: Manga;
  onStatusChange: (id: string, status: ReadingStatus) => void;
  onProgressUpdate: (id: string, chapter: number) => void;
  onRatingChange: (id: string, rating: number) => void;
  onClick: (manga: Manga) => void;
}

const statusConfig = {
  'to-read': { label: 'À lire', color: 'bg-yellow-500', textColor: 'text-yellow-100' },
  'reading': { label: 'En cours', color: 'bg-blue-500', textColor: 'text-blue-100' },
  'completed': { label: 'Terminé', color: 'bg-green-500', textColor: 'text-green-100' },
  'dropped': { label: 'Abandonné', color: 'bg-red-500', textColor: 'text-red-100' },
  'on-hold': { label: 'En pause', color: 'bg-orange-500', textColor: 'text-orange-100' },
};

export function MangaCard({ manga, onStatusChange, onProgressUpdate, onRatingChange, onClick }: MangaCardProps) {
  const progressPercentage = manga.totalChapters > 0 ? (manga.currentChapter / manga.totalChapters) * 100 : 0;
  const statusInfo = statusConfig[manga.status];

  const handleQuickRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Simulate reading next chapter
    if (manga.currentChapter < manga.totalChapters) {
      onProgressUpdate(manga.id, manga.currentChapter + 1);
    }
  };

  return (
    <div className="manga-card group" onClick={() => onClick(manga)}>
      {/* Cover Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={manga.cover}
          alt={manga.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-2">
            <button
              onClick={handleQuickRead}
              className="bg-accent-600 hover:bg-accent-700 text-white p-2 rounded-full transition-colors"
              title="Lire le prochain chapitre"
            >
              <PlayIcon className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick(manga);
              }}
              className="bg-dark-700 hover:bg-dark-600 text-white p-2 rounded-full transition-colors"
              title="Voir les détails"
            >
              <EyeIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status Badge */}
        <div className={cn(
          'absolute top-2 left-2 status-badge',
          statusInfo.color,
          statusInfo.textColor
        )}>
          {statusInfo.label}
        </div>

        {/* Type Badge */}
        <div className="absolute top-2 right-2 bg-dark-800/80 text-white px-2 py-1 rounded text-xs font-medium">
          {manga.type.toUpperCase()}
        </div>

        {/* Progress Bar */}
        {manga.status === 'reading' && (
          <div className="absolute bottom-0 left-0 right-0 bg-dark-900/80 p-2">
            <div className="flex items-center justify-between text-xs text-white mb-1">
              <span>{manga.currentChapter}/{manga.totalChapters}</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-dark-700 rounded-full h-1">
              <div
                className="bg-accent-500 h-1 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-white text-lg mb-1 line-clamp-2 group-hover:text-accent-400 transition-colors">
          {manga.title}
        </h3>
        
        <p className="text-dark-400 text-sm mb-2">{manga.author}</p>

        {/* Rating */}
        {manga.rating > 0 && (
          <div className="flex items-center space-x-1 mb-2">
            <StarIcon className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 font-medium text-sm">{manga.rating}/10</span>
          </div>
        )}

        {/* Genres */}
        <div className="flex flex-wrap gap-1 mb-3">
          {manga.genres.slice(0, 3).map((genre) => (
            <span
              key={genre}
              className="bg-dark-800 text-dark-300 px-2 py-1 rounded text-xs"
            >
              {genre}
            </span>
          ))}
          {manga.genres.length > 3 && (
            <span className="text-dark-400 text-xs">+{manga.genres.length - 3}</span>
          )}
        </div>

        {/* Last Read */}
        <div className="flex items-center text-dark-400 text-xs">
          <ClockIcon className="w-3 h-3 mr-1" />
          <span>
            {format(manga.lastRead, 'dd MMM yyyy', { locale: fr })}
          </span>
        </div>
      </div>
    </div>
  );
}