const doctorService = require('../services/doctorService');
const { ValidationError, NotFoundError, ConflictError } = require('../utils/errors');

exports.addDoctor = async (req, res, next) => {
  try {
    // Validate request body exists
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new ValidationError('Request body cannot be empty');
    }

    const doctor = await doctorService.createDoctor(req.body);
    res.status(201).json({
      success: true,
      data: doctor,
      message: 'Doctor created successfully'
    });
  } catch (error) {
    // Map specific service errors to appropriate HTTP status codes
    if (error instanceof ValidationError) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }
    if (error instanceof ConflictError) {
      return res.status(409).json({
        success: false,
        error: error.message
      });
    }
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

exports.getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await doctorService.getAllDoctors();
    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch doctors'
    });
  }
};

exports.getDoctor = async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new ValidationError('Doctor ID is required');
    }

    const doctor = await doctorService.getDoctorById(req.params.id);
    res.status(200).json({
      success: true,
      data: doctor
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }
    if (error instanceof NotFoundError) {
      return res.status(404).json({
        success: false,
        error: error.message
      });
    }
    res.status(500).json({
      success: false,
      error: 'Failed to fetch doctor'
    });
  }
};

exports.updateDoctor = async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new ValidationError('Doctor ID is required');
    }
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new ValidationError('Update data cannot be empty');
    }

    const updatedDoctor = await doctorService.updateDoctor(req.params.id, req.body);
    res.status(200).json({
      success: true,
      data: updatedDoctor,
      message: 'Doctor updated successfully'
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }
    if (error instanceof NotFoundError) {
      return res.status(404).json({
        success: false,
        error: error.message
      });
    }
    if (error instanceof ConflictError) {
      return res.status(409).json({
        success: false,
        error: error.message
      });
    }
    res.status(500).json({
      success: false,
      error: 'Failed to update doctor'
    });
  }
};

exports.deleteDoctor = async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new ValidationError('Doctor ID is required');
    }

    await doctorService.deleteDoctor(req.params.id);
    res.status(200).json({
      success: true,
      data: null,
      message: 'Doctor deleted successfully'
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }
    if (error instanceof NotFoundError) {
      return res.status(404).json({
        success: false,
        error: error.message
      });
    }
    res.status(500).json({
      success: false,
      error: 'Failed to delete doctor'
    });
  }
};