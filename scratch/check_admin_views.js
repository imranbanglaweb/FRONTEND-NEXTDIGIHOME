const fs = require('fs');
const path = require('path');

const backendDir = 'D:\\TMSPROJECT\\htdocs\\BACKEND-NEXTDIGIHOME';

const appBlade = path.join(backendDir, 'resources', 'views', 'layouts', 'app.blade.php');
if (fs.existsSync(appBlade)) {
  const content = fs.readFileSync(appBlade, 'utf8');
  console.log('--- resources/views/layouts/app.blade.php (First 40 lines) ---');
  console.log(content.split('\n').slice(0, 40).join('\n'));
}

const adminPartials = path.join(backendDir, 'resources', 'views', 'admin', 'partials');
if (fs.existsSync(adminPartials)) {
  console.log('\nAdmin partials:', fs.readdirSync(adminPartials));
}
