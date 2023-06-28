const db = require('../api/db');
const yup = require('yup');
const moment = require('moment');


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

const staffSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  dob: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format').required('DOB is required'),
  dateOfJoining: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format').required('DOB is required'),
  gender: yup.string().required('Gender is required'),
  mobile: yup.string().required('Mobile is required').test('mobile-validation', 'Invalid mobile number', (value) => {
    if (!value) return false; // If the value is not provided, it's considered invalid
    const mobileRegex = /^[0-9]{10}$/; // Regex pattern for 10-digit mobile number
    return mobileRegex.test(value.toString());
  })
});

function insertStaffData(req, res) {
  try {

    const { name, email, dob, gender, mobile, dateOfJoining } = req.body;

// Convert the dob to the desired format
const formattedDob = moment(dob).format('YYYY-MM-DD');
const formattedDoj = moment(dateOfJoining).format('YYYY-MM-DD');

// Create a new object with the updated dob format
const updatedData = {
  name,
  email,
  dob: formattedDob,
  dateOfJoining: formattedDoj,
  mobile,
  gender
};
     // Validate the request body using the schema
     staffSchema.validateSync(updatedData);

    // Insert the staff data
    const insertedRowId = insertRow("staff", updatedData);

    // Successfully inserted the staff data
    res.status(200).json({ message: "Staff data inserted successfully", insertedRowId });
  } catch (error) {
    // Handle the error
    console.error("Error inserting staff data:", error);
    res.status(500).json({ message: `Failed to insert staff data;${error}`  });
  }
}

function insertRow(table, fields) {
  try {
    // Create the SQL query
    const sql = `INSERT INTO ${table} (${Object.keys(fields).join(',')})
                 VALUES (${Object.values(fields).map(value => `'${value}'`).join(',')});`;

    // Execute the SQL query
    const result = db.connection.query(sql);

    // Check if the query was successful
    if (!result) {
      throw new Error("Query failed");
    }

    // Return the ID of the inserted row
    return result.insertId;
  } catch (error) {
    // Handle the error
    console.error("Error inserting row:", error);
    throw new Error("Failed to insert row");
  }
}



module.exports = {
    insertStudentData,
    fetchStudentData,
    updateStudentData,
    insertStaffData
};
