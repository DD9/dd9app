const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.googleAuth = passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/plus.profile.emails.read',
    'https://www.googleapis.com/auth/plus.login'
  ],
  prompt: 'select_account',
  hd: 'dd9.com'
});

exports.googleAuthRedirect = passport.authenticate('google', {
  successRedirect: '/',
  successFlash: 'You are now logged in',
  failureRedirect: '/auth/login',
  failureFlash: 'Please login with a dd9.com or designdivine.com email'
});

exports.loginForm = (req, res) => {
  res.render('auth/login', { title: 'Login Form' });
};

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You are now logged out');
  res.redirect('/auth/login');
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('danger', 'Oops, you must be logged in to do that');
    res.redirect('/auth/login');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  } else {
    req.flash('warning', 'Oops, You are already logged in');
    res.redirect('/timeEntry/new');
  }
};

exports.isOwner = (req, res, next) => {
  if (req.params.id === req.user._id.toString()) {
    return next();
  } else {
    req.flash('warning', 'Oops, you are not the owner of that entity');
    res.redirect('/timeEntry/new');
  }
};

exports.isAdmin = (req, res, next) => {
  const isAdmin = req.user.permissions[0].admin;
  if (isAdmin) {
    return next();
  } else {
    req.flash('warning', 'Oops, you must be an admin to do that');
    res.redirect('/timeEntry/new');
  }
};

exports.filter = (req, res) => {
  if (req.isAuthenticated()) {
    const isAdmin = req.user.permissions[0].admin;
    if (isAdmin) {
      req.flash('success', `Welcome ${req.user.firstName} ${req.user.lastName}`);
      res.redirect('/hourLog/all');
    } else {
      req.flash('success', `Welcome ${req.user.firstName} ${req.user.lastName}`);
      res.redirect('/timeEntry/new');
    }
  } else {
    res.redirect('/auth/login');
  }
};