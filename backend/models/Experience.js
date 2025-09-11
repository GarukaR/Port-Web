const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['internship', 'full-time', 'contract', 'freelance', 'volunteer'],
    default: 'internship'
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  current: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    required: true
  },
  achievements: [{
    type: String
  }],
  technologies: [{
    type: String
  }],
  order: {
    type: Number,
    default: 0
  },
  visible: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Experience', experienceSchema);