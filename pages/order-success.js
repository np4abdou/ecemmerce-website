import Link from "next/link"

export default function OrderSuccess() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-6">Order Submitted Successfully!</h1>
      <p className="text-xl mb-8">Thank you for your order. We'll process it as soon as possible.</p>
      <Link
        href="/"
        className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
      >
        Return to Home
      </Link>
    </div>
  )
}

