'use client'

import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { revalidate } from '@/lib';

const PostCardListFilter = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selected, setSelected] = useState(searchParams.get('date') || 'view all')

  useEffect(() => {
    let newUrl
    if (selected === "view all") {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ['date']
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "date",
        value: selected
       })
    }
    router.push(newUrl, { scroll: false })
  }, [selected, searchParams, router])
  return (
    <Select defaultValue='view all' value={selected} onValueChange={setSelected}>
      <SelectTrigger className="w-fit text-sm lg:text-base font-medium border-0 gap-2 focus:ring-0 focus:ring-offset-0">
        <SelectValue placeholder="View All" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="view all">View All</SelectItem>
        <SelectItem value="today">Today</SelectItem>
        <SelectItem value="yesterday">Yesterday</SelectItem>
        <SelectItem value="last week">Last Week</SelectItem>
        <SelectItem value="last month">Last Month</SelectItem>
        <SelectItem value="last year">Last Year</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default PostCardListFilter