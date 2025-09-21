import React from 'react';
import { MagnifyingGlassIcon, PlusIcon, BellIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  onAddManga: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  unreadNotifications: number;
}

export function Header({ onAddManga, searchQuery, onSearchChange, unreadNotifications }: HeaderProps) {
  return (
    <header className="bg-dark-900 border-b border-dark-800 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
            <input
              type="text"
              placeholder="Rechercher un manga, manhwa..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button className="btn-primary flex items-center space-x-2" onClick={onAddManga}>
            <PlusIcon className="w-5 h-5" />
            <span>Ajouter</span>
          </button>
          
          <button className="relative p-2 text-dark-400 hover:text-white transition-colors">
            <BellIcon className="w-6 h-6" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}