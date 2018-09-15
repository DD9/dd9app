const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

module.exports = router => {
  router.get('/api/v1/users/all', authController.isLoggedIn, authController.isAdmin, userController.all);
  router.get('/api/v1/user/:id', authController.isLoggedIn, authController.isOwner, userController.one);
  router.post('/user/edit', authController.isLoggedIn, userController.edit);
  router.post('/api/v1/user/:id/edit/admin', authController.isLoggedIn, authController.isAdmin, userController.editAdmin);
};
