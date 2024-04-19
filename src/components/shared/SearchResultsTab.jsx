'use client'

import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from 'next/navigation';
import PostPreviewCard from './PostPreviewCard';
import UserPreviewCard from './UserPreviewCard';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';

const searchTabs = [
  {
    name: "Accounts",
    value: "accounts",
  },
  {
    name: "Tags",
    value: "tags",
  },
  {
    name: "Locations",
    value: "locations",
  },
  {
    name: "Captions",
    value: "captions",
  }
]

const SearchResultsTab = ({ searchedPosts, searchedUsers }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selected, setSelected] = useState(searchParams.get("tab") || searchTabs[0].value)

  const showPosts = selected !== 'accounts'
  const posts = selected === 'tags' ? searchedPosts?.tags : selected === 'locations' ? searchedPosts?.locations : searchedPosts?.captions

  useEffect(() => {
    if (searchParams.has("tab")) {
      setSelected(searchParams.get("tab"))
    } else {
      setSelected(searchTabs[0].value)
    }
  }, [searchParams])

  const handleSelect = (value) => {
    setSelected(value)

    let newUrl = '';
    if (searchParams.get('query')) {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "tab",
        value,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["tab"],
      })
    }

    router.push(newUrl, { scroll: false });
  }
  return (
    <Tabs
      defaultValue={selected}
      className="lg:w-[400px] w-full"
      onValueChange={(value) => handleSelect(value)}
    >
      <TabsList className="w-full justify-between overflow-x-auto">
        {searchTabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={selected}>
        <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-4">
          {showPosts
            ? posts?.length === 0 ? (
              <p className="">No results found</p>
            )
            : posts?.map((post, index) => (
            <PostPreviewCard key={index} post={post} />
          )) : searchedUsers?.length === 0 ? (
            <p className="">No results found</p>
          ) : searchedUsers?.map((user, index) => (
            <UserPreviewCard key={index} user={user} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default SearchResultsTab