const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token required' });
  }

  try {
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    req.user = user;
    next();

  } catch (error) {
    return res.status(500).json({ message: 'Error authenticating token' });
  }
};

const generateToken = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = Math.random().toString(36).substring(2);

    user.token = token;
    await user.save();

    return res.status(200).json({ token });

  } catch (error) {
    return res.status(500).json({ message: 'Error generating token' });
  }
};

module.exports = {
  authenticateToken,
  generateToken,
};