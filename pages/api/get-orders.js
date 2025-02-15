import fs from "fs"
import path from "path"

export default function handler(req, res) {
  if (req.method === "GET") {
    try {
      const ordersFile = path.join(process.cwd(), "data", "orders.json")

      if (fs.existsSync(ordersFile)) {
        const ordersData = fs.readFileSync(ordersFile, "utf8")
        const orders = JSON.parse(ordersData)
        res.status(200).json(orders)
      } else {
        res.status(200).json([])
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
      res.status(500).json({ message: "Error fetching orders" })
    }
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

