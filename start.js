/**
 *
 * Server entry point
 */

const mongoose = require('mongoose');

// Import environmental variables from our dev variables.env file, else hosting env's will be used
require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE,
  {
    useNewUrlParser: true,
    keepAlive: true,
    reconnectTries: 30,
  })
  .then(() => console.log(`Successfully connected to MongoDB → ENVIRONMENT: ${process.env.NODE_ENV}`))
  .catch(err => {
    // mongoose connection error will be handled here
    console.error('MongoDB connection error:', err.stack);
    process.exit(1);
  });

// Import MongoDB models
require('./models/User');
require('./models/Project');
require('./models/Company');
require('./models/CompanyHourLog');
require('./models/ContractorHourLog');
require('./models/TimeEntry');

// Import and run app.js
const app = require('./app');

// Start the app
app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
