import React from 'react'
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

const ViewFollowing = ({following, isCurrentUser}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex flex-col font-medium">
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
          <AlertDialogCancel>Go Back</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ViewFollowing