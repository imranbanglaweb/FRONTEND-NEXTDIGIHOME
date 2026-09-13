const fs = require('fs');
const path = require('path');

const migrationsDir = 'D:\\TMSPROJECT\\htdocs\\BACKEND-NEXTDIGIHOME\\database\\migrations';
const files = fs.readdirSync(migrationsDir);
files.forEach((f, i) => console.log(`${i+1}. ${f}`));
