import React, { useEffect, useState } from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
} from "@/components/ui/alert-dialog";
import { Button } from '../ui/button';
import { formatNumber } from '@/lib/utils';
import Image from 'next/image';
import { Link, MessageCircle, Share, X } from 'lucide-react';
import { useToast } from '../ui/use-toast';
import ShareForm from './ShareForm';
import { useMostMessagedUsers } from '@/lib/react-query/queries';
import { useSession } from 'next-auth/react';
import { createMessage } from '@/lib/mongodb/actions/chat.actions';
import { useSocket } from '@/providers/SocketProvider';

const shareLinks = [
  {
    id: 1,
    url: 'https://chatwave.vercel.app',
    title: 'Chatwave',
    description: 'Chat with your friends in one place'
  },
  {
    id: 2,
    url: 'https://chatwave.vercel.app',
    title: 'Chatwave',
    description: 'Chat with your friends in one place'
  },
  {
    id: 3,
    url: 'https://chatwave.vercel.app',
    title: 'Chatwave',
    description: 'Chat with your friends in one place'
  }
]

const ShareLink = ({ url, title, description }) => {
  return (
    <a href={url} target="_blank" rel="noreferrer" className="flex items-center gap-2">
      <Image src="/assets/share.svg" alt="share" width={23} height={23} />
      <div>
        <p className="text-sm font-bold">{title}</p>
        <p className="text-sm">{description}</p>
      </div>
    </a>
  )
}

const ShareLinks = () => {
  return (
    <div className="flex flex-col gap-4">
      {shareLinks.map((link) => (
        <ShareLink key={link.id} url={link.url} title={link.title} description={link.description} />
      ))}
    </div>
  )
}

const DirectMessageDrawer = ({ Link }) => {
  const [open, setOpen] = useState(false)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    setWidth(window.innerWidth);

    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderDrawer = width < 768

  if (renderDrawer) return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="flex justify-center gap-2">
        <MessageCircle />
        Send as Direct Message
      </DrawerTrigger>
      <DrawerContent className="!h-[700px] px-4">
        <DrawerHeader>
          <DrawerTitle>Send To</DrawerTitle>
          <DrawerDescription>Select users to send to.</DrawerDescription>
        </DrawerHeader>
        <ShareForm setOpen={setOpen} />
        <DrawerFooter className={"px-0"}>
          <DrawerClose>
            <Button variant="outline" className="w-full rounded-full">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="flex justify-center gap-2">
        <MessageCircle />
        Send as Direct Message
      </AlertDialogTrigger>
      <AlertDialogContent className="!h-[500px] flex flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle>Send To</AlertDialogTitle>
          <AlertDialogDescription>
            Select users to send to.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <ShareForm setOpen={setOpen} />
        <AlertDialogFooter className={"sm:flex-col"}>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const ShareDrawer = ({ shares, postId }) => {
  const [open, setOpen] = useState(false)
  const [width, setWidth] = useState(0)
  const { toast } = useToast()
  const { data: session } = useSession()
  const userId = session?.user?.id
  const { data: users } = useMostMessagedUsers({ userId, limit: 10 })
  const { emit } = useSocket()

  useEffect(() => {
    setWidth(window.innerWidth)

    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/posts/${postId}`)

    setOpen(false)

    toast({
      description: "Link Copied to Clipboard",
      duration: 3000,
      icon: <Link />
    })
  }

  const shareVia = async () => {
    //share via various means. To be implemented soon
    try {
      setOpen(false)

      const postLink = `${window.location.origin}/posts/${postId}`;

      if (navigator.share) {
        // Open the native share panel
        await navigator.share({
          title: document.title,
          text: "Check out this post!",
          url: postLink,
        })
      } else {
        // If Web Share API is not supported, provide fallback option
        toast({
          description: "Your browser does not support the Web Share API. You can manually paste the post link to share.",
          variant: "destructive",
          duration: 3000,
          icon: <X />,
        });
      }
    } catch (error) {
      toast({
        description: "An error occurred while sharing the post. Please try again.",
        variant: "destructive",
        duration: 3000,
        icon: <X />,
      });
    }
  }

  const sendMessage = (receiver) => {
    setOpen(false)
    createMessage({
      req: {
        sender: userId,
        receiver,
        message: `${window.location.origin}/posts/${postId}`,
      },
      path: `/chat/${receiver}`,
    })
      .then((res) => {
        if (res) {
          emit("message", res);
          toast({
            description: "Post Shared Successfully",
            duration: 3000,
            icon: <MessageCircle />,
          });
        }
      })
      .catch((error) =>
        toast({
          description: error.message,
          variant: "destructive",
          duration: 3000,
          icon: <X />,
        })
      );
  }

  const renderDrawer = width < 768

  if (renderDrawer) return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="flex items-center">
        <Image src="/assets/share.svg" alt="share" width={23} height={23} />
        {shares.length > 0 && (
          <p className="text-sm font-medium -ml-2">
            {formatNumber(shares.length)}
          </p>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Share Post</DrawerTitle>
          <DrawerDescription></DrawerDescription>
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <Button
                variant="outline"
                className="rounded-full"
                size="lg"
                onClick={copyLink}
              >
                <Link />
              </Button>
              <span className="ml-2">Copy Link</span>
            </div>
            <div className="flex flex-col items-center">
              <Button
                variant="outline"
                className="rounded-full"
                size="lg"
                onClick={shareVia}
              >
                <Share />
              </Button>
              <span className="ml-2">Share Via</span>
            </div>
          </div>
        </DrawerHeader>
        <DrawerFooter>
          <p className="w-full text-center">Share with</p>
          <div className="w-full flex items-center gap-2 overflow-x-auto no-scrollbar">
            {users?.map((user) => (
              <div
                key={user._id}
                className="flex flex-col items-center gap-2 w-[100px]"
                onClick={() => sendMessage(user._id)}
              >
                <Image
                  src={user.profileImage || "/assets/profile-placeholder.svg"}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <p className="text-sm line-clamp-1">{user.name}</p>
              </div>
            ))}
          </div>
          <DirectMessageDrawer />
          <DrawerClose>
            <Button variant="outline" className="w-full rounded-full">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="flex items-center">
        <Image src="/assets/share.svg" alt="share" width={23} height={23} />
        {shares.length > 0 && (
          <p className="text-sm font-medium -ml-2">
            {formatNumber(shares.length)}
          </p>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Share Post</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <Button
                variant="outline"
                className="rounded-full"
                size="lg"
                onClick={copyLink}
              >
                <Link />
              </Button>
              <span className="ml-2">Copy Link</span>
            </div>
            <div className="flex flex-col items-center">
              <Button
                variant="outline"
                className="rounded-full"
                size="lg"
                onClick={shareVia}
              >
                <Share />
              </Button>
              <span className="ml-2">Share Via</span>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className={"sm:flex-col"}>
          <p className="w-full text-center">Share with</p>
          <div className="w-full flex items-center gap-2 overflow-x-auto no-scrollbar">
            {users?.map((user) => (
              <div
                key={user._id}
                className="flex flex-col items-center gap-2 w-[100px]"
                onClick={() => sendMessage(user._id)}
              >
                <Image
                  src={user.profileImage || "/assets/profile-placeholder.svg"}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <p className="text-sm line-clamp-1">{user.name}</p>
              </div>
            ))}
          </div>
          <DirectMessageDrawer />
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ShareDrawer