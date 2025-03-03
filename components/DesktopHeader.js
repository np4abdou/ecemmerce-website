"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, X } from "lucide-react"
import { useRouter } from "next/router"
import { useCookies } from "react-cookie"
import CartIcon from "./CartIcon"

export default function DesktopHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [cookies, setCookie] = useCookies(["theme"])

  useEffect(() => {
    setMounted(true)
    const storedTheme = cookies.theme || "light"
    document.documentElement.setAttribute("data-theme", storedTheme)
  }, [cookies.theme])

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 0)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const toggleTheme = () => {
    const newTheme = cookies.theme === "light" ? "dark" : "light"
    setCookie("theme", newTheme, { path: "/" })
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setIsSearchActive(false)
    }
  }

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive)
    if (!isSearchActive) {
      setTimeout(() => document.querySelector(".search-bar")?.focus(), 300)
    }
  }

  return (
    <div className="z-50">
      <header
        className={`fixed left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border transition-all duration-300 top-0 z-40`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <div className="relative w-[105px] h-[26px]">
                  {mounted && (
                    <Image
                      src={`/images/logo${cookies.theme === "dark" ? "2" : ""}.png`}
                      alt="Logo"
                      layout="fill"
                      objectFit="contain"
                      className="scale-125"
                      priority
                    />
                  )}
                </div>
              </Link>
              <nav className="hidden md:flex items-center ml-8 space-x-6">
                {["HOME", "PRODUCTS", "ART", "CONTACT"].map((item) => (
                  <Link
                    key={item}
                    href={item === "HOME" ? "/" : `/${item.toLowerCase()}`}
                    className="text-base font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <form onSubmit={handleSearchSubmit} className={`relative search ${isSearchActive ? "active" : ""}`}>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="search-bar w-full h-full bg-transparent outline-none transition-all duration-300 ease-in-out text-foreground placeholder-muted-foreground/70"
                />
                <button type="button" onClick={toggleSearch} className="search-btn">
                  <Search className="search-icon search-glass" />
                  <X className="search-icon search-close" />
                </button>
              </form>

              {/* Cart Icon */}
              <CartIcon />

              {mounted && (
                <button
                  className="theme-toggle"
                  id="theme-toggle"
                  title="Toggles light & dark"
                  aria-label={cookies.theme}
                  aria-live="polite"
                  onClick={toggleTheme}
                >
                  <svg className="sun-and-moon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
                    <mask className="moon" id="moon-mask">
                      <rect x="0" y="0" width="100%" height="100%" fill="white" />
                      <circle cx="24" cy="10" r="6" fill="black" />
                    </mask>
                    <circle className="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor" />
                    <g className="sun-beams" stroke="currentColor">
                      <line x1="12" y1="1" x2="12" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="23" />
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                      <line x1="1" y1="12" x2="3" y2="12" />
                      <line x1="21" y1="12" x2="23" y2="12" />
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </g>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

