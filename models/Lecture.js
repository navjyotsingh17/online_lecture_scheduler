const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
});

module.exports = mongoose.model('Lecture', lectureSchema);