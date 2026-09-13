const http = require('http');

http.get('http://localhost:3000/api/proxy?path=products?per_page=12', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log('Total products from proxy:', json.data ? json.data.length : (Array.isArray(json) ? json.length : 'unknown'));
      const sample = (json.data || json).slice(0, 3);
      console.log('Sample product:', JSON.stringify(sample, null, 2));
    } catch (e) {
      console.log('Response not JSON, length:', data.length);
    }
  });
}).on('error', err => console.error(err.message));
