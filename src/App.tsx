import React, { useState } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { Dashboard } from './components/Dashboard';
import { Library } from './components/Library';
import { Notifications } from './components/Notifications';
import { Recommendations } from './components/Recommendations';
import { useManga } from './hooks/useManga';
import { Manga } from './types/manga';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedManga, setSelectedManga] = useState<Manga | null>(null);
  
  const {
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
  } = useManga();

  const unreadNotifications = notifications.filter(n => !n.isRead).length;
  const stats = getStats();

  const handleAddManga = () => {
    // This would open a modal or form to add new manga
    console.log('Add manga clicked');
  };

  const handleMangaClick = (manga: Manga) => {
    setSelectedManga(manga);
    // This would open a detailed view modal
    console.log('Manga clicked:', manga);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            manga={manga}
            notifications={notifications}
            stats={stats}
            onStatusChange={updateMangaStatus}
            onProgressUpdate={updateMangaProgress}
            onRatingChange={updateMangaRating}
            onMangaClick={handleMangaClick}
          />
        );
      
      case 'library':
        return (
          <Library
            manga={manga}
            searchQuery={searchQuery}
            onStatusChange={updateMangaStatus}
            onProgressUpdate={updateMangaProgress}
            onRatingChange={updateMangaRating}
            onMangaClick={handleMangaClick}
          />
        );
      
      case 'notifications':
        return (
          <Notifications
            notifications={notifications}
            onMarkAsRead={markNotificationAsRead}
          />
        );
      
      case 'recommendations':
        return (
          <Recommendations
            recommendations={recommendations}
            onAddToLibrary={addManga}
            onMangaClick={handleMangaClick}
          />
        );
      
      default:
        // Handle status filters
        if (activeTab.startsWith('status-')) {
          return (
            <Library
              manga={manga}
              searchQuery={searchQuery}
              onStatusChange={updateMangaStatus}
              onProgressUpdate={updateMangaProgress}
              onRatingChange={updateMangaRating}
              onMangaClick={handleMangaClick}
              statusFilter={activeTab}
            />
          );
        }
        
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Fonctionnalité en développement
            </h2>
            <p className="text-dark-400">
              Cette section sera bientôt disponible.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 flex">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        unreadNotifications={unreadNotifications}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header
          onAddManga={handleAddManga}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          unreadNotifications={unreadNotifications}
        />
        
        <main className="flex-1 p-6 overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500"></div>
            </div>
          ) : (
            renderContent()
          )}
        </main>
      </div>
    </div>
  );
}

export default App;