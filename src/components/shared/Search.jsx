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

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm({
    defaultValues: {
      search: searchParams.get("query") || "",
    },
    mode: "onChange",
  });

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
          keysToRemove: ["query"],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchParams, router]);

  const onSubmit = (data) => {
    console.log(data);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <CustomInput
                field={{...field, value: query, onChange: (e) => setQuery(e.target.value) }}
                type={"text"}
                placeholder={"Search"}
                label={<Image src={"/assets/search.svg"} alt={"search"} width={20} height={20} />}
              />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default Search