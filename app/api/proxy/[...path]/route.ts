import { NextRequest, NextResponse } from 'next/server';

function getBackendBaseUrl(request: NextRequest): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, '');
  if (envUrl) return envUrl;

  const host = new URL(request.url).hostname;
  const isLocal = host === 'localhost' || host === '127.0.0.1' || host.startsWith('192.168.') || host.startsWith('10.');

  if (isLocal) return 'http://localhost/NEXTDIGIHOMEBACKEND';

  const parts = host.split('.');
  const subdomain = parts[0] === 'www' ? 'backend' : parts[0];
  return `https://${subdomain}.${parts.slice(1).join('.')}`;
}

const BACKEND_BASE_URL = getBackendBaseUrl;

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const path = url.pathname.replace('/api/proxy', '');
  
  try {
    const response = await fetch(`${BACKEND_BASE_URL(request)}${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Proxy request failed' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const path = url.pathname.replace('/api/proxy', '');
  const body = await request.json();
  
  try {
    const response = await fetch(`${BACKEND_BASE_URL(request)}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Proxy request failed' },
      { status: 500 }
    );
  }
}
