
import Link from "next/link"
import { categories } from "../config/products"
import { images } from "../config/images"
import Image from "next/image"

export default function Categories() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
        Explore Our Collections
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/search?category=${category.id}`}
            className="group relative bg-gradient-to-br from-card/50 to-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="relative w-full h-96">
              <Image
                src={images.categories[category.id] || "/images/default-category-image.jpg"}
                alt={category.name}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/80 transition-colors">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-2xl font-bold text-white mb-2">{category.name}</h2>
                  <p className="text-white/80 text-sm">Explore Collection →</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
