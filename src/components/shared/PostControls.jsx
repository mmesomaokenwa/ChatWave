'use client'

import React, { useState } from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { formatNumber } from '@/lib/utils'
import { useInView } from 'react-intersection-observer'
import CommentForm from './CommentForm'
import { useSocket } from '@/providers/SocketProvider'
import ShareDrawer from './ShareDrawer'
import LikeButton from './LikeButton'
import SaveButton from './SaveButton'
import { Separator } from '../ui/separator'

const PostControls = ({ post }) => {
  const { data: session } = useSession()
  const user = session?.user
  const { emit } = useSocket()

  const { ref, inView } = useInView({
    threshold: 1,
    triggerOnce: true
  })

  const [comments, setComments] = useState(post.comments)
  
  return (
    <div ref={ref} className="w-full flex flex-col gap-2">
      {/* <Separator /> */}
      <div className="w-full flex items-center justify-between gap-6">
        <LikeButton post={post} />
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className='p-0'>
            <Image
              src="/assets/comment.svg"
              alt="comment"
              width={23}
              height={23}
            />
          </Button>
          {comments.length > 0 && (
            <p className="text-sm ml-2">{formatNumber(comments.length)}</p>
          )}
        </div>
        <ShareDrawer post={post} />
        <SaveButton post={post} />
      </div>
      <Separator />
      <CommentForm
        setComments={setComments}
        user={user}
        post={post}
        className={`my-4 mt-2 hidden opacity-0 h-0 transition-all ${
          inView && "!flex opacity-100 h-full"
        }`}
      />
    </div>
  );
}

export default PostControls