import Link from "next/link"
import { categories } from "../config/products"
import { images } from "../config/images"
import Image from "next/image"

export default function Categories() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Product Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.id}`}
            className="group relative bg-card text-card-foreground shadow-lg rounded-lg overflow-hidden transition-shadow"
          >
            {/* Category Box with Border and Image */}
            <div className="relative w-full h-80 border-4 border-gray-300 group-hover:border-yellow-500 transition-colors">
              {/* Use the category's ID to find the correct image */}
              <Image
                src={images.categories[category.id] || "/images/default-category-image.jpg"} // Fallback if image is not found
                alt={category.name}
                className="object-cover w-full h-full"
                width={500}
                height={500}
              />
              {/* Dark Overlay with Category Title */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                <h2 className="text-2xl font-semibold text-white">{category.name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
