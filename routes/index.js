const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const companyController = require('../controllers/companyController');
const hourLogController = require('../controllers/hourLogController');
const timeEntryController = require('../controllers/timeEntryController');
const { catchErrors } = require('../handlers/errorHandlers'); // Object destructuring, import single method from a module (file), catchErrors wraps async functions

router.get('/', authController.filter);

router.get('/auth/login', authController.isNotLoggedIn, authController.loginForm);
router.get('/auth/logout', authController.logout);
router.get('/auth/google', authController.googleAuth);
router.get('/auth/google/callback', authController.googleAuthRedirect);

router.get('/users', authController.isLoggedIn, authController.isAdmin, catchErrors(userController.users));

router.get('/companies/:id', authController.isLoggedIn, authController.isAdmin, catchErrors(companyController.getCompanyById));

router.get('/hourLogs/all', authController.isLoggedIn, authController.isAdmin, catchErrors(hourLogController.all));

router.get('/timeEntries/new', authController.isLoggedIn, catchErrors(timeEntryController.new));

module.exports = router;
