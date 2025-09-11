const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  longDescription: {
    type: String,
    default: ""
  },
  technologies: [{
    type: String,
    required: true
  }],
  type: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['completed', 'ongoing', 'planned'],
    default: 'completed'
  },
  achievements: [{
    type: String
  }],
  image: {
    type: String,
    required: true
  },
  links: {
    github: {
      type: String,
      default: ""
    },
    live: {
      type: String,
      default: ""
    },
    demo: {
      type: String,
      default: ""
    }
  },
  featured: {
    type: Boolean,
    default: false
  },
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

module.exports = mongoose.model('Project', projectSchema);