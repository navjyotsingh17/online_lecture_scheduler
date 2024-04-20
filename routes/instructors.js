const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Instructor = require('../models/Users');

// GET /api/instructors
// Get a list of all instructors
router.get('/', async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.json(instructors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/instructors
// Create a new instructor
// Create route
router.post('/create', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new instructor with the hashed password and role
    const newInstructor = new Instructor({ name, email, password: hashedPassword, role });
    const instructor = await newInstructor.save();
    res.status(201).json(instructor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// PUT /api/instructors/:id
// Update an instructor
router.put('/update/:id', async (req, res) => {
    const { name, email, password } = req.body;
    const { id } = req.params;
  
    try {
      const updatedInstructor = await Instructor.findByIdAndUpdate(
        id,
        { name, email, password },
        { new: true }
      );
      if (!updatedInstructor) {
        return res.status(404).json({ error: 'Instructor not found' });
      }
      res.json(updatedInstructor);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // DELETE /api/instructors/:id
// Delete an instructor
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedInstructor = await Instructor.findByIdAndDelete(id);
      if (!deletedInstructor) {
        return res.status(404).json({ error: 'Instructor not found' });
      }
      res.json({ message: 'Instructor deleted successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  module.exports = router;