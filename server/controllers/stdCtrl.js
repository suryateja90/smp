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
        if (error) throw error;
        console.log('Student data inserted successfully!');
        res.send('Student data inserted successfully!');
    });
  }
}

module.exports = {
    insertStudentData,
};
