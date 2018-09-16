const authController = require('../controllers/authController');
const companyController = require('../controllers/companyController');

module.exports = router => {
  router.get('/api/v1/companies/all', authController.isLoggedIn, authController.isAdmin, companyController.all);
  router.get('/api/v1/companies/active', authController.isLoggedIn, companyController.active);
  router.get('/api/v1/company/:id', authController.isLoggedIn, authController.isAdmin, companyController.one);
  router.post('/api/v1/company/create', authController.isLoggedIn, authController.isAdmin, companyController.create);
  router.post('/company/:id/edit', authController.isLoggedIn, authController.isAdmin, companyController.edit);
  router.post('/company/:id/activate', authController.isLoggedIn, authController.isAdmin, companyController.activate);
  router.post('/company/:id/deactivate', authController.isLoggedIn, authController.isAdmin, companyController.deactivate);
};
