"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

interface ProductCardProps {
  id: number
  name: string
  price: number
  mainImage: string
  isNew?: boolean
}

export default function ProductCard({ id, name, price, mainImage, isNew = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="flex flex-col"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href={`/products/${id}`} className="group">
        <div className="relative aspect-[1/1.2] overflow-hidden bg-gray-100">
          {isNew && (
            <div className="absolute top-2 right-2 z-10">
              <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded">NEW</span>
            </div>
          )}
          <Image
            src={mainImage || "/placeholder.svg"}
            alt={name}
            fill
            className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        </div>

        <div className="mt-4 text-center">
          <h3 className="text-base font-medium mb-2">{name}</h3>
          <p className="text-lg font-bold mb-4">DH {price}</p>
          <button className="w-full bg-black text-white py-3 px-6 text-sm font-medium hover:bg-black/90 transition-colors">
            Shop now
          </button>
        </div>
      </Link>
    </motion.div>
  )
}

