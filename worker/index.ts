/// <reference types="@cloudflare/workers-types" />

interface Env {
  DB: D1Database
}

interface OrderData {
  orderName: string
  clientName: string
  clientPhone: string
  clientAddress: string
  productId: number
  status: string
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders })
    }

    if (request.method === "POST") {
      try {
        const data = (await request.json()) as OrderData

        if (!data.orderName || !data.clientName || !data.clientPhone || !data.clientAddress || !data.productId) {
          return new Response("Missing fields", { status: 400, headers: corsHeaders })
        }

        // Store the order in D1
        const stmt = env.DB.prepare(
          "INSERT INTO orders (order_name, client_name, client_phone, client_address, product_id, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
        ).bind(
          data.orderName,
          data.clientName,
          data.clientPhone,
          data.clientAddress,
          data.productId,
          "pending",
          new Date().toISOString(),
        )

        await stmt.run()

        // Send notification to Discord
        const discordWebhookURL =
          "https://discord.com/api/webhooks/1340483366952243240/AJMOtD_oDiSVoDA2lmkPLLVc8_s7SnEodjwwF4yWFZ97J7qEiBx5Gwd6TaCBpB3EKrM9"
        const discordMessage = {
          content: `@everyone\n📦 **New Order Received!**\n\n**Product ID:** ${data.productId}\n**Order:** ${data.orderName}\n**Client:** ${data.clientName}\n📞 **Phone:** ${data.clientPhone}\n🏠 **Address:** ${data.clientAddress}\n**Status:** Pending`,
          allowed_mentions: {
            parse: ["everyone"],
          },
        }

        await fetch(discordWebhookURL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(discordMessage),
        })

        return new Response(JSON.stringify({ success: true }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        })
      } catch (err) {
        return new Response(JSON.stringify({ error: String(err) }), {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        })
      }
    }

    if (request.method === "GET") {
      try {
        const result = await env.DB.prepare(
          "SELECT id, order_name AS orderName, client_name AS clientName, client_phone AS clientPhone, client_address AS clientAddress, product_id AS productId, status, created_at AS createdAt FROM orders ORDER BY id DESC",
        ).all()

        return new Response(JSON.stringify(result.results), {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        })
      } catch (err) {
        return new Response(JSON.stringify({ error: "Failed to fetch orders" }), {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        })
      }
    }

    if (request.method === "PUT") {
      try {
        const body = await request.json()
        const productId =
          typeof body === "object" && body !== null && "productId" in body ? Number(body.productId) : null

        if (typeof productId !== "number" || isNaN(productId)) {
          return new Response("Invalid or missing productId", { status: 400, headers: corsHeaders })
        }

        const updateStmt = env.DB.prepare(
          "UPDATE orders SET status = 'sold' WHERE product_id = ? AND status = 'pending'",
        ).bind(productId)

        const result = await updateStmt.run()

        if (result.success) {
          return new Response(JSON.stringify({ success: true, message: "Order marked as sold" }), {
            headers: { "Content-Type": "application/json", ...corsHeaders },
          })
        } else {
          return new Response(JSON.stringify({ success: false, message: "No pending order found for this product" }), {
            headers: { "Content-Type": "application/json", ...corsHeaders },
          })
        }
      } catch (err) {
        return new Response(JSON.stringify({ error: String(err) }), {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        })
      }
    }

    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders })
  },
}

