import { put, get } from '@vercel/blob';

const token = process.env.BLOB_READ_WRITE_TOKEN;

// Получить список студентов
export async function GET() {
  const { body } = await get('students.json', { token });
  const text = await body.text();
  return new Response(text, {
    headers: { 'Content-Type': 'application/json' }
  });
}

// Сохранить список студентов
export async function POST(request) {
  const data = await request.json();
  await put('students.json', JSON.stringify(data), {
    contentType: 'application/json',
    token
  });
  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
