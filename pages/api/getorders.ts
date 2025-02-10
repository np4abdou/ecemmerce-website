export const runtime = 'edge';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Use fetch API instead of D1 client
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_D1_ACCOUNT_ID}/d1/database/${process.env.CLOUDFLARE_D1_DATABASE_ID}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.CLOUDFLARE_D1_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sql: 'SELECT * FROM orders',
    })
  });

  const data = await response.json();
  
  if (!response.ok) {
    return res.status(500).json({ error: data.errors?.[0]?.message || 'Unknown error' });
  }

  return res.status(200).json(data.result);
}