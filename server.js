/* eslint-disable new-cap */
const express = require('express');
const app = express();
const server = require('http').Server(app);
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// controllers
require('./controllers/docs')(app);

server.listen('3000', () => {
  console.log('Server listening on Port 3000');
});

module.exports = app;
