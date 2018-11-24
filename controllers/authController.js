const passport = require('passport');

exports.localAuth = passport.authenticate('local', {
  successRedirect: '/timeEntry/new',
  failureRedirect: '/login',
});

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
  failureRedirect: '/login',
});

exports.currentUser = (req, res) => {
  res.send(req.user);
};

exports.logout = (req, res) => {
  req.logout();
  res.send('You are now logged out');
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send('Oops, you must be logged in to do that');
};

exports.requireLogin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.send('Oops, You are already logged in');
};

exports.isOwner = (req, res, next) => {
  if (req.params.id === req.user._id.toString() || req.user.permissions[0].admin) {
    return next();
  }
  res.send('Oops, you are not the owner of that entity');
};

exports.isAdmin = (req, res, next) => {
  const isAdmin = req.user.permissions[0].admin;
  if (isAdmin) {
    return next();
  }
  res.send('Oops, you must be an admin to do that');
};
