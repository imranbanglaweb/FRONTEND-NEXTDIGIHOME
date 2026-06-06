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

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const pathSegments = url.pathname.replace('/api/storage', '');
  const cleanPath = pathSegments.startsWith('/') ? pathSegments.slice(1) : pathSegments;

  if (!cleanPath) {
    return NextResponse.json(
      { error: 'Missing path parameter' },
      { status: 400 }
    );
  }

  if (cleanPath.includes('..')) {
    return NextResponse.json(
      { error: 'Invalid path' },
      { status: 400 }
    );
  }

  try {
    const storageUrl = `${BACKEND_BASE_URL(request)}/public/storage/${cleanPath}`;
    const response = await fetch(storageUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Backend returned ${response.status}` },
        { status: response.status }
      );
    }

    const buffer = await response.arrayBuffer();
    const headers = new Headers();

    const ext = cleanPath.toLowerCase().split('.').pop();
    const contentTypeMap: Record<string, string> = {
      'ico': 'image/x-icon',
      'png': 'image/png',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'gif': 'image/gif',
      'svg': 'image/svg+xml',
      'webp': 'image/webp',
    };
    const contentType = contentTypeMap[ext || ''] || response.headers.get('content-type') || 'application/octet-stream';
    headers.set('Content-Type', contentType);

    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');

    return new NextResponse(buffer, {
      status: 200,
      headers
    });
  } catch (error) {
    console.error('Storage proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch storage file' },
      { status: 500 }
    );
  }
}