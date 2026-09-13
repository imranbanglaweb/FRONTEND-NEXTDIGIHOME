const https = require('https');

https.get('https://backend.nextdigihome.com/api/products?per_page=6', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    try {
      const json = JSON.parse(data);
      console.log('Success:', json.success);
      const items = json.data?.data || json.data || json;
      console.log('Products count:', items.length);
      if (items.length > 0) {
        console.log('Sample product:', {
          id: items[0].id,
          name: items[0].name,
          price: items[0].price,
          category: items[0].category,
          thumbnail: items[0].thumbnail
        });
      }
    } catch (e) {
      console.log('Parse error:', e.message, 'Raw:', data.substring(0, 300));
    }
  });
}).on('error', err => console.error(err.message));
