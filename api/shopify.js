export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  // Accept credentials from request headers (set by frontend) or env vars
  const shop  = req.headers['x-shopify-url']   || process.env.SHOPIFY_STORE_URL;
  const token = req.headers['x-shopify-token'] || process.env.SHOPIFY_ACCESS_TOKEN;

  if (!shop || !token) {
    return res.status(200).json({ configured: false, orders: [], message: 'Shopify not configured' });
  }

  const { resource = 'orders', since_id, updated_at_min } = req.query;

  const params = new URLSearchParams({
    limit: '50',
    status: 'any',
    ...(since_id       ? { since_id }       : {}),
    ...(updated_at_min ? { updated_at_min } : {}),
  });

  try {
    const url = `https://${shop}/admin/api/2024-04/${resource}.json?${params}`;
    const r = await fetch(url, {
      headers: {
        'X-Shopify-Access-Token': token,
        'Content-Type': 'application/json',
      },
    });

    if (!r.ok) {
      const err = await r.text();
      return res.status(r.status).json({ configured: true, error: err });
    }

    const data = await r.json();
    return res.status(200).json({ configured: true, ...data });
  } catch (e) {
    return res.status(500).json({ configured: true, error: e.message });
  }
}
