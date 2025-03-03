"use client"

import { ShoppingBag } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useRouter } from "next/router"
import { motion, AnimatePresence } from "framer-motion"

export default function CartIcon() {
  const { getCartCount } = useCart()
  const router = useRouter()
  const cartCount = getCartCount()

  return (
    <button
      onClick={() => router.push("/cart")}
      className="relative p-2 rounded-full hover:bg-accent transition-colors"
      aria-label="Shopping cart"
    >
      <ShoppingBag className="w-5 h-5" />
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
          >
            {cartCount}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}

