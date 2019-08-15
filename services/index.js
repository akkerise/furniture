const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const normalizedPath = path.join(__dirname, '');
const Services = {};
fs
    .readdirSync(normalizedPath)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function(file) {
        if (file.match(/\.js$/) !== null && file !== 'index.js') {
            let name = file.replace('.js', '');
            exports[name] = require('./' + file);
        }
    });
