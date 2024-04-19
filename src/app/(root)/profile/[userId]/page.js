import ProfileCard from '@/components/shared/ProfileCard'
import authOptions from '@/lib/authOptions'
import { getUserById } from '@/lib/mongodb/actions/user.actions'
import { getServerSession } from 'next-auth'
import React from 'react'

const Profile = async ({ params: { userId } }) => {
  const sessionUser = await getServerSession(authOptions).then(res => res?.user)
  
  const user = await getUserById(userId)
  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 items-center gap overflow-y-scroll py-8 px-5 md:px-8 lg:p-14 relative">
        <ProfileCard user={user} sessionUser={sessionUser} />
        <div className="sticky top-[-2rem] w-full flex gap-2 mb-2 justify-between z-10 bg-light dark:bg-dark *:grow *:text-center *:py-4 font-bold">
        </div>
      </div>
    </div>
  );
}

export default Profile