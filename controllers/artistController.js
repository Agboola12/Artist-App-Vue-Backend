const Artist = require("../models/artistModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const createArtist = async (req, res) => {
  const imageUrl = (req.file.path);
  try {
    const user = await Artist.findOne({ where: { email: req.body.email } })
    if (user) {
      res.status(200).json({
        message: "email already exist",
        status: false
      })
    }
    const salt = await bcrypt.genSalt(10);
    const art = {
      firstName: req.body.firstName,
      email: req.body.email,
      musicType: req.body.musicType,
      mobile: req.body.mobile,
      state: req.body.state,
      country: req.body.country,
      imageUrl: imageUrl,
      passWord: await bcrypt.hash(req.body.passWord, salt)
    }
    Artist.create(art)
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

const loginArtist = async (req, res) => {
  const { email, passWord } = req.body;
  try {
    const user = await Artist.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(404).json({
        message: "Artist not found",
        status: false
      });
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
        message: "Invalid credentials",
        status: false
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error during login" });
  }
};


const getArtist = async (req, res) => {

  let data = await jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

  if (!data) {
    res.send({
      message: "Invalid Token",
      status: false
    })
  }
  else {
    Artist.findByPk(data.id)
      .then(data => {
        res.json({
          status: true,
          data,
          message: "artist profile fetched"
        })
      })
      .catch(err => {
        res.status({
          status: false,
          message: "problem in fetching artist profile"
        })
        console.log(err, "problem getting artist");
      })
  }
}

const updateProfile = async (req, res) => {
  const imageUrl = (req.file.path);
  const userId = req.params.id
  const { firstName, email, state, country, mobile } = req.body;
  try {
    const user = await Artist.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.firstName = firstName;
    user.email = email;
    user.state = state;
    user.country = country;
    user.mobile = mobile;
    if (req.file) {
      user.imageUrl = imageUrl;
    }

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating user profile" });
  }
}

const getAllArtist = async (req, res) => {
  try {
    const artists = await Artist.findAll();
    res.json(artists);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: ' error in fecthing all artists '
    })
  }

}
const popularArtist = async (req, res) => {
  try {
    const artists = await Artist.findAll({limit:6});
    res.json(artists);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: ' error in fecthing all artists '
    })
  }
}

const getMusicArtist = async (req, res) => {

  try {
    const user = await Artist.findAll({ where: { musicType: 'Bands' } });
    console.log(user);

    if (!user || user.length === 0) {
      return res.status(404).json({ status: false, error: "Artist Band not found" });
    }

    res.status(200).json({ status: true, data: user });
  } catch (error) {
    console.error("Error fetching artist band details:", error);
    res.status(500).json({ status: false, error: "Error fetching artist band details" });
  }

}

const getBands = async (req, res) => {

  try {
    const user = await Artist.findAll({ where: { musicType: 'Bands' } });
    console.log(user);

    if (!user || user.length === 0) {
      return res.status(404).json({ status: false, error: "Artist Band not found" });
    }

    res.status(200).json({ status: true, data: user });
  } catch (error) {
    console.error("Error fetching artist band details:", error);
    res.status(500).json({ status: false, error: "Error fetching artist band details" });
  }

}

const getDjs = async (req, res) => {
  try {
    const user = await Artist.findAll({ where: { musicType: 'Djs' } });
    console.log(user);

    if (!user || user.length === 0) {
      return res.status(404).json({ status: false, error: "Dj not found" });
    }

    res.status(200).json({ status: true, data: user });
  } catch (error) {
    console.error("Error fetching djs details:", error);
    res.status(500).json({ status: false, error: "Error fetching djs details" });
  }
}

const getArtistDetails = async (req,res)=>{
    const musicId = req.params.id;
    const artistId = req.params;
  try {
    const user = await Artist.findOne({where: { musicType: 'Djs' }})
  } catch (error) { 
    console.error("Error fetching Artist Details details:", error);
    res.status(500).json({ status: false, error: "Error in getting Artist Details details" });
  }
}


module.exports = { createArtist, loginArtist, getArtist, updateProfile, getAllArtist, getBands, getDjs, getMusicArtist, popularArtist, getArtistDetails }