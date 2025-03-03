"use client"

import type React from "react"

import { useRef } from "react"
import { useTheme } from "next-themes"

interface ClickSparkProps {
  sparkSize?: number
  sparkRadius?: number
  sparkCount?: number
  duration?: number
  easing?: "linear" | "ease-out" | "ease-in" | "ease-in-out"
  extraScale?: number
  children: React.ReactNode
}

const ClickSpark = ({
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = "ease-out",
  extraScale = 1.0,
  children,
}: ClickSparkProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sparksRef = useRef<Array<{ x: number; y: number; angle: number; startTime: number }>>([])
  const startTimeRef = useRef<number | null>(null)
  const { theme } = useTheme()

  // Use theme-based spark color
  const sparkColor = theme === "dark" ? "#ffffff" : "#000000"

  // ...existing code...

  const handleClick = (e: React.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const now = performance.now()
    const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / sparkCount,
      startTime: now,
    }))

    sparksRef.current.push(...newSparks)
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          userSelect: "none",
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
      {children}
    </div>
  )
}

export default ClickSpark

