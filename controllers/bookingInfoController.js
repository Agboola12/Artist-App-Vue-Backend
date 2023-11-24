const BookingInfo = require("../models/bookingInfoModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Artist = require("../models/artistModel");
const {Op} = require ("sequelize")
dotenv.config();

const bookingInfo = async (req, res) => {
  console.log(req.body);
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
        musicId: req.body.musicId,
        artistName: req.body.artistName,
      }
      BookingInfo.create(info)
        .then((response) => {
          res.json({
            message: "Booking information created successfully",
            status: true,
            response
          })
        })
        .catch((err) => {
          res.status(400).json({
            message: " error in Booking information creating ",
            status: false
          })
          console.log(err);
        })
  
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error in Booking information",
        status: false,
        error: error.message,
      })
    }
  }

  const getBookingInfo = async(req, res)=>{
    const {artistType, country, musicType, state} = req.body;
    try {
      const user = await Artist.findAll({where: {[Op.or]:{artistType, country, musicType, state}} })
      console.log(user);

      if(!user ){
        return res.status(404).json({ 
          status: false, 
          error: "Booking Information not found" });
      }
      return res.status(200).json({
        status: true,
         user ,
      })
    } 
    catch (error) { 
      console.error("Error fetching Booking Information",
      error);
      res.status(500).json({ 
        status: false, 
        error: "Error in getting Booking Information details" });
    }
  }

  const infoDetail =async (req, res) => {
    const infoId = req.params.id;
    // console.log(musicId);

    try {
        const user = await BookingInfo.findByPk(infoId);
        // console.log(user);

        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
    
        res.status(200).json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching user details" });
      }
}

  module.exports ={ bookingInfo, getBookingInfo, infoDetail}