const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const Project = require('../models/Project');
const Experience = require('../models/Experience');
const Skill = require('../models/Skill');
const Education = require('../models/Education');
const { sendContactNotification, sendAutoReply } = require('../services/emailService');

// Get profile information
router.get('/profile', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    
    // Create default profile if none exists
    if (!profile) {
      profile = new Profile();
      await profile.save();
    }
    
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all visible projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find({ visible: true })
      .sort({ featured: -1, order: 1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all visible experience
router.get('/experience', async (req, res) => {
  try {
    const experience = await Experience.find({ visible: true })
      .sort({ order: 1, startDate: -1 });
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all visible skills
router.get('/skills', async (req, res) => {
  try {
    const skills = await Skill.find({ visible: true })
      .sort({ order: 1, createdAt: 1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all visible education
router.get('/education', async (req, res) => {
  try {
    const education = await Education.find({ visible: true })
      .sort({ order: 1, startDate: -1 });
    res.json(education);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Contact form submission
router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    const contactData = { name, email, subject, message };
    
    try {
      // Send notification email to you
      await sendContactNotification(contactData);
      console.log('✅ Contact notification sent for:', name, email);
      
      // Send auto-reply to the contact person (non-blocking)
      sendAutoReply(contactData).catch(error => {
        console.error('⚠️ Auto-reply failed but main notification succeeded:', error);
      });
      
      res.json({ 
        message: 'Thank you for your message! I\'ll get back to you soon.',
        success: true 
      });
      
    } catch (emailError) {
      console.error('❌ Failed to send email notification:', emailError);
      
      // Still log the contact for manual follow-up
      console.log('📝 MANUAL FOLLOW-UP NEEDED - Contact form submission:', { name, email, subject, message });
      
      // Return error to user
      res.status(500).json({ 
        message: 'There was an issue sending your message. Please try again or contact me directly at garukar9895@gmail.com',
        success: false 
      });
    }
    
  } catch (error) {
    console.error('❌ Contact form error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.', error: error.message });
  }
});

module.exports = router;