const { Patient } = require('../models');
const { ValidationError, NotFoundError,ConflictError } = require('../utils/errors');

exports.createPatient = async ( data) => {
  // Validate required fields
  const requiredFields = ['name', 'age', 'gender', 'contactNumber', 'address'];
  const missingFields = requiredFields.filter(field => !data[field]);
  
  if (missingFields.length > 0) {
    throw new ValidationError(`Missing required fields: ${missingFields.join(', ')}`);
  }
  try {
    return await Patient.create({ 
      ...data,
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new ConflictError('Contact number already exists');
    }
    if (error.name === 'SequelizeValidationError') {
      throw new ValidationError(error.errors.map(e => e.message).join(', '));
    }
    console.log(error);
    
    throw new Error('Failed to create patient');
  }
};

exports.getAllPatients = async () => {
    
  try {
    return await Patient.findAll({ 
      attributes: ['id', 'name', 'age', 'gender', 'contactNumber', 'address', 'medicalHistory']
    });
  } catch (error) {
    throw new Error('Failed to fetch patients');
  }
};

exports.getPatientById = async (id) => {
  if (!id) throw new ValidationError('Patient ID is required');

  try {
    const patient = await Patient.findOne({ 
      where: { 
        id,
      },
      attributes: ['id', 'name', 'age', 'gender', 'contactNumber', 'address', 'medicalHistory']
    });
    
    if (!patient) throw new NotFoundError('Patient not found');
    return patient;
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    throw new Error('Failed to fetch patient');
  }
};

exports.updatePatient = async (id, data) => {
  if (data.contactNumber) {
    const existingPatient = await Patient.findOne({
      where: {
        contactNumber: data.contactNumber,
      }
    });
    
    if (existingPatient) {
      throw new ConflictError('Contact number already in use by another patient');
    }
  }

  try {
    const patient = await Patient.findOne({ 
      where: { 
        id,
      }
    });
    
    if (!patient) throw new NotFoundError('Patient not found');
    return await patient.update(data);
  } catch (error) {
    if (error instanceof ConflictError) throw error;
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new ConflictError('Contact number already exists');
    }
    throw new Error('Failed to update patient');
  }
};

exports.deletePatient = async (id) => {
  if (!id) throw new ValidationError('Patient ID is required');

  try {
    const patient = await Patient.findOne({ 
      where: { 
        id,
      }
    });
    
    if (!patient) throw new NotFoundError('Patient not found');
    
    await patient.destroy();
    return { success: true, message: 'Patient deleted successfully' };
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    throw new Error('Failed to delete patient');
  }
};