'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import PostPreviewCard from './PostPreviewCard';
import UserPreviewCard from './UserPreviewCard';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { useSearchPosts, useSearchUsers } from '@/lib/react-query/queries';
import Loader from './Loader';
import { Tab, Tabs } from '@nextui-org/react';

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

const SearchResultsTab = ({ query }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selected, setSelected] = useState(searchParams.get("tab") || searchTabs[0].value)
  const { data: posts, isLoading: isLoadingPosts } = useSearchPosts({
    query,
    tab: selected,
  })
  const { data: users, isLoading: isLoadingUsers } = useSearchUsers({
    query,
    tab: selected,
  })

  const showPosts = selected !== 'accounts'

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
    if (query) {
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
    <div className="flex flex-col w-full">
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
        {searchTabs.map((tab) => (
          <Tab key={tab.value} title={tab.name}>
            <>
              {showPosts ? (
                isLoadingPosts ? (
                  <div className="col-span-2 lg:col-span-3">
                    <Loader className={"mx-auto mt-12"} />
                  </div>
                ) : posts?.length === 0 ? (
                  <p className="col-span-2 lg:col-span-3 text-center">
                    No results found
                  </p>
                ) : (
                  posts?.map((post, index) => (
                    <PostPreviewCard key={index} post={post} />
                  ))
                )
              ) : null}
              {!showPosts ? (
                isLoadingUsers ? (
                  <div className="col-span-2 lg:col-span-3">
                    <Loader width={30} height={30} className={"mx-auto mt-8"} />
                  </div>
                ) : users?.length === 0 ? (
                  <p className="col-span-2 lg:col-span-3 text-center">
                    No results found
                  </p>
                ) : (
                  users?.map((user, index) => (
                    <UserPreviewCard key={index} user={user} />
                  ))
                )
              ) : null}
            </>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}

export default SearchResultsTab