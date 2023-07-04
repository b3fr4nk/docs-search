/* eslint-disable max-len */
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
      const doc = reader(req.file.path);
      for (let i = 1; i < doc.length; i++) {
        db.upsert(doc[i], `${req.file.path}-${i}`);
      };
    }
    res.redirect('/docs/search');
  });

  app.get('/docs/document/:id', (req, res) => {
    if (req.params.id) {
      const text = reader(`./uploads/${req.params.id}`);

      res.render('doc.handlebars', {text});
    }
    return res.status(404);
  });

  // Search
  app.get('/docs/search', (req, res) => {
    res.render('search.handlebars');
  });

  app.post('/docs/search', (req, res) => {
    const start = Date.now();
    db.query(req.body.search)
        .then(
            function(value) {
              const results = [];
              for (let i = 0; i < value.matches.length; i++) {
                // TODO make the link to the doc work
                const text = value.matches[i].metadata.text;
                const file = value.matches[i].metadata.filepath.split('/')[1].split('-')[0];
                results.push({text: text, path: `/docs/document/${file}`, index: i+1});
              }
              const end = Date.now();
              console.log(`Query time: ${end - start}ms`);
              res.render('search.handlebars', {results});
            },
            function(error) {
              console.log(error);
            },
        );
  });
};
