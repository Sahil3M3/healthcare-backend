// controllers/mappingController.js
const mappingService = require('../services/mappingService');

exports.assignDoctor = async (req, res) => {
  const { patientId, doctorId } = req.body;

  if (!patientId || !doctorId) {
    return res.status(400).json({ message: 'patientId and doctorId are required' });
  }

  try {
    const mapping = await mappingService.assignDoctorToPatient(patientId, doctorId);
    res.status(201).json({ message: 'Doctor assigned successfully', mapping });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllMappings = async (req, res) => {
  try {
    const mappings = await mappingService.getAllMappings();
    res.json(mappings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDoctorsForPatient = async (req, res) => {
  const { patientId } = req.params;
  if (!patientId) return res.status(400).json({ message: 'patientId is required' });

  try {
    const doctors = await mappingService.getDoctorsForPatient(patientId);
    res.json(doctors);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.removeMapping = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: 'Mapping ID is required' });

  try {
    await mappingService.removeDoctorFromPatient(id);
    res.json({ message: 'Mapping removed successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
