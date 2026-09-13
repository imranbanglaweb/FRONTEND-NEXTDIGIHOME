const fs = require('fs');
const path = require('path');

const adminDir = 'D:\\TMSPROJECT\\htdocs\\BACKEND-NEXTDIGIHOME\\resources\\views\\admin';
const files = fs.readdirSync(adminDir);
console.log('Admin dirs/views:', files);
