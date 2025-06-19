const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Patient = sequelize.define('Patient', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Name cannot be empty'
        }
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'Age must be a positive number'
        },
        max: {
          args: [120],
          msg: 'Age must be reasonable (under 120)'
        }
      }
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'other'),
      allowNull: false
    },
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'unique_contactNumber',
        msg: 'Contact number already exists'
      },
      validate: {
        is: {
          args: /^[\d\+\-\(\) ]+$/, // Basic phone number validation
          msg: 'Invalid contact number format'
        }
      }
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    medicalHistory: {
      type: DataTypes.TEXT
    }
  }, {
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['contactNumber']
      }
    ]
  });

  return Patient;
};