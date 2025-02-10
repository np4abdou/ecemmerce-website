import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white py-12 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Store Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">TechEmirate</h3>
            <p className="text-gray-600 dark:text-gray-400">Your premium electronics destination in the UAE</p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>📞 +971 4 123 4567</li>
              <li>📧 info@techemirate.ae</li>
              <li>📍 Dubai, UAE</li>
              <li>🕒 Mon-Fri: 9AM-6PM</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>
                <a href="/about" className="hover:text-primary dark:hover:text-secondary">
                  About Us
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-primary dark:hover:text-secondary">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/shipping" className="hover:text-primary dark:hover:text-secondary">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="/returns" className="hover:text-primary dark:hover:text-secondary">
                  Returns Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-secondary">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-secondary">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-secondary">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-secondary">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-gray-600 dark:text-gray-400">
          <p>© {currentYear} TechEmirate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

