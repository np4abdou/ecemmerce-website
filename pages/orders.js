"use client"

import { useState, useEffect } from "react"
import { products } from "../config/products"
import { Toaster, toast } from "sonner"
import { Loader2, LogOut } from "lucide-react"
import Cookies from "js-cookie"

// Encryption key (this should be stored securely in a real application)
const ENCRYPTION_KEY = "123" // Replace with your actual secret key
const AUTH_COOKIE_NAME = "dashboard_auth_token"

export default function Orders() {
  const [activeTab, setActiveTab] = useState("pending")
  const [orders, setOrders] = useState([])
  const [salesData, setSalesData] = useState([])
  const [loading, setLoading] = useState(true)
  const [analyticsLoading, setAnalyticsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [processingOrder, setProcessingOrder] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState("")

  useEffect(() => {
    // Check for authentication token in cookies
    const savedToken = Cookies.get(AUTH_COOKIE_NAME)
    if (savedToken === ENCRYPTION_KEY) {
      setIsAuthenticated(true)
      setToken(savedToken)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders()
      if (activeTab === "analytics") {
        fetchSalesData()
      }
    }
  }, [isAuthenticated, activeTab])

  const handleLogin = (e) => {
    e.preventDefault()
    if (token === ENCRYPTION_KEY) {
      // Store token in cookie (expires in 7 days)
      Cookies.set(AUTH_COOKIE_NAME, token, { expires: 7 })
      setIsAuthenticated(true)
    } else {
      toast.error("Invalid token")
    }
  }

  const handleLogout = () => {
    Cookies.remove(AUTH_COOKIE_NAME)
    setIsAuthenticated(false)
    setToken("")
    toast.success("Logged out successfully")
  }

  const fetchOrders = async () => {
    try {
      const res = await fetch("https://order-worker2025.this-is-abdou-2024.workers.dev/orders")
      if (!res.ok) throw new Error("Failed to fetch orders")
      const data = await res.json()
      setOrders(data)
    } catch (err) {
      console.error("Error fetching orders:", err)
      setError(err.message || "Failed to load orders")
      toast.error("Failed to load orders")
    } finally {
      setLoading(false)
    }
  }

  const fetchSalesData = async () => {
    setAnalyticsLoading(true)
    try {
      const res = await fetch("https://sales-analytics-worker.this-is-abdou-2024.workers.dev")
      if (!res.ok) throw new Error("Failed to fetch sales data")
      const data = await res.json()
      if (Array.isArray(data)) {
        const mappedData = data.map((sale) => ({
          id: sale.id,
          productId: sale.product_id,
          sellDate: sale.sell_date,
        }))
        const sortedSales = mappedData.sort((a, b) => new Date(b.sellDate) - new Date(a.sellDate))
        setSalesData(sortedSales)
      } else {
        throw new Error("Invalid sales data format")
      }
    } catch (err) {
      console.error("Error fetching sales data:", err)
      setError(err.message || "Failed to load sales data")
      toast.error("Failed to load sales data")
      setSalesData([])
    } finally {
      setAnalyticsLoading(false)
    }
  }

  const handleMarkSold = async (productId) => {
    setProcessingOrder(productId)
    try {
      const response = await fetch("https://order-worker2025.this-is-abdou-2024.workers.dev", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to mark as sold")
      }

      toast.success("Order marked as sold successfully!")
      fetchOrders()
      if (activeTab === "analytics") {
        fetchSalesData()
      }
    } catch (err) {
      console.error("Error marking as sold:", err)
      toast.error(err.message || "Failed to mark as sold")
    } finally {
      setProcessingOrder(null)
    }
  }

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date)
    } catch (error) {
      console.error("Date formatting error:", error)
      return dateString
    }
  }

  const calculateTotalSales = () => {
    return salesData.reduce((total, sale) => {
      const product = products.find((p) => p.id === sale.productId)
      return total + (product ? product.price : 0)
    }, 0)
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-accent/10">
        <form
          onSubmit={handleLogin}
          className="p-8 bg-card/80 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-md border border-border/50"
        >
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Login to Dashboard
          </h2>
          <div className="space-y-4">
            <div className="mb-6">
              <label htmlFor="token" className="block text-sm font-medium text-foreground mb-2">
                Security Token
              </label>
              <input
                type="password"
                id="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full p-3 bg-background/50 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                required
                placeholder="Enter your security token"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground p-3 rounded-lg hover:bg-primary/90 transition-all transform hover:scale-[1.02] active:scale-[0.98] font-medium"
            >
              Access Dashboard
            </button>
          </div>
        </form>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-xl text-red-500 mb-4">Error: {error}</div>
        <button
          onClick={() => {
            setError(null)
            setLoading(true)
            fetchOrders()
          }}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
        >
          Retry
        </button>
      </div>
    )
  }

  const pendingOrders = orders.filter((order) => order.status === "pending")
  const soldOrders = orders.filter((order) => order.status === "sold")

  return (
    <>
      <Toaster position="top-right" />
      <div className="flex min-h-screen bg-gradient-to-br from-background to-accent/5">
        {/* Sidebar */}
        <div className="w-72 bg-card/80 backdrop-blur-sm p-6 border-r border-border/50 shadow-xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Dashboard
            </h2>
            <button
              onClick={handleLogout}
              className="p-2 text-muted-foreground hover:text-primary hover:bg-accent/50 rounded-lg transition-all"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
          <div className="space-y-3">
            {["pending", "sold", "analytics"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  activeTab === tab
                    ? "bg-primary text-white shadow-lg transform scale-[1.02]"
                    : "text-foreground hover:bg-accent/50 hover:transform hover:scale-[1.02]"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}{" "}
                {tab === "pending" ? "Orders" : tab === "sold" ? "Orders" : ""}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-auto">
          {activeTab === "analytics" ? (
            <div className="space-y-8 max-w-6xl mx-auto">
              <div className="flex justify-between items-center p-6 bg-card/80 backdrop-blur-sm rounded-xl shadow-lg border border-border/50">
                <h2 className="text-2xl font-bold">Sales Analytics</h2>
                <div className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  {calculateTotalSales().toLocaleString()} DHs
                </div>
              </div>

              {/* Sales History */}
              <div className="bg-card/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-border/50">
                <h3 className="text-xl font-semibold mb-6">Sales History</h3>
                {analyticsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {salesData.length > 0 ? (
                      salesData.map((sale) => {
                        const product = products.find((p) => p.id === sale.productId)
                        const formattedDate = formatDate(sale.sellDate)

                        return (
                          <div
                            key={sale.id}
                            className="flex items-center justify-between p-6 bg-accent/20 rounded-xl hover:bg-accent/30 transition-all transform hover:scale-[1.01] border border-border/50"
                          >
                            <div className="flex items-center gap-4">
                              {product ? (
                                <img
                                  src={product.mainImage || "/placeholder.svg"}
                                  alt={product.name}
                                  className="w-16 h-16 object-cover rounded"
                                />
                              ) : (
                                <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                                  <span className="text-muted-foreground text-xs">No image</span>
                                </div>
                              )}
                              <div>
                                <p className="font-semibold">
                                  {product ? (
                                    product.name
                                  ) : (
                                    <span className="text-yellow-500">Product not found (ID: {sale.productId})</span>
                                  )}
                                </p>
                                <p className="text-sm text-muted-foreground">{formattedDate}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg">{product ? product.price.toLocaleString() : "0"} DHs</p>
                              {!product && <p className="text-xs text-yellow-500">Price unavailable</p>}
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">No sales data available</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="flex justify-between items-center mb-8 p-6 bg-card/80 backdrop-blur-sm rounded-xl shadow-lg border border-border/50">
                <h2 className="text-2xl font-bold">{activeTab === "pending" ? "Pending Orders" : "Sold Orders"}</h2>
                <span className="px-4 py-2 bg-primary/10 rounded-lg text-primary font-medium">
                  {activeTab === "pending" ? pendingOrders.length : soldOrders.length} orders
                </span>
              </div>

              <div className="space-y-6">
                {(activeTab === "pending" ? pendingOrders : soldOrders).map((order) => {
                  const product = products.find((p) => p.id === order.productId)
                  return (
                    <div
                      key={order.id}
                      className="flex flex-col md:flex-row gap-6 bg-card/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-border/50 hover:border-primary/30 transition-all transform hover:scale-[1.01]"
                    >
                      {/* Product Image */}
                      <div className="w-full md:w-48 h-48 flex-shrink-0">
                        {product ? (
                          <div className="relative h-full w-full rounded-lg overflow-hidden">
                            <img
                              src={product.mainImage || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
                            <span className="text-muted-foreground text-sm">No image</span>
                          </div>
                        )}
                      </div>

                      {/* Order Details */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                              Order #{order.id}
                            </span>
                            <h3 className="text-lg font-semibold mt-2">
                              {product ? product.name : "Product not found"}
                            </h3>
                            {product && <p className="text-lg font-semibold text-primary mt-1">{product.price} DHs</p>}
                          </div>
                          <span className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</span>
                        </div>

                        {/* Customer Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <div className="flex items-center text-sm">
                              <span className="text-muted-foreground mr-2">👤</span>
                              <span>{order.clientName}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <span className="text-muted-foreground mr-2">📞</span>
                              <a href={`tel:${order.clientPhone}`} className="text-primary hover:underline">
                                {order.clientPhone}
                              </a>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center text-sm">
                              <span className="text-muted-foreground mr-2">🏠</span>
                              <span className="text-muted-foreground">{order.clientAddress}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <span className="text-muted-foreground mr-2">📦</span>
                              <span className="text-muted-foreground">{order.status}</span>
                            </div>
                          </div>
                        </div>

                        {/* Action Button */}
                        {activeTab === "pending" && (
                          <div className="mt-auto">
                            <button
                              onClick={() => handleMarkSold(order.productId)}
                              disabled={processingOrder === order.productId}
                              className="w-full md:w-auto px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-medium"
                            >
                              {processingOrder === order.productId ? (
                                <span className="flex items-center gap-2">
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                  Processing...
                                </span>
                              ) : (
                                "Mark as Sold"
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {(activeTab === "pending" ? pendingOrders : soldOrders).length === 0 && (
                <div className="text-center py-12 bg-card rounded-lg border border-border">
                  <p className="text-muted-foreground">No {activeTab} orders found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

