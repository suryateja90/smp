const db = require('../api/db');

// in the below function, Write a safeguarding condition where if request body is empty?
function insertStudentData(req, res) {
  if (!req.body || Object.keys(req.body).length === 0) {
    // request body is empty or null
    res.status(400).json({ error: 'Request body is empty' });
 } else {
    const {
        firstName,
        middleName,
        lastName,
        dob,
        gender,
        address,
        phone,
        email,
        emergencyContactName,
        emergencyContactRelationship,
        emergencyContactPhone,
        previousSchoolName,
        previousSchoolAddress,
        previousSchoolRecords,
        medicalConditions,
    } = req.body;

    const insertQuery = `
    INSERT INTO students (
      firstName,
      middleName,
      lastName,
      dob,
      gender,
      address,
      phone,
      email,
      emergencyContactName,
      emergencyContactRelationship,
      emergencyContactPhone,
      previousSchoolName,
      previousSchoolAddress,
      previousSchoolRecords,
      medicalConditions
    ) VALUES (
      "${firstName}",
      "${middleName}",
      "${lastName}",
      "${dob}",
      "${gender}",
      "${address}",
      "${phone}",
      "${email}",
      "${emergencyContactName}",
      "${emergencyContactRelationship}",
      "${emergencyContactPhone}",
      "${previousSchoolName}",
      "${previousSchoolAddress}",
      "${previousSchoolRecords}",
      "${medicalConditions}"
    )
  `;

    db.connection.query(insertQuery, (error, results, fields) => {
      if (error) {
        console.error('Error inserting student data: ', error);
        res.status(500).json('Error inserting student data');
      } else {
        console.log('Student data inserted successfully!');
        res.status(200).json({ message: 'Student data inserted successfully!' });
      }
 })
  }
}

function updateStudentData(req, res) {
  const query = 'UPDATE students SET field1 = ?, field2 = ? WHERE id = ?';

}

function fetchStudentData(req, res) {
  const fetchQuery = 'SELECT * FROM students';

  db.connection.query(fetchQuery, (error, results, fields) => {
    if (error) {
      console.error('Error fetching student data: ', error);
      res.status(500).json('Error fetching student data');
    } else {
      console.log('Student data fetched successfully!');
      res.status(200).json(results);
    }
  });
}


module.exports = {
    insertStudentData,
    fetchStudentData
};
