const authController = require('../controllers/authController');
const companyHourLogController = require('../controllers/companyHourLogController');

module.exports = router => {
  router.get('/api/v1/companyHourLogs/open', authController.isLoggedIn, authController.isAdmin, companyHourLogController.openHourLogs);
  router.get('/api/v1/companyHourLogs/closed', authController.isLoggedIn, authController.isAdmin, companyHourLogController.closedHourLogs);
  router.get('/api/v1/companyHourLog/:companyHourLogId', authController.isLoggedIn, authController.isAdmin, companyHourLogController.one);
  router.post('/api/v1/companyHourLog/:companyHourLogId/open', authController.isLoggedIn, authController.isAdmin, companyHourLogController.open);
  router.post('/api/v1/companyHourLog/:companyHourLogId/close', authController.isLoggedIn, authController.isAdmin, companyHourLogController.close);
  router.post('/api/v1/companyHourLog/:companyHourLogId/edit', authController.isLoggedIn, authController.isAdmin, companyHourLogController.edit);
};
