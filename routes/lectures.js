const express = require("express");
const router = express.Router();
const Lecture = require("../models/Lecture");
const User = require("../models/Users");

// POST /api/lectures/assign
// Assign a lecture to an instructor for a particular day and time
router.post("/assign", async (req, res) => {
  const { courseId, instructorId, startTime, endTime } = req.body;

  try {
    // Check if the instructor already has a lecture scheduled during the specified time
    const existingLecture = await Lecture.findOne({
      instructor: instructorId,
      $or: [
        { startDate: { $lte: startTime }, endDate: { $gte: startTime } },
        { startDate: { $lte: endTime }, endDate: { $gte: endTime } },
        { startDate: { $gte: startTime }, endDate: { $lte: endTime } },
      ],
    });

    if (existingLecture) {
      return res
        .status(400)
        .json({
          error: "Instructor already has a lecture scheduled during this time",
        });
    }

    // Create a new lecture
    const newLecture = new Lecture({
      startDate: startTime,
      endDate: endTime,
      instructor: instructorId,
      course: courseId,
    });

    const lecture = await newLecture.save();
    res.status(201).json(lecture);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/lectures
// Get all lectures assigned to all instructors
router.get('/', async (req, res) => {
  try {
    const lectures = await Lecture.find().populate('instructor').populate('course');
    res.json(lectures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:instructorName', async (req, res) => {
  try {
    const { instructorName } = req.params;
    
    // Find the instructor document by name
    const instructor = await User.findOne({ name: instructorName });
    if (!instructor) {
      return res.status(404).json({ error: 'Instructor not found' });
    }
    
    // Fetch lectures for the found instructor
    const lectures = await Lecture.find({ instructor: instructor._id }).populate('instructor').populate('course');
    res.json(lectures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
