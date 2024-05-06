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
import { Checkbox } from '../ui/checkbox'
import Image from 'next/image'

const ShareForm = ({ setOpen }) => {
  const [users, setUsers] = useState([])
  const [selectUsers, setSelectedUsers] = useState([])

  const handleCheckedChange = (userId) => {
    if (selectUsers.includes(userId)) {
      setSelectedUsers(prev => prev.filter(user => user !== userId))
    } else {
      setSelectedUsers(prev => {
        const set = new Set([...prev, userId])
        return Array.from(set)
      })
    }
  }

  const handleSubmit = () => {
    console.log({ selectUsers })
    setOpen(false)
  }
  return (
    <div className='flex flex-col justify-between h-full'>
      <SearchUsers setUsers={setUsers} />
      <div className='flex flex-col overflow-y-auto h-full'>
        {users?.map((user) => (
          <Card
            key={user._id}
            className="w-full flex items-center gap-2 p-3 border-0"
            onClick={() => handleCheckedChange(user._id)}
          >
            <Image
              src={user.profileImage || '/assets/profile-placeholder.svg'}
              alt={user.name}
              width={48}
              height={48}
              className="rounded-full"
            />
            <CardHeader className="p-0 w-full">
              <div className="w-full flex items-center justify-between">
                <CardTitle className="text-lg">{user.name}</CardTitle>
                <Checkbox
                  checked={selectUsers.includes(user._id)}
                  onCheckedChange={() => handleCheckedChange(user._id)}
                />
              </div>
              <CardDescription>@{user.username}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      <Button className="w-full" disabled={selectUsers.length < 1} onClick={handleSubmit}>
        Send
      </Button>
    </div>
  );
}

export default ShareForm