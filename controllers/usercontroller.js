const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const nodemailer = require('nodemailer');

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

const createUser = async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email } })
    if (user) {
        return res.status(200).json({
            message: "email already exist",
            status: false
        })
    }
    const salt = await bcrypt.genSalt(10);
    var usr = {
        firstName: req.body.firstName,
        email: req.body.email,
        passWord: await bcrypt.hash(req.body.passWord, salt)
    };
    await User.create(usr)
            await transporter.sendMail({
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Form Submission Confirmation',
            text: `Thank you for submitting the form, ${firstName}!`,
         });
        // .then((result) => {
        //     res.json({
        //         message: "created successfully",
        //         status: true
        //     })
        // })
        
        .catch((error) => {
            res.json({
                message: "failed to created user",
                status: false
            })
        })
    

}

const loginUser = async(req, res)=>{
    const { email, passWord } = req.body;
    try {
      const user = await User.findOne({
        where: { email },
      });
      if (!user) {
        return res.status(404).json({ 
            message: "user not found",
            status: false
        });
      }
      const passwordMatch = await bcrypt.compare(passWord, user.passWord);
      if (passwordMatch) {
        const token = jwt.sign({ email: user.email, id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "12h", 
        });
        return res.status(200).json({ 
            message: " user login successful", 
            status: true, 
            token 
        });
      } 
      else {
        return res.status(401).json({ 
            message: "Invalid details", 
            status: false 
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error during login" });
    }

}

const getUser = async (req, res) => {
    let data = await jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    console.log(data);
    if (!data) {
        res.send({
            message: "Invalid Token",
            status: false
        })
    }
    else {
        User.findByPk(data.id)
            .then(data => {
                res.json({
                    status: true,
                    data,
                    message: "user profile fetched"
                })
            })
            .catch(err => {
                res.status({
                    status: false,
                    message: "problem in fetching user profile"
                })
                console.log(err, "problem getting user");
            })
    }
}


module.exports = { createUser, loginUser, getUser }