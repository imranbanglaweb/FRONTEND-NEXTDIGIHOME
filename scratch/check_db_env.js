const fs = require('fs');
const path = require('path');

const backendDir = 'D:\\TMSPROJECT\\htdocs\\BACKEND-NEXTDIGIHOME';
const envContent = fs.readFileSync(path.join(backendDir, '.env'), 'utf8');
console.log(envContent.split('\n').filter(l => l.startsWith('DB_')).join('\n'));
