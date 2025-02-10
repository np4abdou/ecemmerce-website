import type { NextApiRequest, NextApiResponse } from 'next';
import type { Order, D1Response } from '../../types/tables';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const orderData: Order = req.body;

      // Validate required fields
      if (!orderData.productId || !orderData.productName || !orderData.size || 
          !orderData.fullName || !orderData.phone || !orderData.city || !orderData.price) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_D1_ACCOUNT_ID}/d1/database/${process.env.CLOUDFLARE_D1_DATABASE_ID}/query`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.CLOUDFLARE_D1_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sql: `INSERT INTO orders (productId, productName, size, fullName, phone, city, price, date) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          params: [
            orderData.productId,
            orderData.productName,
            orderData.size,
            orderData.fullName,
            orderData.phone,
            orderData.city,
            orderData.price,
            orderData.date
          ]
        })
      });

      const data: D1Response = await response.json();

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
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}