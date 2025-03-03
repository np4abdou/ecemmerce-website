"use client"

import { Facebook, Instagram, PhoneIcon, Mail, MapPin, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useCookies } from "react-cookie"

export default function MobileFooter() {
  const [cookies] = useCookies(["theme"])
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { title: "About Us", href: "/about" },
    { title: "FAQ", href: "/faq" },
    { title: "Shipping Info", href: "/shipping" },
    { title: "Returns Policy", href: "/returns" },
  ]

  const contactItems = [
    { icon: <PhoneIcon className="w-4 h-4" />, text: "+971 4 123 4567" },
    { icon: <Mail className="w-4 h-4" />, text: "info@techemirate.ae" },
    { icon: <MapPin className="w-4 h-4" />, text: "Dubai, UAE" },
    { icon: <Clock className="w-4 h-4" />, text: "Mon-Fri: 9AM-6PM" },
  ]

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "#" },
    { icon: <Instagram className="w-5 h-5" />, href: "#" },
    { icon: <PhoneIcon className="w-5 h-5" />, href: "#" },
  ]

  return (
    <footer className="bg-card text-foreground border-t border-border mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-6">
          {/* Brand Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-[140px] h-[35px]">
              <Image
                src={`/images/logo${cookies.theme === "dark" ? "2" : ""}.png`}
                alt="TechEmirate Logo"
                layout="fill"
                objectFit="contain"
                className="hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="text-muted-foreground text-sm text-center leading-relaxed">
              Elevating style through innovation. Your premier destination for curated tech fashion in the Middle East.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-4">
            {footerLinks.map((link, index) => (
              <motion.div key={index} whileHover={{ scale: 1.05 }}>
                <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  {link.title}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Contact Information */}
          <div className="flex flex-col items-center space-y-2">
            {contactItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="text-primary">{item.icon}</span>
                <span className="text-xs">{item.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Social Media */}
          <div className="flex justify-center space-x-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg bg-muted hover:bg-primary/10 transition-colors text-muted-foreground hover:text-primary"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          {/* Copyright Section */}
          <div className="text-center text-muted-foreground text-xs">
            <p>© {currentYear} Expert. All rights reserved.</p>
            <div className="mt-2 space-x-2">
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <span>|</span>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

