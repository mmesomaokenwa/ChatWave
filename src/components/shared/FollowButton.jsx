'use client'

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { followUser } from '@/lib/mongodb/actions/user.actions'
import { useSocket } from '@/providers/SocketProvider'

const FollowButton = ({ userId, sessionUser, followed }) => {
  const [isFollowing, setIsFollowing] = useState(followed)
  const { emit } = useSocket()

  const handleFollow = () => {
    try {
      let following = followed;

      if (following) {
        following = false
        setIsFollowing(false)
      } else {
        following = true
        setIsFollowing(true)
      }

      followUser({
        userId,
        currentUserId: sessionUser?.id,
        isFollowed: following,
        path: [
          `/profile/${userId}`,
          `/profile/${sessionUser?.id}`,
          `/explore`,
        ]
      }).then(({ notification }) => {
        if (notification) emit('follow', {
          ...notification,
          sender: sessionUser
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Button variant={isFollowing ? "ghost" : "accent"} onClick={handleFollow}>
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
}

export default FollowButton