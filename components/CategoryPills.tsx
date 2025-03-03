"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCookies } from "react-cookie"

interface Category {
  id: string
  name: { en: string; ar: string }
  image?: string
}

interface CategoryPillsProps {
  categories: Category[]
  selectedCategory: string
  onSelect: (id: string) => void
}

type LangType = "en" | "ar"

export default function CategoryPills({ categories, selectedCategory, onSelect }: CategoryPillsProps) {
  const [cookies] = useCookies(["lang"])
  const currentLang = (cookies.lang || "en") as LangType
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = 200
    const targetScroll =
      direction === "left" ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    })
  }

  const handleScroll = () => {
    const container = scrollContainerRef.current
    if (!container) return

    setShowLeftArrow(container.scrollLeft > 0)
    setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth)
  }

  return (
    <div className="relative">
      {showLeftArrow && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto scrollbar-hide gap-2 px-4 py-2"
      >
        <motion.button
          onClick={() => onSelect("all")}
          className={`flex-none px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
            selectedCategory === "all"
              ? "border-primary bg-primary/10 text-primary"
              : "border-border hover:border-primary/50"
          }`}
          whileTap={{ scale: 0.95 }}
        >
          {currentLang === "en" ? "All" : "الكل"}
        </motion.button>

        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={`flex-none px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? "border-primary bg-primary/10 text-primary"
                : "border-border hover:border-primary/50"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {category.name[currentLang]}
          </motion.button>
        ))}
      </div>

      {showRightArrow && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

