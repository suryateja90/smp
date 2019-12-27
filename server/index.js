const mysql = require('mysql');

var mysqlconnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'sakila',
});

mysqlconnection.connect((err) => {
if (err) { 
console.log('not connecting........ ' + JSON.stringify(err, undefined, 2));
} else {
    console.log('db is connected........');
}
})