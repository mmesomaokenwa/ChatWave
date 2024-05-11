import { useNotifications } from '@/providers/NotificationsProvider';
import { Chip } from '@nextui-org/react';
import React, { useMemo } from 'react'

const NewNoticationsCount = () => {
  const { notifications } = useNotifications()
  
  const newNotifications = useMemo(() => notifications?.filter((notification) => notification?.seen === false), [notifications])

  return (
    <Chip
      color='danger'
      classNames={{
        base: `${newNotifications?.length === 0 && "hidden"}`,
        content: "text-xs font-bold text-white",
      }}
    >
      {newNotifications?.length}
    </Chip>
  );
}

export default NewNoticationsCount