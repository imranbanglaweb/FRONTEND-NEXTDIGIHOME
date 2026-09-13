const fs = require('fs');
const path = require('path');

const backendDir = 'D:\\TMSPROJECT\\htdocs\\BACKEND-NEXTDIGIHOME';

function searchInDir(dir, query) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (['vendor', 'node_modules', '.git', 'storage', 'public/plugins'].some(x => entry.name.includes(x))) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      searchInDir(fullPath, query);
    } else if (/\.(php|json|env|md|txt)$/.test(entry.name)) {
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.toLowerCase().includes(query.toLowerCase())) {
          console.log(`Found "${query}" in ${path.relative(backendDir, fullPath)}`);
        }
      } catch (e) {}
    }
  }
}

console.log('Searching for DigitalHub in backend...');
searchInDir(backendDir, 'DigitalHub');

console.log('\nChecking app/Models...');
try {
  const models = fs.readdirSync(path.join(backendDir, 'app', 'Models'));
  console.log('Models:', models);
} catch (e) {
  // maybe app/ has models directly
  try {
    const appFiles = fs.readdirSync(path.join(backendDir, 'app'));
    console.log('App files:', appFiles.filter(f => f.endsWith('.php')));
  } catch (err) {}
}

console.log('\nChecking app/Http/Controllers/Api...');
try {
  const apiControllers = fs.readdirSync(path.join(backendDir, 'app', 'Http', 'Controllers', 'Api'));
  console.log('API Controllers:', apiControllers);
} catch (e) {
  console.log('No Api controller dir or error:', e.message);
}
