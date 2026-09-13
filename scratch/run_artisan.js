const { execSync } = require('child_process');

try {
  const output = execSync('php artisan migrate:status', {
    cwd: 'D:\\TMSPROJECT\\htdocs\\BACKEND-NEXTDIGIHOME',
    encoding: 'utf8'
  });
  console.log('Migrate Status:\n', output);
} catch (err) {
  console.error('Migrate Error:\n', err.message);
  if (err.stdout) console.log('Stdout:', err.stdout);
  if (err.stderr) console.error('Stderr:', err.stderr);
}
