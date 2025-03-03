"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { toast } from "react-hot-toast"

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  size?: string
  mainImage: string
  category: string
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number, size?: string) => void
  updateQuantity: (id: number, quantity: number, size?: string) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      // Check if item already exists in cart (with same id and size if applicable)
      const existingItemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id && cartItem.size === item.size)

      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += item.quantity
        toast.success(`Updated ${item.name} quantity in cart`)
        return updatedCart
      } else {
        // Item doesn't exist, add it
        toast.success(`Added ${item.name} to cart`)
        return [...prevCart, item]
      }
    })
  }

  const removeFromCart = (id: number, size?: string) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((item) => item.id === id && (size === undefined || item.size === size))

      if (itemIndex !== -1) {
        const itemName = prevCart[itemIndex].name
        const newCart = [...prevCart]
        newCart.splice(itemIndex, 1)
        toast.success(`Removed ${itemName} from cart`)
        return newCart
      }

      return prevCart
    })
  }

  const updateQuantity = (id: number, quantity: number, size?: string) => {
    if (quantity <= 0) {
      removeFromCart(id, size)
      return
    }

    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === id && (size === undefined || item.size === size)) {
          return { ...item, quantity }
        }
        return item
      })
    })
  }

  const clearCart = () => {
    setCart([])
    toast.success("Cart cleared")
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

