import Link from "next/link"
import { categories } from "../data/products"

export default function Categories() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Product Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.id}`}
            className="bg-card text-card-foreground shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow"
          >
            <h2 className="text-2xl font-semibold mb-2">{category.name}</h2>
            <p className="text-muted-foreground">Explore {category.name} products</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

