const authController = require('../controllers/authController');
const hourLogController = require('../controllers/hourLogController');

module.exports = router => {
  router.get('/api/v1/hourLogs/open', authController.isLoggedIn, authController.isAdmin, hourLogController.openHourLogs);
  router.get('/api/v1/hourLogs/closed', authController.isLoggedIn, authController.isAdmin, hourLogController.closedHourLogs);
  router.get('/hourLog/:id', authController.isLoggedIn, authController.isAdmin, hourLogController.one);
  router.post('/hourLog/:id/open', authController.isLoggedIn, authController.isAdmin, hourLogController.open);
  router.post('/hourLog/:id/close', authController.isLoggedIn, authController.isAdmin, hourLogController.close);
};
