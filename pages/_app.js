"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "../styles/globals.css"

export default function App({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  return (
    <div className="min-h-screen flex flex-col">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="flex-grow pb-16 bg-background text-foreground">
        <div className="container mx-auto px-4 py-8">
          <Component {...pageProps} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

