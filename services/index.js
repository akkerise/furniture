const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const normalizedPath = path.join(__dirname, '');

fs.readdirSync(normalizedPath)
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach(file => {
        if (file.match(/\.js$/) !== null && file !== 'index.js') {
            let name = file.replace('.js', '');
            exports[name] = require('./' + file);
        }
    });
