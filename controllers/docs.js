/* eslint-disable new-cap */
const multer = require('multer');
const db = require('../data/db');
const upload = multer({dest: 'uploads/'});

module.exports = (app) => {
  // Upload
  app.get('/', (req, res) => {
    res.render('upload.handlebars');
  });
  app.post('/docs/upload', upload.single('doc'), (req, res) => {
    if (req.file) {
      console.log('file uploaded');
      db.upsert(req.file.path);
    }
    res.redirect('/');
  });
};
