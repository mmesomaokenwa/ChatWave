'use client'

import React, { useState } from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { formatNumber } from '@/lib/utils'
import { useInView } from 'react-intersection-observer'
import CommentForm from './CommentForm'
import { likePost, savePost } from '@/lib/mongodb/actions/post.actions'

const PostControls = ({ post }) => {
  const { data: session } = useSession()
  const user = session?.user

  const { ref, inView } = useInView({
    threshold: 1,
    triggerOnce: true
  })

  const [likes, setLikes] = useState(post.likes.map((like) => like?._id) || [])
  const [comments, setComments] = useState(post.comments)
  const [saves, setSaves] = useState(post.saves)
  const [shares, setShares] = useState(post.shares)
  const [liked, setLiked] = useState(post.likes.find((like) => like?._id?.toString() === user?.id) ? true : false)
  const [saved, setSaved] = useState(post.saves.find((save) => save?._id?.toString() === user?.id) ? true : false)

  const handleLike = async () => {
    try {
      if (liked) {
        setLiked(false)
        setLikes(prev => prev.filter((like) => like !== user?.id))
        const { likes } = await likePost({
          postId: post._id,
          userId: user?.id,
          liked: false,
          path: [
            `/posts/${post._id}`,
            '/'
          ]
        })
        setLikes(likes)
      } else {
        setLiked(true)
        setLikes(prev => [...prev, user?.id])
        const { likes } = await likePost({
          postId: post._id,
          userId: user?.id,
          liked: true,
          path: [
            `/posts/${post._id}`,
            '/'
          ]
        })
        setLikes(likes)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSave = async () => {
    try {
      if (saved) {
        setSaved(false)
        setSaves(prev => prev.filter((save) => save !== user?.id))
        const { saves } = await savePost({
          postId: post._id,
          userId: user?.id,
          path: [
            '/'
            `/posts/${post._id}`,
            '/profile',
          ]
        })
        setSaves(saves)
      } else {
        setSaved(true)
        setSaves(prev => [...prev, user?.id])
        const { saves } = await savePost({
          postId: post._id,
          userId: user?.id,
          path: `/posts/${post._id}`
        })
        setSaves(saves)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div ref={ref} className="w-full flex flex-col gap-4">
      <div className="w-full flex items-center">
        <div className="flex items-center">
          <Button variant="ghost" onClick={handleLike}>
            <Image
              src={liked ? "/assets/liked.svg" : "/assets/like.svg"}
              alt="like"
              width={23}
              height={23}
            />
          </Button>
          {likes.length > 0 && (
            <p className="text-sm">{formatNumber(likes.length)}</p>
          )}
        </div>
        <div className="flex items-center">
          <Button variant="ghost">
            <Image
              src="/assets/comment.svg"
              alt="comment"
              width={23}
              height={23}
            />
          </Button>
          {comments.length > 0 && (
            <p className="text-sm">{formatNumber(comments.length)}</p>
          )}
        </div>
        <div className="flex items-center">
          <Button variant="ghost">
            <Image src="/assets/share.svg" alt="share" width={23} height={23} />
          </Button>
          {shares.length > 0 && (
            <p className="text-sm">{formatNumber(shares.length)}</p>
          )}
        </div>
        <Button variant="ghost" onClick={() => setSaves(saves + 1)} className="ml-auto">
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
        className={`my-4 hidden opacity-0 h-0 transition-all ${
          inView && "!flex opacity-100 h-full"
        }`}
      />
    </div>
  );
}

export default PostControls