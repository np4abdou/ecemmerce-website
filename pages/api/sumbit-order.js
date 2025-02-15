import fs from "fs"
import path from "path"

export default function handler(req, res) {
  if (req.method === "POST") {
    try {
      const ordersFile = path.join(process.cwd(), "data", "orders.json")

      // Read existing orders
      let orders = []
      if (fs.existsSync(ordersFile)) {
        const ordersData = fs.readFileSync(ordersFile, "utf8")
        orders = JSON.parse(ordersData)
      }

      // Add new order
      const newOrder = {
        id: Date.now(),
        ...req.body,
        date: new Date().toISOString(),
      }
      orders.push(newOrder)

      // Write updated orders back to file
      fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2))

      res.status(200).json({ message: "Order submitted successfully", orderId: newOrder.id })
    } catch (error) {
      console.error("Error submitting order:", error)
      res.status(500).json({ message: "Error submitting order" })
    }
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

