"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, Sliders, ChevronDown } from "lucide-react"
import { products, categories, themes } from "../config/products"
import SEO from "../components/SEO"
import { useState, useEffect } from "react"

export default function SearchPage() {
  const router = useRouter()
  const searchParams = new URLSearchParams(window.location.search)
  const query = searchParams.get("query")
  const initialCategory = searchParams.get("category")
  const initialTheme = searchParams.get("theme")
  const [searchTerm, setSearchTerm] = useState(query || "")
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "all")
  const [selectedTheme, setSelectedTheme] = useState(initialTheme || "all")
  const [priceRange, setPriceRange] = useState([0, 300])
  const [showFilters, setShowFilters] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isMobile, setIsMobile] = useState(false)
  const [activeSort, setActiveSort] = useState("featured") // new state for sorting
  const [expandedFilters, setExpandedFilters] = useState({
    categories: true,
    themes: true,
    price: true,
  }) // new state to track expanded/collapsed filter sections

  useEffect(() => {
    if (query) setSearchTerm(query)
    if (initialCategory) setSelectedCategory(initialCategory)
    if (initialTheme) setSelectedTheme(initialTheme)

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [query, initialCategory, initialTheme])

  useEffect(() => {
    let filtered = products.filter(
      (product) =>
        (selectedCategory === "all" || product.category === selectedCategory) &&
        (selectedTheme === "all" || product.theme === selectedTheme) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1],
    )

    // Apply sorting
    if (activeSort === "price-low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price)
    } else if (activeSort === "price-high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price)
    } else if (activeSort === "newest") {
      filtered = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date))
    }

    setFilteredProducts(filtered)
  }, [searchTerm, selectedCategory, selectedTheme, priceRange, activeSort])

  const handleReset = () => {
    setSearchTerm("")
    setSelectedCategory("all")
    setSelectedTheme("all")
    setPriceRange([0, 300])
    setActiveSort("featured")
    router.push("/search")
  }

  const toggleFilterSection = (section) => {
    setExpandedFilters({
      ...expandedFilters,
      [section]: !expandedFilters[section],
    })
  }

  const FilterComponent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-border">
        <h3 className="text-lg font-semibold text-card-foreground">Filters</h3>
        <button onClick={handleReset} className="text-sm font-medium text-primary hover:underline transition-colors">
          Reset All
        </button>
      </div>

      {/* Categories Section */}
      <div className="pb-4">
        <button
          onClick={() => toggleFilterSection("categories")}
          className="flex justify-between items-center w-full mb-3"
        >
          <h4 className="text-base font-medium text-card-foreground">Categories</h4>
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform ${
              expandedFilters.categories ? "rotate-180" : ""
            }`}
          />
        </button>

        {expandedFilters.categories && (
          <div className="space-y-2 pl-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={selectedCategory === "all"}
                onChange={() => setSelectedCategory("all")}
                className="w-4 h-4 rounded-full border-input accent-primary"
              />
              <span className="text-card-foreground">All Products</span>
            </label>
            {categories.map((category) => (
              <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={selectedCategory === category.id}
                  onChange={() => setSelectedCategory(category.id)}
                  className="w-4 h-4 rounded-full border-input accent-primary"
                />
                <span className="text-card-foreground">{category.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Themes Section */}
      <div className="pb-4 border-t border-border pt-4">
        <button onClick={() => toggleFilterSection("themes")} className="flex justify-between items-center w-full mb-3">
          <h4 className="text-base font-medium text-card-foreground">Themes</h4>
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform ${
              expandedFilters.themes ? "rotate-180" : ""
            }`}
          />
        </button>

        {expandedFilters.themes && (
          <div className="space-y-2 pl-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={selectedTheme === "all"}
                onChange={() => setSelectedTheme("all")}
                className="w-4 h-4 rounded-full border-input accent-primary"
              />
              <span className="text-card-foreground">All Themes</span>
            </label>
            {themes.map((theme) => (
              <label key={theme.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={selectedTheme === theme.id}
                  onChange={() => setSelectedTheme(theme.id)}
                  className="w-4 h-4 rounded-full border-input accent-primary"
                />
                <span className="text-card-foreground">{theme.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Section */}
      <div className="pt-4 border-t border-border">
        <button onClick={() => toggleFilterSection("price")} className="flex justify-between items-center w-full mb-3">
          <h4 className="text-base font-medium text-card-foreground">Price Range</h4>
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform ${
              expandedFilters.price ? "rotate-180" : ""
            }`}
          />
        </button>

        {expandedFilters.price && (
          <div className="space-y-4 pl-1">
            <div className="flex justify-between items-center text-sm text-muted-foreground mb-1">
              <span>{priceRange[0]} DHs</span>
              <span>{priceRange[1]} DHs</span>
            </div>
            <input
              type="range"
              min="0"
              max="300"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
              className="w-full accent-primary"
            />
            <div className="flex justify-between items-center gap-4">
              <div className="bg-card border border-input rounded-lg px-3 py-1 flex-1">
                <span className="text-sm text-card-foreground">{priceRange[0]} DHs</span>
              </div>
              <span className="text-muted-foreground">-</span>
              <div className="bg-card border border-input rounded-lg px-3 py-1 flex-1">
                <span className="text-sm text-card-foreground">{priceRange[1]} DHs</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  // New sorting dropdown component
  const SortingComponent = () => (
    <div className="relative">
      <select
        value={activeSort}
        onChange={(e) => setActiveSort(e.target.value)}
        className="appearance-none bg-card border border-input rounded-lg px-4 py-2 pr-10 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary"
      >
        <option value="featured">Featured</option>
        <option value="newest">Newest</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
    </div>
  )

  return (
    <>
      <SEO
        title="Search Products"
        description="Search for your favorite products"
        keywords="search, products, fashion"
      />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Search Bar Section - Moved to the top */}
          <div className="max-w-2xl mx-auto mb-10">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full p-4 pl-12 pr-16 rounded-full bg-card border border-input text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />

              <button
                type="button"
                onClick={() => setShowFilters(true)}
                className="lg:hidden absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary/10 rounded-full p-2"
              >
                <Sliders className="h-4 w-4 text-primary" />
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters for Desktop */}
            <motion.aside
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="hidden lg:block lg:w-64 bg-card rounded-xl p-6 h-fit sticky top-24 border border-border shadow-sm"
            >
              <FilterComponent />
            </motion.aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Results Count and Sorting Controls */}
              <div className="flex flex-wrap justify-between items-center mb-6">
                <p className="text-muted-foreground mb-4 md:mb-0">
                  Showing <span className="font-medium text-foreground">{filteredProducts.length}</span> results
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <SortingComponent />
                </div>
              </div>

              <AnimatePresence mode="popLayout">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Link
                        href={`/products/${product.id}`}
                        className="group block rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg bg-card border border-border"
                      >
                        <div className="relative aspect-square overflow-hidden bg-muted/20">
                          <Image
                            src={product.mainImage || "/placeholder.svg"}
                            alt={product.name}
                            width={400}
                            height={400}
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {product.isNew && (
                            <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                              New
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h2 className="text-base font-medium text-card-foreground line-clamp-1">{product.name}</h2>
                          <div className="mt-1 flex items-center justify-between">
                            <span className="text-lg font-bold text-primary">{product.price.toLocaleString()} DHs</span>
                            <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                              {themes.find((t) => t.id === product.theme)?.name}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>

              {filteredProducts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 bg-muted/10 rounded-xl border border-dashed border-muted my-8"
                >
                  <div className="mx-auto w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-xl font-semibold text-foreground">No products found</p>
                  <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                    Try adjusting your search terms or filters to find what you're looking for.
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
                  >
                    Clear filters
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal - Improved */}
      <AnimatePresence>
        {showFilters && isMobile && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setShowFilters(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-x-0 bottom-0 top-20 bg-background z-50 overflow-y-auto rounded-t-2xl shadow-2xl"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6 sticky top-0 bg-background pb-4 border-b border-border">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <div className="flex gap-4 items-center">
                    <button onClick={handleReset} className="text-sm font-medium text-primary">
                      Reset
                    </button>
                    <button onClick={() => setShowFilters(false)} className="bg-primary/10 rounded-full p-2">
                      <X className="h-5 w-5 text-primary" />
                    </button>
                  </div>
                </div>
                <FilterComponent />

                <div className="mt-8 sticky bottom-0 pt-4 pb-6 bg-background border-t border-border">
                  <button
                    onClick={() => setShowFilters(false)}
                    className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium"
                  >
                    Show {filteredProducts.length} results
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

