import Link from "next/link"
import { themes } from "../config/products"
import { images } from "../config/images"
import Image from "next/image"

export default function Art() {
  return (
    <div className="container mx-auto px-4 py-6">
      {" "}
      {/* Reduced from py-12 to py-6 */}
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">
        {" "}
        {/* Reduced from mb-12 to mb-8 */}
        Discover our exclusive art Collection
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 max-w-7xl mx-auto">
        {themes.map((theme) => (
          <Link
            key={theme.id}
            href={`/search?theme=${theme.id}`}
            className="group relative bg-gradient-to-br from-card/50 to-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="relative w-full pb-[100%]">
              <Image
                src={images.categories[theme.id] || "/placeholder.svg?height=400&width=300"}
                alt={theme.name}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/80 transition-colors">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h2 className="text-lg sm:text-xl font-bold text-white mb-1">{theme.name}</h2>
                  <p className="text-white/80 text-xs sm:text-sm">Explore →</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

