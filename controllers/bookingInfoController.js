const BookingInfo = require("../models/bookingInfoModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const createArtist = async (req, res) => {
    const imageUrl = (req.file.path);
    try {
      
      const salt = await bcrypt.genSalt(10);
      const info = {
        firstName: req.body.firstName,
        email: req.body.email,
        musicType: req.body.musicType,
        mobile: req.body.mobile,
        state: req.body.state,
        country: req.body.country,
        imageUrl: imageUrl,
        passWord: await bcrypt.hash(req.body.passWord, salt)
      }
      Artist.create(info)
        .then((response) => {
          res.json({
            message: "artist created successfully",
            status: true
          })
        })
        .catch((err) => {
          res.status(400).json({
            message: " error in artist creating ",
            status: false
          })
          console.log(err);
        })
  
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error",
        status: false,
        error: error.message,
      })
    }
  
  }