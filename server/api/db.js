const mysql = require('mysql');
const schema = require('./schema');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'smp_db',
});

function createStudentTable() {
    let fields = Object.keys(schema.student).map(fieldName => {
        const fieldDef = schema.student[fieldName];
        const type = fieldDef.type;
        const notNull = fieldDef.notNull ? 'NOT NULL' : '';
        return `${fieldName} ${type} ${notNull}`;
      }).join(', ');

          // Add 'id' as a unique identifier
    fields = `id INT AUTO_INCREMENT PRIMARY KEY, ${fields}`;
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS students (
     ${fields}
    )
  `;
  connection.query(createTableQuery, (error, results, fields) => {
    if (error) throw error;
    console.log('student table created successfully!');
  });
}

// Function to create tables for each schema
function createTables() {
  return new Promise((resolve, reject) => {
    // Execute each create table query in the array
    schema.tables.forEach((query, index) => {
      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (index === schema.tables.length - 1) {
            // Insert class records after creating tables
            insertClasses()
              .then(() => resolve())
              .catch((error) => reject(error));
          }
          console.log('Tables created successfully:');
        }
      });
    });

    // Resolve the promise when all queries have been executed
    resolve();
  });
}

function insertClasses() {
  return new Promise((resolve, reject) => {
    const classes = [];
    for (let i = 1; i <= 10; i++) {
      classes.push([i, `Class ${i}`]);
    }

    const query = 'INSERT INTO classes (id, name) VALUES ?';

    connection.query(query, [classes], (error, results) => {
      if (error) {
        reject(error);
      } else {
        console.log('Classes inserted successfully.');
        resolve();
      }
    });
  });
}



connection.connect((error) => {
  if (error) throw error;
  console.log('Connected to database successfully!');
});

module.exports = {
  connection,
  createStudentTable,
  createTables
};
