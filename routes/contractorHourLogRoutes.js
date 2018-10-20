const authController = require('../controllers/authController');
const contractorHourLogController = require('../controllers/contractorHourLogController');

module.exports = router => {
  router.get('/api/v1/hourLogs/contractor/open', authController.isLoggedIn, authController.isAdmin, contractorHourLogController.openHourLogs);
  router.get('/api/v1/hourLogs/contractor/closed', authController.isLoggedIn, authController.isAdmin, contractorHourLogController.closedHourLogs);
};
