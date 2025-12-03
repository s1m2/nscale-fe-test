import { NextResponse } from 'next/server';

const URL = `${process.env.BASE_API_URL}/api/jobs`;

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

export async function POST(request: Request) {
  const apiKey = process.env.JOB_API_KEY;

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (apiKey) headers['x-api-key'] = apiKey;

  try {
    const body = await request.text();

    const res = await fetch(URL, { method: 'POST', headers, body });
    const text = await res.text();
    if (!res.ok) {
      return new NextResponse(text || 'error', { status: res.status });
    }

    return new NextResponse(text, { status: res.status, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new NextResponse(String(err), { status: 500 });
  }
}
