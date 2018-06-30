const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const gatewayController = require('../controllers/gatewayController');
const { catchErrors } = require('../handlers/errorHandlers'); // Object destructuring, import single method from a module (file), catchErrors wraps async functions

router.get('/', authController.loginForm);
router.get('/auth/login', authController.loginForm);
router.get('/auth/logout', authController.logout);
router.get('/auth/google', authController.googleAuth);
router.get('/auth/google/callback', authController.googleAuthRedirect);

router.get('/auth/gatewa', authController.isLoggedIn, gatewayController.filter);
router.get('/auth/gateway/user', authController.isLoggedIn, gatewayController.user);
router.get('/auth/gateway/company', authController.isLoggedIn, catchErrors(gatewayController.company));

module.exports = router;
