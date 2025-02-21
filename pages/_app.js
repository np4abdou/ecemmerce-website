import { Montserrat } from "next/font/google"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "../styles/globals.css"
import { CookiesProvider } from "react-cookie"

const montserrat = Montserrat({ subsets: ["latin"] })

export default function App({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <div className={`min-h-screen flex flex-col ${montserrat.className}`}>
        <Header />
        <main className="flex-grow pb-16 bg-background text-foreground">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </CookiesProvider>
  )
}

