const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('User');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

/**
  Use the GoogleStrategy within Passport.
  Strategies in Passport require a `verify` function, which accept
  credentials (in this case, an accessToken, refreshToken, and Google
  profile), and invoke a callback with a user object.
*/

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
  proxy: true,
},
// Do after successful Google authentication
(accessToken, refreshToken, profile, done) => {
  const googleEmail = profile.emails[0].value;
  const googleFirstName = profile.name.givenName;
  const googleLastName = profile.name.familyName;

  async function login() {
    console.log('logging in');

    const existingUser = await User.findOne({ email: googleEmail });

    console.log(existingUser);

    if (existingUser) {
      return done(null, existingUser);
    }

    const user = await new User(
      {
        email: googleEmail,
        firstName: googleFirstName,
        lastName: googleLastName,
        lastSignInAt: Date.now(),
      },
    ).save();

    done(null, user);
  }

  const emailDomain = googleEmail.split('@')[1];
  if (emailDomain === 'dd9.com') {
    login();
  } else if (emailDomain === 'designdivine.com') {
    login();
  } else {
    return done();
  }
}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
