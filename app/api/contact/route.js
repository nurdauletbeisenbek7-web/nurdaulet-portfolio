import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, contact, message } = await request.json();
    if (!name || !contact || !message) {
      return NextResponse.json({ error: 'Заполните все поля.' }, { status: 400 });
    }
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
      return NextResponse.json({ error: 'Форма пока не настроена.' }, { status: 503 });
    }
    const text = `Новая заявка с портфолио%0A%0AИмя: ${name}%0AКонтакт: ${contact}%0A%0AСообщение:%0A${message}`;
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: decodeURIComponent(text) }),
    });
    if (!response.ok) throw new Error('Telegram API error');
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Не удалось отправить сообщение. Попробуйте позже.' }, { status: 500 });
  }
}
