const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const AdminUser = require('../models/Admin'); // Assuming you have a model for admin users

// POST endpoint to create an admin user
router.post('/create', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the required fields are provided
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'Name, email, password, and role are required' });
    }

    // Check if the email is already in use
    const existingUser = await AdminUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the admin user
    const adminUser = new AdminUser({
      name,
      email,
      password: hashedPassword,
      role
    });

    // Save the admin user to the database
    await adminUser.save();

    res.status(201).json({ message: 'Admin user created successfully' });
  } catch (error) {
    console.error('Error creating admin user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
