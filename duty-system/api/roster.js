import { put, get } from '@vercel/blob';

const token = process.env.BLOB_READ_WRITE_TOKEN;

// Получить расписание
export async function GET() {
  try {
    const { body } = await get('roster.json', { token });
    const text = await body.text();
    return new Response(text, {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    // Если файла нет — возвращаем пустой объект
    return new Response(JSON.stringify({}), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Сохранить расписание
export async function POST(request) {
  const data = await request.json();
  await put('roster.json', JSON.stringify(data), {
    contentType: 'application/json',
    token
  });
  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
