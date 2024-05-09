import { useNotifications } from '@/providers/NotificationsProvider';
import React, { useMemo } from 'react'

const NewNoticationsCount = () => {
  const { notifications } = useNotifications()
  
  const newNotifications = useMemo(() => notifications?.filter((notification) => notification?.seen === false), [notifications])

  return (
    <div
      className={`flex items-center justify-center rounded-lg bg-destructive h-6 p-2 lg:p-4 ${
        newNotifications?.length === 0 && "hidden"
      }`}
    >
      <p className="text-xs font-bold text-white">{newNotifications?.length}</p>
    </div>
  );
}

export default NewNoticationsCount