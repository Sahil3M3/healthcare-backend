const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const  authenticateToken  = require('../middlewares/authMiddleware');

// POST /api/doctors/ - Add a new doctor (Authenticated)
router.post('/', authenticateToken, doctorController.addDoctor);

// GET /api/doctors/ - Retrieve all doctors (Public)
router.get('/', doctorController.getAllDoctors);

// GET /api/doctors/:id - Get a specific doctor (Public)
router.get('/:id', doctorController.getDoctor);

// PUT /api/doctors/:id - Update doctor (Authenticated)
router.put('/:id', authenticateToken, doctorController.updateDoctor);

// DELETE /api/doctors/:id - Delete doctor (Authenticated)
router.delete('/:id', authenticateToken, doctorController.deleteDoctor);

module.exports = router;