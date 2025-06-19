const express = require('express');
const router = express.Router();
const authenticateToken=require("../middlewares/authMiddleware");
const {   createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient } = require('../controllers/patientController');


// POST /api/patients/ - Add a new patient (Authenticated users only)
router.post('/', authenticateToken, createPatient);

// GET /api/patients/ - Retrieve all patients created by the authenticated user
router.get('/', authenticateToken, getAllPatients);

// GET /api/patients/<id>/ - Get details of a specific patient
router.get('/:id', authenticateToken, getPatientById);

// PUT /api/patients/<id>/ - Update patient details
router.put('/:id', authenticateToken, updatePatient);

// DELETE /api/patients/<id>/ - Delete a patient record
router.delete('/:id', authenticateToken, deletePatient);

module.exports = router;
