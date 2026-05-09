/**
 * Instagram DM / mention ticket fetcher
 * Requires an Instagram Page Access Token (from Meta Developer Console)
 * Pass via x-ig-token header
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const token = req.headers['x-ig-token'] || process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    return res.status(200).json({ configured: false, tickets: [], message: 'Instagram not configured' });
  }

  try {
    // 1. Get Instagram Business Account ID
    const meRes = await fetch(
      `https://graph.facebook.com/v19.0/me?fields=id,name,instagram_business_account&access_token=${token}`
    );
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
    const mentionsRes = await fetch(
      `https://graph.facebook.com/v19.0/${igAccountId}/tags?fields=id,text,timestamp,username,media_type&limit=20&access_token=${token}`
    );
    const mentions = await mentionsRes.json();

    // 3. Fetch recent DM conversations
    const convsRes = await fetch(
      `https://graph.facebook.com/v19.0/${igAccountId}/conversations?platform=instagram&fields=id,participants,updated_time&limit=10&access_token=${token}`
    );
    const convs = await convsRes.json();

    const tickets = [];

    // Process mentions as tickets
    (mentions.data || []).forEach(m => {
      const urgency = /urgent|urgente|asap|devol|broken|roto|help|ayuda/i.test(m.text || '') ? 'high' : 'medium';
      tickets.push({
        ticket_id:  `IG-${m.id.slice(-6)}`,
        order_id:   (m.text?.match(/ORD-\d+|#\d{4,}/)?.[0] || '?'),
        customer_id: m.username || 'ig_user',
        support_ticket_message: m.text || '(mención sin texto)',
        support_ticket_urgency: urgency,
        channel: 'instagram',
        date: m.timestamp,
        _source: 'instagram_mention',
      });
    });

    // Process DM conversations as tickets
    for (const conv of (convs.data || []).slice(0, 5)) {
      const msgsRes = await fetch(
        `https://graph.facebook.com/v19.0/${conv.id}/messages?fields=message,from,created_time&limit=1&access_token=${token}`
      );
      const msgs = await msgsRes.json();
      const lastMsg = msgs.data?.[0];
      if (!lastMsg) continue;

      tickets.push({
        ticket_id:  `IGDM-${conv.id.slice(-6)}`,
        order_id:   (lastMsg.message?.match(/ORD-\d+|#\d{4,}/)?.[0] || '?'),
        customer_id: lastMsg.from?.username || lastMsg.from?.name || 'ig_user',
        support_ticket_message: lastMsg.message || '(mensaje vacío)',
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
