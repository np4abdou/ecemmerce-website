"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Moon, Sun, ShoppingCart, Search, Menu, X } from "lucide-react"
import { images } from "../config/images"

export default function Header({ darkMode, setDarkMode }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Free Shipping Banner */}
      <div className="bg-primary text-primary-foreground py-2 text-center text-sm">
        Free Shipping on Every Order | الشحن مجاني لجميع الطلبات
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 bg-background/80 backdrop-blur-md transition-all duration-300 ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              <button onClick={() => setIsMenuOpen(true)} className="lg:hidden" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </button>
              <Link href="/cart" className="relative">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button className="hidden lg:block">
                <Search className="h-6 w-6" />
              </button>
            </div>

            {/* Center Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image src={images.logo || "/placeholder.svg"} alt="ASCEND" width={100} height={32} />
            </Link>

            {/* Right Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                HOME
              </Link>
              <Link href="/categories" className="text-foreground hover:text-primary transition-colors">
                CATEGORIES
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
                CONTACT
              </Link>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-accent transition-colors"
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button className="lg:hidden" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle theme">
              {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 bg-background transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="container mx-auto px-4 py-6">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 transition-opacity hover:opacity-70"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>

          <nav className="flex flex-col space-y-6 mt-12">
            <Link
              href="/"
              className="text-2xl font-semibold transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              HOME
            </Link>
            <Link
              href="/categories"
              className="text-2xl font-semibold transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              CATEGORIES
            </Link>
            <Link
              href="/contact"
              className="text-2xl font-semibold transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              CONTACT
            </Link>
          </nav>
        </div>
      </div>

      {/* Overlay for Mobile Menu */}
      {isMenuOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsMenuOpen(false)} />}
    </>
  )
}

