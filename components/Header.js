"use client"

import { useState, useEffect } from "react"
import DesktopHeader from "./DesktopHeader"
import MobileHeader from "./MobileHeader"

export default function Header() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return <>{isMobile ? <MobileHeader /> : <DesktopHeader />}</>
}

