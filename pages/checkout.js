"use client"

import { useState } from "react"
import { useCart } from "../context/CartContext"
import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ShoppingBag } from "lucide-react"
import { toast } from "react-hot-toast"
import SEO from "../components/SEO"

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useCart()
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "",
    address: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedSizes, setSelectedSizes] = useState({})

  // Initialize selected sizes for products that need sizes
  useState(() => {
    const initialSizes = {}
    cart.forEach((item) => {
      if (item.category !== "totebags" && item.category !== "caps" && !item.size) {
        initialSizes[item.id] = ""
      }
    })
    setSelectedSizes(initialSizes)
  }, [cart])

  const handleSizeChange = (productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Check if sizes are selected for all products that need them
    const needsSizeSelection = cart.some(
      (item) => item.category !== "totebags" && item.category !== "caps" && !item.size && !selectedSizes[item.id],
    )

    if (needsSizeSelection) {
      toast.error("Please select sizes for all products")
      return
    }

    setIsSubmitting(true)

    try {
      // Create order items with selected sizes
      const orderItems = cart.map((item) => {
        // If item already has a size, use it; otherwise use the selected size
        const size = item.size || selectedSizes[item.id] || "N/A"

        return {
          orderName: item.name,
          clientName: formData.fullName,
          clientPhone: formData.phone,
          clientAddress: `${formData.city}, ${formData.address}`,
          productId: item.id,
          quantity: item.quantity,
          size: size,
          status: "pending",
          mainImage: item.mainImage, // Add this line to include the image
          price: item.price, // Add this line to include the price
        }
      })

      // Submit each order item
      for (const orderData of orderItems) {
        const response = await fetch("https://order-worker2025.this-is-abdou-2024.workers.dev", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        })

        if (!response.ok) {
          throw new Error("Failed to submit order")
        }
      }

      // Clear cart and redirect to success page
      clearCart()
      localStorage.setItem(
        "lastOrder",
        JSON.stringify({
          items: orderItems,
          subtotal: getCartTotal(),
          total: getCartTotal(),
        }),
      )
      router.push("/order-success")
    } catch (error) {
      console.error("Error submitting order:", error)
      toast.error("There was an error submitting your order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Check if cart is empty
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <SEO title="Checkout" description="Complete your purchase" keywords="checkout, order, purchase" />
        <div className="text-center py-16 bg-card rounded-lg border border-border">
          <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
            <ShoppingBag className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">You need to add items to your cart before checkout.</p>
          <Link
            href="/products"
            className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  const sizes = ["XXL", "XL", "L", "M", "S"]

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <SEO title="Checkout" description="Complete your purchase" keywords="checkout, order, purchase" />

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Order Form */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-semibold">Your Information</h2>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="الإسم الكامل / Full name"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="رقم الهاتف / Phone"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="المدينة / City"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="العنوان / Address"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Products that need size selection */}
            {Object.keys(selectedSizes).length > 0 && (
              <div className="bg-card rounded-lg border border-border overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="text-xl font-semibold">Select Sizes</h2>
                </div>

                <div className="p-6 space-y-6">
                  {cart.map((item) => {
                    // Skip items that already have sizes or don't need sizes
                    if (item.size || item.category === "totebags" || item.category === "caps") {
                      return null
                    }

                    return (
                      <div key={item.id} className="border-b border-border pb-6 last:border-0 last:pb-0">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="relative w-16 h-16 rounded-md overflow-hidden">
                            <Image
                              src={item.mainImage || "/placeholder.svg"}
                              alt={item.name}
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Select Size</label>
                          <div className="flex flex-wrap gap-3">
                            {sizes.map((size) => (
                              <button
                                key={size}
                                type="button"
                                onClick={() => handleSizeChange(item.id, size)}
                                className={`px-4 py-2 rounded-lg border transition-all ${
                                  selectedSizes[item.id] === size
                                    ? "border-primary bg-primary text-primary-foreground font-medium"
                                    : "border-border hover:border-primary hover:bg-primary/5"
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <Link
                href="/cart"
                className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Cart
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-primary-foreground py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Processing...
                  </>
                ) : (
                  "Complete Order"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-card rounded-lg border border-border sticky top-24">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-semibold">Order Summary</h2>
            </div>

            <div className="p-6">
              <div className="space-y-4 max-h-80 overflow-y-auto mb-4">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size || "default"}`} className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.mainImage || "/placeholder.svg"}
                        alt={item.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium line-clamp-1">{item.name}</h3>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-muted-foreground">
                          {item.size && `Size: ${item.size}`}
                          {item.size && " · "}
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-semibold">{item.price * item.quantity} DHs</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{getCartTotal()} DHs</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-lg">{getCartTotal()} DHs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

