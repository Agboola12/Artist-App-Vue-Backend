const BookingInfo = require("../models/bookingInfoModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const createInfo = async (req, res) => {
    try {
      const info = {
        address: req.body.address,
        artistType: req.body.artistType,
        budget: req.body.budget,
        country: req.body.country,
        date: req.body.date,
        event: req.body.event,
        information: req.body.information,
        musicType: req.body.musicType,
        state: req.body.state,
        time: req.body.time,
        userName: req.body.userName,
        userEmail: req.body.userEmail,
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