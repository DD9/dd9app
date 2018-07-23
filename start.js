const mongoose = require('mongoose'); // Import a package and assign the object exposed in the package for use

// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 7 || (major === 7 && minor <= 5)) {
  console.log(`You're on an older version of node that doesn't support Async + Await! Please download node version 7.6 or greater\n `);
  process.exit();
}

// Import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle any bad connections
const promise = mongoose.connect(process.env.DATABASE, { // Mongoose is MongoDB -> JS middleware
  useNewUrlParser: true,
  keepAlive: true,
  reconnectTries: 30,
});

// Import MongoDB models
require('./models/User');
require('./models/Contact');
require('./models/Company');
require('./models/HourLog');
require('./models/TimeEntry');

// Start the app
const app = require('./app'); // Import and run app.js
app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
