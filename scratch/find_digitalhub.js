const fs = require('fs');
const path = require('path');

const file = 'D:\\TMSPROJECT\\htdocs\\BACKEND-NEXTDIGIHOME\\database\\seeders\\PageContentSeeder.php';
const lines = fs.readFileSync(file, 'utf8').split('\n');
lines.forEach((line, i) => {
  if (line.toLowerCase().includes('digitalhub')) {
    console.log(`Line ${i + 1}: ${line}`);
  }
});
