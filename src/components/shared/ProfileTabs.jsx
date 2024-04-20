'use client'

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostPreviewCard from './PostPreviewCard';

const profileTabs = [
  {
    name: "Posts",
    value: "posts",
  },
  {
    name: "Reels",
    value: "reels",
  },
  {
    name: "Saved",
    value: "saved",
  }
]

const ProfileTabs = ({ user }) => {
  const [selected, setSelected] = useState(profileTabs[0].value)

  const handleSelect = (value) => {
    setSelected(value)
  }
  return (
    <Tabs
      defaultValue={selected}
      className="lg:w-[400px] w-full"
      onValueChange={(value) => handleSelect(value)}
    >
      <TabsList className="w-full justify-between overflow-x-auto">
        {profileTabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className='grow'>
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={selected}>
        <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-4">
          {selected === 'posts'
            ? user?.posts?.length === 0
            ? <p className="col-span-2 text-center">No Posts Found</p>
            : user?.posts?.map((post, index) => (
              <PostPreviewCard key={index} post={post} />
            ))
            : null
          }
          {selected === 'reels' && (
            <p className="col-span-2 text-center">Reels</p>
          )}
          {selected === 'saved' && (
            <p className="col-span-2 text-center">Saved</p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default ProfileTabs