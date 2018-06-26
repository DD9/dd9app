const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const promisify = require('es6-promisify');

const transport = nodemailer.createTransport({ // Interface with email protocols (SMTP)
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const generateHTML = (filename, options = {}) => { // Internal file function, not exported
  const html = pug.renderFile(`${__dirname}/../views/email/${filename}.pug`, options); // Path to current directory (this file)
  const inlined = juice(html); // Put CSS inline for email styles
  return inlined;
};

exports.send = async(options) => {
  const html = generateHTML(options.filename, options);
  const text = htmlToText.fromString(html);

  const mailOptions = {
    from: `nodeapp-boiler <noreply@nodeapp-boiler.com>`,
    to: options.user.email,
    html: html,
    text: text
  };
  console.log(`sending mail`);
  const sendMail = promisify(transport.sendMail, transport); // Send mail is an old style callback function, turn it into a promise, bind it to the original object
  return sendMail(mailOptions);
};

