async function runTest() {
  const testLead = {
    name: 'Rahim Chowdhury',
    email: 'rahim.test@example.com',
    phone: '+8801712345678',
    whatsapp: '+8801712345678',
    company: 'Apex Logistics Ltd',
    website: 'https://apexlogistics.com',
    service: 'SaaS Development',
    services: ['SaaS Development', 'Web Application'],
    description: 'We need a multi-tenant fleet dispatch and automated billing SaaS platform with real-time driver tracking.',
    budget: '৳3,00,000+',
    timeline: 'Within 1 Month',
    contact_method: 'whatsapp',
    lead_source: 'Google',
    landing_page: '/contact?service=saas',
    utm_source: 'google',
    utm_medium: 'cpc',
    utm_campaign: 'saas_launch_q3',
    service_details: {
      existing_idea: 'Yes, validated with 50 fleet owners',
      mvp_required: 'Yes',
      expected_platforms: 'Web + Mobile'
    }
  };

  console.log('--- 1. Testing POST /api/leads ---');
  const postRes = await fetch('http://localhost:3000/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testLead)
  });
  const postJson = await postRes.json();
  console.log('POST Result:', postJson);

  if (!postJson.success || !postJson.data?.id) {
    console.error('Failed to create lead');
    return;
  }

  const leadId = postJson.data.id;

  console.log('\n--- 2. Testing GET /api/leads ---');
  const getRes = await fetch('http://localhost:3000/api/leads');
  const getJson = await getRes.json();
  console.log('GET Summary:', getJson.summary);
  console.log('Total Leads Returned:', getJson.total);
  const found = getJson.data.find(l => l.id === leadId);
  console.log('Found created lead:', found ? {
    id: found.id,
    name: found.name,
    score: found.lead_score,
    reasons: found.score_reasons,
    priority: found.priority,
    status: found.status
  } : 'NOT FOUND');

  console.log('\n--- 3. Testing PATCH /api/leads ---');
  const patchRes = await fetch('http://localhost:3000/api/leads', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: leadId,
      status: 'QUALIFIED',
      priority: 'HIGH',
      assigned_to: 'Imran (Lead Architect)',
      note: 'Requirement brief reviewed. Ready for system architecture and MVP proposal call.',
      follow_up: {
        date: '2026-09-18',
        note: 'Scoping workshop video call scheduled via WhatsApp',
        status: 'PENDING'
      }
    })
  });
  const patchJson = await patchRes.json();
  console.log('PATCH Result:', patchJson.success, 'New Status:', patchJson.data?.status, 'Priority:', patchJson.data?.priority);
  console.log('Activities Log count:', patchJson.data?.activities?.length);
  console.log('Notes count:', patchJson.data?.notes?.length);

  console.log('\n--- 4. Testing Spam Honeypot Protection ---');
  const spamRes = await fetch('http://localhost:3000/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Spam Bot',
      email: 'spammer@bot.net',
      phone: '1234567890',
      service: 'Web Development',
      description: 'Cheap backlink spam',
      _hp: 'i am a bot filled this hidden field'
    })
  });
  const spamJson = await spamRes.json();
  console.log('Honeypot Response:', spamJson);

  console.log('\n--- 5. Testing Validation on Incomplete Data ---');
  const invalidRes = await fetch('http://localhost:3000/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Missing Email & Service'
    })
  });
  const invalidJson = await invalidRes.json();
  console.log('Invalid Data Status:', invalidRes.status, 'Response:', invalidJson);
}

runTest().catch(console.error);
