'use client'

import React, { useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import UserPreviewCard from './UserPreviewCard';
import { useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';

const ViewFollowers = ({ followers, isCurrentUser }) => {
  const [open, setOpen] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    if (searchParams.get('showFollowers')) setOpen(true) 
    else setOpen(false)
  }, [searchParams])

  const onOpenChange = () => {
    if (open) {
      const newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["showFollowers"],
      });

      router.push(newUrl, { scroll: false })
      setOpen(false)
    } else {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "showFollowers",
        value: "true",
      });
      router.push(newUrl, { scroll: false })
      setOpen(true)
    }
  }
  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger className="flex flex-col font-medium" onClick={onOpenChange}>
        <span className="text-accent">{followers?.length}</span>
        <span>Followers</span>
      </AlertDialogTrigger>
      <AlertDialogContent className="h-full md:h-[50vh] flex flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {followers?.length > 1
              ? `${followers?.length} Followers`
              : `${followers?.length} Follower`}
          </AlertDialogTitle>
          {followers?.length === 0 ? (
            <AlertDialogDescription>
              {isCurrentUser
                ? "There are no followers for you"
                : "There are no followers for this account"}
            </AlertDialogDescription>
          ) : (
            <AlertDialogDescription>
              {isCurrentUser
                ? "These are the users who follow you"
                : "These are the users who follow this account"}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        {followers?.length > 0 && (
          <div className="flex flex-col gap-0 overflow-y-scroll h-full grow">
            {followers?.reverse().map((follower, index) => (
              <UserPreviewCard key={index} user={follower} />
            ))}
          </div>
        )}
        <AlertDialogFooter className={"!mt-auto"}>
          <AlertDialogCancel onClick={onOpenChange}>Go Back</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ViewFollowers