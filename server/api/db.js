const mysql = require('mysql');
const schema = require('./schema');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'smp_db',
});

function createTable() {
    const fields = Object.keys(schema.student).map(fieldName => {
        const fieldDef = schema.student[fieldName];
        const type = fieldDef.type;
        const notNull = fieldDef.notNull ? 'NOT NULL' : '';
        return `${fieldName} ${type} ${notNull}`;
      }).join(', ');
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS students (
     ${fields}
    )
  `;
  connection.query(createTableQuery, (error, results, fields) => {
    if (error) throw error;
    console.log('Table created successfully!');
  });
}

connection.connect((error) => {
  if (error) throw error;
  console.log('Connected to database successfully!');
});

module.exports = {
  connection,
  createTable
};
