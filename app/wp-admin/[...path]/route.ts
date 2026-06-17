export const dynamic = 'force-static';

const goneResponse = () =>
  new Response('Gone', {
    status: 410,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
    },
  });

export function GET() {
  return goneResponse();
}

export function HEAD() {
  return goneResponse();
}
