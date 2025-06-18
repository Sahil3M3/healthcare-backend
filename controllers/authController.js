const authService = require('../services/authService');
const { ValidationError, AuthenticationError } = require('../utils/errors');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await authService.registerUser(name, email, password);
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
     // Input validation
  if (!email || !password) {
    throw new ValidationError('Email and password are required');
  }
    const { token } = await authService.loginUser(email, password);
    res.status(200).json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
