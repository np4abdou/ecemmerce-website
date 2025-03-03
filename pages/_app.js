"use client"

import { Montserrat } from "next/font/google"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "../styles/globals.css"
import { CookiesProvider } from "react-cookie"
import { useState, useEffect } from "react"
import MobileHome from "./mobile_index"
import Home from "./index"
import { useRouter } from "next/router"
import { CartProvider } from "../context/CartContext"
import { Toaster } from "react-hot-toast"

const montserrat = Montserrat({ subsets: ["latin"] })

export default function App({ Component, pageProps }) {
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const isReducedPaddingPage = ["/products", "/art"].includes(router.pathname)

  return (
    <CookiesProvider>
      <CartProvider>
        <div className={`min-h-screen flex flex-col ${montserrat.className}`}>
          <Toaster position="top-right" />
          <Header />
          <main className="flex-grow bg-background text-foreground">
            <div
              className={`content-wrapper ${
                isMobile ? (isReducedPaddingPage ? "pt-2" : "pt-3") : isReducedPaddingPage ? "pt-3" : "pt-4"
              }`}
            >
              {isMobile && Component === Home ? <MobileHome {...pageProps} /> : <Component {...pageProps} />}
            </div>
          </main>
          {!isMobile && <Footer />}
        </div>
      </CartProvider>
    </CookiesProvider>
  )
}

