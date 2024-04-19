import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';

const ProfileCard = ({ user, sessionUser }) => {
  return (
    <Card className="w-full flex flex-col lg:flex-row gap-4 p-0 border-0">
      <Image
        src={user?.profileImage || "/assets/profile-placeholder.svg"}
        alt={user?.username}
        width={80}
        height={80}
        className="rounded-full"
      />
      <div>
        <CardHeader className="p-0">
          <CardTitle>{user?.name}</CardTitle>
          <CardDescription>@{user?.username}</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <p>Card Content</p>
        </CardContent>
        <CardFooter className="p-0">
          <p>Card Footer</p>
        </CardFooter>
      </div>
    </Card>
  );
}

export default ProfileCard