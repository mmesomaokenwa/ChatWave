import NotificationCard from '@/components/shared/NotificationCard'
import authOptions from '@/lib/authOptions'
import { getNotifications } from '@/lib/mongodb/actions/notification.action'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import React from 'react'

const Notifications = async () => {
  const user = await getServerSession(authOptions).then((res) => res?.user)
  const notifications = await getNotifications(user?.id)
  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 items-center gap-10 overflow-y-scroll py-8 px-5 md:px-8 lg:p-14">
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
        <div className="w-full flex flex-col gap-2">
          {notifications?.map((notification) => (
            <NotificationCard key={notification._id} notification={notification} sessionUser={user} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notifications