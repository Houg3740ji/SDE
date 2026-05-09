/**
 * Instagram DM / mention ticket fetcher
 * Requires an Instagram Page Access Token (from Meta Developer Console)
 * Pass via x-ig-token header
 */

const IG_API = 'https://graph.facebook.com/v21.0';

function igFetch(path, token, params = '') {
  return fetch(`${IG_API}${path}${params ? '?' + params : ''}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const token = req.headers['x-ig-token'] || process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    return res.status(200).json({ configured: false, tickets: [], message: 'Instagram not configured' });
  }

  try {
    // 1. Get Instagram Business Account ID
    const meRes = await igFetch('/me', token, 'fields=id,name,instagram_business_account');
    const me = await meRes.json();

    if (me.error) {
      return res.status(200).json({
        configured: true,
        error: me.error.message,
        tickets: [],
        hint: me.error.code === 190 ? 'Token expirado — renueva el Page Access Token en Meta Business Suite' : null,
      });
    }

    const igAccountId = me.instagram_business_account?.id;
    if (!igAccountId) {
      return res.status(200).json({
        configured: true,
        error: 'No Instagram Business Account vinculado a esta página',
        tickets: [],
      });
    }

    // 2. Fetch recent mentions (comments on posts mentioning the account)
    const mentionsRes = await igFetch(
      `/${igAccountId}/tags`,
      token,
      'fields=id,text,timestamp,username,media_type&limit=20'
    );
    const mentions = await mentionsRes.json();

    // 3. Fetch recent DM conversations
    const convsRes = await igFetch(
      `/${igAccountId}/conversations`,
      token,
      'platform=instagram&fields=id,participants,updated_time&limit=10'
    );
    const convs = await convsRes.json();

    const tickets = [];

    // Process mentions as tickets
    (mentions.data || []).forEach(m => {
      const text = m.text || '';
      const urgency = /\b(urgent|urgente|asap|devol|broken|roto|help|ayuda)\b/i.test(text) ? 'high' : 'medium';
      const orderMatch = text.match(/ORD-\d{4,}|#\d{4,}/);
      tickets.push({
        ticket_id:  `IG-${m.id.slice(-6)}`,
        order_id:   orderMatch ? orderMatch[0] : '?',
        customer_id: m.username || 'ig_user',
        support_ticket_message: text.slice(0, 500) || '(mención sin texto)',
        support_ticket_urgency: urgency,
        channel: 'instagram',
        date: m.timestamp,
        _source: 'instagram_mention',
      });
    });

    // Process DM conversations as tickets
    for (const conv of (convs.data || []).slice(0, 5)) {
      const msgsRes = await igFetch(
        `/${conv.id}/messages`,
        token,
        'fields=message,from,created_time&limit=1'
      );
      const msgs = await msgsRes.json();
      if (!msgs.data?.length) continue;
      const lastMsg = msgs.data[0];

      const message = lastMsg.message || '';
      const orderMatch = message.match(/ORD-\d{4,}|#\d{4,}/);
      tickets.push({
        ticket_id:  `IGDM-${conv.id.slice(-6)}`,
        order_id:   orderMatch ? orderMatch[0] : '?',
        customer_id: lastMsg.from?.username || lastMsg.from?.name || 'ig_user',
        support_ticket_message: message.slice(0, 500) || '(mensaje vacío)',
        support_ticket_urgency: 'medium',
        channel: 'instagram',
        date: lastMsg.created_time,
        _source: 'instagram_dm',
      });
    }

    return res.status(200).json({ configured: true, tickets, account: me.name });
  } catch (e) {
    return res.status(500).json({ configured: true, error: e.message, tickets: [] });
  }
}
