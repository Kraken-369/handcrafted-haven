const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();

app.use(bodyParser.json())
  .use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
})
  .use(cors({ methods: ['GET, POST, PUT, DELETE'] }))
  .use(cors({ origin: '*' }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
