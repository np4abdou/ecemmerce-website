import Link from "next/link"
import Image from "next/image"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-black text-white">
      <div className="mb-8">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/G1JO-Ny0TT5QtGSa8ks5oSh6YkZdwxzrprY.gif"
          alt="404 geometric animation"
          width={300}
          height={300}
          className="mx-auto"
        />
      </div>
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Link href="/" className="bg-white text-black px-6 py-3 rounded-md hover:bg-white/90 transition-colors">
        Go back home
      </Link>
    </div>
  )
}

