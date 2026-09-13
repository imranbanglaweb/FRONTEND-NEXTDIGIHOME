const fs = require('fs');
const path = require('path');

const file = 'D:\\TMSPROJECT\\htdocs\\BACKEND-NEXTDIGIHOME\\app\\Http\\Controllers\\Api\\ContentManagementController.php';
console.log(fs.readFileSync(file, 'utf8'));
