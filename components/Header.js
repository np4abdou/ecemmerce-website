import Link from 'next/link';
import { Moon, Sun } from 'lucide-react';

export default function Header({ darkMode, setDarkMode }) {
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className="bg-background text-foreground py-4 shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Navigation Links - Left */}
        <nav className="flex space-x-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="/products" className="hover:text-primary transition-colors">All Products</Link>
          <Link href="/categories" className="hover:text-primary transition-colors">Categories</Link>
        </nav>

        {/* Store Title - Center */}
        <div className="text-center absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-3xl font-bold tracking-tight">TechEmirate</h1>
        </div>

        {/* Dark Mode Toggle - Right */}
        <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-accent">
          {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
      </div>
    </header>
  )
}
