/* eslint-disable new-cap */
const multer = require('multer');
const db = require('../data/db');
const reader = require('../data/reader');
const upload = multer({dest: 'uploads/'});

module.exports = (app) => {
  // Upload
  app.get('/', (req, res) => {
    res.render('upload.handlebars');
  });
  app.post('/docs/upload', upload.single('doc'), (req, res) => {
    if (req.file) {
      console.log('file uploaded');
      const doc = reader(req.file.path);
      doc.forEach((str) => {
        db.upsert(str);
      });
    }
    res.redirect('/');
  });
};
