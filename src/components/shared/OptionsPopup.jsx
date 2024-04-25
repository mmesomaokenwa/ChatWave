'use client'

import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from 'next/image';

const options = [
  {
    id: 1,
    label: "Forward",
    icon: "send",
  },
  {
    id: 2,
    label: "Report",
    icon: "report",
  },
  {
    id: 3,
    label: "Delete",
    icon: "delete",
  },
  {
    id: 4,
    label: "Block",
    icon: "block",
  }
]

const OptionsPopup = ({ message }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className='space-y-1'>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="w-1 h-1 rounded-full bg-black dark:bg-white"/>
          ))}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="space-y-2">
          {options.map((option) => (
            <DropdownMenuItem
              key={option.id}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900"
            >
              <div className="flex items-center gap-2">
                <Image
                  src={`/assets/${option.icon}.svg`}
                  alt={option.label}
                  width={20}
                  height={20}
                />
                <p>{option.label}</p>
              </div>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default OptionsPopup