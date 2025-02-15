export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const url = new URL(request.url)

    if (request.method === "POST") {
      try {
        const order = await request.json()
        const stmt = env.DB.prepare(
          `INSERT INTO orders (orderName, clientName, clientPhone, clientAddress, createdAt) VALUES (?, ?, ?, ?, ?)`
        )
        await stmt.bind(order.orderName, order.clientName, order.clientPhone, order.clientAddress, new Date().toISOString()).run()
        return new Response(JSON.stringify({ message: "Order stored successfully" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      } catch (err) {
        return new Response(JSON.stringify({ error: "Failed to store order" }), { status: 500 })
      }
    }

    if (request.method === "GET" && url.pathname === "/orders") {
      try {
        const result = await env.DB.prepare(`SELECT id, orderName, clientName, clientPhone, clientAddress, createdAt FROM orders ORDER BY id DESC`).all()
        return new Response(JSON.stringify(result.results), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      } catch (err) {
        return new Response(JSON.stringify({ error: "Failed to fetch orders" }), { status: 500 })
      }
    }

    return new Response(JSON.stringify({ error: "Not found" }), { status: 404 })
  },
}
