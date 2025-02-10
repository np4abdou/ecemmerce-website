import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background text-foreground py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Store Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">TechEmirate</h3>
            <p className="text-muted-foreground">Your premium electronics destination in the UAE</p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>📞 +971 4 123 4567</li>
              <li>📧 info@techemirate.ae</li>
              <li>📍 Dubai, UAE</li>
              <li>🕒 Mon-Fri: 9AM-6PM</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="/about" className="hover:text-primary">
                  About Us
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-primary">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/shipping" className="hover:text-primary">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="/returns" className="hover:text-primary">
                  Returns Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>© {currentYear} TechEmirate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

