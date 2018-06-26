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
mongoose.connect(process.env.DATABASE); // Mongoose is MongoDB -> JS middleware
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises when returning data
mongoose.connection.on('error', (err) => {
  console.error(`${err.message}`);
});

// Import MongoDB models
require('./models/User');

// Start the app
const app = require('./app'); // Import and run app.js
app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
