const mongoose = require('mongoose');
const User = mongoose.model('User'); // Already imported in start.js
const promisify = require('es6-promisify');

exports.loginForm = (req, res) => {
  res.render('auth/login', { title: 'Login Form' });
};

exports.registerForm = (req, res) => {
  res.render('auth/register', { title: 'Register' });
};

// Complimentary client side check
exports.validateRegister = (req, res, next) => { // Next needed because this is middleware
  req.sanitizeBody('name'); // Imported in app.js, expressValidator applied to all requests
  req.checkBody('name', 'You must supply a name').notEmpty(); // Check the JSON that's being passed in the req
  req.checkBody('email', 'That email is not valid').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    removeExtension: false,
    gmail_remove_subaddress: false
  });
  req.checkBody('password', 'Password cannot be blank').notEmpty();
  req.checkBody('password-confirm', 'Password-confirm cannot be blank').notEmpty();
  req.checkBody('password-confirm', 'Oops! Your passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.render('auth/register', { title: 'Register', body: req.body, flashes: req.flash() }) // Manually pass flashes
    return; // Stop the function from running
  }
  next(); // There were no errors
};

exports.register = async (req, res, next) => { // The end of the road is not register it's logging the user in
  const user = new User({ email: req.body.email, name: req.body.name });
  const register = promisify(User.register, User); // Passport plugin method, promisify the old callbackified implementation that the library uses
  await register(user, req.body.password);  // Store a hash
  next(); // Pass to authController.login
};

exports.account = (req, res) => {
  res.render('auth/account', {title: 'Edit your account'});
};

exports.updateAccount = async (req, res) => {
  const updates = {
    name: req.body.name,
    email: req.body.email
  };

  const user = await User.findOneAndUpdate(
    { _id: req.user._id }, // Query
    { $set: updates }, // Update
    { new: true, runValidators: true, context: 'query' } // Options
  );

  req.flash('success', 'Account update successful');
  res.redirect('back');
};