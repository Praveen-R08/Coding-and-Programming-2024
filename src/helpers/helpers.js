const fs = require('fs');

function readJSON(file) {
   return JSON.parse(fs.readFileSync(file));
}

function writeJSON(file, data) {
   fs.writeFileSync(file, JSON.stringify(data, null, 2), {
      encoding: 'utf8',
      flag: 'w'
   });
   console.log("Upload complete");
}

module.exports = {
   readJSON,
   writeJSON
}