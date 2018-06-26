/*
  This is a file of data and helper functions that we can expose and use in our templating functions
*/

// FS is a built in module to node that let's us read files from the system we're running on
const fs = require('fs');

// moment.js is a library for displaying dates. We need this in our templates to display things like "Posted 5 minutes ago"
exports.moment = require('moment');

// Dump is a debugging function we can use to console.log our JSON data
exports.dump = (obj) => JSON.stringify(obj, null, 2);

// Inserting an SVG
exports.icon = (name) => fs.readFileSync(`./public/images/icons/${name}.svg`);

// Some details about the site
exports.siteName = `nodeapp-boiler`;

exports.menu = [
  { slug: '/item1', title: 'item1', icon: 'store', },
  { slug: '/item2', title: 'item2', icon: 'tag', },
  { slug: '/item3', title: 'item3', icon: 'top', },
  { slug: '/item4', title: 'item4', icon: 'add', },
  { slug: '/item5', title: 'item5', icon: 'map', },
];
