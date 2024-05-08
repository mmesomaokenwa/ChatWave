'use client'

import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';

const SavedPostFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selected, setSelected] = useState(
    searchParams.get("by") || "latest"
  );

  useEffect(() => {
    let newUrl;
    if (selected) {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "by",
        value: selected,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["by"],
      });
    }
    router.push(newUrl, { scroll: false });
  }, [selected, searchParams, router]);
  return (
    <Select
      defaultValue="latest"
      value={selected}
      onValueChange={setSelected}
    >
      <SelectTrigger className="w-fit text-sm lg:text-base font-medium border-0 gap-2 focus:ring-0 focus:ring-offset-0 ml-auto -mb-8">
        <SelectValue placeholder="Latest" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="latest">Latest</SelectItem>
        <SelectItem value="oldest">Oldest</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default SavedPostFilter