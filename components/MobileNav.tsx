"use client"

import { Home, Search, Grid, Heart, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { motion } from "framer-motion"

export default function MobileNav() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(router.pathname)

  const navItems = [
    {
      icon: <Home className="w-6 h-6" />,
      activeIcon: <Home className="w-6 h-6 fill-current" />,
      label: "Home",
      href: "/",
    },
    {
      icon: <Grid className="w-6 h-6" />,
      activeIcon: <Grid className="w-6 h-6 fill-current" />,
      label: "Categories",
      href: "/products",
    },
    {
      icon: <Search className="w-6 h-6" />,
      activeIcon: <Search className="w-6 h-6 fill-current" />,
      label: "Search",
      href: "/search",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      activeIcon: <Heart className="w-6 h-6 fill-current" />,
      label: "Wishlist",
      href: "/wishlist",
    },
    {
      icon: <User className="w-6 h-6" />,
      activeIcon: <User className="w-6 h-6 fill-current" />,
      label: "Profile",
      href: "/profile",
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border md:hidden z-50 safe-bottom">
      <div className="flex items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = router.pathname === item.href
          return (
            <Link key={item.label} href={item.href} className="relative py-2 px-3">
              <motion.div className="flex flex-col items-center" whileTap={{ scale: 0.9 }}>
                {isActive ? (
                  <>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-primary"
                    >
                      {item.activeIcon}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[10px] font-medium text-primary"
                    >
                      {item.label}
                    </motion.div>
                    <motion.div
                      className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                      layoutId="navIndicator"
                    />
                  </>
                ) : (
                  <>
                    <div className="text-muted-foreground">{item.icon}</div>
                    <div className="text-[10px] font-medium text-muted-foreground">{item.label}</div>
                  </>
                )}
              </motion.div>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

