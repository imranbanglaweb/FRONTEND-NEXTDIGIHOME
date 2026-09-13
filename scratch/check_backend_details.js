const fs = require('fs');
const path = require('path');

const backendDir = 'D:\\TMSPROJECT\\htdocs\\BACKEND-NEXTDIGIHOME';

console.log('--- PageContentSeeder.php ---');
try {
  const content = fs.readFileSync(path.join(backendDir, 'database', 'seeders', 'PageContentSeeder.php'), 'utf8');
  console.log(content.substring(0, 1500));
} catch (e) {
  console.error(e.message);
}

console.log('\n--- ContentManagementController.php ---');
try {
  const content = fs.readFileSync(path.join(backendDir, 'app', 'Http', 'Controllers', 'Api', 'ContentManagementController.php'), 'utf8');
  console.log(content.substring(0, 1500));
} catch (e) {
  console.error(e.message);
}

console.log('\n--- ContactInfoController.php ---');
try {
  const content = fs.readFileSync(path.join(backendDir, 'app', 'Http', 'Controllers', 'Api', 'ContactInfoController.php'), 'utf8');
  console.log(content.substring(0, 1500));
} catch (e) {
  console.error(e.message);
}

console.log('\n--- Migrations ---');
try {
  const migrations = fs.readdirSync(path.join(backendDir, 'database', 'migrations'));
  console.log(migrations.filter(m => m.includes('contact') || m.includes('lead') || m.includes('inquir') || m.includes('setting') || m.includes('page')));
} catch (e) {
  console.error(e.message);
}
