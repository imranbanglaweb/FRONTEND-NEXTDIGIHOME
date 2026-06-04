import { NextRequest, NextResponse } from 'next/server';

function getBackendBaseUrl(request: NextRequest): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, '');
  if (envUrl) return envUrl;

  const host = new URL(request.url).hostname;
  const isLocal = host === 'localhost' || host === '127.0.0.1' || host.startsWith('192.168.') || host.startsWith('10.');

  if (isLocal) return 'http://localhost/BACKEND-NEXTDIGIHOME';

  const parts = host.split('.');
  const subdomain = parts[0] === 'www' ? 'backend' : parts[0];
  return `https://${subdomain}.${parts.slice(1).join('.')}`;
}

const BACKEND_BASE_URL = getBackendBaseUrl;

function copyHeaders(source: Headers, target: Headers) {
  source.forEach((value, key) => {
    target.append(key, value);
  });
}

export async function GET(request: NextRequest) {
  try {
    const backendUrl = `${BACKEND_BASE_URL(request)}/cart`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const authHeader = request.headers.get('authorization');
    if (authHeader) {
      headers['Authorization'] = authHeader;
    }

    const cookieHeader = request.headers.get('cookie');
    if (cookieHeader) {
      headers['Cookie'] = cookieHeader;
    }

    const response = await fetch(backendUrl, {
      method: 'GET',
      headers,
      credentials: 'include',
    });

    const data = await response.json();
    const nextHeaders = new Headers({ 'Content-Type': 'application/json' });
    copyHeaders(response.headers, nextHeaders);
    return NextResponse.json(data, { status: response.status, headers: nextHeaders });
  } catch (error) {
    console.error('Cart GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cart', items: [] },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const backendUrl = `${BACKEND_BASE_URL(request)}/cart`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const authHeader = request.headers.get('authorization');
    if (authHeader) {
      headers['Authorization'] = authHeader;
    }

    const cookieHeader = request.headers.get('cookie');
    if (cookieHeader) {
      headers['Cookie'] = cookieHeader;
    }

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify(body),
    });

    const data = await response.json();
    const nextHeaders = new Headers({ 'Content-Type': 'application/json' });
    copyHeaders(response.headers, nextHeaders);
    return NextResponse.json(data, { status: response.status, headers: nextHeaders });
  } catch (error) {
    console.error('Cart POST error:', error);
    return NextResponse.json(
      { error: 'Failed to add to cart' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  const body = await request.json();
  
  if (!id) {
    return NextResponse.json({ error: 'Missing item id' }, { status: 400 });
  }

  try {
    const backendUrl = `${BACKEND_BASE_URL(request)}/cart/${id}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const authHeader = request.headers.get('authorization');
    if (authHeader) {
      headers['Authorization'] = authHeader;
    }

    const cookieHeader = request.headers.get('cookie');
    if (cookieHeader) {
      headers['Cookie'] = cookieHeader;
    }

    const response = await fetch(backendUrl, {
      method: 'PUT',
      headers,
      credentials: 'include',
      body: JSON.stringify(body),
    });

    const data = await response.json();
    const nextHeaders = new Headers({ 'Content-Type': 'application/json' });
    copyHeaders(response.headers, nextHeaders);
    return NextResponse.json(data, { status: response.status, headers: nextHeaders });
  } catch (error) {
    console.error('Cart PUT error:', error);
    return NextResponse.json(
      { error: 'Failed to update cart' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const backendUrl = id
      ? `${BACKEND_BASE_URL(request)}/cart/${id}`
      : `${BACKEND_BASE_URL(request)}/cart`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const authHeader = request.headers.get('authorization');
    if (authHeader) {
      headers['Authorization'] = authHeader;
    }

    const cookieHeader = request.headers.get('cookie');
    if (cookieHeader) {
      headers['Cookie'] = cookieHeader;
    }

    const response = await fetch(backendUrl, {
      method: 'DELETE',
      headers,
      credentials: 'include',
    });

    const data = await response.json();
    const nextHeaders = new Headers({ 'Content-Type': 'application/json' });
    copyHeaders(response.headers, nextHeaders);
    return NextResponse.json(data, { status: response.status, headers: nextHeaders });
  } catch (error) {
    console.error('Cart DELETE error:', error);
    return NextResponse.json(
      { error: 'Failed to remove from cart' },
      { status: 500 }
    );
  }
}