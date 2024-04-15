import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from 'next/image';
import { deletePost } from '@/lib/mongodb/actions/post.actions';
import { useToast } from '../ui/use-toast';

const DeleteDialog = ({ postId }) => {
  const { toast } = useToast()
  const handleDelete = async () => {
    try {
      const deletedPost = await deletePost(postId);

      if (deletedPost) {
        toast({
          title: 'Post Deleted',
          description: 'Your post has been deleted',
          duration: 3000,
        })
        window.location = '/';
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
        duration: 3000,
      })
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Image src="/assets/delete.svg" alt="delete" width={25} height={25} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            post and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteDialog