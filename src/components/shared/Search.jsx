'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
} from "@/components/ui/form"
import CustomInput from './CustomInput';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { Input } from '@nextui-org/react';

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("query") || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";

      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["query", "tab"],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchParams, router]);

  return (
    <Input
      type={"text"}
      placeholder={"Search"}
      startContent={
        <Image
          src={"/assets/search.svg"}
          alt={"search"}
          width={20}
          height={20}
        />
      }
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onClear={() => setQuery("")}
      isClearable
      classNames={{
        input: "bg-transparent",
        inputWrapper:
          "dark:bg-default/40 dark:hover:bg-default/50 dark:group-data-[focus=true]:bg-default/50",
        innerWrapper: "bg-transparent",
      }}
    />
  );
}

export default Search