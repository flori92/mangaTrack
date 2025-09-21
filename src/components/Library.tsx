import React, { useState, useMemo } from 'react';
import { 
  FunnelIcon, 
  Squares2X2Icon, 
  ListBulletIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';
import { Manga, ReadingStatus } from '../types/manga';
import { MangaCard } from './MangaCard';
import { cn } from '../utils/cn';

interface LibraryProps {
  manga: Manga[];
  searchQuery: string;
  onStatusChange: (id: string, status: ReadingStatus) => void;
  onProgressUpdate: (id: string, chapter: number) => void;
  onRatingChange: (id: string, rating: number) => void;
  onMangaClick: (manga: Manga) => void;
  statusFilter?: string;
}

type SortOption = 'title' | 'dateAdded' | 'lastRead' | 'rating' | 'progress';
type ViewMode = 'grid' | 'list';

export function Library({ 
  manga, 
  searchQuery, 
  onStatusChange, 
  onProgressUpdate, 
  onRatingChange,
  onMangaClick,
  statusFilter 
}: LibraryProps) {
  const [sortBy, setSortBy] = useState<SortOption>('lastRead');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Get all unique genres
  const allGenres = useMemo(() => {
    const genres = new Set<string>();
    manga.forEach(m => m.genres.forEach(g => genres.add(g)));
    return Array.from(genres).sort();
  }, [manga]);

  // Filter and sort manga
  const filteredManga = useMemo(() => {
    let filtered = manga;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(m => 
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.genres.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Status filter
    if (statusFilter && statusFilter.startsWith('status-')) {
      const status = statusFilter.replace('status-', '') as ReadingStatus;
      filtered = filtered.filter(m => m.status === status);
    }

    // Genre filter
    if (selectedGenres.length > 0) {
      filtered = filtered.filter(m => 
        selectedGenres.some(genre => m.genres.includes(genre))
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'dateAdded':
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        case 'lastRead':
          return new Date(b.lastRead).getTime() - new Date(a.lastRead).getTime();
        case 'rating':
          return b.rating - a.rating;
        case 'progress':
          const progressA = a.totalChapters > 0 ? a.currentChapter / a.totalChapters : 0;
          const progressB = b.totalChapters > 0 ? b.currentChapter / b.totalChapters : 0;
          return progressB - progressA;
        default:
          return 0;
      }
    });

    return filtered;
  }, [manga, searchQuery, statusFilter, selectedGenres, sortBy]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Ma Bibliothèque</h1>
          <p className="text-dark-400 mt-1">
            {filteredManga.length} manga{filteredManga.length > 1 ? 's' : ''} 
            {statusFilter && statusFilter.startsWith('status-') && (
              <span> • {statusFilter.replace('status-', '').replace('-', ' ')}</span>
            )}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {/* View Mode Toggle */}
          <div className="flex bg-dark-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'p-2 rounded transition-colors',
                viewMode === 'grid' ? 'bg-accent-600 text-white' : 'text-dark-400 hover:text-white'
              )}
            >
              <Squares2X2Icon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'p-2 rounded transition-colors',
                viewMode === 'list' ? 'bg-accent-600 text-white' : 'text-dark-400 hover:text-white'
              )}
            >
              <ListBulletIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Filters Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'btn-secondary flex items-center space-x-2',
              showFilters && 'bg-accent-600 hover:bg-accent-700 border-accent-600'
            )}
          >
            <AdjustmentsHorizontalIcon className="w-5 h-5" />
            <span>Filtres</span>
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="card p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sort Options */}
            <div>
              <label className="block text-white font-medium mb-2">Trier par</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="input w-full"
              >
                <option value="lastRead">Dernière lecture</option>
                <option value="title">Titre</option>
                <option value="dateAdded">Date d'ajout</option>
                <option value="rating">Note</option>
                <option value="progress">Progression</option>
              </select>
            </div>

            {/* Genre Filter */}
            <div>
              <label className="block text-white font-medium mb-2">Genres</label>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {allGenres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => toggleGenre(genre)}
                    className={cn(
                      'px-3 py-1 rounded-full text-sm transition-colors',
                      selectedGenres.includes(genre)
                        ? 'bg-accent-600 text-white'
                        : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
                    )}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {selectedGenres.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-dark-400 text-sm">Filtres actifs:</span>
              {selectedGenres.map((genre) => (
                <span
                  key={genre}
                  className="bg-accent-600 text-white px-2 py-1 rounded text-xs flex items-center space-x-1"
                >
                  <span>{genre}</span>
                  <button
                    onClick={() => toggleGenre(genre)}
                    className="hover:bg-accent-700 rounded-full w-4 h-4 flex items-center justify-center"
                  >
                    ×
                  </button>
                </span>
              ))}
              <button
                onClick={() => setSelectedGenres([])}
                className="text-accent-400 hover:text-accent-300 text-sm"
              >
                Effacer tout
              </button>
            </div>
          )}
        </div>
      )}

      {/* Manga Grid/List */}
      {filteredManga.length === 0 ? (
        <div className="text-center py-12">
          <FunnelIcon className="w-16 h-16 text-dark-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">Aucun manga trouvé</h3>
          <p className="text-dark-400">
            Essayez de modifier vos filtres ou votre recherche.
          </p>
        </div>
      ) : (
        <div className={cn(
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6'
            : 'space-y-4'
        )}>
          {filteredManga.map((mangaItem) => (
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
      )}
    </div>
  );
}