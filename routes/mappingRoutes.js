// routes/mappingRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/mappingController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, controller.assignDoctor);
router.get('/', authenticateToken, controller.getAllMappings);
router.get('/:patientId', authenticateToken, controller.getDoctorsForPatient);
router.delete('/:id', authenticateToken, controller.removeMapping);

module.exports = router;
