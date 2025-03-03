"use client"

import { useState } from "react"
import { useCart } from "../context/CartContext"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import SEO from "../components/SEO"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart()
  const [isLoaded, setIsLoaded] = useState(true)

  const handleQuantityChange = (id, currentQuantity, change, size) => {
    const newQuantity = Math.max(1, currentQuantity + change)
    updateQuantity(id, newQuantity, size)
  }

  return (
    <>
      <SEO
        title="Shopping Cart"
        description="View your shopping cart and proceed to checkout"
        keywords="cart, shopping, checkout"
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-lg border border-border">
            <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Looks like you haven't added any products to your cart yet.</p>
            <Link
              href="/products"
              className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-card rounded-lg border border-border overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="text-xl font-semibold">Cart Items ({cart.length})</h2>
                </div>

                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.size || "default"}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-b border-border last:border-b-0"
                    >
                      <div className="p-6 flex flex-col sm:flex-row gap-4">
                        {/* Product Image */}
                        <div className="w-full sm:w-24 h-24 flex-shrink-0">
                          <div className="relative h-full w-full rounded-md overflow-hidden">
                            <Image
                              src={item.mainImage || "/placeholder.svg"}
                              alt={item.name}
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div>
                              <h3 className="font-medium text-lg">{item.name}</h3>
                              {item.size && <p className="text-sm text-muted-foreground mt-1">Size: {item.size}</p>}
                            </div>
                            <div className="mt-2 sm:mt-0 text-right">
                              <p className="font-semibold text-lg">{item.price} DHs</p>
                            </div>
                          </div>

                          <div className="flex justify-between items-center mt-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-border rounded-md">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity, -1, item.size)}
                                className="p-2 hover:bg-accent transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-4 py-2 border-x border-border">{item.quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity, 1, item.size)}
                                className="p-2 hover:bg-accent transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => removeFromCart(item.id, item.size)}
                              className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="mt-6">
                <Link
                  href="/products"
                  className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-card rounded-lg border border-border sticky top-24">
                <div className="p-6 border-b border-border">
                  <h2 className="text-xl font-semibold">Order Summary</h2>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{getCartTotal()} DHs</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="border-t border-border pt-4 flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-lg">{getCartTotal()} DHs</span>
                  </div>

                  <Link
                    href="/checkout"
                    className="mt-6 w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

