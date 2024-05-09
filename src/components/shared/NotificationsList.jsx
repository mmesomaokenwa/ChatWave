'use client'

import React, { useEffect } from 'react'
import NotificationCard from './NotificationCard';
import { useNotifications } from '@/providers/NotificationsProvider';

const NotificationsList = ({ notifications, sessionUser, isSeen }) => {
  const { notifications: notificationsList, setNotifications } = useNotifications()
  
  useEffect(() => {
    setNotifications(notifications)

    if (isSeen) {
      setNotifications(() => notifications?.map((notification) => ({ ...notification, seen: true })))
    }
  }, [notifications])
  return (
    <div className="w-full flex flex-col gap-2">
      {notificationsList?.map((notification) => (
        <NotificationCard
          key={notification._id}
          notification={notification}
          sessionUser={sessionUser}
        />
      ))}
    </div>
  );
}

export default NotificationsList