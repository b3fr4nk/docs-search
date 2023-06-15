const fs = require('fs');

module.exports = (doc) => {
  fs.readFile(doc, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
    return data;
  });
};
