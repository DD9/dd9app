/*
  This is a file of data and helper functions that we can expose and use in our templating functions
*/

// Some details about the site
exports.siteName = `DD9Extranet V2`;

// Dump is a debugging function we can use to console.log our JSON data
exports.dump = (obj) => JSON.stringify(obj, null, 2);

// FS is a built in module to node that let's us read files from the system we're running on
const fs = require('fs');

// Inserting an SVG with FS
exports.icon = (name) => fs.readFileSync(`./public/images/icons/${name}.svg`);

// moment.js is a library for displaying dates. We need this in our templates to display things like "Posted 5 minutes ago"
exports.moment = require('moment');
const moment = require('moment');

// Time conversion shortcuts
exports.YYYYMMDD = (date) => moment(date).format("YYYY-MM-DD");

// Uppercase first letter of a string
exports.capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);