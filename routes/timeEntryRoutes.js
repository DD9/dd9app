const authController = require('../controllers/authController');
const timeEntryController = require('../controllers/timeEntryController');

module.exports = router => {
  // Standard timeEntry endpoints
  router.get('/api/v1/timeEntries/created', authController.isLoggedIn, timeEntryController.created);
  router.post('/api/v1/timeEntry/create', authController.isLoggedIn, timeEntryController.create);
  router.post('/api/v1/timeEntry/createAndSubmit', authController.isLoggedIn, authController.isAdmin, timeEntryController.createAndSubmit);
  router.post('/api/v1/timeEntry/:id/edit', authController.isLoggedIn, timeEntryController.edit);
  router.post('/api/v1/timeEntry/:id/adjudicate', authController.isLoggedIn, authController.isAdmin, timeEntryController.adjudicate);
  router.post('/api/v1/timeEntry/:id/approve', authController.isLoggedIn, authController.isAdmin, timeEntryController.approve);
  router.post('/api/v1/timeEntry/:id/hide', authController.isLoggedIn, authController.isAdmin, timeEntryController.hide);
  router.post('/api/v1/timeEntry/:id/reject', authController.isLoggedIn, authController.isAdmin, timeEntryController.reject);
  router.post('/api/v1/timeEntry/:id/submit', authController.isLoggedIn, timeEntryController.submit);
  router.post('/api/v1/timeEntry/:id/delete', authController.isLoggedIn, timeEntryController.delete);

  // newTimeEntry bulk actions
  router.post('/api/v1/timeEntry/newTimeEntryBulkAction/approveAll/:status', authController.isLoggedIn, authController.isAdmin, timeEntryController.newTimeEntryBulkAction);
  router.post('/api/v1/timeEntry/newTimeEntryBulkAction/hideAll/:status', authController.isLoggedIn, authController.isAdmin, timeEntryController.newTimeEntryBulkAction);
  router.post('/api/v1/timeEntry/newTimeEntryBulkAction/submitAll/:status', authController.isLoggedIn, timeEntryController.newTimeEntryBulkAction);
  router.post('/api/v1/timeEntry/newTimeEntryBulkAction/deleteAll/:status', authController.isLoggedIn, timeEntryController.newTimeEntryBulkAction);

  // timeEntry bulk actions endpoint for companyHourLog timeEntryTables
  router.post('/api/v1/timeEntry/timeEntryInCompanyHourLogBulkAction/:companyHourLogId/:currentStatus/:receivingStatus', authController.isLoggedIn, authController.isAdmin, timeEntryController.timeEntryInCompanyHourLogBulkAction);

  // timeEntry bulk actions endpoint for contractorHourLog timeEntryTables
  router.post('/api/v1/timeEntry/contractorHourLogBulkAction/:contractorHourLogId/rejectAllSubmitted', authController.isLoggedIn, authController.isAdmin, timeEntryController.timeEntryInContractorHourLogBulkReject);
  router.post('/api/v1/timeEntry/contractorHourLogBulkAction/:contractorHourLogId/submitAllCreated', authController.isLoggedIn, timeEntryController.timeEntryInContractorHourLogBulkSubmit);
  router.post('/api/v1/timeEntry/contractorHourLogBulkAction/:contractorHourLogId/deleteAllCreated', authController.isLoggedIn, timeEntryController.timeEntryInContractorHourLogBulkDelete);
};
