import { NextRequest, NextResponse } from 'next/server';

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, '') || 'http://localhost/NEXTDIGIHOMEBACKEND';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  // Extract filename from path: /api/logo/filename.png or /api/logo/admin_resource/path/filename.png
  const pathSegments = pathname.split('/api/logo/')[1] || '';
  const filename = pathSegments ? decodeURIComponent(pathSegments) : null;

  // Also check query param for backwards compatibility
  const queryFilename = url.searchParams.get('file');
  const finalFilename = filename || queryFilename;

  if (!finalFilename) {
    return NextResponse.json(
      { error: 'Missing file parameter' },
      { status: 400 }
    );
  }

  // Prevent path traversal attacks
  if (finalFilename.includes('\\') || finalFilename.includes('..')) {
    return NextResponse.json(
      { error: 'Invalid filename' },
      { status: 400 }
    );
  }

  try {
    // Build the backend URL - handle both simple filenames and admin_resource paths
    const logoUrl = `${BACKEND_BASE_URL}/public/${finalFilename}`;
    const response = await fetch(logoUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Backend returned ${response.status}` },
        { status: response.status }
      );
    }

    const buffer = await response.arrayBuffer();
    const headers = new Headers();
    
    // Determine content type based on file extension
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

    // Add CORS headers for development
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