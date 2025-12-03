import { NextResponse } from 'next/server';

const URL = `${process.env.BASE_API_URL}/api/models`;

export async function GET() {
  const apiKey = process.env.JOB_API_KEY;

  const headers: Record<string, string> = { Accept: 'application/json' };
  if (apiKey) headers['x-api-key'] = apiKey;

  try {
    const res = await fetch(URL, { headers });
    const text = await res.text();
    if (!res.ok) {
      return new NextResponse(text || 'error', { status: res.status });
    }

    const data = JSON.parse(text || 'null');
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return new NextResponse(String(err), { status: 500 });
  }
}
