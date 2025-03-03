"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShoppingBag } from "lucide-react"
import { products } from "../config/products"
import { images } from "../config/images"
import SEO from "../components/SEO"
import { useTheme } from "next-themes"
import BlurText from "../components/BlurText"
import { newArrivalsConfig } from "../config/new_arrivals"

export default function MobileHome() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [discount, setDiscount] = useState({ active: false, amount: 0, code: "" })
  const { theme } = useTheme()
  const categoriesRef = useRef(null)

  useEffect(() => {
    setIsLoaded(true)
    const savedDiscount = localStorage.getItem("discount")
    if (savedDiscount) {
      setDiscount(JSON.parse(savedDiscount))
    }
  }, [])

  const handleShopNowClick = () => {
    categoriesRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleAnimationComplete = () => {
    console.log("Animation completed!")
  }

  const newArrivals = products
    .filter((product) => newArrivalsConfig.productIds.includes(product.id))
    .sort((a, b) => {
      return newArrivalsConfig.productIds.indexOf(a.id) - newArrivalsConfig.productIds.indexOf(b.id)
    })
    .slice(0, newArrivalsConfig.display.mobile.total)

  const categories = [
    { name: "Tote Bags", image: images.categoryIcons.totebags, id: "totebags" },
    { name: "Hoodies", image: images.categoryIcons.hoodies, id: "hoodies" },
    { name: "T-Shirts", image: images.categoryIcons.tshirts, id: "tshirts" },
    { name: "Caps", image: images.categoryIcons.caps, id: "caps" },
  ]

  return (
    <>
      <SEO
        title="Home"
        description="Discover our exclusive collection of artistic clothing at Expert"
        keywords="artistic clothing, fashion, Expert, wear art"
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[80vh] w-full overflow-hidden mt-4">
          <Image
            src="/images/gif.gif"
            alt="Hero Animation"
            layout="fill"
            objectFit="cover"
            priority
            className="transition-opacity duration-500"
          />

          {/* Hero Content Container */}
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-xl mx-auto text-center">
              <BlurText
                text="OUR DESIGNS. YOUR STYLE."
                delay={150}
                animateBy="words"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
                className={`text-2xl sm:text-3xl font-bold mb-4 text-theme font-cool transition-all duration-500 ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              />
              <p
                className={`text-sm mb-6 text-theme transition-all duration-500 delay-200 ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                اكتشف التصاميم الحصرية المصممة خصيصا لك
                <br />
                Explore our unique selection of artistic fashion
              </p>
              <div
                className={`transition-all duration-500 delay-300 ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                <button onClick={handleShopNowClick} className="animated-button">
                  <div className="button-content">
                    <span className="button-text">Shop Now</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                  <div className="floating-images">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4267723-yG5YcdwecwY8FXaLNfoD9qpss9zaOw.png"
                      alt="Fashion Icon 1"
                      width={20}
                      height={20}
                      className="floating-image"
                      style={{ top: "10%", left: "15%", animationDelay: "0s" }}
                    />
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1974211-oVwW8sDqDWS3J8Me0G2OP51xTBXjmi.png"
                      alt="Fashion Icon 2"
                      width={20}
                      height={20}
                      className="floating-image"
                      style={{ top: "70%", left: "75%", animationDelay: "1s" }}
                    />
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/755999-xBxiFDUlEWVNAlBNeWpblnyc7lewXM.png"
                      alt="Fashion Icon 3"
                      width={20}
                      height={20}
                      className="floating-image"
                      style={{ top: "50%", left: "30%", animationDelay: "2s" }}
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section ref={categoriesRef} className="py-8 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-6 text-theme">Products collections</h2>
            <div className="grid grid-cols-2 gap-4">
              {categories.map((category, index) => (
                <Link href={`/search?category=${category.id}`} key={index} className="group block">
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-center mt-2 text-sm font-semibold group-hover:text-primary transition-colors duration-300 text-theme">
                    {category.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* New Arrivals Section */}
        <section id="new-arrivals" className="py-8 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2 text-theme">NEW ARRIVALS</h2>
              <p className="text-xs text-muted-foreground">
                أحدث إضافاتنا من الملابس الفنية
                <br />
                Our latest artistic clothing additions
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {newArrivals.map((product, index) => (
                <div
                  key={product.id}
                  className={`group relative transition-all duration-500 ${
                    isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Improved product card with better styling */}
                  <div className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <Link href={`/products/${product.id}`}>
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <Image
                          src={product.mainImage || images.products.placeholder}
                          alt={product.name}
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="bg-black text-white px-2 py-1 text-xs font-semibold rounded">NEW</span>
                        </div>
                        {discount.active && (
                          <div className="absolute top-2 right-2">
                            <span className="bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
                              {discount.amount}% OFF
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>
                    <div className="p-3">
                      <h3 className="text-xs font-semibold mb-1 text-theme truncate" title={product.name}>
                        {product.name}
                      </h3>
                      <p className="text-sm font-bold text-primary mb-2">
                        {discount.active ? (
                          <>
                            <span className="line-through text-muted-foreground mr-2">{product.price} DHs</span>
                            {(product.price * (1 - discount.amount / 100)).toFixed(2)} DHs
                          </>
                        ) : (
                          `${product.price} DHs`
                        )}
                      </p>

                      {/* Updated Shop Now Button */}
                      <Link
                        href={`/products/${product.id}`}
                        className="flex items-center justify-center w-full py-1.5 bg-black text-white rounded-md transition-colors duration-300 hover:bg-black/90 group"
                      >
                        <ShoppingBag className="w-3 h-3 mr-1 group-hover:animate-bounce" />
                        <span className="text-xs font-medium">Shop Now</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

