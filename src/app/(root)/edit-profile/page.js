import ProfileForm from '@/components/shared/ProfileForm'
import authOptions from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import React from 'react'

const EditProfile = async () => {
  const sessionUser = await getServerSession(authOptions).then(res => res?.user)
  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 items-center gap-10 overflow-y-scroll py-8 px-5 md:px-8 lg:p-14">
        <div className='"max-w-5xl w-full flex justify-start gap-3'>
          <Image
            src="/assets/edit.svg"
            alt="edit"
            height={36}
            width={36}
            className="invert brightness-200 dark:brightness-0"
          />
          <h2 className="text-3xl md:text-2xl font-bold">Edit Profile</h2>
        </div>
        <ProfileForm user={sessionUser} />
      </div>
    </div>
  );
}

export default EditProfile