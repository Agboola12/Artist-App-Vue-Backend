const { createTransport } = require("nodemailer")

const sendMail = async({to, subject, text, html})=>{
    const transporter = createTransport({
            service: 'gmail',
            auth: {
                  user: process.env.APP_MAIL,
                  pass: process.env.APP_PASSWORD
                 }
            })
                }
            


module.exports =  {sendMail}

// var nodemailer = require('nodemailer');

// const sendMail =()=>{
    
//     var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//         user: process.env.APP_MAIL,
//         pass: process.env.APP_PASSWORD
//     }
// });

// var mailOptions = {
//   from: process.env.APP_MAIL,
//   to: 'teslimagboola09@gmail.com',
//   subject: ' Prime',
//   text: 'Welcome to our website. Enjoy your stay with us'
// };

// transporter.sendMail( function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

// }
// module.exports = {sendMail}