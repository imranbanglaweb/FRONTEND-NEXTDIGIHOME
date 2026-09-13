const fs = require('fs');
const path = require('path');

const seedersDir = 'D:\\TMSPROJECT\\htdocs\\BACKEND-NEXTDIGIHOME\\database\\seeders';

['SettingSeeder.php', 'HeroSliderSeeder.php', 'StatsSeeder.php', 'ContactInfoSeeder.php'].forEach(file => {
  console.log(`\n=== ${file} ===`);
  try {
    const content = fs.readFileSync(path.join(seedersDir, file), 'utf8');
    console.log(content.substring(0, 1000));
  } catch (e) {
    console.error(e.message);
  }
});
