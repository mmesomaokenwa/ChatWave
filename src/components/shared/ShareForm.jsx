import React, { useState } from 'react'
import SearchUsers from './SearchUsers'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Checkbox, User } from '@nextui-org/react'  
import Image from 'next/image'
import { useToast } from '../ui/use-toast'
import { MessageCircle } from 'lucide-react'
import { CheckboxGroup } from '@nextui-org/react'

const ShareForm = ({ setOpen, setParentOpen }) => {
  const [users, setUsers] = useState([])
  const [selectUsers, setSelectedUsers] = useState([])
  const {toast} = useToast()

  const wait = () => {
    return new Promise(resolve => setTimeout(resolve, 2000))
  }

  const handleSubmit = () => {
    console.log({ selectUsers })
    setOpen(false)
    setParentOpen(false)
    setSelectedUsers([])
    setUsers([])
    wait().then(() => toast({
      // description: 'Post Shared Successfully',
      description: 'Feature Coming Soon',
      duration: 3000,
      icon: <MessageCircle />
    }))
  }
  return (
    <div className="flex flex-col justify-between h-full gap-2">
      <SearchUsers setUsers={setUsers} />
      <div className="flex w-full flex-col overflow-y-auto h-full">
        <CheckboxGroup
          value={selectUsers}
          onChange={setSelectedUsers}
          classNames={{
            base: "w-full",
          }}
        >
          {users?.map((user) => (
            <Checkbox
              key={user._id}
              value={user._id}
              classNames={{
                base: "w-full w-full max-w-full inline-flex items-center gap-2 p-4 cursor-pointer",
                label: "w-full",
              }}
            >
              <User
                avatarProps={{
                  src: user.profileImage || "/assets/profile-placeholder.svg",
                  size: "md",
                }}
                name={user.name}
                description={`@${user.username}`}
              />
            </Checkbox>
          ))}
        </CheckboxGroup>
      </div>
      <Button
        className="w-full"
        variant="accent"
        disabled={selectUsers.length < 1}
        onClick={handleSubmit}
      >
        Send
      </Button>
    </div>
  );
}

export default ShareForm