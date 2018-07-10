const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const hourLogController = require('../controllers/hourLogController');
const timeEntryController = require('../controllers/timeEntryController');
const { catchErrors } = require('../handlers/errorHandlers'); // Object destructuring, import single method from a module (file), catchErrors wraps async functions

router.get('/', authController.filter);
router.get('/auth/login', authController.isNotLoggedIn, authController.loginForm);
router.get('/auth/logout', authController.logout);
router.get('/auth/google', authController.googleAuth);
router.get('/auth/google/callback', authController.googleAuthRedirect);

router.get('/hourLog/all', authController.isLoggedIn, authController.isAdmin, catchErrors(hourLogController.all));
router.get('/timeEntry/new', authController.isLoggedIn, catchErrors(timeEntryController.new));

module.exports = router;
