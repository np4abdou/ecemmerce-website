import { useRouter } from "next/router"
import { products } from "../../data/products"

export default function ProductDetail() {
  const router = useRouter()
  const { id } = router.query
  const product = products.find((p) => p.id === Number(id))

  if (!product) return <div>Product not found</div>

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto bg-card text-card-foreground shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="h-96 w-full object-cover md:w-96"
            />
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-muted-foreground mb-4">{product.description}</p>
            <p className="text-2xl font-bold text-primary mb-4">
              {product.price}
            </p>
            <p className="text-sm text-muted-foreground mb-4">Category: {product.category}</p>
            <button
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              onClick={() => alert("Added to cart!")}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
