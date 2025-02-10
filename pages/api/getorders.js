import { createClient } from "@cloudflare/d1";

const db = createClient({
  accountId: process.env.CLOUDFLARE_D1_ACCOUNT_ID,
  databaseId: process.env.CLOUDFLARE_D1_DATABASE_ID,
  token: process.env.CLOUDFLARE_D1_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { productId, productName, size, fullName, phone, city, price, date } = req.body;

    await db.query(`
      INSERT INTO orders (productId, productName, size, fullName, phone, city, price, date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [productId, productName, size, fullName, phone, city, price, date]);

    res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Error placing order" });
  }
}