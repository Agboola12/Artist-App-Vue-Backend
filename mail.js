const { createTransport } = require("nodemailer")

const sendMail = async({to, subject, text, html})=>{
    // mthcileemfjtobvb   :  password
    const transporter = createTransport({
        host : "agboolaelijah077@gmail.com",
        secure: true,
        service: 'gmail.com',
        port: 587,
        auth: {
            user: process.env.APP_MAIL,
            pass: process.env.APP_PASSWORD
        }
    })
    
    const info = await transporter.sendMail({
        from: process.env.APP_MAIL,
        to,
        subject,
        text, 
        html
    })

}
module.exports =  {sendMail}