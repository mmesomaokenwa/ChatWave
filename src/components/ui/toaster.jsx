"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image";

export function Toaster() {
  const { toasts } = useToast()

  return (
    (<ToastProvider>
      {toasts.map(function ({ id, title, description, action, image, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="w-full flex items-center gap-2">
              {image && (
                <Image
                  src={image}
                  alt="Notification icon"
                  className="rounded-full"
                  width={30}
                  height={30}
                />
              )}
              <div className="w-full grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>)
  );
}
