const fs = require('fs');
const path = require('path');

const backendDir = 'D:\\TMSPROJECT\\htdocs\\BACKEND-NEXTDIGIHOME';

console.log('--- .env ---');
try {
  const envContent = fs.readFileSync(path.join(backendDir, '.env'), 'utf8');
  console.log(envContent.split('\n').filter(l => l.startsWith('APP_')).join('\n'));
} catch (e) {
  console.error(e.message);
}

console.log('\n--- config/app.php ---');
try {
  const appPhp = fs.readFileSync(path.join(backendDir, 'config', 'app.php'), 'utf8');
  console.log(appPhp.split('\n').slice(0, 30).join('\n'));
} catch (e) {
  console.error(e.message);
}
