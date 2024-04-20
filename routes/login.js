const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/Users');
const router = express.Router();
require('dotenv').config(); 

const app = express();

app.use(express.json());

// Login route
router.post('/', async (req, res) => {
  const { name, password } = req.body;

  // Find user by name
  const user = await User.findOne({ name });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  // User authenticated, generate token
  const token = jwt.sign(
    { userId: user._id, name: user.name, isAdmin: user.isAdmin },
    process.env.SECRET_KEY, // Replace with your own secret key
    { expiresIn: '1h' } // Token expiration time
  );

  res.json({ token, role:user.role });
});

module.exports = router;


