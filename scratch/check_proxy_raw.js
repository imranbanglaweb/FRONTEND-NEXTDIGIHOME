const http = require('http');

http.get('http://localhost:3000/api/proxy?path=products?per_page=12', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Headers:', res.headers['content-type']);
    console.log('Snippet:', data.substring(0, 500));
  });
}).on('error', err => console.error(err.message));
