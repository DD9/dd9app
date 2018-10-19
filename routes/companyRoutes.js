const authController = require('../controllers/authController');
const companyController = require('../controllers/companyController');

module.exports = router => {
  router.get('/api/v1/companies/all', authController.isLoggedIn, authController.isAdmin, companyController.all);
  router.get('/api/v1/companies/active', authController.isLoggedIn, companyController.active);
  router.get('/api/v1/company/:id', authController.isLoggedIn, authController.isAdmin, companyController.one);
  router.get('/api/v1/company/:id/hourLogs', authController.isLoggedIn, authController.isAdmin, companyController.companyHourLogs);
  router.post('/api/v1/company/create', authController.isLoggedIn, authController.isAdmin, companyController.create);
  router.post('/api/v1/company/:id/edit', authController.isLoggedIn, authController.isAdmin, companyController.edit);
  router.post('/api/v1/company/:id/activate', authController.isLoggedIn, authController.isAdmin, companyController.activate);
  router.post('/api/v1/company/:id/deactivate', authController.isLoggedIn, authController.isAdmin, companyController.deactivate);
};
