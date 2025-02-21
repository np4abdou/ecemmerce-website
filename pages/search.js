import { useRouter } from "next/router"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, X } from "lucide-react"
import { products, categories, themes } from "../config/products"
import SEO from "../components/SEO"
import { useState, useEffect } from "react"

export default function SearchPage() {
  const router = useRouter()
  const { query, category: initialCategory, theme: initialTheme } = router.query
  const [searchTerm, setSearchTerm] = useState(query || "")
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "all")
  const [selectedTheme, setSelectedTheme] = useState(initialTheme || "all")
  const [priceRange, setPriceRange] = useState([0, 300])
  const [showFilters, setShowFilters] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    if (query) setSearchTerm(query)
    if (initialCategory) setSelectedCategory(initialCategory)
    if (initialTheme) setSelectedTheme(initialTheme)
  }, [query, initialCategory, initialTheme])

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        (selectedCategory === "all" || product.category === selectedCategory) &&
        (selectedTheme === "all" || product.theme === selectedTheme) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1]
    )
    setFilteredProducts(filtered)
  }, [searchTerm, selectedCategory, selectedTheme, priceRange])

  const handleReset = () => {
    setSearchTerm("")
    setSelectedCategory("all")
    setSelectedTheme("all")
    setPriceRange([0, 1000])
    router.push("/search")
  }

  return (
    <>
      <SEO
        title="Search Products"
        description="Search for your favorite products"
        keywords="search, products, fashion"
      />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <motion.aside
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className={`lg:w-64 bg-card rounded-xl p-6 h-fit sticky top-24 border border-border shadow-lg ${
                showFilters ? "block" : "hidden lg:block"
              }`}
            >
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-card-foreground">Filters</h3>
                  <button
                    onClick={handleReset}
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Reset All
                  </button>
                </div>

                <div>
                  <h4 className="text-base font-medium mb-4 text-card-foreground">Categories</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategory === "all"}
                        onChange={() => setSelectedCategory("all")}
                        className="w-4 h-4 rounded border-input accent-primary"
                      />
                      <span className="text-card-foreground">All Products</span>
                    </label>
                    {categories.map((category) => (
                      <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategory === category.id}
                          onChange={() => setSelectedCategory(category.id)}
                          className="w-4 h-4 rounded border-input accent-primary"
                        />
                        <span className="text-card-foreground">{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-medium mb-4 text-card-foreground">Themes</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTheme === "all"}
                        onChange={() => setSelectedTheme("all")}
                        className="w-4 h-4 rounded border-input accent-primary"
                      />
                      <span className="text-card-foreground">All Themes</span>
                    </label>
                    {themes.map((theme) => (
                      <label key={theme.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedTheme === theme.id}
                          onChange={() => setSelectedTheme(theme.id)}
                          className="w-4 h-4 rounded border-input accent-primary"
                        />
                        <span className="text-card-foreground">{theme.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-medium mb-4 text-card-foreground">Price Range</h4>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="300"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-primary"
                    />
                    <div className="flex justify-between items-center">
                      <div className="bg-card border border-input rounded-lg px-3 py-1">
                        <span className="text-sm text-card-foreground">{priceRange[0]} DHs</span>
                      </div>
                      <span className="text-muted-foreground">-</span>
                      <div className="bg-card border border-input rounded-lg px-3 py-1">
                        <span className="text-sm text-card-foreground">{priceRange[1]} DHs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>

            {/* Main Content */}
            <div className="flex-1">
              <form className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="w-full p-4 pr-12 rounded-full bg-card border border-input text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden absolute right-16 top-1/2 transform -translate-y-1/2"
                  >
                    <Filter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                  </button>
                  <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                </div>
              </form>

              <AnimatePresence mode="popLayout">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        href={`/products/${product.id}`}
                        className="group block rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl bg-card border border-border"
                      >
                        <div className="relative aspect-square overflow-hidden">
                          <Image
                            src={product.mainImage}
                            alt={product.name}
                            width={400}
                            height={400}
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="p-4">
                          <h2 className="text-lg font-semibold text-card-foreground">
                            {product.name}
                          </h2>
                          <div className="mt-2">
                            <span className="text-xl font-bold text-primary">
                              {product.price.toLocaleString()} DHs
                            </span>
                          </div>
                          <div className="mt-2">
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
                  className="text-center py-16"
                >
                  <p className="text-2xl font-semibold text-muted-foreground">No products found</p>
                  <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}