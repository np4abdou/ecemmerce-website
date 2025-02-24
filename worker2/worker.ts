import { ExecutionContext } from "@cloudflare/workers-types";

// Define the environment with the D1 database
interface Env {
  DB: D1Database;
}

// Define the interface for the POST request body
interface SaleRequest {
  productId: number;
  sellDate: string;
}

// Define the response structure for GET requests
interface SaleResponse {
  id: number;
  product_id: number;
  sell_date: string;
}

export default {
  // The main fetch handler for all incoming requests
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    // CORS headers for allowing cross-origin requests
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Handle CORS preflight (OPTIONS method)
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // Handle POST requests to add a new sale
    if (request.method === "POST") {
      try {
        const data: SaleRequest = await request.json();

        // Validate the incoming data (ensure productId and sellDate are provided)
        if (typeof data.productId === 'undefined' || typeof data.sellDate === 'undefined') {
          return new Response(JSON.stringify({ error: "Missing required fields" }), {
            status: 400,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        // Insert the sale into the database
        await env.DB.prepare(
          "INSERT INTO sales (product_id, sell_date) VALUES (?, ?)"
        ).bind(data.productId, data.sellDate).run();

        // Return a success response
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      } catch (err) {
        // Error handling for invalid data or database issues
        return new Response(JSON.stringify({ 
          error: "Invalid request format",
          details: err instanceof Error ? err.message : String(err)
        }), {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }

    // Handle GET requests to fetch sales data
    if (request.method === "GET") {
      try {
        // Query the sales data from the database
        const sales = await env.DB.prepare(
          "SELECT id, product_id, sell_date FROM sales ORDER BY sell_date DESC"
        ).all();

        // Return the sales data as a JSON response
        return new Response(JSON.stringify(sales.results), {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      } catch (err) {
        // Handle any errors that occur during the GET request
        return new Response(JSON.stringify({ error: "Failed to fetch sales" }), {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }

    // If the method is not supported (neither GET nor POST), return a 405 error
    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
  },
};
