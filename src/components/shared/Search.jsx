'use client'

import React from 'react'
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
} from "@/components/ui/form"
import CustomInput from './CustomInput';
import Image from 'next/image';

const Search = () => {
  const form = useForm({
    defaultValues: {
      search: "",
    },
    mode: "all",
  });

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
                field={field}
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