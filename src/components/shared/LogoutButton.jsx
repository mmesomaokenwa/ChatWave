'use client'

import React from 'react'
import { Button } from '../ui/button';
import Image from 'next/image'
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LogoutButton = ({ variant = 'ghost', className }) => {
  const router = useRouter();

  const handleLogout = () => {
    router.replace("/sign-in");
    signOut({ callbackUrl: "/sign-in" })
  }
  return (
    <Button
      variant={variant}
      className={className}
      onClick={handleLogout}
    >
      <Image
        src="/assets/logout.svg"
        alt="logout"
        height={25}
        width={25}
        className={variant === 'destructive' && 'invert brightness-0'}
      />
      <p>Logout</p>
    </Button>
  );
}

export default LogoutButton