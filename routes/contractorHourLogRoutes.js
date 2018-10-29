const authController = require('../controllers/authController');
const contractorHourLogController = require('../controllers/contractorHourLogController');

module.exports = router => {
  router.get('/api/v1/contractorHourLogs/open', authController.isLoggedIn, authController.isAdmin, contractorHourLogController.openHourLogs);
  router.get('/api/v1/contractorHourLogs/closed', authController.isLoggedIn, authController.isAdmin, contractorHourLogController.closedHourLogs);
  router.get('/api/v1/contractorHourLog/:contractorHourLogId', authController.isLoggedIn, contractorHourLogController.one);
  router.post('/api/v1/contractorHourLog/:contractorHourLogId/close', authController.isLoggedIn, authController.isAdmin, contractorHourLogController.close);
  router.post('/api/v1/contractorHourLog/:contractorHourLogId/edit', authController.isLoggedIn, authController.isAdmin, contractorHourLogController.edit);
};
