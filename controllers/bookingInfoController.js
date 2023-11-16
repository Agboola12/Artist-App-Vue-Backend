const BookingInfo = require("../models/bookingInfoModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const createInfo = async (req, res) => {
    try {
      const info = {
        address: req.body.firstName,
        artistType: req.body.email,
        budget: req.body.musicType,
        country: req.body.country,
        date: req.body.state,
        event: req.body.mobile,
        information: req.body.mobile,
        musicType: req.body.mobile,
        state: req.body.mobile,
        time: req.body.mobile,
        userName: req.body.mobile,
        userEmail: req.body.mobile,
      }
      BookingInfo.create(info)
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

  module.exports ={ createInfo}