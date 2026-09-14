async function testAllLandingPages() {
  const routes = [
    '/solutions/web-development',
    '/solutions/web-application',
    '/solutions/ecommerce',
    '/solutions/mobile-app',
    '/solutions/custom-software',
    '/solutions/saas-development',
    '/ai/ai-agents',
    '/ai/ai-chatbot',
    '/ai/ai-automation',
    '/ai/ai-integration',
    '/growth/meta-ads',
    '/growth/google-ads',
    '/growth/social-media',
    '/growth/seo',
    '/growth/analytics'
  ];

  console.log('Testing ' + routes.length + ' service landing pages...\n');

  let allPassed = true;

  for (const route of routes) {
    try {
      const res = await fetch('http://localhost:3000' + route);
      const html = await res.text();
      const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
      const h1Count = h1Matches.length;
      const hasPrimaryCTA = html.includes('Start Your Project');
      const hasContactParam = html.includes('/contact?service=');
      const hasFAQ = html.includes('FREQUENTLY ASKED QUESTIONS') || html.includes('Questions &amp; Answers');
      const hasWhySection = html.includes('Why Businesses Choose NextDigiHome');
      const hasProcess = html.includes('How We Work');
      
      const passed = res.status === 200 && h1Count === 1 && hasPrimaryCTA && hasContactParam;
      if (!passed) allPassed = false;

      console.log(`[${res.status}] ${route}`);
      console.log(`     H1 Count: ${h1Count} | Primary CTA: ${hasPrimaryCTA} | Contact Link: ${hasContactParam} | FAQ: ${hasFAQ} | Process: ${hasProcess}`);
    } catch (e) {
      console.error(`Error testing ${route}:`, e.message);
      allPassed = false;
    }
  }

  console.log('\nAll landing pages passed checks:', allPassed);
}

testAllLandingPages();
