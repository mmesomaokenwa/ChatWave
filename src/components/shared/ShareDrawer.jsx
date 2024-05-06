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
import { Link, MessageCircle, Share } from 'lucide-react';
import { useToast } from '../ui/use-toast';

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
      <DrawerTrigger className='flex justify-center gap-2'>
        <MessageCircle />
        Send as Direct Message
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Send To</DrawerTitle>
          <DrawerDescription>Select users to send to.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Send</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const ShareDrawer = ({ shares, postId }) => {
  const [open, setOpen] = useState(false)

  const { toast } = useToast()

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/posts/${postId}`)

    toast({
      description: "Link Copied to Clipboard",
      duration: 3000,
      icon: <Link />
    })
  }

  const shareVia = () => {
    //share via various means
    
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="flex items-center">
        {/* <Button variant="ghost" size="sm"> */}
          <Image src="/assets/share.svg" alt="share" width={23} height={23} />
        {/* </Button> */}
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
              <Button variant="outline" className="rounded-full" size="lg" onClick={copyLink}>
                <Link />
              </Button>
              <span className="ml-2">Copy Link</span>
            </div>
            <div className="flex flex-col items-center">
              <Button variant="outline" className="rounded-full" size="lg" onClick={shareVia}>
                <Share />
              </Button>
              <span className="ml-2">Share Via</span>
            </div>
          </div>
        </DrawerHeader>
        <DrawerFooter>
          <p className="w-full text-center">Share with</p>
          <div className="w-full flex items-center gap-2 overflow-x-auto">
            {shares.map((share, index) => (
              <Image
                key={index}
                src={share}
                alt="share"
                width={40}
                height={40}
                className="rounded-full"
              />
            ))}
          </div>
          <DirectMessageDrawer />
          <DrawerClose>
            <Button variant="outline" className="w-full rounded-full">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default ShareDrawer