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
import CommentCard from './CommentCard';

const ViewComments = ({ comments }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className='text-sm'>View Comments</AlertDialogTrigger>
      <AlertDialogContent className="h-full md:h-[50vh] flex flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {comments?.length > 1
              ? `${comments?.length} Comments`
              : `${comments?.length} Comment`}
          </AlertDialogTitle>
          {comments?.length === 0 ? (
            <AlertDialogDescription>
              There are no comments for this post
            </AlertDialogDescription>
          ) : (
            <AlertDialogDescription>
              These are the users who commented on this post
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        {comments?.length > 0 && (
          <div className="flex flex-col gap-0 overflow-y-scroll h-full grow">
            {comments?.map((comment, index) => (
              <CommentCard key={index} comment={comment} />
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

export default ViewComments