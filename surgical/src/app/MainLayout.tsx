"use client"
import { StaticIcon } from '@/components/home/StaticIcon'
import { usePathname } from 'next/navigation'
import React, { ReactNode, useEffect } from 'react'

interface Props{
    children:ReactNode
}

const MainLayout = ({children}:Props) => {
    const ispath=usePathname()

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    }, [ispath])

  // The header is in normal document flow (not fixed), so no top
  // offset is needed — pages sit flush beneath it.
  return <main>{children}
  <StaticIcon />
  </main>;
}

export default MainLayout
