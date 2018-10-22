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
  res.send('You are now logged out');
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('danger', 'Oops, you must be logged in to do that');
  res.send('Oops, you must be logged in to do that');
};

exports.requireLogin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  req.flash('warning', 'Oops, You are already logged in');
  res.send('Oops, You are already logged in');
};

exports.isOwner = (req, res, next) => {
  if (req.params.id === req.user._id.toString() || req.user.permissions[0].admin) {
    return next();
  }
  req.flash('warning', 'Oops, you are not the owner of that entity');
  res.send('Oops, you are not the owner of that entity');
};

exports.isAdmin = (req, res, next) => {
  const isAdmin = req.user.permissions[0].admin;
  if (isAdmin) {
    return next();
  }
  req.flash('warning', 'Oops, you must be an admin to do that');
  res.send('Oops, you must be an admin to do that');
};
