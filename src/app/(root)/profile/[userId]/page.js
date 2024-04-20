import ProfileCard from '@/components/shared/ProfileCard'
import ProfileTabs from '@/components/shared/ProfileTabs'
import authOptions from '@/lib/authOptions'
import { getUserById } from '@/lib/mongodb/actions/user.actions'
import { getServerSession } from 'next-auth'
import React from 'react'

const Profile = async ({ params: { userId } }) => {
  const sessionUser = await getServerSession(authOptions).then(res => res?.user)
  
  const user = await getUserById(userId)
  console.log({ user })
  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 items-center gap overflow-y-scroll py-8 px-5 md:px-8 lg:p-14 relative">
        <ProfileCard user={user} sessionUser={sessionUser} />
        <ProfileTabs user={user} />
      </div>
    </div>
  );
}

export default Profile