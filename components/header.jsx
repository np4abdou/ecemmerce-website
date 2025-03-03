"use client"

import Link from "next/link"
import { useState } from "react"
import { useTheme } from "next-themes"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <header className="bg-background shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Expert
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <Link href="/products" className="hover:text-primary">
            Products
          </Link>
          <Link href="/about" className="hover:text-primary">
            About
          </Link>
          <Link href="/contact" className="hover:text-primary">
            Contact
          </Link>
        </nav>
        <div className="flex items-center">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-muted"
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </button>
          <button className="md:hidden p-2 rounded-full hover:bg-muted" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            ☰
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden bg-background py-4">
          <div className="container mx-auto px-4 space-y-2">
            <Link href="/" className="block hover:text-primary">
              Home
            </Link>
            <Link href="/products" className="block hover:text-primary">
              Products
            </Link>
            <Link href="/about" className="block hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="block hover:text-primary">
              Contact
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}

