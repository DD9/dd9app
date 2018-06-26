const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const crypto = require('crypto');
const promisify = require('es6-promisify');
const mail = require('../handlers/mail');

exports.login = passport.authenticate('local', { // Local Passport strategy, not using Github auth or something
  failureRedirect: '/login',
  failureFlash: 'Failed Login!',
  successRedirect: '/',
  successFlash: 'Login Successful!'
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You are now logged out!');
  res.redirect('/');
};

exports.isLoggedIn = (req, res, next) => {
  // First, check if the user is authenticated
  if (req.isAuthenticated()) { // Passport puts methods like isAuthenticated() on all requests
    next();
    return;
  }
  req.flash('error', 'Oops, you must be logged in to do that');
  res.redirect('/login');
};

exports.forgot = async(req, res) => {
  // 1. See if a user with that email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    req.flash('error', 'A password reset has been mailed to you');
  }
  // 2. Set reset tokens and expiry on their account
  user.resetPasswordToken = crypto.randomBytes(20).toString('hex'); // Cryptographically secure random string
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
  await user.save();
  // 3. Send them an email with the token
  const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
  mail.send({
    user: user,
    subject: 'Password Reset',
    resetURL: resetURL,
    filename: 'password-reset'
  });
  req.flash('success', `You have been emailed a password reset link`);
  // 4. Redirect to login page
  res.redirect('/login');
};

exports.reset = async(req, res) => {
  // 1. Is there somebody with this token? Is this token not expired?
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() } // Look for expires field that has a value that is greater than right now
  });
  if (!user) {
    req.flash('error', 'Password reset is invalid or has expired');
    return res.redirect('/login');
  }
  // 2. If there is a user, show the reset password form
  res.render('reset', { title: 'Reset your Password' });
};

exports.confirmPasswords = (req, res, next) => {
  if (req.body.password === req.body['password-confirm']) { // Square brackets to handle dash in body param
    return next();
  }
  req.flash('error', 'Passwords do not match!');
  res.redirect('back');
};

exports.update = async (req, res) => {
  // 1. Find user and check reset not expired
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() } // Look for expires field that has a value that is greater than right now
  });
  if (!user) {
    req.flash('error', 'Password reset is invalid or has expired');
    return res.redirect('/login');
  }
  // 2. Update password
  const setPassword = promisify(user.setPassword, user); //Passport plugin method, promisify the old callbackified implementation that the library uses
  await setPassword(req.body.password);
  user.resetPasswordToken = undefined; // Queue up field removal
  user.resetPasswordExpires = undefined;
  const updatedUser = await user.save(); // Save changes
  await req.login(updatedUser); //Passport method added to all req's, pass the method a user and auto log him in
  req.flash('success', 'Your password has been reset!')
  res.redirect('/')
};