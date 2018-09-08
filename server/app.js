const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const routes = require('./routes/index');
require('./handlers/passport');

// Create our Express app
const app = express();

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Populates req.cookies with any cookies that came along with the request
app.use(cookieParser());

// Express Sessions allow us to store session data in MongoDB as opposed to cookies
app.use(session({
  secret: process.env.SESSION_SECRET,
  key: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

// Initialize Passport & Passport Session middleware
app.use(passport.initialize());
app.use(passport.session());

// Flash middleware for server-side GUI flashes on response
app.use(flash());

// Inject our own routes
app.use('/', routes);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up client assets from the build folder
  app.use(express.static('client/build'));

  // Catch-all to serve up the the react-app to the client
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports = app;
