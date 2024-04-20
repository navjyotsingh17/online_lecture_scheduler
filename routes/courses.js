const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// GET /api/courses
// Get a list of all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/courses
// Create a new course
router.post('/create', async (req, res) => {
  const { name, level, description, image } = req.body;

  try {
    const newCourse = new Course({ name, level, description, image });
    const course = await newCourse.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/courses/:id
// Update a course
router.put('/update/:id', async (req, res) => {
  const { name, level, description, image } = req.body;
  const { id } = req.params;

  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { name, level, description, image },
      { new: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(updatedCourse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/courses/:id
// Delete a course
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
