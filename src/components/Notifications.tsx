import React from 'react';
import { 
  BellIcon, 
  CheckIcon, 
  ClockIcon,
  ExternalLinkIcon
} from '@heroicons/react/24/outline';
import { Notification } from '../types/manga';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '../utils/cn';

interface NotificationsProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}

export function Notifications({ notifications, onMarkAsRead }: NotificationsProps) {
  const unreadNotifications = notifications.filter(n => !n.isRead);
  const readNotifications = notifications.filter(n => n.isRead);

  const handleReadChapter = (notification: Notification) => {
    onMarkAsRead(notification.id);
    // Open the chapter URL
    window.open(notification.directUrl, '_blank');
  };

  const NotificationCard = ({ notification }: { notification: Notification }) => (
    <div className={cn(
      'card p-4 transition-all duration-200',
      !notification.isRead && 'border-accent-500/50 bg-accent-950/20'
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <BellIcon className={cn(
              'w-5 h-5',
              notification.isRead ? 'text-dark-400' : 'text-accent-500'
            )} />
            <h3 className={cn(
              'font-medium',
              notification.isRead ? 'text-dark-300' : 'text-white'
            )}>
              {notification.title}
            </h3>
            {!notification.isRead && (
              <div className="w-2 h-2 bg-accent-500 rounded-full" />
            )}
          </div>
          
          <p className={cn(
            'text-sm mb-2',
            notification.isRead ? 'text-dark-400' : 'text-dark-300'
          )}>
            {notification.message}
          </p>
          
          <div className="flex items-center space-x-4 text-xs text-dark-500">
            <div className="flex items-center space-x-1">
              <ClockIcon className="w-3 h-3" />
              <span>{format(notification.timestamp, 'dd MMM à HH:mm', { locale: fr })}</span>
            </div>
            <span className="capitalize">{notification.platform}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          {!notification.isRead && (
            <button
              onClick={() => onMarkAsRead(notification.id)}
              className="p-2 text-dark-400 hover:text-white transition-colors"
              title="Marquer comme lu"
            >
              <CheckIcon className="w-4 h-4" />
            </button>
          )}
          
          <button
            onClick={() => handleReadChapter(notification)}
            className="btn-primary text-sm flex items-center space-x-1"
          >
            <span>Lire</span>
            <ExternalLinkIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Notifications</h1>
          <p className="text-dark-400 mt-1">
            {unreadNotifications.length} notification{unreadNotifications.length > 1 ? 's' : ''} non lue{unreadNotifications.length > 1 ? 's' : ''}
          </p>
        </div>
        
        {unreadNotifications.length > 0 && (
          <button
            onClick={() => unreadNotifications.forEach(n => onMarkAsRead(n.id))}
            className="btn-secondary flex items-center space-x-2"
          >
            <CheckIcon className="w-4 h-4" />
            <span>Tout marquer comme lu</span>
          </button>
        )}
      </div>

      {/* Unread Notifications */}
      {unreadNotifications.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <div className="w-2 h-2 bg-accent-500 rounded-full mr-2" />
            Nouvelles notifications
          </h2>
          <div className="space-y-3">
            {unreadNotifications.map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
          </div>
        </div>
      )}

      {/* Read Notifications */}
      {readNotifications.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-dark-300 mb-4">
            Notifications lues
          </h2>
          <div className="space-y-3">
            {readNotifications.map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {notifications.length === 0 && (
        <div className="text-center py-12">
          <BellIcon className="w-16 h-16 text-dark-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">Aucune notification</h3>
          <p className="text-dark-400">
            Vous recevrez des notifications quand de nouveaux chapitres sortent.
          </p>
        </div>
      )}
    </div>
  );
}