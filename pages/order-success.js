import Link from "next/link"
import { Check } from "lucide-react"

export default function OrderSuccess() {
  return (
    <div className="container mx-auto p-4 text-center max-w-md">
      <div className="bg-card text-card-foreground p-8 rounded-lg shadow-lg">
        <div className="w-16 h-16 bg-primary/20 text-primary rounded-full mx-auto mb-6 flex items-center justify-center">
          <Check className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Order Submitted Successfully!</h1>
        <p className="text-muted-foreground mb-6">
          شكراً لطلبك! سنتواصل معك قريباً
          <br />
          Thank you for your order! We will contact you soon.
        </p>
        <Link
          href="/products"
          className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

