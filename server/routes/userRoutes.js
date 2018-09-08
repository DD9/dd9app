const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

module.exports = router => {
  router.get('/user/all', authController.isLoggedIn, authController.isAdmin, userController.all);
  router.get('/user/one/:id', authController.isLoggedIn, authController.isOwner, userController.one);
  router.post('/user/edit', authController.isLoggedIn, userController.edit);
  router.post('/api/v1/user/:id/edit/admin', authController.isLoggedIn, authController.isAdmin, userController.editAdmin);
};
