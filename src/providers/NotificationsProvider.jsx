'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useSocket } from './SocketProvider'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { getNotifications } from '@/lib/mongodb/actions/notification.action'

const NotificationsContext = createContext({
  notifications: [{}],
  setNotifications: () => { },
})

const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])
  const { socket, on } = useSocket()
  const { toast } = useToast()
  const router = useRouter()
  const { data: session } = useSession()
  const sessionUser = session?.user

  useEffect(() => {
    if (socket) {
      on('likePost', data => {
        setNotifications(prev => [data, ...prev])
        toast({
          title: 'Post Liked',
          description: `${data?.sender?.name} liked your post`,
          duration: 3000,
          image: data?.sender?.profileImage,
          onClick: () => router.push(`/posts/${data?.post?._id}`)
        })
      })

      on('commentPost', data => {
        setNotifications(prev => [data, ...prev])
        toast({
          title: 'Comment Added',
          description: 'Someone commented on your post',
          duration: 3000,
          image: data?.sender?.profileImage,
          onClick: () => router.push(`/posts/${data?.post?._id}`)
        })
      })

      on('follow', data => {
        setNotifications(prev => [data, ...prev])
        toast({
          title: 'Followed',
          description: `${data?.sender?.name} followed you`,
          duration: 3000,
          image: data?.sender?.profileImage,
          onClick: () => router.push(`/profile/${data?.sender?.id}`)
        })
      })

      return () => {
        socket.off('likePost')
        socket.off('commentPost')
        socket.off('follow')
      }
    }
  }, [socket])

  useEffect(() => {
    if (sessionUser?.id) {
      getNotifications(sessionUser?.id).then(res => setNotifications(res))
    }
  }, [sessionUser?.id])


  const value = {
    notifications,
    setNotifications
  }
  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  )
}

export default NotificationsProvider

export const useNotifications = () => useContext(NotificationsContext)