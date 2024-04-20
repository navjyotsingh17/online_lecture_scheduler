const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config(); 

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Middleware
app.use(express.json());
app.use(cors())

// Routes
const instructorRoutes = require('./routes/instructors');
const courseRoutes = require('./routes/courses');
const lectureRoutes = require('./routes/lectures');
const loginRoutes = require('./routes/login');
const adminRoutes = require('./routes/admin');

app.use('/api/instructors', instructorRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lectures', lectureRoutes);
app.use('/api/login',loginRoutes)
app.use('/api/admin',adminRoutes)

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}/api/instructors/`);
  console.log(`Server is running on port http://localhost:${port}/api/courses/`);
});