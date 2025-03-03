"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Settings2, X, Check } from "lucide-react"
import { useCookies } from "react-cookie"
import { translations } from "../config/translations"
import { useLanguage } from "./LanguageProvider"

const languages = [
  {
    code: "en",
    ...translations.settings.language.english,
  },
  {
    code: "fr",
    ...translations.settings.language.french,
  },
  {
    code: "ar",
    ...translations.settings.language.arabic,
  },
]

export default function SettingsPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [, setCookie] = useCookies(["lang"])
  const { currentLang } = useLanguage()

  const handleLanguageChange = (lang) => {
    setCookie("lang", lang, { path: "/" })
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
    window.location.reload()
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-full hover:bg-accent transition-colors"
        aria-label={translations.settings.title[currentLang]}
      >
        <Settings2 className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-background z-50 border-l border-border"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-lg font-semibold">{translations.settings.title[currentLang]}</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-accent transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  {translations.settings.language.title[currentLang]}
                </h3>
                <div className="space-y-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border ${
                        currentLang === lang.code
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">{lang.nativeName}</span>
                        <span className="text-xs text-muted-foreground">({lang.name})</span>
                      </div>
                      {currentLang === lang.code && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

