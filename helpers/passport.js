const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

/**
 Use the LocalStrategy within Passport.
*/

passport.use(User.createStrategy());

/**
  Use the GoogleStrategy within Passport.
*/

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
  proxy: true,
},

// Callback from successful Google authentication
(accessToken, refreshToken, profile, done) => {
  const googleEmail = profile.emails[0].value;
  const googleFirstName = profile.name.givenName;
  const googleLastName = profile.name.familyName;

  async function login() {
    const existingUser = await User.findOne({ email: googleEmail });

    if (existingUser) {
      await User.findOneAndUpdate({ email: googleEmail }, { lastLoginDate: Date.now() }).exec();
      return done(null, existingUser);
    }

    const user = await new User(
      {
        email: googleEmail,
        'name.first': googleFirstName,
        'name.last': googleLastName,
        lastLoginDate: Date.now(),
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
