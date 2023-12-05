const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const nodemailer = require('nodemailer');
const { validationResult, check } = require('express-validator');


dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.APP_MAIL,
        pass: process.env.APP_PASSWORD
       }
  });

  const validateCreateUser = [
    check('firstName').notEmpty().withMessage('firstName is required'),
    check('email').isEmail().withMessage('Invalid email format'),
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ]; 

const createUser =  async (req, res) => {
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

    // joi yup validator in the backend
    await User.create(usr)
            await transporter.sendMail({
            from: 'process.env.APP_MAIL',
            to: req.body.email,
            subject: 'Successfull',
            html: 
                  `<div>
                      <h1> Prime </h1><br/>
                      <p>Welcome to our website. Enjoy your stay with us. &nbsp;&nbsp;</p>
                      <h3>${req.body.firstName}</h3>
                  </div>`
         })
             
         .then((resp)=>{
             res.status(200).json({
                 message: "User account created successfully",
                 status: true
                })        
            })
        .catch((error) => {
            res.status(200).json({
                message: "Failed to created user",
                status: false
            })
            console.log(error);
        })
}

// const createUser = async (req, res) => {
//     try {
//         const user = await User.findOne({ where: { email: req.body.email } });

//         if (user) {
//             return res.status(200).json({
//                 message: "Email already exists",
//                 status: false
//             });
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(req.body.passWord, salt);

//         await User.create({
//             firstName: req.body.firstName,
//             email: req.body.email,
//             passWord: hashedPassword
//         });

//         await sendMail({
//             from: process.env.APP_MAIL,
//             to: req.body.email,
//             subject: ' Prime',
//             text: `Welcome to our website. Enjoy your stay with us ${req.body.firstName}`
//         });

//         res.json({
//             message: "User account created successfully",
//             status: true
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             message: "Failed to create user",
//             status: false
//         });
//     }
// }


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
        return res.status(200).json({ 
            message: "Email or Password is not correct", 
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


module.exports = { createUser, loginUser, getUser, validateCreateUser }