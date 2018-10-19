const express = require('express');
const router = express.Router();

require('./authRoutes')(router);
require('./userRoutes')(router);
require('./companyRoutes')(router);
require('./companyHourLogRoutes')(router);
require('./contractorHourLogRoutes')(router);
require('./projectRoutes')(router);
require('./timeEntryRoutes')(router);

module.exports = router;
