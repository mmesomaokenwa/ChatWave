'use client'

import React, { useState } from 'react'
import PostPreviewCard from './PostPreviewCard';
import { Tab, Tabs } from '@nextui-org/react';

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
    <div className='w-full flex flex-col'>
      <Tabs
        aria-label="Options"
        selectedKey={selected}
        onSelectionChange={handleSelect}
        classNames={{
          tabList: "lg:w-[400px] w-full",
          tab: "w-full hover:text-default",
          panel: "w-full grid grid-cols-2 lg:grid-cols-3 gap-4",
        }}
      >
        {profileTabs.map((tab) => (
          <Tab key={tab.value} title={tab.name}>
            <>
              {selected === "posts" ? (
                user?.posts?.length === 0 ? (
                  <p className="col-span-2 lg:col-span-3 text-center">
                    No Posts Found
                  </p>
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
            </>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}

export default ProfileTabs