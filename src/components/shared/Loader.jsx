import { cn } from '@/lib/utils'
import React from 'react'

const Loader = ({ className }) => {
  return (
    <div
      className={cn(
        `size-10 rounded-full animate-spin duration-1000 border-2 border-black dark:border-white border-t-black/40 border-l-black/40 dark:border-t-white/40 dark:border-l-white/40 ${className}`
      )}
    />
  );
}

export default Loader