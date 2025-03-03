"use client"

import { useRouter } from "next/router"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Share2, ShoppingBag } from "lucide-react"
import { products } from "../../config/products"
import { useEffect, useRef, useState } from "react"
import { toast } from "react-hot-toast"
import { useCart } from "../../context/CartContext"

export default function ProductDetail() {
  const router = useRouter()
  const { id } = router.query
  const product = products.find((p) => p.id === Number(id))
  const { addToCart } = useCart()
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentImage, setCurrentImage] = useState("")
  const [discount, setDiscount] = useState({ active: false, amount: 0, code: "" })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    if (product) {
      setCurrentImage(product.mainImage)
    }
    const savedDiscount = localStorage.getItem("discount")
    if (savedDiscount) {
      setDiscount(JSON.parse(savedDiscount))
    }

    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Scroll to top on component mount
    window.scrollTo(0, 0)

    return () => window.removeEventListener("resize", checkMobile)
  }, [product])

  const handleMouseMove = (e) => {
    if (imageRef.current) {
      const { left, top, width, height } = imageRef.current.getBoundingClientRect()
      const x = ((e.clientX - left) / width) * 100
      const y = ((e.clientY - top) / height) * 100
      setMousePosition({ x, y })
    }
  }

  const handleShare = () => {
    const url = window.location.href
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("Link copied to clipboard!", {
          style: {
            borderRadius: "10px",
            background: "hsl(var(--card))",
            color: "hsl(var(--foreground))",
            border: "1px solid hsl(var(--border))",
          },
          duration: 2000,
        })
      })
      .catch(() => {
        toast.error("Failed to copy link", {
          style: {
            borderRadius: "10px",
            background: "hsl(var(--card))",
            color: "hsl(var(--foreground))",
            border: "1px solid hsl(var(--border))",
          },
        })
      })
  }

  const handleAddToCart = () => {
    if (!product) return

    addToCart({
      id: product.id,
      name: product.name,
      price: discount.active ? Math.floor(product.price * (1 - discount.amount / 100)) : product.price,
      quantity: 1,
      mainImage: product.mainImage,
      category: product.category,
    })
  }

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg">Loading product...</p>
        </div>
      </div>
    )

  const handleBack = () => {
    router.push("/")
  }

  const discountedPrice = discount.active ? Math.floor(product.price * (1 - discount.amount / 100)) : product.price

  return (
    <div className="container mx-auto px-4 py-4 md:py-8 max-w-6xl">
      <button
        onClick={handleBack}
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-4 md:mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </button>

      <div className="grid md:grid-cols-2 gap-6 md:gap-10">
        {/* Product images section */}
        {/* size edit product image - adjust w-[93%] value to make image smaller/bigger */}
        <div className="md:sticky md:top-24 h-fit space-y-4 w-[93%]">
          {" "}
          {/* Added w-[93%] to reduce overall size */}
          {/* Main product image with 4:5 aspect ratio */}
          <div
            ref={imageRef}
            className="relative w-full overflow-hidden rounded-xl border border-border bg-card shadow-md group max-h-[500px]"
            onMouseEnter={() => !isMobile && setIsZoomed(true)}
            onMouseLeave={() => !isMobile && setIsZoomed(false)}
            onMouseMove={handleMouseMove}
            style={{ aspectRatio: "4/4" }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={currentImage || "/images/product-placeholder.jpg"}
                alt={product.name}
                fill
                className={`object-contain transition-all duration-500 ease-in-out ${isZoomed ? "scale-150" : "scale-97"}`}
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                        transition: "transform 0.5s ease-in-out, transform-origin 0s",
                      }
                    : {
                        transition: "transform 0.5s ease-in-out",
                      }
                }
                priority={true}
              />
            </div>
            {discount.active && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                -{discount.amount}%
              </div>
            )}
          </div>
          {/* Thumbnail gallery - horizontal scroll on mobile */}
          {/* Thumbnail gallery with navigation arrows */}
          <div className="relative">
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x scrollbar-hide px-8">
              <button
                onClick={() => setCurrentImage(product.mainImage)}
                className={`relative min-w-20 w-20 h-20 rounded-lg border overflow-hidden snap-start ${
                  currentImage === product.mainImage
                    ? "border-primary ring-2 ring-primary ring-offset-2"
                    : "border-border hover:border-primary"
                }`}
              >
                <Image src={product.mainImage || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </button>
              {product.alternativeImages?.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(img)}
                  className={`relative min-w-20 w-20 h-20 rounded-lg border overflow-hidden snap-start ${
                    currentImage === img
                      ? "border-primary ring-2 ring-primary ring-offset-2"
                      : "border-border hover:border-primary"
                  }`}
                >
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                const gallery = document.querySelector(".overflow-x-auto")
                gallery.scrollBy({ left: -200, behavior: "smooth" })
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-background/80 backdrop-blur-sm border border-border rounded-full shadow-lg hover:bg-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                const gallery = document.querySelector(".overflow-x-auto")
                gallery.scrollBy({ left: 200, behavior: "smooth" })
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-background/80 backdrop-blur-sm border border-border rounded-full shadow-lg hover:bg-accent transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product details section */}
        <div className="space-y-6">
          {/* Product title and price section */}
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
            {product.category && (
              <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </div>
            )}
            <div className="flex items-center gap-2 mt-4">
              <p className="text-2xl md:text-3xl font-bold" style={{ color: "#f59a38" }}>
                {discountedPrice} DHs
              </p>
              {discount.active && (
                <span className="line-through text-muted-foreground text-xl">{product.price} DHs</span>
              )}
            </div>
          </div>

          {/* Product description section with tap-to-show on mobile */}
          <div className="space-y-3">
            <details className="md:cursor-text" open>
              <summary className="text-lg font-medium md:cursor-text md:list-none">Description</summary>
              <p className="text-muted-foreground pt-2">
                {product.description ||
                  "Experience premium quality with our exclusive collection. Made with high-quality materials for comfort and style that lasts."}
              </p>
            </details>
          </div>

          {/* Add to Cart Button */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary text-primary-foreground py-4 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Add to Cart
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="p-4 rounded-lg border border-border hover:bg-primary/5 transition-colors"
              aria-label="Share product"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Shipping and size information in collapsible sections on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Size guide - made larger */}
            {!["totebags", "caps"].includes(product.category) && (
              <details className="p-4 border border-border rounded-lg bg-card/50 md:block">
                <summary className="text-lg font-medium mb-3 md:cursor-text md:list-none">Size Guide</summary>
                <div className="pt-2">
                  <Image
                    src="/images/size.png"
                    alt="Size Guide"
                    width={500}
                    height={300}
                    className="mx-auto w-full h-auto"
                  />
                </div>
              </details>
            )}

            {/* Shipping information */}
            <details className="p-4 border border-border rounded-lg bg-card/50 md:block" open>
              <summary className="text-lg font-medium mb-3 md:cursor-text md:list-none">Shipping Information</summary>
              <ul className="space-y-2 text-sm text-muted-foreground pt-2">
                <li className="flex items-start gap-2">
                  <div className="min-w-4 h-4 rounded-full bg-primary/20 mt-1"></div>
                  <span>Free delivery all over Morocco</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 h-4 rounded-full bg-primary/20 mt-1"></div>
                  <span>Delivery within 48-72 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 h-4 rounded-full bg-primary/20 mt-1"></div>
                  <span>Pay on delivery</span>
                </li>
              </ul>
            </details>
          </div>
        </div>
      </div>
    </div>
  )
}

