import React, { useEffect, useState } from 'react'
import { Form, FormField, FormItem } from '../ui/form';
import CustomInput from './CustomInput';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { searchForUsers } from '@/lib/mongodb/actions/user.actions';

const SearchUsers = ({ setUsers }) => {
  const form = useForm({
    defaultValues: {
      search: "",
    },
    mode: "onChange",
  });

  const [query, setQuery] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => { 
      if (!query) return setUsers([])

      const getUsers = async () => {
        const response = await searchForUsers(query)
        setUsers(response)
      }

      getUsers()
    }, 3000)

    return () => clearTimeout(delayDebounceFn)
  }, [query])

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
                field={{
                  ...field,
                  value: query,
                  onChange: (e) => setQuery(e.target.value),
                }}
                type={"text"}
                placeholder={"Search Users"}
                label={
                  <Image
                    src={"/assets/search.svg"}
                    alt={"search"}
                    width={20}
                    height={20}
                  />
                }
              />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default SearchUsers