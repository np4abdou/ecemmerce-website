"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { products } from "../data/products"
import { images } from "../config/images"
import SEO from "../components/SEO"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const newArrivals = products.slice(0, 3)

  return (
    <>
      <SEO
        title="Home"
        description="Discover our exclusive collection of artistic clothing at ASCEND"
        keywords="artistic clothing, fashion, ASCEND, wear art"
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[80vh] bg-black text-white overflow-hidden">
          <div className={`absolute inset-0 transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-100"}`}>
            <Image
              src={images.home.hero || "/placeholder.svg"}
              alt="Hero"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className={`text-5xl md:text-7xl font-bold mb-6 transition-all duration-500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                WEAR ART
                <br />
                OUR ART
              </h1>
              <p className={`text-xl mb-8 text-gray-200 transition-all duration-500 delay-200 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                اكتشف مجموعتنا الحصرية من الملابس الفنية
                <br />
                Discover our exclusive collection of artistic clothing
              </p>
              <div className={`transition-all duration-500 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                <Link
                  href="/products"
                  className="inline-flex items-center bg-primary text-primary-foreground px-8 py-4 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* New Arrivals Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">NEW ARRIVALS</h2>
              <p className="text-muted-foreground">
                أحدث إضافاتنا من الملابس الفنية
                <br />
                Our latest artistic clothing additions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {newArrivals.map((product, index) => (
                <div
                  key={product.id}
                  className={`group relative transition-all duration-500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                    <Image
                      src={product.image || images.products.placeholder}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-black text-white px-3 py-1 text-sm font-semibold rounded">NEW</span>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    <p className="text-xl font-bold text-primary mb-4">DH {product.price}</p>
                    <Link
                      href={`/products/${product.id}`}
                      className="inline-block bg-black text-white w-full py-3 text-center rounded hover:bg-black/90 transition-colors"
                    >
                      Shop now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-accent">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">COLLECTIONS</h2>
              <p className="text-muted-foreground">
                استكشف مجموعاتنا المميزة
                <br />
                Explore our unique collections
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "WEAR ART", image: images.categories.wearArt },
                { name: "OTAKU", image: images.categories.otaku },
                { name: "GYM", image: images.categories.gym },
                { name: "LIMITED", image: images.categories.limited },
              ].map((category, index) => (
                <div
                  key={category.name}
                  className={`group cursor-pointer transition-all duration-500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative aspect-square overflow-hidden rounded-lg border-2 border-black">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-end p-6">
                      <h3 className="text-white text-2xl font-bold">{category.name}</h3>
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