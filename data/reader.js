const fs = require('fs');

module.exports = (doc) => {
  fs.readFile(doc, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    return data;
  });
};
