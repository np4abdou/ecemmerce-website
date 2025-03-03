"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function LoadingBar() {
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleEnd = () => {
      setTimeout(() => setLoading(false), 500) // Add delay before hiding
    }

    handleStart()
    handleEnd()
  }, [pathname, searchParams])

  return loading ? (
    <div className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent z-50">
      <div className="animate-loading-bar h-full bg-gradient-to-r from-transparent via-primary to-transparent" />
    </div>
  ) : null
}

