/**
 * Email ticket fetcher
 * Accepts Gmail OAuth access token via x-email-token header
 * OR IMAP credentials for other providers
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const token    = req.headers['x-email-token']    || process.env.EMAIL_OAUTH_TOKEN;
  const provider = req.headers['x-email-provider'] || 'gmail';

  if (!token) {
    return res.status(200).json({ configured: false, tickets: [], message: 'Email not configured' });
  }

  try {
    if (provider === 'gmail') {
      // Fetch recent emails from Gmail API
      const listRes = await fetch(
        'https://gmail.googleapis.com/gmail/v1/users/me/messages?q=in:inbox+is:unread&maxResults=20',
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!listRes.ok) {
        const err = await listRes.json().catch(() => ({}));
        if (listRes.status === 401) {
          return res.status(200).json({ configured: true, error: 'token_expired', tickets: [], message: 'Token expirado — renuévalo en Google Account' });
        }
        return res.status(200).json({ configured: true, error: err.error?.message || 'Error fetching emails', tickets: [] });
      }

      const list = await listRes.json();
      const messages = list.messages || [];

      // Fetch each message detail (parallel, capped at 10)
      const details = await Promise.all(
        messages.slice(0, 10).map(m =>
          fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${m.id}?format=full`,
            { headers: { Authorization: `Bearer ${token}` } }
          ).then(r => r.json())
        )
      );

      const tickets = details.map(msg => {
        const headers = Array.isArray(msg.payload?.headers) ? msg.payload.headers : [];
        const subject = headers.find(h => h.name === 'Subject')?.value || '(sin asunto)';
        const from    = headers.find(h => h.name === 'From')?.value    || 'unknown';
        const date    = headers.find(h => h.name === 'Date')?.value    || new Date().toISOString();

        // Extract body text with safe base64 decoding
        const extractText = (part) => {
          if (!part) return '';
          if (part.mimeType === 'text/plain' && part.body?.data) {
            try {
              return Buffer.from(part.body.data, 'base64').toString('utf-8');
            } catch {
              return '';
            }
          }
          if (Array.isArray(part.parts)) return part.parts.map(extractText).join(' ');
          return '';
        };
        const body = (extractText(msg.payload) || subject).trim();

        // Detect urgency with word-boundary matching
        const urgency = /\b(urgent|urgente|asap|critical|crítico|immediately)\b/i.test(body + subject) ? 'critical'
                      : /\b(broken|roto|dañado|defecto|error)\b/i.test(body) ? 'high'
                      : /\b(devolución|devolver|cambio|reembolso)\b/i.test(body) ? 'medium'
                      : 'low';

        // Safely extract order ID (strict format only)
        const orderMatch = body.match(/\bORD-\d{4,}\b|\b#\d{4,}\b/);

        return {
          ticket_id: `EMAIL-${msg.id.slice(-6)}`,
          order_id:  orderMatch ? orderMatch[0] : '?',
          customer_id: from.slice(0, 200),
          support_ticket_message: body.slice(0, 500),
          support_ticket_urgency: urgency,
          channel: 'email',
          subject: subject.slice(0, 200),
          from: from.slice(0, 200),
          date,
          _source: 'gmail',
        };
      });

      return res.status(200).json({ configured: true, tickets, total: messages.length });
    }

    return res.status(200).json({ configured: false, tickets: [], message: `Provider "${provider}" not supported yet` });
  } catch (e) {
    return res.status(500).json({ configured: true, error: e.message, tickets: [] });
  }
}
