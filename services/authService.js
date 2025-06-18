const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ValidationError, AuthenticationError } = require('../utils/errors');

exports.registerUser = async (name, email, password) => {
  // Input validation
  if (!name || !email || !password) {
    throw new ValidationError('All fields are required');
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ValidationError('Invalid email format');
  }

  // Check if user exists
  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    throw new AuthenticationError('User already exists');
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // Omit password from returned user object
    const userWithoutPassword = user.get({ plain: true });
    delete userWithoutPassword.password;

    return userWithoutPassword;
  } catch (error) {
    throw new Error('Failed to register user');
  }
};

exports.loginUser = async (email, password) => {
 

  try {
    // Find user with email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AuthenticationError('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email,
        role: user.role // Include role if your user model has it
      }, 
      process.env.JWT_SECRET, 
      {
        expiresIn: '1d',
      }
    );

    // Return token and basic user info (without password)
    return { 
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  } catch (error) {
    if (error instanceof ValidationError || error instanceof AuthenticationError) {
      throw error;
    }
    throw new Error('Login failed');
  }
};