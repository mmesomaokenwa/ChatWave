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
import UserPreviewCard from "./UserPreviewCard";
import { useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';

const ViewFollowing = ({ following, isCurrentUser }) => {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter()

  useEffect(() => {
    if (searchParams.get("showFollowing")) setOpen(true)
    else setOpen(false)
  }, [searchParams]);

  const onOpenChange = () => {
    if (open) {
      const newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["showFollowing"],
      });

      router.push(newUrl, { scroll: false });
      setOpen(false);
    } else {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "showFollowing",
        value: "true",
      });
      router.push(newUrl, { scroll: false });
      setOpen(true);
    }
  };
  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger className="flex flex-col font-medium" onClick={onOpenChange}>
        <span className="text-accent">{following?.length}</span>
        <span>Following</span>
      </AlertDialogTrigger>
      <AlertDialogContent className="h-full md:h-[50vh] flex flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {following?.length > 1
              ? `Following ${following?.length} users`
              : `Following ${following?.length} user`}
          </AlertDialogTitle>
          {following?.length === 0 ? (
            <AlertDialogDescription>
              {isCurrentUser
                ? "You do not follow any user currently"
                : "Does not follow any user currently"}
            </AlertDialogDescription>
          ) : (
            <AlertDialogDescription>
              {isCurrentUser
                ? "These are the users you follow"
                : "These are the users this account follows"}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        {following?.length > 0 && (
          <div className="flex flex-col gap-0 overflow-y-scroll h-full grow">
            {following?.reverse().map((user, index) => (
              <UserPreviewCard key={index} user={user} />
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

export default ViewFollowing