const fs = require('fs');

module.exports = (doc) => {
  try {
    const data = fs.readFileSync(doc, 'utf8');
    return data;
  } catch (err) {
    console.log(err);
  };
};
