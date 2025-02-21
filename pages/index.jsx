"use client"

import { useState, useEffect, useRef } from "react"
import { products } from "../config/products"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { images } from "../config/images"
import Link from "next/link"
import SEO from "../components/SEO"
import { useTheme } from "next-themes"
import BlurText from "../components/BlurText"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const heroRef = useRef(null)
  const [discount, setDiscount] = useState({ active: false, amount: 0, code: "" })
  const { theme } = useTheme()

  useEffect(() => {
    setIsLoaded(true)
    const savedDiscount = localStorage.getItem("discount")
    if (savedDiscount) {
      setDiscount(JSON.parse(savedDiscount))
    }
  }, [])

  const handleShopNowClick = () => {
    window.location.href = "/categories"
  }

  const handleAnimationComplete = () => {
    console.log("Animation completed!")
  }

  const newArrivals = products.slice(0, 4)

  const categories = [
    { name: "Tote Bags", image: images.categories.totebags, link: "/totebags" },
    { name: "Hoodies", image: images.categories.hoodies, link: "/hoodies" },
    { name: "T-Shirts", image: images.categories.tshirts, link: "/tshirts" },
    { name: "Caps", image: images.categories.caps, link: "/caps" },
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
        <section
          ref={heroRef}
          className="relative h-[90vh] w-full overflow-hidden"
          style={{
            marginTop: "-2rem",
            marginLeft: "calc(-50vw + 50%)",
            marginRight: "calc(-50vw + 50%)",
            width: "100vw",
          }}
        >
          <Image
            src="/images/home.png"
            alt="Hero"
            layout="fill"
            objectFit="cover"
            priority
            className="transition-opacity duration-500"
          />

          {/* Hero Content Container */}
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-xl ml-0 md:ml-8">
              <BlurText
                text="OUR DESIGNS. YOUR STYLE."
                delay={150}
                animateBy="words"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
                className={`text-4xl md:text-6xl font-bold mb-6 text-theme font-cool transition-all duration-500 ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              />
              <p
                className={`text-lg mb-8 text-theme transition-all duration-500 delay-200 ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                اكتشف التصاميم الحصرية المصممة خصيصا لك
                <br />
                Explore our unique selection of artistic fashion
              </p>
              {/* Shop Now Button with Floating Images */}
              <div
                className={`transition-all duration-500 delay-300 ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                <button onClick={handleShopNowClick} className="animated-button">
                  <div className="button-content">
                    <span className="button-text">Shop Now</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
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
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-theme">Shop by Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {categories.map((category, index) => (
                <Link href={category.link} key={index} className="group block">
                  <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden transition-transform duration-300 transform group-hover:scale-105">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-center mt-4 text-lg font-semibold group-hover:text-primary transition-colors duration-300 text-theme">
                    {category.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* New Arrivals Section */}
        <section id="new-arrivals" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-theme">NEW ARRIVALS</h2>
              <p className="text-muted-foreground">
                أحدث إضافاتنا من الملابس الفنية
                <br />
                Our latest artistic clothing additions
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {newArrivals.map((product, index) => (
                <div
                  key={product.id}
                  className={`group relative transition-all duration-500 ${
                    isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Make the product image clickable */}
                  <Link href={`/products/${product.id}`}>
                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                      <Image
                        src={product.mainImage || images.products.placeholder}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-black text-white px-3 py-1 text-sm font-semibold rounded">
                          NEW
                        </span>
                      </div>
                      {discount.active && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-red-500 text-white px-3 py-1 text-sm font-semibold rounded">
                            {discount.amount}% OFF
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-semibold mb-2 text-theme">{product.name}</h3>
                    <p className="text-xl font-bold text-primary mb-4">
                      {discount.active ? (
                        <>
                          <span className="line-through text-muted-foreground mr-2">
                            {product.price} DHs
                          </span>
                          {(product.price * (1 - discount.amount / 100)).toFixed(2)} DHs
                        </>
                      ) : (
                        `${product.price} DHs`
                      )}
                    </p>
                    <Link
                      href={`/products/${product.id}`}
                      className="shop-now-small"
                    >
                      <span className="shiny-text">Shop now</span>
                    </Link>
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
