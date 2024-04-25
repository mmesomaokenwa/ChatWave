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
import UserPreviewCard from './UserPreviewCard';

const ViewFollowers = ({followers, isCurrentUser}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex flex-col font-medium">
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
          <AlertDialogCancel>Go Back</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ViewFollowers