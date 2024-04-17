'use client'

import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import DarkModeToggler from './DarkModeToggler';
import { Button } from '../ui/button';
import LogoutButton from './LogoutButton';

const MobileNav = () => {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger className="flex items-center justify-center">
          <HiMiniBars3BottomRight className="text-3xl" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
          <SheetFooter className="flex justify-between gap-4 mt-4">
            <DarkModeToggler />
            <LogoutButton showText />
            <Button variant="destructive">Delete account</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNav