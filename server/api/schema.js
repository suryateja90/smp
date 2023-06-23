const studentSchema = {
    firstName: { type: 'VARCHAR(255)', notNull: false },
    middleName: { type: 'VARCHAR(255)' },
    lastName: { type: 'VARCHAR(255)', notNull: false },
    dob: { type: 'VARCHAR(255)', notNull: false },
    gender: { type: 'VARCHAR(255)', notNull: false }, //ENUM("male", "female", "other")
    address: { type: 'VARCHAR(255)', notNull: false },
    phone: { type: 'VARCHAR(255)', notNull: false },
    email: { type: 'VARCHAR(255)', notNull: false },
    emergencyContactName: { type: 'VARCHAR(255)', notNull: false },
    emergencyContactRelationship: { type: 'VARCHAR(255)', notNull: false },
    emergencyContactPhone: { type: 'VARCHAR(255)', notNull: false },
    previousSchoolName: { type: 'VARCHAR(255)' },
    previousSchoolAddress: { type: 'VARCHAR(255)' },
    previousSchoolRecords: { type: 'VARCHAR(255)' },
    medicalConditions: { type: 'VARCHAR(255)' },
  };


  const createTableQueries = [
    `
    CREATE TABLE IF NOT EXISTS teachers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL
    );
    
    `,
    `
    CREATE TABLE IF NOT EXISTS classes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );
  
    `
  ]

const schema = {
    student: studentSchema,
    tables: createTableQueries
}

module.exports = schema;