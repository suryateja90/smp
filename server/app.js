const express = require('express');
var app = express();
var mySql = require('mysql');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var environmentRoot =  require('path').normalize(__dirname );
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
 });

 var conncetion = mySql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '1234',
   database: 'sakila',
 })
 
 conncetion.connect((err) => {
   if (err) { 
   console.log('not connecting........ ' + JSON.stringify(err, undefined, 2));
   } else {
       console.log('db is sconnecting........');
   }
   });
 app.use(express.static(environmentRoot + '/public'));
var routes = require('./api/routes');
routes(app);
const port = 3000;
app.listen(port);
console.log('API server started on: ' + port)