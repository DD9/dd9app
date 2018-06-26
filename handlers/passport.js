const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(User.createStrategy()); // We can do that because we added the passport plugin in User.js

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());