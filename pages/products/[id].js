"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/router"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { products } from "../../config/products"
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
  const [currentImage, setCurrentImage] = useState("")
  const [discount, setDiscount] = useState({ active: false, amount: 0, code: "" })

  useEffect(() => {
    setIsLoaded(true)
    if (product) {
      setCurrentImage(product.mainImage)
    }
    const savedDiscount = localStorage.getItem("discount")
    if (savedDiscount) {
      setDiscount(JSON.parse(savedDiscount))
    }
  }, [product])

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
      productId: product.id,
      status: "pending",
    }

    try {
      const response = await fetch("https://order-worker2025.this-is-abdou-2024.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  const discountedPrice = discount.active ? Math.floor(product.price * (1 - discount.amount / 100)) : product.price
  const showSizes = !["totebags", "caps"].includes(product.category)

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link 
        href="/products" 
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="md:sticky md:top-24 h-fit space-y-4">
          <div
            ref={imageRef}
            className="relative aspect-square w-[400px] mx-auto overflow-hidden rounded-lg border border-border bg-card shadow-sm"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <Image
              src={currentImage || images.products.placeholder}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className={`transition-transform duration-200 ${isZoomed ? "scale-150" : "scale-100"}`}
              style={
                isZoomed ? { transformOrigin: `${mousePosition.x}% ${mousePosition.y}%` } : undefined
              }
            />
          </div>
          
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => setCurrentImage(product.mainImage)}
              className={`relative w-20 h-20 rounded-md border overflow-hidden ${
                currentImage === product.mainImage ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-border hover:border-primary'
              }`}
            >
              <Image
                src={product.mainImage}
                alt={product.name}
                layout="fill"
                objectFit="cover"
              />
            </button>
            {product.alternativeImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(img)}
                className={`relative w-20 h-20 rounded-md border overflow-hidden ${
                  currentImage === img ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-border hover:border-primary'
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} view ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-bold" style={{ color: '#f59a38' }}>
              {discount.active && (
                <span className="line-through text-muted-foreground mr-2 text-xl">
                  {product.price} DHs
                </span>
              )}
              {discountedPrice} DHs
            </p>
          </div>

          {showSizes && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-muted-foreground">Select Size</label>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-md border ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <input
                type="text"
                name="fullName"
                placeholder="الإسم الكامل / Full name"
                className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            <div className="space-y-2">
              <input
                type="tel"
                name="phone"
                placeholder="رقم الهاتف / Phone"
                className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            <div className="space-y-2">
              <input
                type="text"
                name="city"
                placeholder="العنوان / Address"
                className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || (showSizes && !selectedSize)}
              className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "جاري الطلب..." : "أطلب الآن / ORDER NOW"}
            </button>
          </form>

          {showSizes && (
            <div className="mt-6 p-4 border border-border rounded-lg bg-card">
              <h3 className="text-lg font-medium mb-2">Size Guide</h3>
              <Image
                src="/images/size.png"
                alt="Size Guide"
                width={300}
                height={150}
                className="mx-auto"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}