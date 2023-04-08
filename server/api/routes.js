const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/stdctrl');

// Route to insert student data
router.post('/students', ctrl.insertStudentData);

module.exports = router;