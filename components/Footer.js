"use client"

import { useState, useEffect } from "react"
import { Facebook, Instagram, PhoneIcon, Mail, MapPin, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useCookies } from "react-cookie"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [cookies] = useCookies(["theme"])
  const [mounted, setMounted] = useState(false)

  // Ensure the component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Footer links data
  const footerLinks = [
    { title: "About Us", href: "/about" },
    { title: "FAQ", href: "/faq" },
    { title: "Shipping Info", href: "/shipping" },
    { title: "Returns Policy", href: "/returns" },
  ]

  // Contact information data
  const contactItems = [
    { icon: <PhoneIcon className="w-5 h-5" />, text: "+971 4 123 4567" },
    { icon: <Mail className="w-5 h-5" />, text: "info@techemirate.ae" },
    { icon: <MapPin className="w-5 h-5" />, text: "Dubai, UAE" },
    { icon: <Clock className="w-5 h-5" />, text: "Mon-Fri: 9AM-6PM" },
  ]

  // Social media links data
  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "#" },
    { icon: <Instagram className="w-5 h-5" />, href: "#" },
    { icon: <PhoneIcon className="w-5 h-5" />, href: "#" }, // Using PhoneIcon for WhatsApp
  ]

  return (
    <footer className="bg-card text-foreground border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="flex flex-col space-y-6">
            <div className="flex items-center">
              {mounted && (
                <div className="relative w-[140px] h-[35px]">
                  <Image
                    src={`/images/logo${cookies.theme === "dark" ? "2" : ""}.png`}
                    alt="TechEmirate Logo"
                    layout="fill"
                    objectFit="contain"
                    className="hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Elevating style through innovation. Your premier destination for curated tech fashion in the Middle East.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contact Info</h4>
            <ul className="space-y-4">
              {contactItems.map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <span className="text-primary">{item.icon}</span>
                  <span className="text-sm">{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {footerLinks.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.title}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Connect With Us</h4>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-lg bg-muted hover:bg-primary/10 transition-colors text-muted-foreground hover:text-primary"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground">
            <p className="text-sm text-center">© {currentYear} Expert. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link href="/privacy" className="text-sm hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

