const authController = require('../controllers/authController');
const hourLogController = require('../controllers/hourLogController');

module.exports = router => {
  router.get('/api/v1/hourLogs/company/open', authController.isLoggedIn, authController.isAdmin, hourLogController.openHourLogs);
  router.get('/api/v1/hourLogs/company/closed', authController.isLoggedIn, authController.isAdmin, hourLogController.closedHourLogs);
  router.get('/api/v1/hourLog/company/:hourLogId', authController.isLoggedIn, authController.isAdmin, hourLogController.one);
  router.post('/api/v1/hourLog/company/:hourLogId/open', authController.isLoggedIn, authController.isAdmin, hourLogController.open);
  router.post('/api/v1/hourLog/company/:hourLogId/close', authController.isLoggedIn, authController.isAdmin, hourLogController.close);
};
