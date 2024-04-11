'use client'

import React from 'react'
import { Button } from '../ui/button';
import Image from 'next/image'
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LogoutButton = ({ showText }) => {
  const router = useRouter();

  const handleLogout = () => {
    router.replace("/sign-in");
    signOut({ callbackUrl: "/sign-in" })
  }
  return (
    <Button
      variant="ghost"
      className={`${showText && "flex justify-start gap-3"}`}
      onClick={handleLogout}
    >
      <Image src="/assets/logout.svg" alt="logout" height={25} width={25} />
      {showText && <p>Logout</p>}
    </Button>
  );
}

export default LogoutButton