const authController = require('../controllers/authController');
const companyHourLogController = require('../controllers/companyHourLogController');

module.exports = router => {
  router.get('/api/v1/hourLogs/company/open', authController.isLoggedIn, authController.isAdmin, companyHourLogController.openCompanyHourLogs);
  router.get('/api/v1/hourLogs/company/closed', authController.isLoggedIn, authController.isAdmin, companyHourLogController.closedHourLogs);
  router.get('/api/v1/hourLog/company/:companyHourLogId', authController.isLoggedIn, authController.isAdmin, companyHourLogController.one);
  router.post('/api/v1/hourLog/company/:companyHourLogId/open', authController.isLoggedIn, authController.isAdmin, companyHourLogController.open);
  router.post('/api/v1/hourLog/company/:companyHourLogId/close', authController.isLoggedIn, authController.isAdmin, companyHourLogController.close);
  router.post('/api/v1/hourLog/company/:companyHourLogId/edit', authController.isLoggedIn, authController.isAdmin, companyHourLogController.edit);
};
