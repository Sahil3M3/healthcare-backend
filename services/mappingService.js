const { Patient, Doctor, Mapping } = require('../models');

exports.assignDoctorToPatient = async (patientId, doctorId) => {
  if (!patientId || !doctorId) {
    throw new Error('Both patientId and doctorId are required.');
  }

  // Validate if Patient and Doctor exist
  const patient = await Patient.findByPk(patientId);
  if (!patient) throw new Error('Patient not found');

  const doctor = await Doctor.findByPk(doctorId);
  if (!doctor) throw new Error('Doctor not found');

  // Check if mapping already exists
  const existing = await Mapping.findOne({
    where: {
      PatientId: patientId,
      DoctorId: doctorId,
    },
  });

  if (existing) throw new Error('This doctor is already assigned to this patient');

  // Create mapping
  const mapping = await Mapping.create({
    PatientId: patientId,
    DoctorId: doctorId,
  });

  return mapping;
};


exports.getAllMappings = async () => {
  return await Mapping.findAll({
    include: [
      {
        model: Patient,
        attributes: ['id', 'name', 'age', 'gender'],
      },
      {
        model: Doctor,
        attributes: ['id', 'name', 'specialization'],
      },
    ],
  });
};

/**
 * Get all doctors assigned to a specific patient
 * @param {number} patientId
 * @returns {Promise<Doctor[]>}
 */
exports.getDoctorsForPatient = async (patientId) => {
  if (!patientId) throw new Error('patientId is required');

  const patient = await Patient.findByPk(patientId, {
    include: [
      {
        model: Doctor,
        through: { attributes: [] }, // Hide join table info
      },
    ],
  });

  if (!patient) throw new Error('Patient not found');

  return patient.Doctors;
};


exports.removeDoctorFromPatient = async (mappingId) => {
  if (!mappingId) throw new Error('Mapping ID is required');

  const mapping = await Mapping.findByPk(mappingId);
  if (!mapping) throw new Error('Mapping not found');

  await mapping.destroy();
  return;
};
