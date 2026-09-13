const fs = require('fs');
const path = require('path');

const migrationsDir = 'D:\\TMSPROJECT\\htdocs\\BACKEND-NEXTDIGIHOME\\database\\migrations';
const files = fs.readdirSync(migrationsDir);
console.log('Total migrations:', files.length);
files.forEach(f => {
  if (f.includes('contact') || f.includes('message') || f.includes('inquir') || f.includes('lead') || f.includes('project')) {
    console.log(f);
  }
});
