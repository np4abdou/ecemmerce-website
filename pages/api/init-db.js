export const runtime = 'edge';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_D1_ACCOUNT_ID}/d1/database/${process.env.CLOUDFLARE_D1_DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.CLOUDFLARE_D1_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sql: "DROP TABLE IF EXISTS orders;"
      })
    });

    const createTableResponse = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_D1_ACCOUNT_ID}/d1/database/${process.env.CLOUDFLARE_D1_DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.CLOUDFLARE_D1_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sql: `
          CREATE TABLE orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            productId INTEGER NOT NULL,
            productName TEXT NOT NULL,
            size TEXT NOT NULL,
            fullName TEXT NOT NULL,
            phone TEXT NOT NULL,
            city TEXT NOT NULL,
            price REAL NOT NULL,
            date TEXT NOT NULL
          );
        `
      })
    });

    const data = await createTableResponse.json();

    if (!createTableResponse.ok) {
      console.error('D1 API Error:', data);
      return res.status(500).json({ 
        message: "Error initializing database", 
        error: data.errors?.[0]?.message || 'Unknown error' 
      });
    }

    res.status(200).json({ message: "Database initialized successfully", data });
  } catch (error) {
    console.error("Error initializing database:", error);
    res.status(500).json({ 
      message: "Error initializing database", 
      error: error.message 
    });
  }
}