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

router.get('/user/all', authController.isLoggedIn, authController.isAdmin, catchErrors(userController.all));
router.post('/api/v1/user/:id/edit', authController.isLoggedIn, authController.isAdmin, catchErrors(userController.edit));

router.get('/company/all', authController.isLoggedIn, authController.isAdmin, catchErrors(companyController.all));
router.get('/company/:id', authController.isLoggedIn, authController.isAdmin, catchErrors(companyController.getById));
router.post('/company/create', authController.isLoggedIn, authController.isAdmin, catchErrors(companyController.create));
router.post('/company/:id/edit', authController.isLoggedIn, authController.isAdmin, catchErrors(companyController.edit));
router.post('/company/:id/activate', authController.isLoggedIn, authController.isAdmin, catchErrors(companyController.activate));
router.post('/company/:id/deactivate', authController.isLoggedIn, authController.isAdmin, catchErrors(companyController.deactivate));

router.get('/hourLog/all', authController.isLoggedIn, authController.isAdmin, catchErrors(hourLogController.all));
router.get('/hourLog/:id', authController.isLoggedIn, authController.isAdmin, catchErrors(hourLogController.one));
router.post('/hourLog/:id/open', authController.isLoggedIn, authController.isAdmin, catchErrors(hourLogController.open));
router.post('/hourLog/:id/close', authController.isLoggedIn, authController.isAdmin, catchErrors(hourLogController.close));
router.get('/api/v1/hourLog/:id/timeEntries', authController.isLoggedIn, authController.isAdmin, catchErrors(hourLogController.timeEntries));

router.get('/timeEntry/new', authController.isLoggedIn, catchErrors(timeEntryController.new));
router.post('/api/v1/timeEntry/create', authController.isLoggedIn, catchErrors(timeEntryController.create));
router.post('/api/v1/timeEntry/createAndSubmit', authController.isLoggedIn, catchErrors(timeEntryController.createAndSubmit));
router.get('/api/v1/timeEntry/:id/approve', authController.isLoggedIn, catchErrors(timeEntryController.approve));
router.get('/api/v1/timeEntry/:id/hide', authController.isLoggedIn, catchErrors(timeEntryController.hide));
router.get('/api/v1/timeEntry/:id/submit', authController.isLoggedIn, catchErrors(timeEntryController.submit));
router.get('/api/v1/timeEntry/:id/delete', authController.isLoggedIn, catchErrors(timeEntryController.delete));

module.exports = router;
