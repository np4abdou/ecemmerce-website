"use client"
import { useState, useEffect } from "react"

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("https://order-worker2025.this-is-abdou-2024.workers.dev/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Orders List</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Order ID</th>
              <th className="border px-4 py-2">Order Name</th>
              <th className="border px-4 py-2">Client Name</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Order Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="border px-4 py-2">{order.id}</td>
                <td className="border px-4 py-2">{order.orderName}</td>
                <td className="border px-4 py-2">{order.clientName}</td>
                <td className="border px-4 py-2">{order.clientPhone}</td>
                <td className="border px-4 py-2">{order.clientAddress}</td>
                <td className="border px-4 py-2">{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  )
}
