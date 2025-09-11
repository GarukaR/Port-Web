const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const ADMIN_EMAIL = 'garukar9895@gmail.com'; // Only this email can access admin

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  // Check if this is the admin email
  const email = profile.emails[0].value;
  
  if (email === ADMIN_EMAIL) {
    const user = {
      id: profile.id,
      email: email,
      name: profile.displayName,
      photo: profile.photos[0].value,
      isAdmin: true
    };
    return done(null, user);
  } else {
    return done(null, false, { message: 'Unauthorized email' });
  }
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;