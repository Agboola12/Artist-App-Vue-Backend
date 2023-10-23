const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

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
    User.create(usr)
        .then((_result) => {
            res.json({
                message: "created successfully",
                status: true
            })
        }).catch((_error) => {
            res.json({
                message: "failed to created user",
                status: false
            })
        })

}

const loginUser = async(req, res)=>{
    const {email, passWord} = req.body;
    try{
        const user = await User.findOne({
            where: {email}
        })
        if(!user){
            return res.status({
                status: false,
                message: "email not correct"
            }) 
        }
        const passwordMatch = await bcrypt.compare(passWord, user.passWord);
  
      if (passwordMatch) {
        const token = jwt.sign({ email: user.email, id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "12h", 
        });
  
        return res.status(200).json({ 
            message: "Login successful", 
            status: true, 
            token 
        });
      } 
      else {
        return res.status(401).json({ 
            message: "Wrong information ", 
            status: false 
        });
      }
    }
    catch{

    }
}

const getUser = async (req, res) => {

    let data = await jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    
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