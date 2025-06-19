const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define('Mapping', {
    PatientId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    DoctorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
