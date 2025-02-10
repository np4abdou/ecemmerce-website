import { createClient } from "@cloudflare/d1";

export const runtime = 'edge';

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { productId, productName, size, fullName, phone, city, price, date } = await req.json();

    // In Cloudflare Pages, DB is automatically bound
    const stmt = await DB.prepare(
      `INSERT INTO orders (productId, productName, size, fullName, phone, city, price, date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    );

    await stmt.bind(productId, productName, size, fullName, phone, city, price, date);
    await stmt.run();

    return new Response(JSON.stringify({ message: "Order placed successfully" }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error placing order:", error);
    return new Response(JSON.stringify({ message: "Error placing order" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}