import type { ExecutionContext } from "@cloudflare/workers-types"

interface Env {
  DB: D1Database
}

interface SaleRequest {
  productId: number
  sellDate: string
}

interface SaleResponse {
  id: number
  product_id: number
  sell_date: string
}

interface ErrorResponse {
  error: string
  details?: string
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    }

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders })
    }

    try {
      if (request.method === "POST") {
        const data: SaleRequest = await request.json()

        // Validate request data
        if (!data.productId || !data.sellDate) {
          return new Response(
            JSON.stringify({
              error: "Missing required fields",
              details: "productId and sellDate are required",
            }),
            {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            },
          )
        }

        // Validate date format
        if (!isValidDate(data.sellDate)) {
          return new Response(
            JSON.stringify({
              error: "Invalid date format",
              details: "sellDate must be a valid ISO date string",
            }),
            {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            },
          )
        }

        // Insert sale record
        const result = await env.DB.prepare("INSERT INTO sales (product_id, sell_date) VALUES (?, ?) RETURNING *")
          .bind(data.productId, data.sellDate)
          .first<SaleResponse>()

        return new Response(JSON.stringify({ success: true, data: result }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        })
      }

      if (request.method === "GET") {
        const sales = await env.DB.prepare(
          "SELECT id, product_id, sell_date FROM sales ORDER BY sell_date DESC",
        ).all<SaleResponse>()

        return new Response(JSON.stringify(sales.results), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        })
      }

      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    } catch (err) {
      console.error("Worker error:", err)
      return new Response(
        JSON.stringify({
          error: "Internal server error",
          details: err instanceof Error ? err.message : "Unknown error occurred",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      )
    }
  },
}

function isValidDate(dateString: string): boolean {
  const date = new Date(dateString)
  return date instanceof Date && !isNaN(date.getTime())
}

