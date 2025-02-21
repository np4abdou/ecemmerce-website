"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/router"
import { useCookies } from "react-cookie"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showBanner, setShowBanner] = useState(true)
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [cookies, setCookie] = useCookies(["theme", "hideBanner"])

  const prevScrollPos = useRef(0)
  const timeoutId = useRef(null)

  // Initialize theme and banner state
  useEffect(() => {
    setMounted(true)
    const storedTheme = cookies.theme || "light"
    document.documentElement.setAttribute("data-theme", storedTheme)
    setShowBanner(cookies.hideBanner !== "true")
  }, [cookies.theme, cookies.hideBanner])

  // Scroll handler with optimized logic
  const handleScroll = useCallback(() => {
    const currentScrollPos = window.scrollY
    const isNearTop = currentScrollPos < 100
    const scrollDirection = currentScrollPos > prevScrollPos.current

    // Hide banner immediately when scrolling down
    if (scrollDirection) {
      setShowBanner(false)
      return
    }

    // Show banner with delay when scrolling up near the top
    if (!scrollDirection && isNearTop) {
      if (timeoutId.current) clearTimeout(timeoutId.current)
      timeoutId.current = setTimeout(() => {
        setShowBanner(true)
      }, 500)
    }

    prevScrollPos.current = currentScrollPos
    setIsScrolled(currentScrollPos > 0)
  }, [])

  // Attach scroll listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (timeoutId.current) clearTimeout(timeoutId.current)
    }
  }, [handleScroll])

  // Theme toggle
  const toggleTheme = () => {
    const newTheme = cookies.theme === "light" ? "dark" : "light"
    setCookie("theme", newTheme, { path: "/" })
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  // Search functionality
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setIsSearchActive(false)
    }
  }

  // Toggle search bar visibility
  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive)
    if (!isSearchActive) {
      setTimeout(() => document.querySelector(".search-bar")?.focus(), 300)
    }
  }

  // Close banner and set cookie
  const closeBanner = () => {
    setShowBanner(false)
    setCookie("hideBanner", "true", {
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      sameSite: "strict",
    })
  }

  return (
    <div className="z-50">
      {/* Banner Section */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-yellow-500 text-black fixed top-0 left-0 right-0 z-50"
          >
            <div className="container mx-auto px-4 py-2 relative">
              <span className="block text-center text-sm font-semibold">
                Free Shipping on Every Order | الشحن مجاني لجميع الطلبات
              </span>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-black hover:opacity-70 transition-opacity"
                onClick={closeBanner}
                aria-label="Close banner"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <header
        className={`fixed left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border transition-all duration-300 ${
          showBanner ? "top-[2.5rem]" : "top-0"
        } z-40`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and Navigation */}
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
                  <motion.div key={item} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href={item === "HOME" ? "/" : `/${item.toLowerCase()}`}
                      className="text-base font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Right side - Search, Theme toggle, and Menu button */}
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
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(true)}
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content overlap */}
      <div className="transition-all duration-300" style={{ height: showBanner ? "calc(4rem + 2.5rem)" : "4rem" }} />
    </div>
  )
}

