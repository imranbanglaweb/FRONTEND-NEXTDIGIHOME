const { execSync } = require('child_process');
const path = require('path');

const backendDir = 'D:\\TMSPROJECT\\htdocs\\BACKEND-NEXTDIGIHOME';
const files = [
  'config/app.php',
  'database/seeders/SettingSeeder.php',
  'database/seeders/StatsSeeder.php',
  'database/seeders/HeroSliderSeeder.php',
  'database/seeders/ContactInfoSeeder.php',
  'database/seeders/PageContentSeeder.php',
  'app/Models/ProjectInquiry.php',
  'database/migrations/2026_09_13_000001_create_project_inquiries_table.php',
  'app/Http/Controllers/Api/InquiryController.php',
  'routes/api.php'
];

let allOk = true;
for (const f of files) {
  const fullPath = path.join(backendDir, f);
  try {
    const res = execSync(`php -l "${fullPath}"`, { encoding: 'utf8' });
    console.log(`[SYNTAX OK] ${f}`);
  } catch (err) {
    allOk = false;
    console.error(`[SYNTAX ERROR] ${f}:\n`, err.output ? err.output.join('\n') : err.message);
  }
}

if (allOk) {
  console.log('\nAll PHP files passed syntax check with 0 errors!');
}
