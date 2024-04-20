const mongoose = require('mongoose');

const admin = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Ensure uniqueness of email addresses
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin'], // Define possible roles
    required: true
  }
});

const Admin = mongoose.model('Admin', admin);

module.exports = Admin;
