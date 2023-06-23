const express = require('express');
const db = require('./api/db');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const environmentRoot = require('path').normalize(__dirname);
const routes = require('./api/routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

db.createStudentTable();
db.createTables();

app.use(express.static(environmentRoot + '/public'));
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const port = 3000;
app.listen(port, () => {
  console.log(`API server started on: http://localhost:${port}`);
});
