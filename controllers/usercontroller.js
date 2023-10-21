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
                "message": "created successfully",
                status: true
            })
        }).catch((_error) => {
            res.json({
                "message": "failed to created user",
                status: false
            })
        })

}

const loginUser = async (req, res, next) => {
    const { dataValues } = await User.findOne({ where: { email: req.body.email } })
    if (dataValues) {
        // console.log(dataValues)
        const password_valid = await bcrypt.compare(req.body.password, dataValues.passWord);
        if (password_valid) {
            token = await jwt.sign({ "id": dataValues.id, "email": dataValues.email, "firstName": dataValues.firstName }, process.env.SECRET);
            res.status(200).json({ token: token });
        }
        else {
            res.status(400).json({ error: "Password Incorrect" });
        }

    } else {
        res.status(404).json({ error: "User does not exist" });
    }
};


// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;
  
//     try {
//       const user = await User.findOne({ where: { username } });
  
//       if (!user || user.password !== password) {
//         res.status(401).json({ message: 'Invalid credentials' });
//       } else {
//         res.json({ message: 'Login successful', user });
//       }
//     } catch (error) {
//       res.status(500).json({ message: 'Error logging in', error });
//     }
//   });


module.exports = { createUser, loginUser }