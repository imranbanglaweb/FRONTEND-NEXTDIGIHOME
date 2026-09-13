const fs = require('fs');
const path = require('path');

const backendDir = 'D:\\TMSPROJECT\\htdocs\\BACKEND-NEXTDIGIHOME';

function searchTerms(terms) {
  const results = {};
  terms.forEach(t => results[t] = []);

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (['vendor', 'node_modules', '.git', 'storage', 'public/plugins'].some(x => entry.name.includes(x))) continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (/\.(php|blade\.php|json|env|md)$/.test(entry.name)) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          terms.forEach(t => {
            if (content.toLowerCase().includes(t.toLowerCase())) {
              results[t].push(path.relative(backendDir, fullPath));
            }
          });
        } catch (e) {}
      }
    }
  }

  walk(backendDir);
  return results;
}

const res = searchTerms(['DigitalHub', 'Digital Hub', 'db_vehicle', '50,000+']);
console.log(JSON.stringify(res, null, 2));
