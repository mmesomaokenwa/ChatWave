import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { searchForUsers } from '@/lib/mongodb/actions/user.actions';
import { Input } from '@nextui-org/react';

const SearchUsers = ({ setUsers }) => {
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

  return (
    <Input
      type={"text"}
      placeholder={"Search Users"}
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

export default SearchUsers