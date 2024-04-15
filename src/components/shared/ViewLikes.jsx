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
import LikeCard from './LikeCard';

const ViewLikes = ({ likes, userId }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className='text-sm'>View Likes</AlertDialogTrigger>
      <AlertDialogContent className="h-full md:h-[50vh] flex flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {likes?.length > 1
              ? `${likes?.length} Likes`
              : `${likes?.length} Like`}
          </AlertDialogTitle>
          {likes?.length === 0 ? (
            <AlertDialogDescription>
              There are no likes for this post
            </AlertDialogDescription>
          ) : (
              <AlertDialogDescription>
                These are the users who liked this post
              </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        {likes?.length > 0 && (
          <div className="flex flex-col gap-0 overflow-y-scroll h-full grow">
            {likes?.map((like, index) => (
              <LikeCard key={index} like={like} userId={userId} />
            ))}
          </div>
        )}
        <AlertDialogFooter className={'!mt-auto'}>
          <AlertDialogCancel>Go Back</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ViewLikes