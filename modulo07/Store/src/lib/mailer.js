const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: { user: "25cd5011f590b4", pass: "a0105ca67f518b" }
});