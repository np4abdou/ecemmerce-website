"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useCookies } from "react-cookie"

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [cookies] = useCookies(["lang"])
  const [currentLang, setCurrentLang] = useState("en")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Set language and direction after component mounts
    const lang = cookies.lang || "en"
    setCurrentLang(lang)
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
    setIsLoaded(true)
  }, [cookies.lang])

  if (!isLoaded) {
    return null // or a loading spinner
  }

  return <LanguageContext.Provider value={{ currentLang }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

