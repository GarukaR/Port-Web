const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');

// Development mock login (remove in production)
router.post('/mock-login', (req, res) => {
  const { email } = req.body;
  
  // Only allow the admin email
  if (email !== 'garukar9895@gmail.com') {
    return res.status(401).json({ message: 'Unauthorized email' });
  }

  const token = jwt.sign(
    { 
      id: 'mock-user-id',
      email: email,
      name: 'Garuka Ranasinghe',
      isAdmin: true
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({ 
    token,
    user: {
      id: 'mock-user-id',
      email: email,
      name: 'Garuka Ranasinghe',
      isAdmin: true
    }
  });
});

// Google OAuth routes
router.get('/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/admin/login?error=auth_failed' }),
  (req, res) => {
    // Generate JWT token
    const token = jwt.sign(
      { 
        id: req.user.id, 
        email: req.user.email,
        name: req.user.name,
        isAdmin: req.user.isAdmin
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Redirect to admin dashboard with token
    res.redirect(`/admin/dashboard?token=${token}`);
  }
);

// Check authentication status
router.get('/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ 
      authenticated: true, 
      user: req.user 
    });
  } else {
    res.json({ authenticated: false });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Session destruction failed' });
      }
      res.json({ message: 'Logged out successfully' });
    });
  });
});

module.exports = router;