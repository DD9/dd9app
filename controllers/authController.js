const passport = require('passport');

exports.googleAuth = passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/plus.profile.emails.read',
    'https://www.googleapis.com/auth/plus.login',
  ],
  prompt: 'select_account',
  hd: 'dd9.com',
});

exports.googleAuthRedirect = passport.authenticate('google', {
  successRedirect: '/timeEntry/new',
  successFlash: 'You are now logged in',
  failureRedirect: '/login',
  failureFlash: 'Please login with a dd9.com or designdivine.com email',
});

exports.currentUser = (req, res) => {
  res.send(req.user);
};

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You are now logged out');
  res.send();
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('danger', 'Oops, you must be logged in to do that');
  res.redirect('/auth/login');
};

exports.requireLogin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  req.flash('warning', 'Oops, You are already logged in');
  res.send();
};

exports.isOwner = (req, res, next) => {
  if (req.params.id === req.user._id.toString()) {
    return next();
  }
  req.flash('warning', 'Oops, you are not the owner of that entity');
  res.send();
};

exports.isAdmin = (req, res, next) => {
  const isAdmin = req.user.permissions[0].admin;
  if (isAdmin) {
    return next();
  }
  req.flash('warning', 'Oops, you must be an admin to do that');
  res.send();
};
