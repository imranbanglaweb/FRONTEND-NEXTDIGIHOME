const fs = require('fs');
const path = require('path');

const backendDir = 'D:\\TMSPROJECT\\htdocs\\BACKEND-NEXTDIGIHOME';

console.log('Backend directory exists:', fs.existsSync(backendDir));

function listFiles(dir, depth = 0) {
  if (depth > 3) return;
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (['vendor', 'node_modules', '.git', 'storage'].includes(entry.name)) continue;
      const fullPath = path.join(dir, entry.name);
      console.log(' '.repeat(depth * 2) + (entry.isDirectory() ? '[DIR] ' : '      ') + entry.name);
      if (entry.isDirectory()) {
        listFiles(fullPath, depth + 1);
      }
    }
  } catch (err) {
    console.error('Error reading', dir, err.message);
  }
}

listFiles(backendDir, 0);
