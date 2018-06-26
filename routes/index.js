const express = require('express');
const router = express.Router();
const sampleController = require('../controllers/sampleController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers'); // Object destructuring, import single method from a module (file), catchErrors wraps async functions

router.get('/', sampleController.homePage);

router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/register', userController.registerForm);

// 1. Validate the registration data
// 2. Register the user
// 3. Log them in
router.post('/register',
  userController.validateRegister,
  userController.register,
  authController.login
);

router.get('/logout', authController.logout);

router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', catchErrors(userController.updateAccount));
router.post('/account/forgot', catchErrors(authController.forgot));
router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/account/reset/:token',
  authController.confirmPasswords,
  catchErrors(authController.update)
);

module.exports = router;