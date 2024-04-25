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
    name: "Tagged",
    value: "tagged",
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
      className="w-full"
      onValueChange={(value) => handleSelect(value)}
    >
      <TabsList className="lg:w-[400px] w-full justify-between overflow-x-auto">
        {profileTabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="grow">
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={selected}>
        <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-4">
          {selected === "posts" ? (
            user?.posts?.length === 0 ? (
              <p className="col-span-2 lg:col-span-3 text-center">No Posts Found</p>
            ) : (
              user?.posts?.map((post, index) => (
                <PostPreviewCard key={index} post={post} />
              ))
            )
          ) : null}
          {selected === "reels" && (
            <p className="col-span-2 lg:col-span-3 text-center">Reels</p>
          )}
          {selected === "tagged" && (
            <p className="col-span-2 lg:col-span-3 text-center">Tagged</p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default ProfileTabs