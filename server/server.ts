import express from 'express';
const path = require('path');

// Create a new express app instance
const app: express.Application = express();
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/dist/index.html'));
});
app.listen(3000, function () {
  console.log('App is listening on port 3000!');
});