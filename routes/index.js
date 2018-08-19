const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const companyController = require('../controllers/companyController');
const hourLogController = require('../controllers/hourLogController');
const timeEntryController = require('../controllers/timeEntryController');
const { catchErrors } = require('../handlers/errorHandlers'); // Object destructuring, import single method from a module (file), catchErrors wraps async functions

// Home endpoint
router.get('/', authController.filter);

// Authentication endpoints
router.get('/auth/login', authController.isNotLoggedIn, authController.loginForm);
router.get('/auth/logout', authController.logout);
router.get('/auth/google', authController.googleAuth);
router.get('/auth/google/callback', authController.googleAuthRedirect);

// User endpoints
router.get('/user/all', authController.isLoggedIn, authController.isAdmin, catchErrors(userController.all));
router.get('/user/one/:id', authController.isLoggedIn, authController.isOwner, catchErrors(userController.one));
router.post('/user/edit', authController.isLoggedIn, catchErrors(userController.edit));
router.post('/api/v1/user/:id/edit/admin', authController.isLoggedIn, authController.isAdmin, catchErrors(userController.editAdmin));

// Company endpoints
router.get('/company/all', authController.isLoggedIn, authController.isAdmin, catchErrors(companyController.all));
router.get('/company/:id', authController.isLoggedIn, authController.isAdmin, catchErrors(companyController.one));
router.post('/company/create', authController.isLoggedIn, authController.isAdmin, catchErrors(companyController.create));
router.post('/company/:id/edit', authController.isLoggedIn, authController.isAdmin, catchErrors(companyController.edit));
router.post('/company/:id/activate', authController.isLoggedIn, authController.isAdmin, catchErrors(companyController.activate));
router.post('/company/:id/deactivate', authController.isLoggedIn, authController.isAdmin, catchErrors(companyController.deactivate));

// HourLog endpoints
router.get('/hourLog/all', authController.isLoggedIn, authController.isAdmin, catchErrors(hourLogController.all));
router.get('/hourLog/:id', authController.isLoggedIn, authController.isAdmin, catchErrors(hourLogController.one));
router.post('/hourLog/:id/open', authController.isLoggedIn, authController.isAdmin, catchErrors(hourLogController.open));
router.post('/hourLog/:id/close', authController.isLoggedIn, authController.isAdmin, catchErrors(hourLogController.close));

// TimeEntry get and create endpoints
router.get('/timeEntry/new', authController.isLoggedIn, catchErrors(timeEntryController.new));
router.post('/api/v1/timeEntry/create', authController.isLoggedIn, catchErrors(timeEntryController.create));
router.post('/api/v1/timeEntry/createAndSubmit', authController.isLoggedIn, catchErrors(timeEntryController.createAndSubmit));

// Dual purpose TimeEntry endpoints
router.post('/api/v1/timeEntry/:id/edit', authController.isLoggedIn, catchErrors(timeEntryController.edit));
router.post('/api/v1/timeEntry/:id/approve', authController.isLoggedIn, authController.isAdmin, catchErrors(timeEntryController.approve));
router.post('/api/v1/timeEntry/:id/hide', authController.isLoggedIn, authController.isAdmin, catchErrors(timeEntryController.hide));
router.post('/api/v1/timeEntry/:id/reject', authController.isLoggedIn, authController.isAdmin, catchErrors(timeEntryController.reject));
router.post('/api/v1/timeEntry/:id/submit', authController.isLoggedIn, catchErrors(timeEntryController.submit));
router.post('/api/v1/timeEntry/:id/delete', authController.isLoggedIn, catchErrors(timeEntryController.delete));

// timeEntry/new 'all' action endpoints
router.post('/api/v1/timeEntry/newTimeEntries/approveAll/:action', authController.isLoggedIn, authController.isAdmin, catchErrors(timeEntryController.allActionsFromNewTimeEntries));
router.post('/api/v1/timeEntry/newTimeEntries/hideAll/:action', authController.isLoggedIn, authController.isAdmin, catchErrors(timeEntryController.allActionsFromNewTimeEntries));
router.post('/api/v1/timeEntry/newTimeEntries/submitAll/:action', authController.isLoggedIn, catchErrors(timeEntryController.allActionsFromNewTimeEntries));
router.post('/api/v1/timeEntry/newTimeEntries/deleteAll/:action', authController.isLoggedIn, catchErrors(timeEntryController.allActionsFromNewTimeEntries));

// hourLog/one 'all' action endpoints for submitted timeEntries
router.post('/api/v1/timeEntry/hourLog/:id/approveAll/submitted/:status', authController.isLoggedIn, authController.isAdmin, catchErrors(timeEntryController.submittedAllActionsFromHourLog));
router.post('/api/v1/timeEntry/hourLog/:id/hideAll/submitted/:status', authController.isLoggedIn, authController.isAdmin, catchErrors(timeEntryController.submittedAllActionsFromHourLog));
router.post('/api/v1/timeEntry/hourLog/:id/rejectAll/submitted/:status', authController.isLoggedIn, authController.isAdmin, catchErrors(timeEntryController.submittedAllActionsFromHourLog));

module.exports = router;
