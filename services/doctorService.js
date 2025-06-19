const { Doctor } = require('../models');
const { ValidationError, NotFoundError, ConflictError } = require('../utils/errors');

exports.createDoctor = async (doctorData) => {
  // Validate required fields
  if (!doctorData || typeof doctorData !== 'object') {
    throw new ValidationError('Invalid doctor data');
  }

  const requiredFields = ['name', 'specialization', 'contactNumber'];
  const missingFields = requiredFields.filter(field => !doctorData[field]);
  
  if (missingFields.length > 0) {
    throw new ValidationError(`Missing required fields: ${missingFields.join(', ')}`);
  }

  // Validate email format if provided
  if (doctorData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(doctorData.email)) {
    throw new ValidationError('Invalid email format');
  }

  try {
    return await Doctor.create(doctorData);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      const field = error.errors[0].path;
      throw new ConflictError(`${field} already exists`);
    }
    if (error.name === 'SequelizeValidationError') {
      throw new ValidationError(error.errors.map(e => e.message).join(', '));
    }
    throw new Error('Failed to create doctor');
  }
};

exports.getAllDoctors = async () => {
  try {
    return await Doctor.findAll({
      attributes: ['id', 'name', 'specialization', 'contactNumber', 'email'],
      order: [['name', 'ASC']]
    });
  } catch (error) {
    throw new Error('Failed to fetch doctors');
  }
};

exports.getDoctorById = async (id) => {
  if (!id) throw new ValidationError('Doctor ID is required');

  try {
    const doctor = await Doctor.findByPk(id, {
      attributes: ['id', 'name', 'specialization', 'contactNumber', 'email']
    });
    
    if (!doctor) throw new NotFoundError('Doctor not found');
    return doctor;
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    throw new Error('Failed to fetch doctor');
  }
};

exports.updateDoctor = async (id, updateData) => {
    
    if (!id) throw new ValidationError('Doctor ID is required');
    if (!updateData || Object.keys(updateData).length === 0) {
        throw new ValidationError('No update data provided');
    }

  // Validate email format if provided
  if (updateData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updateData.email)) {
    throw new ValidationError('Invalid email format');
  }

  try {
    // Check for existing contactNumber or email
    if (updateData.contactNumber || updateData.email) {
      const where = { id };
      if (updateData.contactNumber) where.contactNumber = updateData.contactNumber;
      if (updateData.email) where.email = updateData.email;

      
      const existing = await Doctor.findOne({ where });
      if (existing) {
        const field = updateData.contactNumber ? 'contactNumber' : 'email';
        throw new ConflictError(`${field} already exists`);
      }
    }

    const doctor = await Doctor.findByPk(id);
    if (!doctor) throw new NotFoundError('Doctor not found');
    
    return await doctor.update(updateData);
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof ConflictError) {
      throw error;
    }
    throw new Error('Failed to update doctor');
  }
};

exports.deleteDoctor = async (id) => {
  if (!id) throw new ValidationError('Doctor ID is required');

  try {
    const doctor = await Doctor.findByPk(id);
    if (!doctor) throw new NotFoundError('Doctor not found');
    
    await doctor.destroy();
    return { success: true, message: 'Doctor deleted successfully' };
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    throw new Error('Failed to delete doctor');
  }
};