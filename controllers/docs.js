/* eslint-disable new-cap */
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

module.exports = (app) => {
  // Upload
  app.get('/', (req, res) => {
    res.render('upload.handlebars');
  });
  app.post('/docs/upload', upload.single('doc'), (req, res) => {
    console.log(req.file);
    if (req.file) {
    }
    res.redirect('/');
  });
};
