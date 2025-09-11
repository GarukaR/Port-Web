const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "Garuka Ranasinghe"
  },
  title: {
    type: String,
    required: true,
    default: "Full-stack Developer"
  },
  tagline: {
    type: String,
    required: true,
    default: "Full-stack developer with experience in the digital era"
  },
  bio: {
    type: String,
    required: true,
    default: "I'm Garuka, bringing fresh perspectives and modern solutions to complex technical challenges. From AI-powered healthcare systems to performance optimization, I help businesses turn ideas into reality."
  },
  detailedBio: {
    type: String,
    default: "I'm Garuka, a full-stack developer who genuinely cares about building solutions that work—and keep working. Currently pursuing my Bachelor's in IT while gaining real-world experience at Meta61 and Diagonal Horizon."
  },
  location: {
    type: String,
    required: true,
    default: "Melbourne, VIC, Australia"
  },
  email: {
    type: String,
    required: true,
    default: "garukar9895@gmail.com"
  },
  phone: {
    type: String,
    required: true,
    default: "+61 451 698 959"
  },
  social: {
    github: {
      type: String,
      default: "https://github.com/garuka-ranasinghe"
    },
    linkedin: {
      type: String, 
      default: "https://linkedin.com/in/garuka-ranasinghe"
    },
    website: {
      type: String,
      default: ""
    }
  },
  availability: {
    status: {
      type: String,
      enum: ['available', 'busy', 'unavailable'],
      default: 'available'
    },
    message: {
      type: String,
      default: "Available for hire"
    }
  },
  images: {
    professional: {
      type: String,
      default: "https://customer-assets.emergentagent.com/job_sleek-webfolio-1/artifacts/y15wcysh_2.jpeg"
    },
    casual: {
      type: String,
      default: "https://customer-assets.emergentagent.com/job_sleek-webfolio-1/artifacts/ttz1vdxk_Gemini_Generated_Image_yf9qajyf9qajyf9q.png"
    }
  },
  resume: {
    type: String,
    default: ""
  },
  stats: {
    yearsOfCoding: {
      type: Number,
      default: 7
    },
    projectsCompleted: {
      type: Number,
      default: 15
    },
    cupsOfCoffee: {
      type: Number,
      default: 2847
    },
    academicAverage: {
      type: Number,
      default: 80
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);