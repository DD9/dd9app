const authController = require('../controllers/authController');
const timeEntryController = require('../controllers/timeEntryController');

module.exports = router => {
  router.get('/api/v1/timeEntries/created', authController.isLoggedIn, timeEntryController.created);
  router.post('/api/v1/timeEntry/create', authController.isLoggedIn, timeEntryController.create);
  router.post('/api/v1/timeEntry/createAndSubmit', authController.isLoggedIn, timeEntryController.createAndSubmit);

  // Dual purpose TimeEntry endpoints
  router.post('/api/v1/timeEntry/:id/edit', authController.isLoggedIn, timeEntryController.edit);
  router.post('/api/v1/timeEntry/:id/approve', authController.isLoggedIn, authController.isAdmin, timeEntryController.approve);
  router.post('/api/v1/timeEntry/:id/hide', authController.isLoggedIn, authController.isAdmin, timeEntryController.hide);
  router.post('/api/v1/timeEntry/:id/reject', authController.isLoggedIn, authController.isAdmin, timeEntryController.reject);
  router.post('/api/v1/timeEntry/:id/submit', authController.isLoggedIn, timeEntryController.submit);
  router.post('/api/v1/timeEntry/:id/delete', authController.isLoggedIn, timeEntryController.delete);

  // timeEntry/new 'all' action endpoints
  router.post('/api/v1/timeEntry/newTimeEntries/approveAll/:action', authController.isLoggedIn, authController.isAdmin, timeEntryController.allActionsFromNewTimeEntries);
  router.post('/api/v1/timeEntry/newTimeEntries/hideAll/:action', authController.isLoggedIn, authController.isAdmin, timeEntryController.allActionsFromNewTimeEntries);
  router.post('/api/v1/timeEntry/newTimeEntries/submitAll/:action', authController.isLoggedIn, timeEntryController.allActionsFromNewTimeEntries);
  router.post('/api/v1/timeEntry/newTimeEntries/deleteAll/:action', authController.isLoggedIn, timeEntryController.allActionsFromNewTimeEntries);

  // hourLog/one 'all' action endpoints for submitted timeEntries
  router.post('/api/v1/timeEntry/hourLog/:id/approveAll/submitted/:status', authController.isLoggedIn, authController.isAdmin, timeEntryController.submittedAllActionsFromHourLog);
  router.post('/api/v1/timeEntry/hourLog/:id/hideAll/submitted/:status', authController.isLoggedIn, authController.isAdmin, timeEntryController.submittedAllActionsFromHourLog);
  router.post('/api/v1/timeEntry/hourLog/:id/rejectAll/submitted/:status', authController.isLoggedIn, authController.isAdmin, timeEntryController.submittedAllActionsFromHourLog);
};
