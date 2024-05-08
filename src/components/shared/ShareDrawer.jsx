import React, { useState } from 'react'
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

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="flex justify-center gap-2">
        <MessageCircle />
        Send as Direct Message
      </DrawerTrigger>
      <DrawerContent className="!h-[700px]">
        <DrawerHeader>
          <DrawerTitle>Send To</DrawerTitle>
          <DrawerDescription>Select users to send to.</DrawerDescription>
        </DrawerHeader>
        <ShareForm setOpen={setOpen} />
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline" className="w-full rounded-full">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const ShareDrawer = ({ shares, postId }) => {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const { data: session } = useSession()
  const userId = session?.user?.id
  const { data: users } = useMostMessagedUsers({ userId, limit: 10 })
  const { emit } = useSocket()

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/posts/${postId}`)

    setOpen(false)

    toast({
      description: "Link Copied to Clipboard",
      duration: 3000,
      icon: <Link />
    })
  }

  const shareVia = () => {
    //share via various means. To be implemented soon
    
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
  return (
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
              <div className='flex flex-col items-center gap-2 w-[100px]' onClick={() => sendMessage(user._id)}>
                <Image
                  key={user._id}
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
}

export default ShareDrawer