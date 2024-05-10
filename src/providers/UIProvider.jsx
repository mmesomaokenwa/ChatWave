'use client'

import { NextUIProvider } from '@nextui-org/react'

const UIProvider = ({children}) => {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  )
}

export default UIProvider