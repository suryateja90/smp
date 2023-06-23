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


function updateRow(table, fields) {

  // Create the SQL query
  const sql = `UPDATE ${table}
    SET ${Object.entries(fields).map(([field, value]) => `${field} = '${value}'`).join(',')}
    WHERE id = ${fields.id};`;

  // Execute the SQL query
  const result = db.connection.query(sql);

  // Check if the query was successful
  if (!result) {
    throw new Error("Query failed");
  }

  // Return the number of rows updated
  return result.affectedRows;
}

function updateStudentData(req, res) {
  // Check if the user has provided the required data
  if (!req.body.id) {
    res.status(400).send("Please provide all required data");
    return;
  }

  // Update the student data
  const updatedRows = updateRow("students", req.body);

  // Check if the update was successful
  if (updatedRows === 0) {
    res.status(404).send("No student found with the given id");
    return;
  }

  // Successfully updated the student data
  res.status(200).json({ message: "Student data updated successfully" });
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
    fetchStudentData,
    updateStudentData
};
