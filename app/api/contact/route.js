import { NextResponse } from 'next/server';

// Serverless contact endpoint. Forwards validated submissions to Telegram
// via the Bot API sendMessage, using env vars set in Vercel.
//
// Required env:
//   TELEGRAM_BOT_TOKEN  — from @BotFather
//   TELEGRAM_CHAT_ID    — your personal chat id (see README)

export const runtime = 'nodejs';

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const name = String(body?.name || '').trim();
  const contact = String(body?.contact || '').trim();
  const message = String(body?.message || '').trim();

  if (!name || !contact || !message) {
    return NextResponse.json(
      { error: 'Please fill in name, contact, and message.' },
      { status: 400 }
    );
  }
  if (name.length > 80 || contact.length > 120 || message.length > 2000) {
    return NextResponse.json(
      { error: 'One of the fields is too long.' },
      { status: 413 }
    );
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    // Misconfiguration is a server problem, not the user's fault.
    return NextResponse.json(
      { error: 'Messaging is not configured yet. Use the direct links below.' },
      { status: 503 }
    );
  }

  const text =
    `<b>New message — portfolio</b>\n\n` +
    `<b>Name:</b> ${escapeHtml(name)}\n` +
    `<b>Contact:</b> ${escapeHtml(contact)}\n\n` +
    `<b>Message:</b>\n${escapeHtml(message)}`;

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
        next: { revalidate: 0 },
      }
    );

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error('Telegram sendMessage failed:', err);
      return NextResponse.json(
        { error: 'Could not send. Please try the direct links.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('Contact route error:', e);
    return NextResponse.json(
      { error: 'Network error. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, service: 'contact' });
}
