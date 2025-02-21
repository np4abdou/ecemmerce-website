"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { ChevronDown } from "lucide-react"
import { products, categories } from "../config/products"
import { images } from "../config/images"
import Image from "next/image"

export default function Products() {
  const router = useRouter()
  const { category: initialCategory } = router.query
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [isLoaded, setIsLoaded] = useState(false)
  const [discount, setDiscount] = useState({ active: false, amount: 0, code: "" })

  useEffect(() => {
    setIsLoaded(true)
    const savedDiscount = localStorage.getItem("discount")
    if (savedDiscount) {
      setDiscount(JSON.parse(savedDiscount))
    }
  }, [])

  const filteredProducts = products
    .filter(
      (product) =>
        (selectedCategory === "all" || product.category === selectedCategory) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1],
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "newest":
          return new Date(b.date) - new Date(a.date)
        default:
          return 0
      }
    })

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">All Products</h1>

      <div className="max-w-6xl mx-auto">
        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 p-3 bg-card border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground/70"
            />

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none w-full md:w-48 p-3 bg-card border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary pr-10 text-foreground"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none w-5 h-5" />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-6 py-2 rounded-full transition-colors ${
                selectedCategory === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-muted/80"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full transition-colors ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`transition-all duration-500 ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Link
                href={`/products/${product.id}`}
                className="group block bg-card text-card-foreground rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.mainImage || images.products.placeholder}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                  {product.isNew && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-black text-white px-3 py-1 text-sm font-semibold rounded">NEW</span>
                    </div>
                  )}
                  {discount.active && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-red-500 text-white px-3 py-1 text-sm font-semibold rounded">
                        {discount.amount}% OFF
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">
                      {discount.active ? (
                        <>
                          <span className="line-through text-muted-foreground mr-2">
                            {product.price.toLocaleString()} DHs
                          </span>
                          {(product.price * (1 - discount.amount / 100)).toFixed(2)} DHs
                        </>
                      ) : (
                        `${product.price.toLocaleString()} DHs`
                      )}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

