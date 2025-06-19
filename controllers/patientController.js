const patientService = require('../services/patientService');


exports.createPatient = async (req, res) => {
  try {
    const patient = await patientService.createPatient( req.body);
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await patientService.getAllPatients();
    res.json(patients);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPatientById = async (req, res) => {
  try {
    const patient = await patientService.getPatientById(req.params.id);
    res.json(patient);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const updated = await patientService.updatePatient(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    await patientService.deletePatient(req.params.id);
    res.json({ message: 'Patient deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
