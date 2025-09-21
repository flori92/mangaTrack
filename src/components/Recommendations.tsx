import React from 'react';
import { 
  HeartIcon, 
  SparklesIcon,
  PlusIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Recommendation, Manga } from '../types/manga';
import { MangaCard } from './MangaCard';

interface RecommendationsProps {
  recommendations: Recommendation[];
  onAddToLibrary: (manga: Manga) => void;
  onMangaClick: (manga: Manga) => void;
}

export function Recommendations({ recommendations, onAddToLibrary, onMangaClick }: RecommendationsProps) {
  const handleAddToLibrary = (manga: Manga) => {
    onAddToLibrary({
      ...manga,
      status: 'to-read',
      currentChapter: 0,
      dateAdded: new Date(),
      lastRead: new Date(),
      notes: '',
      rating: 0
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center">
            <SparklesIcon className="w-8 h-8 text-accent-500 mr-3" />
            Recommandations IA
          </h1>
          <p className="text-dark-400 mt-1">
            Découvrez de nouveaux manga basés sur vos goûts
          </p>
        </div>
      </div>

      {/* Recommendations Grid */}
      {recommendations.length > 0 ? (
        <div className="space-y-8">
          {recommendations.map((recommendation) => (
            <div key={recommendation.manga.id} className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center bg-accent-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      <HeartSolidIcon className="w-4 h-4 mr-1" />
                      {Math.round(recommendation.score * 100)}% compatible
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-1">
                    {recommendation.manga.title}
                  </h3>
                  
                  <p className="text-dark-300 mb-2">
                    par {recommendation.manga.author}
                  </p>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <InformationCircleIcon className="w-4 h-4 text-accent-500" />
                    <span className="text-accent-400 text-sm font-medium">
                      {recommendation.reason}
                    </span>
                  </div>
                  
                  <p className="text-dark-400 text-sm mb-3">
                    Basé sur: {recommendation.basedOn.join(', ')}
                  </p>
                  
                  <p className="text-dark-300 text-sm leading-relaxed">
                    {recommendation.manga.description}
                  </p>
                </div>
                
                <div className="ml-6 flex-shrink-0">
                  <div className="w-32 aspect-[3/4] rounded-lg overflow-hidden mb-3">
                    <img
                      src={recommendation.manga.cover}
                      alt={recommendation.manga.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <button
                    onClick={() => handleAddToLibrary(recommendation.manga)}
                    className="btn-primary w-full text-sm flex items-center justify-center space-x-1"
                  >
                    <PlusIcon className="w-4 h-4" />
                    <span>Ajouter</span>
                  </button>
                </div>
              </div>
              
              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-4">
                {recommendation.manga.genres.map((genre) => (
                  <span
                    key={genre}
                    className="bg-dark-800 text-dark-300 px-2 py-1 rounded text-xs"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {recommendation.manga.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-accent-900/30 text-accent-300 px-2 py-1 rounded text-xs border border-accent-700/30"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <SparklesIcon className="w-16 h-16 text-dark-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">Aucune recommandation</h3>
          <p className="text-dark-400">
            Ajoutez plus de manga à votre bibliothèque pour recevoir des recommandations personnalisées.
          </p>
        </div>
      )}

      {/* How it works */}
      <div className="card p-6 bg-dark-800/50">
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
          <InformationCircleIcon className="w-5 h-5 text-accent-500 mr-2" />
          Comment ça marche ?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-dark-300">
          <div>
            <h4 className="font-medium text-white mb-1">Analyse de vos goûts</h4>
            <p>Notre IA analyse vos notes, genres préférés et habitudes de lecture.</p>
          </div>
          <div>
            <h4 className="font-medium text-white mb-1">Algorithme hybride</h4>
            <p>Combinaison de filtrage collaboratif et d'analyse de contenu pour plus de précision.</p>
          </div>
          <div>
            <h4 className="font-medium text-white mb-1">Apprentissage continu</h4>
            <p>Les recommandations s'améliorent au fur et à mesure que vous utilisez l'app.</p>
          </div>
        </div>
      </div>
    </div>
  );
}