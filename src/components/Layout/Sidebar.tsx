import React from 'react';
import { 
  HomeIcon, 
  BookOpenIcon, 
  BellIcon, 
  ChartBarIcon,
  Cog6ToothIcon,
  HeartIcon,
  ClockIcon,
  CheckCircleIcon,
  XMarkIcon,
  PauseIcon
} from '@heroicons/react/24/outline';
import { cn } from '../../utils/cn';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  unreadNotifications: number;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
  { id: 'library', label: 'Ma Bibliothèque', icon: BookOpenIcon },
  { id: 'notifications', label: 'Notifications', icon: BellIcon, hasNotification: true },
  { id: 'recommendations', label: 'Recommandations', icon: HeartIcon },
  { id: 'stats', label: 'Statistiques', icon: ChartBarIcon },
  { id: 'settings', label: 'Paramètres', icon: Cog6ToothIcon },
];

const statusItems = [
  { id: 'reading', label: 'En cours', icon: BookOpenIcon, color: 'text-blue-400' },
  { id: 'completed', label: 'Terminé', icon: CheckCircleIcon, color: 'text-green-400' },
  { id: 'to-read', label: 'À lire', icon: ClockIcon, color: 'text-yellow-400' },
  { id: 'on-hold', label: 'En pause', icon: PauseIcon, color: 'text-orange-400' },
  { id: 'dropped', label: 'Abandonné', icon: XMarkIcon, color: 'text-red-400' },
];

export function Sidebar({ activeTab, onTabChange, unreadNotifications }: SidebarProps) {
  return (
    <div className="w-64 bg-dark-900 border-r border-dark-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-dark-800">
        <h1 className="text-2xl font-bold text-white">
          Manga<span className="text-accent-500">Hub</span>
        </h1>
        <p className="text-dark-400 text-sm mt-1">Votre bibliothèque intelligente</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  'w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors duration-200',
                  isActive 
                    ? 'bg-accent-600 text-white' 
                    : 'text-dark-300 hover:text-white hover:bg-dark-800'
                )}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
                {item.hasNotification && unreadNotifications > 0 && (
                  <span className="ml-auto bg-accent-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Status Filters */}
        <div className="pt-6">
          <h3 className="text-dark-400 text-sm font-medium mb-3 px-3">STATUTS DE LECTURE</h3>
          <div className="space-y-1">
            {statusItems.map((item) => {
              const Icon = item.icon;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(`status-${item.id}`)}
                  className={cn(
                    'w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors duration-200',
                    activeTab === `status-${item.id}`
                      ? 'bg-dark-800 text-white'
                      : 'text-dark-400 hover:text-white hover:bg-dark-800'
                  )}
                >
                  <Icon className={cn('w-4 h-4 mr-3', item.color)} />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-dark-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent-600 rounded-full flex items-center justify-center">
            <span className="text-white font-medium">U</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium truncate">Utilisateur</p>
            <p className="text-dark-400 text-sm">Lecteur passionné</p>
          </div>
        </div>
      </div>
    </div>
  );
}