"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search, ChevronDown } from "lucide-react"
import { products, categories } from "../data/products"
import SEO from "../components/SEO"

export default function SearchPage() {
  const router = useRouter()
  const { query } = router.query
  const [searchTerm, setSearchTerm] = useState(query || "")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    if (query) {
      setSearchTerm(query)
    }
  }, [query])

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        (selectedCategory === "all" || product.category === selectedCategory) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        default:
          return 0
      }
    })

    setFilteredProducts(sorted)
  }, [searchTerm, selectedCategory, sortBy])

  const handleSearch = (e) => {
    e.preventDefault()
    router.push(`/search?query=${searchTerm}`)
  }

  return (
    <>
      <SEO
        title="Search Products"
        description="Search for your favorite products at ASCEND"
        keywords="search, products, ASCEND, fashion"
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Search Products</h1>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full p-4 pr-12 rounded-full bg-accent text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button type="submit" className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Search className="h-6 w-6 text-muted-foreground" />
            </button>
          </div>
        </form>

        <div className="flex flex-wrap gap-4 mb-8">
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-accent text-foreground px-4 py-2 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none w-5 h-5" />
          </div>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-accent text-foreground px-4 py-2 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="relevance">Sort by: Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none w-5 h-5" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                href={`/products/${product.id}`}
                className="group block bg-card text-card-foreground rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">{product.price.toLocaleString()} DHs</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-xl mt-8">
            No products found. Try a different search term or category.
          </motion.p>
        )}
      </div>
    </>
  )
}

