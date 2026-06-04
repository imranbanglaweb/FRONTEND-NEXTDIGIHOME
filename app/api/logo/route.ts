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
  const pathname = url.pathname;
  const pathSegments = pathname.split('/logo/')[1] || '';
  const filename = pathSegments ? decodeURIComponent(pathSegments) : null;
  const queryFilename = url.searchParams.get('file');
  const finalFilename = filename || queryFilename;

  if (!finalFilename) {
    return NextResponse.json(
      { error: 'Missing file parameter' },
      { status: 400 }
    );
  }

  if (finalFilename.includes('\\') || finalFilename.includes('..')) {
    return NextResponse.json(
      { error: 'Invalid filename' },
      { status: 400 }
    );
  }

  try {
    const logoUrl = `${BACKEND_BASE_URL(request)}/public/${finalFilename}`;
    const response = await fetch(logoUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Backend returned ${response.status}` },
        { status: response.status }
      );
    }

    const buffer = await response.arrayBuffer();
    const headers = new Headers();
    
    const ext = finalFilename.toLowerCase().split('.').pop();
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
    console.error('Logo proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch logo' },
      { status: 500 }
    );
  }
}
