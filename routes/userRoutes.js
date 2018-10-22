const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

module.exports = router => {
  router.get('/api/v1/users/all', authController.isLoggedIn, authController.isAdmin, userController.all);
  router.get('/api/v1/users/active', authController.isLoggedIn, authController.isAdmin, userController.active);
  router.get('/api/v1/user/:id', authController.isLoggedIn, authController.isOwner, userController.one);
  router.post('/api/v1/user/:id/adminEdit', authController.isLoggedIn, authController.isAdmin, userController.adminEdit);
  router.post('/api/v1/user/:id/edit', authController.isLoggedIn, authController.isOwner, userController.edit);
  router.get('/api/v1/user/:id/contractorHourLogs', authController.isLoggedIn, authController.isAdmin, userController.contractorHourLogs);
};
