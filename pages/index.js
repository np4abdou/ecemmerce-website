"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { products, categories } from "../data/products"

export default function Products() {
  const router = useRouter()
  const { category: initialCategory } = router.query
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "all")

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>

      {/* Category Filters */}
      <div className="mb-8 flex flex-wrap gap-4">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 rounded-full ${
            selectedCategory === "all" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category.id ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-card text-card-foreground shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-muted-foreground mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-primary">
                  {product.price}
                </span>
                <Link
                  href={`/products/${product.id}`}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
