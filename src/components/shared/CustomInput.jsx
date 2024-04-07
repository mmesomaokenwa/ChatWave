'use client'

import { FormControl, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

const CustomInput = ({ field, label, placeholder, type }) => {
  return (
    <FormItem className="grid gap-1 w-full">
      {typeof label === "string" && <FormLabel>{label}</FormLabel>}
      <FormControl className="w-full rounded-lg">
        <div
          className="flex items-center justify-between px-4 h-[3rem] bg-gray-100 dark:bg-gray-700
                  focus-within:ring-2 focus-within:ring-accent"
        >
          {typeof label !== "string" && <FormLabel>{label}</FormLabel>}
          <Input
            type={type}
            className="bg-gray-100 dark:bg-gray-700 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder={placeholder}
            {...field}
          />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

export default CustomInput