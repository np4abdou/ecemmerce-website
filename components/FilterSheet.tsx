"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useCookies } from "react-cookie"
import type { Category, Theme, LangType } from "@/types"

interface FilterSheetProps {
  isOpen: boolean
  onClose: () => void
  categories: Category[]
  themes: Theme[]
  selectedCategory: string
  selectedTheme: string
  priceRange: [number, number]
  onCategoryChange: (category: string) => void
  onThemeChange: (theme: string) => void
  onPriceRangeChange: (range: [number, number]) => void
  onReset: () => void
}

export default function FilterSheet({
  isOpen,
  onClose,
  categories,
  themes,
  selectedCategory,
  selectedTheme,
  priceRange,
  onCategoryChange,
  onThemeChange,
  onPriceRangeChange,
  onReset,
}: FilterSheetProps) {
  const [startY, setStartY] = useState(0)
  const [currentY, setCurrentY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [cookies] = useCookies(["lang"])
  const currentLang = (cookies.lang || "en") as LangType

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY)
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    setCurrentY(e.touches[0].clientY - startY)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    if (currentY > 100) {
      onClose()
    }
    setCurrentY(0)
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: currentY > 0 ? currentY : 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30 }}
            className="fixed inset-x-0 bottom-0 z-50 bg-background border-t border-border rounded-t-3xl"
            style={{ maxHeight: "85vh" }}
          >
            <div
              className="h-full flex flex-col max-h-[85vh]"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="flex justify-center pt-2 pb-4">
                <div className="w-12 h-1 rounded-full bg-border" />
              </div>

              <div className="flex items-center justify-between px-4 pb-4">
                <h3 className="text-lg font-semibold">{currentLang === "en" ? "Filters" : "الفلاتر"}</h3>
                <div className="flex items-center gap-4">
                  <button onClick={onReset} className="text-sm text-primary hover:text-primary/80 transition-colors">
                    {currentLang === "en" ? "Reset" : "إعادة تعيين"}
                  </button>
                  <button onClick={onClose} className="p-2 hover:bg-accent rounded-full">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-4 pb-safe-bottom">
                <div className="space-y-6 py-4">
                  {/* Categories */}
                  <div>
                    <h4 className="text-base font-medium mb-4">{currentLang === "en" ? "Categories" : "الفئات"}</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onCategoryChange("all")}
                        className={`p-3 rounded-lg border text-sm ${
                          selectedCategory === "all" ? "border-primary bg-primary/10 text-primary" : "border-border"
                        }`}
                      >
                        {currentLang === "en" ? "All Products" : "جميع المنتجات"}
                      </button>
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => onCategoryChange(category.id)}
                          className={`p-3 rounded-lg border text-sm ${
                            selectedCategory === category.id
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border"
                          }`}
                        >
                          {category.name[currentLang]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Themes */}
                  <div>
                    <h4 className="text-base font-medium mb-4">{currentLang === "en" ? "Themes" : "المواضيع"}</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onThemeChange("all")}
                        className={`p-3 rounded-lg border text-sm ${
                          selectedTheme === "all" ? "border-primary bg-primary/10 text-primary" : "border-border"
                        }`}
                      >
                        {currentLang === "en" ? "All Themes" : "جميع المواضيع"}
                      </button>
                      {themes.map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => onThemeChange(theme.id)}
                          className={`p-3 rounded-lg border text-sm ${
                            selectedTheme === theme.id ? "border-primary bg-primary/10 text-primary" : "border-border"
                          }`}
                        >
                          {theme.name[currentLang]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h4 className="text-base font-medium mb-4">
                      {currentLang === "en" ? "Price Range" : "نطاق السعر"}
                    </h4>
                    <div className="space-y-4">
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[1]}
                        onChange={(e) => onPriceRangeChange([priceRange[0], Number.parseInt(e.target.value)])}
                        className="w-full accent-primary"
                      />
                      <div className="flex justify-between items-center">
                        <div className="bg-card border border-input rounded-lg px-3 py-1">
                          <span className="text-sm">{priceRange[0]} DHs</span>
                        </div>
                        <span className="text-muted-foreground">-</span>
                        <div className="bg-card border border-input rounded-lg px-3 py-1">
                          <span className="text-sm">{priceRange[1]} DHs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

