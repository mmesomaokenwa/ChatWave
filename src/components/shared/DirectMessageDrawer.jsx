import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { MessageCircle } from "lucide-react";
import ShareForm from "./ShareForm";

const DirectMessageDrawer = ({ Link, setParentOpen }) => {
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);

    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderDrawer = width < 768;

  if (renderDrawer)
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className="flex justify-center gap-2">
          <MessageCircle />
          Send as Direct Message
        </DrawerTrigger>
        <DrawerContent className="!h-[700px] px-4">
          <DrawerHeader>
            <DrawerTitle>Send To</DrawerTitle>
            <DrawerDescription>Select users to send to.</DrawerDescription>
          </DrawerHeader>
          <ShareForm setOpen={setOpen} setParentOpen={setParentOpen} />
          <DrawerFooter className={"px-0"}>
            <DrawerClose>
              <Button variant="outline" className="w-full rounded-full">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="flex justify-center gap-2">
        <MessageCircle />
        Send as Direct Message
      </AlertDialogTrigger>
      <AlertDialogContent className="!h-[500px] flex flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle>Send To</AlertDialogTitle>
          <AlertDialogDescription>
            Select users to send to.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <ShareForm setOpen={setOpen} setParentOpen={setParentOpen} />
        <AlertDialogFooter className={"sm:flex-col"}>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DirectMessageDrawer;
