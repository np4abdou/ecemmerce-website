import { D1Database } from '@cloudflare/workers-types'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { productId, productName, size, fullName, phone, city, price, date } = req.body;

      if (!productId || !productName || !size || !fullName || !phone || !city || !price) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_D1_ACCOUNT_ID}/d1/database/${process.env.CLOUDFLARE_D1_DATABASE_ID}/query`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.CLOUDFLARE_D1_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sql: `INSERT INTO orders (productId, productName, size, fullName, phone, city, price, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          params: [productId, productName, size, fullName, phone, city, price, date]
        })
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('D1 API Error:', data);
        return res.status(500).json({ 
          message: "Error placing order", 
          error: data.errors?.[0]?.message || 'Unknown error' 
        });
      }

      res.status(200).json({ message: "Order placed successfully", data });
    } catch (error) {
      console.error("Error placing order:", error);
      res.status(500).json({ 
        message: "Error placing order", 
        error: error.message 
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

