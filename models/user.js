// models/User.js
const { DataTypes } = require('sequelize');
const validator =require("validator")

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
   name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Name cannot be empty'
        },
        len: {
          args: [2, 50],
          msg: 'Name must be between 2 and 50 characters'
        },
        is: {
          args: /^[a-zA-Z\s'-]+$/i,
          msg: 'Name can only contain letters, spaces, hyphens, and apostrophes'
        }
      }
    },
        email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Email already in use'
      },
      validate: {
        isEmail: {
          msg: 'Please provide a valid email address'
        },
        notEmpty: {
          msg: 'Email cannot be empty'
        },
        isLowercase: true,
        customValidator(value) {
          if (!validator.isEmail(value)) {
            throw new Error('Invalid email format');
          }
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password cannot be empty'
        },
        len: {
          args: [8, 100],
          msg: 'Password must be between 8 and 100 characters'
        },
        isStrongPassword(value) {
          if (
            !validator.isStrongPassword(value, {
              minLength: 8,
              minLowercase: 1,
              minUppercase: 1,
              minNumbers: 1,
              minSymbols: 1
            })
          ) {
            throw new Error(
              'Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 symbol'
            );
          }
        }
      }
    },
    role: {
      type: DataTypes.ENUM('admin', 'staff'),
      defaultValue: 'staff',
      validate: {
        isIn: {
          args: [['admin', 'staff']],
          msg: 'Role must be either admin or staff'
        }
      }
    },
  }, {
    timestamps: false
  });

  return User;
};