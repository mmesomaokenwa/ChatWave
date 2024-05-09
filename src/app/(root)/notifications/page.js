import NotificationsList from '@/components/shared/NotificationsList'
import authOptions from '@/lib/authOptions'
import { markAllMessagesRead } from '@/lib/mongodb/actions/chat.actions'
import { getNotifications, markAllNotificationsSeen } from '@/lib/mongodb/actions/notification.action'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import React from 'react'

const Notifications = async () => {
  const user = await getServerSession(authOptions).then((res) => res?.user)
  const [notifications, isSeen] = await Promise.all([
    getNotifications(user?.id),
    markAllNotificationsSeen(user?.id),
  ]);
  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 items-center gap-10 overflow-y-scroll py-24 px-5 md:px-8 lg:p-14">
        <div className="max-w-5xl w-full flex justify-start gap-3">
          <Image
            src="/assets/notifications.svg"
            alt="notifications"
            height={36}
            width={36}
            className="invert brightness-200 dark:brightness-0"
          />
          <h2 className="text-3xl md:text-2xl font-bold">Notifications</h2>
        </div>
        {/* <SavedPostFilter /> */}
        <NotificationsList notifications={notifications} sessionUser={user} isSeen={isSeen} />
      </div>
    </div>
  );
}

export default Notifications