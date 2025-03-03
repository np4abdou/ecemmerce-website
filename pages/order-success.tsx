"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function OrderSuccess() {
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const router = useRouter()
  const { theme } = useTheme()

  // Get cart details before they're cleared
  useEffect(() => {
    const savedOrder = localStorage.getItem("lastOrder")
    if (savedOrder) {
      setOrderDetails(JSON.parse(savedOrder))
    } else {
      // If no order details, redirect to home after a short delay
      const timer = setTimeout(() => {
        router.push("/")
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [router])

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">No order details found. Redirecting to home...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-card rounded-lg shadow-lg p-8"
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative w-16 h-16">
            <Image
              src={theme === "dark" ? "/images/success-icon-dark.png" : "/images/success-icon-light.png"}
              alt="Success"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Thank you message */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Thank you for shopping with Expert! Stay stylish and keep rising
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-foreground" dir="rtl">
            سيتم الإتصال بكم في أقرب ممكن لتأكيد طلبكم
          </p>
          <p className="text-sm text-muted-foreground">
            We are happy that you have chosen our store and we hope that your experience with our products will be very
            special. We will send you a shipping confirmation once your order is shipped
          </p>
        </div>

        {/* Order Details */}
        <div className="border border-border rounded-lg overflow-hidden mb-6">
          {orderDetails.items.map((item: any, index: number) => (
            <div key={index} className="flex items-center gap-4 p-4 border-b border-border last:border-b-0">
              <div className="relative w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                <Image src={item.mainImage || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{item.name}</h3>
                <p className="text-sm text-muted-foreground">
                  SIZE: {item.size} · Quantity: {item.quantity}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">DH {item.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Price Summary */}
        <div className="space-y-2 mb-8">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium text-foreground">DH {orderDetails.subtotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping Cost</span>
            <span className="font-medium text-foreground">Free</span>
          </div>
          <div className="flex justify-between text-base pt-2 border-t border-border">
            <span className="font-semibold text-foreground">Total</span>
            <span className="font-bold text-foreground">DH {orderDetails.total}</span>
          </div>
        </div>

        {/* Return to shop button */}
        <Link
          href="/"
          className="block w-full bg-primary text-primary-foreground text-center py-4 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Return to shop
        </Link>
      </motion.div>
    </div>
  )
}

