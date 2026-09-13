const http = require('http');

const routes = [
  '/',
  '/solutions',
  '/solutions/web-development',
  '/solutions/ecommerce',
  '/solutions/mobile-app',
  '/solutions/custom-software',
  '/solutions/saas-development',
  '/solutions/api-integrations',
  '/solutions/hosting-maintenance',
  '/ai',
  '/ai/ai-agents',
  '/ai/chatbots',
  '/ai/ai-support',
  '/ai/automation',
  '/ai/ai-video',
  '/growth',
  '/growth/meta-ads',
  '/growth/google-ads',
  '/growth/seo',
  '/growth/analytics',
  '/growth/social-media',
  '/labs',
  '/labs/commerce',
  '/labs/social',
  '/labs/automate',
  '/labs/garibondhu360',
  '/store',
  '/case-studies',
  '/contact',
  '/refund',
  '/privacy',
  '/terms'
];

async function checkRoute(route) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${route}`, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({
          route,
          status: res.statusCode,
          size: body.length,
          title: (body.match(/<title>([^<]*)<\/title>/) || [])[1] || 'No title'
        });
      });
    }).on('error', (err) => {
      resolve({ route, status: 'ERROR', error: err.message });
    });
  });
}

async function run() {
  console.log(`Auditing ${routes.length} NextDigiHome routes on http://localhost:3000...\n`);
  let passed = 0;
  for (const r of routes) {
    const res = await checkRoute(r);
    if (res.status === 200) {
      console.log(`[PASS 200] ${r.padEnd(35)} | ${res.size} B | Title: ${res.title}`);
      passed++;
    } else {
      console.error(`[FAIL ${res.status}] ${r.padEnd(35)} | ${res.error || ''}`);
    }
  }
  console.log(`\nResults: ${passed}/${routes.length} routes passed.`);
}

run();
