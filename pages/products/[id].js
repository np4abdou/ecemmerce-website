"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/router"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { products } from "../../data/products"
import { images } from "../../config/images"

export default function ProductDetail() {
  const router = useRouter()
  const { id } = router.query
  const product = products.find((p) => p.id === Number(id))
  const sizes = ["XXL", "XL", "L", "M", "S"]
  const [selectedSize, setSelectedSize] = useState("")
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleMouseMove = (e) => {
    if (imageRef.current) {
      const { left, top, width, height } = imageRef.current.getBoundingClientRect()
      const x = ((e.pageX - left) / width) * 100
      const y = ((e.pageY - top) / height) * 100
      setMousePosition({ x, y })
    }
  }

  if (!product) return <div className="text-center py-8">Product not found</div>

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.target)
    const orderData = {
      orderName: product.name,
      clientName: formData.get("fullName"),
      clientPhone: formData.get("phone"),
      clientAddress: formData.get("city"),
    }

    try {
      const response = await fetch("https://order-worker2025.this-is-abdou-2024.workers.dev", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      if (response.ok) {
        router.push("/order-success")
      } else {
        throw new Error("Failed to submit order")
      }
    } catch (error) {
      console.error("Error submitting order:", error)
      alert("There was an error submitting your order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <Link
        href="/products"
        className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Sticky Product Image */}
        <div className="md:sticky md:top-24 h-fit">
          <div
            ref={imageRef}
            className="relative aspect-square overflow-hidden rounded-lg"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <Image
              src={product.image || images.products.placeholder}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className={`transition-transform duration-200 ${isZoomed ? "scale-150" : "scale-100"}`}
              style={
                isZoomed
                  ? {
                      transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                    }
                  : undefined
              }
            />
          </div>
        </div>

        {/* Product Details and Form */}
        <div>
          <div
            className={`transition-all duration-500 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <h1 className="text-4xl font-bold mb-6">{product.name}</h1>
            <p className="text-3xl font-bold mb-8">{product.price} DH</p>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">SIZE</h3>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-16 h-16 border-2 rounded-md flex items-center justify-center text-lg font-medium transition-colors ${
                      selectedSize === size ? "border-primary bg-primary/10" : "border-border hover:border-primary"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Order Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-xl font-semibold text-right mb-4">لإكمال طلبك، يرجى ملء النموذج التالي</h3>

              <input
                type="text"
                name="fullName"
                placeholder="الإسم الكامل / Full name"
                className="w-full p-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="رقم الهاتف / Phone"
                className="w-full p-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />

              <input
                type="text"
                name="city"
                placeholder="العنوان / Address"
                className="w-full p-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />

              <button
                type="submit"
                disabled={isSubmitting || !selectedSize}
                className="w-full bg-primary text-primary-foreground p-4 rounded-md text-lg font-semibold hover:bg-primary/90 transition-colors transform hover:scale-105 duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "جاري الطلب..." : "أطلب الآن / ORDER NOW"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

