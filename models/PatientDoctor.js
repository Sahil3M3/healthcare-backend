// models/PatientDoctor.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const PatientDoctor = sequelize.define('PatientDoctor', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    assignmentDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    notes: {
      type: DataTypes.TEXT
    }
  }, {
    timestamps: false
  });

  return PatientDoctor;
};