"use strict";
const nodemailer = require("nodemailer");


// tqahxoqtjzgnwyfd


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'amirabbasyk@gmail.com',
    pass: 'tqahxoqtjzgnwyfd'
  }
});

// var mailOptions = {
//   from: 'amirabbasyk@gmail.com',
//   to: 'zero1school@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

function sendMail(mailOptions, callback) {
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      callback(info.response)
    }
  });
}

module.exports = sendMail