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
    callbackURL: process.env.DOMAIN + "/auth/google/callback"
  },
  // Do after successful Google authentication
  function(accessToken, refreshToken, profile, done) {

    const googleEmail = profile.emails[0].value;
    const googleFirstName = profile.name.givenName;
    const googleLastName = profile.name.familyName;

    const emailDomain = googleEmail.split("@")[1];
    if (emailDomain !== "dd9.com") {
      return done();
    }

    User.findOrCreate(
      { email: googleEmail },
      { firstName: googleFirstName,
        lastName: googleLastName,
        lastSignInAt: Date.now(),
        $inc: { signInCount : 1 }
        },
      function (err, user) {return done(err, user);
    });
  }
));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());