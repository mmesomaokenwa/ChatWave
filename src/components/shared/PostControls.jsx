'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { checkIsLiked, checkIsSaved, formatNumber } from '@/lib/utils'
import { useInView } from 'react-intersection-observer'
import CommentForm from './CommentForm'
import { likePost, savePost } from '@/lib/mongodb/actions/post.actions'
import { useSocket } from '@/providers/SocketProvider'

const PostControls = ({ post, isTopPost }) => {
  const { data: session } = useSession()
  const user = session?.user
  const { emit } = useSocket()

  const { ref, inView } = useInView({
    threshold: 1,
    triggerOnce: true
  })

  const isLiked = useMemo(() => checkIsLiked(post.likes, user?.id), [post.likes, user?.id])
  const isSaved = useMemo(() => checkIsSaved(post.saves, user?.id), [post.saves, user?.id])
  const [comments, setComments] = useState(post.comments)
  const [saves, setSaves] = useState(post.saves)
  const [shares, setShares] = useState(post.shares)
  const [likes, setLikes] = useState(post.likes)
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  
  useEffect(() => {
    setLiked(isLiked)
  }, [isLiked])
  
  useEffect(() => {
    setSaved(isSaved)
  }, [isSaved])

  const handleLike = () => {
    try {
      let isLiked;

      if (liked) {
        setLiked(false)
        setLikes(prev => prev.filter((like) => like !== user?.id))
        isLiked = false
      } else {
        setLiked(true)
        setLikes(prev => [...prev, user?.id])
        isLiked = true
      }

      likePost({
        postId: post._id,
        userId: user?.id,
        liked: isLiked,
        path: [
          `/posts/${post._id}`,
          '/'
        ]
      })

      if (isLiked && user?.id !== post.creator._id) emit('likePost', {
        postId: post._id,
        userId: user?.id,
        creatorId: post.creator._id,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleSave = () => {
    try {
      if (saved) {
        setSaved(false)
        // setSaves(prev => prev.filter((save) => save !== user?.id))
      } else {
        setSaved(true)
        // setSaves(prev => [...prev, user?.id])
      }

      savePost({
        postId: post._id,
        userId: user?.id,
        path: [
          "/",
          `/posts/${post._id}`,
          "/saved"
        ],
      });
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div ref={ref} className="w-full flex flex-col gap-4">
      <div className="w-full flex gap-4">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={handleLike}>
            <Image
              src={liked ? "/assets/liked.svg" : "/assets/like.svg"}
              alt="like"
              width={23}
              height={23}
            />
          </Button>
          {likes.length > 0 && (
            <p className="text-sm font-medium -ml-2">{formatNumber(likes.length)}</p>
          )}
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="sm">
            <Image
              src="/assets/comment.svg"
              alt="comment"
              width={23}
              height={23}
            />
          </Button>
          {comments.length > 0 && (
            <p className="text-sm font-medium -ml-2">{formatNumber(comments.length)}</p>
          )}
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="sm">
            <Image src="/assets/share.svg" alt="share" width={23} height={23} />
          </Button>
          {shares.length > 0 && (
            <p className="text-sm font-medium -ml-2">{formatNumber(shares.length)}</p>
          )}
        </div>
        <Button variant="ghost" size="sm" onClick={handleSave} className="ml-auto">
          <Image
            src={saved ? "/assets/saved.svg" : "/assets/save.svg"}
            alt="like"
            width={23}
            height={23}
          />
        </Button>
      </div>
      <CommentForm
        setComments={setComments}
        profileImage={user?.profileImage}
        userId={user?.id}
        postId={post._id}
        className={`my-4 mt-2 hidden opacity-0 h-0 transition-all ${
          inView && "!flex opacity-100 h-full"
        }`}
      />
    </div>
  );
}

export default PostControls