'use client'

import { FormControl, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const CustomInput = ({ field, label, placeholder, type, isTextArea, error }) => {
  return (
    <FormItem className="grid gap-1 w-full">
      {typeof label === "string" && <FormLabel>{label}</FormLabel>}
      <FormControl className="w-full rounded-lg">
        <div
          className={`flex items-center justify-between px-4 bg-gray-100 dark:bg-light-dark
          focus-within:ring-2 focus-within:ring-accent ${
            error && "ring-2 ring-red-500 focus-within:ring-red-500"
          } ${isTextArea ? "" : "min-h-[3rem]"}`}
        >
          {typeof label !== "string" && <FormLabel>{label}</FormLabel>}
          {isTextArea ? (
            <Textarea
              type={type}
              className="bg-gray-100 dark:bg-light-dark border-0 focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[3rem]"
              placeholder={placeholder}
              {...field}
            />
          ) : (
            <Input
              type={type}
              className="bg-gray-100 dark:bg-light-dark border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder={placeholder}
                {...field}
            />
          )}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

export default CustomInput