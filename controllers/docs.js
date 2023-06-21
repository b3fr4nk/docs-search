/* eslint-disable new-cap */
const multer = require('multer');
const db = require('../data/db');
const reader = require('../data/reader');
const upload = multer({dest: 'uploads/'});

module.exports = (app) => {
  // index
  app.get('/', (req, res) => {
    res.render('index.handlebars');
  });
  // Upload
  app.get('/docs/upload', (req, res) => {
    res.render('upload.handlebars');
  });
  app.post('/docs/upload', upload.single('doc'), (req, res) => {
    if (req.file) {
      console.log(req.file.path);
      const doc = reader(req.file.path);
      for (let i = 1; i < doc.length; i++) {
        db.upsert(doc[i], `${req.file.path}-${i}`);
      };
    }
    res.redirect('/docs/search');
  });

  // Search
  app.get('/docs/search', (req, res) => {
    res.render('search.handlebars');
  });

  app.post('/docs/search', (req, res) => {
    // console.log(req.body.search);
    db.query(req.body.search)
        .then(
            function(value) {
              results = [];
              for (let i = 0; i < value.matches.length; i++) {
                results.push(value.matches[i].metadata.text);
              }
              console.log(results);
              res.render('search.handlebars', {results});
            },
            function(error) {
              console.log(error);
            },
        );
  });
};
