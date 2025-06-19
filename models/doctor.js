const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Doctor = sequelize.define('Doctor', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Doctor name cannot be empty'
        },
        len: {
          args: [2, 100],
          msg: 'Name must be between 2 and 100 characters'
        }
      }
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Specialization cannot be empty'
        }
      }
    },
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Contact number already exists'
      },
      validate: {
        notEmpty: {
          msg: 'Contact number cannot be empty'
        },
        is: {
          args: /^[\d\+\-\(\) ]+$/,
          msg: 'Invalid contact number format'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Email already exists'
      },
      validate: {
        isEmail: {
          msg: 'Please provide a valid email address'
        }
      }
    }
  }, {
    timestamps: false,
    paranoid: true, // Enable soft deletion
    indexes: [
      {
        unique: true,
        fields: ['contactNumber']
      },
      {
        unique: true,
        fields: ['email']
      }
    ]
  });

  return Doctor;
};