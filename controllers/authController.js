const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const crypto = require('crypto');
const promisify = require('es6-promisify');
const mail = require('../handlers/mail');

exports.googleAuth = passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/plus.profile.emails.read',
    'https://www.googleapis.com/auth/plus.login'
  ],
  prompt: 'select_account',
  hd: 'dd9.com'
});

exports.googleAuthRedirect = passport.authenticate('google', {
    failureRedirect: '/auth/login',
    failureFlash: 'Please login with a dd9.com email',
    successRedirect: '/auth/gateway',
});

exports.loginForm = (req, res) => {
  res.render('auth/login', { title: 'Login Form' });
};

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You are now logged out!');
  res.redirect('/auth/login');
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  req.flash('error', 'Oops, you must be logged in to do that');
  res.redirect('/auth/login');
};