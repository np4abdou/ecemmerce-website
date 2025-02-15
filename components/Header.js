"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Moon, Sun, Menu, X, Search } from "lucide-react"
import { images } from "../config/images"
import { motion, AnimatePresence } from "framer-motion"
import { Montserrat } from "next/font/google"
import { useRouter } from "next/router"

const montserrat = Montserrat({ subsets: ["latin"] })

export default function Header({ darkMode, setDarkMode }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-primary text-primary-foreground py-2 text-center text-sm overflow-hidden"
          >
            Free Shipping on Every Order | الشحن مجاني لجميع الطلبات
          </motion.div>
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`sticky top-0 z-50 bg-background/80 backdrop-blur-md transition-all duration-300 ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex-shrink-0">
                <Image src={images.logo || "/placeholder.svg"} alt="ASCEND" width={100} height={32} />
              </Link>
              <nav className="hidden md:flex items-center space-x-6">
                {["HOME", "CATEGORIES", "CONTACT"].map((item) => (
                  <motion.div key={item} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href={item === "HOME" ? "/" : `/${item.toLowerCase()}`}
                      className={`${montserrat.className} text-lg font-semibold text-foreground hover:text-primary transition-colors`}
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            <div className="flex-1 max-w-md mx-4">
              <motion.form
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative"
                onSubmit={(e) => {
                  e.preventDefault()
                  const searchTerm = e.target.search.value
                  router.push(`/search?query=${encodeURIComponent(searchTerm)}`)
                }}
              >
                <input
                  type="text"
                  name="search"
                  placeholder="Search..."
                  className="w-full py-2 px-4 pr-10 rounded-full bg-accent text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                >
                  <Search className="h-5 w-5" />
                </button>
              </motion.form>
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-accent transition-colors"
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </motion.button>

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
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 right-0 z-50 w-64 bg-background shadow-xl"
            >
              <div className="p-4">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute top-4 right-4 transition-opacity hover:opacity-70"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>

                <nav className="flex flex-col space-y-6 mt-12">
                  {["HOME", "CATEGORIES", "CONTACT"].map((item) => (
                    <motion.div key={item} whileHover={{ scale: 1.05, x: 10 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href={item === "HOME" ? "/" : `/${item.toLowerCase()}`}
                        className={`${montserrat.className} text-2xl font-semibold transition-colors hover:text-primary`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsMenuOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </>
  )
}

