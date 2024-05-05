'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

const PostCardWrapper = ({ children, postId }) => {
  const router = useRouter()
  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        router.push(`/posts/${postId}`);
      }}
    >{children}</div>
  )
}

export default PostCardWrapper