"use client"

import { useState, useEffect, useRef } from "react"
import { products } from "../config/products"
import Image from "next/image"
import { ArrowRight, ShoppingBag, ChevronRight, Star, TrendingUp } from "lucide-react"
import { images } from "../config/images"
import Link from "next/link"
import SEO from "../components/SEO"
import { useTheme } from "next-themes"
import BlurText from "../components/BlurText"
import { newArrivalsConfig } from "../config/new_arrivals"
import { motion } from "framer-motion"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const heroRef = useRef(null)
  const categoriesRef = useRef(null)
  const arrivalsRef = useRef(null)
  const [discount, setDiscount] = useState({ active: false, amount: 0, code: "" })
  const { theme } = useTheme()
  const [isMobile, setIsMobile] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")

  useEffect(() => {
    setIsLoaded(true)
    const savedDiscount = localStorage.getItem("discount")
    if (savedDiscount) {
      setDiscount(JSON.parse(savedDiscount))
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleShopNowClick = () => {
    categoriesRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleAnimationComplete = () => {
    console.log("Animation completed!")
  }

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  const newArrivals = products
    .filter((product) => newArrivalsConfig.productIds.includes(product.id))
    .sort((a, b) => newArrivalsConfig.productIds.indexOf(a.id) - newArrivalsConfig.productIds.indexOf(b.id))
    .slice(0, newArrivalsConfig.display.desktop.total)

  const categories = [
    { name: "Tote Bags", image: images.categoryIcons.totebags, id: "totebags" },
    { name: "Hoodies", image: images.categoryIcons.hoodies, id: "hoodies" },
    { name: "T-Shirts", image: images.categoryIcons.tshirts, id: "tshirts" },
    { name: "Caps", image: images.categoryIcons.caps, id: "caps" },
  ]

  // Calculate bestsellers (for demo purposes)
  const bestsellers = [...products]
    .sort(() => 0.5 - Math.random())
    .slice(0, 4)
    .map(product => ({
      ...product,
      rating: (4 + Math.random()).toFixed(1),
      soldCount: Math.floor(Math.random() * 500) + 100
    }))

  return (
    <>
      <SEO
        title="Expert Fashion | Artistic Clothing Collection"
        description="Discover our exclusive collection of artistic clothing at Expert. Unique designs that reflect your style and personality."
        keywords="artistic clothing, fashion, Expert, wear art, limited edition, designer clothes"
      />

      {/* Announcement Banner */}
      {discount.active && (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 text-center relative">
          <p className="text-sm font-medium">
            Special Offer: Use code <span className="font-bold">{discount.code}</span> for {discount.amount}% off your order!
          </p>
        </div>
      )}

      {/* Navigation Dots */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
        <div className="flex flex-col space-y-4">
          {[
            { ref: heroRef, name: "Hero" },
            { ref: categoriesRef, name: "Categories" },
            { ref: arrivalsRef, name: "New Arrivals" }
          ].map((section, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(section.ref)}
              className="w-3 h-3 rounded-full bg-gray-300 hover:bg-primary transition-colors duration-300 group relative"
              aria-label={`Scroll to ${section.name}`}
            >
              <span className="absolute right-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-xs font-medium text-gray-700 dark:text-gray-300">
                {section.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative min-h-[90vh] w-full overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={isMobile ? "/images/mobile-hero.png" : "/images/home.png"}
              alt="Hero"
              layout="fill"
              objectFit="cover"
              priority
              className="z-0"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10" />
          </motion.div>

          {/* Hero Content Container */}
          <div className="relative container mx-auto px-4 h-[90vh] flex items-center z-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-xl ml-0 md:ml-8"
            >
              <BlurText
                text="ELEVATE YOUR STYLE"
                delay={150}
                animateBy="words"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
                className="text-5xl md:text-7xl font-bold mb-6 text-white font-cool"
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-lg md:text-xl mb-8 text-gray-100"
              >
                اكتشف التصاميم الحصرية المصممة خصيصا لك
                <br />
                Explore our unique collection of artistic fashion designed for self-expression
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button 
                  onClick={handleShopNowClick} 
                  className="animated-button bg-white text-black hover:bg-white/90 py-3 px-6 rounded-full font-medium text-base flex items-center justify-center group"
                >
                  <div className="button-content">
                    <span className="button-text mr-2">Explore Collection</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
                
                <Link href="/trending" className="bg-transparent border-2 border-white text-white hover:bg-white/10 py-3 px-6 rounded-full font-medium text-base flex items-center justify-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  <span>Trending Now</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden md:block">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className="text-white flex flex-col items-center"
            >
              <span className="text-sm font-medium mb-2">Scroll Down</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </div>
        </section>

        {/* Categories Section */}
        <section ref={categoriesRef} className="py-20 sm:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Browse our collections</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 mb-4 text-theme">Find Your Style</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Discover our curated categories of artistic clothing designed for your unique expression
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
              {categories.map((category, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={index}
                >
                  <Link href={`/search?category=${category.id}`} className="group block">
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg transition-all duration-300 transform group-hover:scale-[1.02] group-hover:shadow-xl">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                        <h3 className="text-white text-xl sm:text-2xl font-bold mb-1">{category.name}</h3>
                        <div className="flex items-center text-white/80 text-sm font-medium group-hover:text-primary transition-colors">
                          <span>Explore</span>
                          <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Highlights */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-theme">Best Sellers</h2>
              <Link href="/bestsellers" className="text-primary font-medium flex items-center hover:underline">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {bestsellers.map((product, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={product.id}
                  className="group"
                >
                  <Link href={`/products/${product.id}`} className="block bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={product.mainImage || images.products.placeholder}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      <div className="absolute top-3 left-3 flex items-center bg-white dark:bg-gray-800 rounded-full py-1 px-2 shadow-sm">
                        <Star className="h-3 w-3 text-yellow-400 mr-1" />
                        <span className="text-xs font-medium">{product.rating}</span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-medium text-sm sm:text-base mb-1 truncate">{product.name}</h3>
                      <p className="text-primary font-bold">{product.price} DHs</p>
                      <p className="text-xs text-gray-500 mt-1">{product.soldCount}+ sold</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* New Arrivals Section */}
        <section id="new-arrivals" ref={arrivalsRef} className="py-20 sm:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Fresh & exclusive</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 mb-4 text-theme">NEW ARRIVALS</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                أحدث إضافاتنا من الملابس الفنية
                <br />
                Our latest artistic clothing additions, designed for those who want to stand out
              </p>
            </div>

            {/* Category Filters */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
                <button 
                  onClick={() => setActiveCategory("all")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === "all" 
                      ? "bg-white dark:bg-gray-700 shadow-sm text-primary" 
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category.id 
                        ? "bg-white dark:bg-gray-700 shadow-sm text-primary" 
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
              {newArrivals.map((product, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={product.id}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform group-hover:scale-[1.02]">
                    {/* Product Image */}
                    <Link href={`/products/${product.id}`}>
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <Image
                          src={product.mainImage || images.products.placeholder}
                          alt={product.name}
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-primary text-white px-3 py-1 text-xs font-bold rounded-full uppercase">
                            New
                          </span>
                        </div>
                        {discount.active && (
                          <div className="absolute top-3 right-3">
                            <span className="bg-red-500 text-white px-3 py-1 text-xs font-bold rounded-full uppercase">
                              {discount.amount}% Off
                            </span>
                          </div>
                        )}
                        
                        {/* Quick Add Button (Appears on Hover) */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <button className="bg-white text-black font-medium py-2 px-4 rounded-full transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                            Quick View
                          </button>
                        </div>
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="p-4">
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-medium text-sm sm:text-base mb-1 group-hover:text-primary transition-colors truncate">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 truncate">
                        {product.category || "Limited Edition"}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-base sm:text-lg text-theme">
                          {discount.active ? (
                            <>
                              <span className="line-through text-gray-400 text-sm mr-2">{product.price} DHs</span>
                              {(product.price * (1 - discount.amount / 100)).toFixed(2)} DHs
                            </>
                          ) : (
                            `${product.price} DHs`
                          )}
                        </p>
                        
                        <button className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full transition-colors duration-300 hover:bg-primary">
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View All Button */}
            <div className="mt-12 text-center">
              <Link 
                href="/collections/new-arrivals" 
                className="inline-flex items-center justify-center bg-black text-white py-3 px-8 rounded-full font-medium hover:bg-gray-900 transition-colors group"
              >
                View All New Arrivals
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonial/Featured Banner */}
        <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Express Yourself Through Art</h2>
              <p className="text-lg mb-8">
                Our designs are more than just clothing - they're a statement of who you are.
                Join thousands of others who have discovered their unique style with Expert.
              </p>
              <Link 
                href="/about-us" 
                className="inline-flex items-center justify-center bg-white text-indigo-600 py-3 px-8 rounded-full font-medium hover:bg-gray-100 transition-colors"
              >
                Our Story
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-theme">Stay Updated</h2>
              <p className="text-muted-foreground mb-6">
                Subscribe to our newsletter to get updates on new arrivals, exclusive offers, and more.
              </p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary text-white font-medium py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-4">
                By subscribing, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}