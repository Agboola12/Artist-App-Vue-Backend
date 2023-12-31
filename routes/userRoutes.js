const express=require("express");
const { createUser, loginUser, getUser, validateCreateUser}=require("../controllers/usercontroller");
const { createArtist, loginArtist, getArtist, updateProfile, getAllArtist, getBands, getDjs, getMusicArtist, 
    popularArtist, getArtistDetails, artistNotice, artistAppointment } = require("../controllers/artistController");
const { verifyToken } = require("../middlewares/authMiddleware");
const { createMusic, delSong, songDetail, getAllSong, updateSong, AllSong, popularSong   } = require("../controllers/musicController");
const { upload} = require("../upload.js");
const { bookingInfo, getBookingInfo, infoDetail, Approve } = require("../controllers/bookingInfoController.js");
// const { sendMail } = require("../mail.js");

const Router=express.Router();

// users
Router.post('/createUser',validateCreateUser ,createUser);
Router.post('/loginUser', loginUser);
Router.get('/getUser',verifyToken, getUser)

// artist
Router.post('/createArtist',upload.single("imageUrl") ,createArtist)
Router.post('/loginArtist', loginArtist)
Router.get('/getArtist',verifyToken, getArtist)
Router.put('/updateProfile/:id', upload.single('imageUrl'), updateProfile )
Router.get('/getAllArtist', getAllArtist)
Router.get('/popularArtist', popularArtist)
Router.get('/getBands', getBands)
Router.get('/getDjs', getDjs )
Router.get('/getMusicArtist', getMusicArtist )
Router.get('/getArtistDetails/:id', getArtistDetails )
Router.get('/artistNotice/:id',  artistNotice )
Router.get('/artistAppointment/:id',  artistAppointment )
// Router.get('/mail',  sendMail )

//artist music
Router.post('/createMusic', upload.fields([{name: 'imageUrl'}, {name:'mp3'}]), createMusic)
Router.get('/getAllSong', verifyToken, getAllSong)
Router.get('/songDetail/:id', songDetail )
Router.delete('/delSong/:id', delSong )
Router.put('/updateSong/:id', upload.single("imageUrl"), updateSong )
Router.get('/AllSong', AllSong)
Router.get('/popularSong', popularSong)

// creating booking information
Router.post('/bookingInfo', bookingInfo)
Router.post('/getBookingInfo', getBookingInfo)
Router.get('/infoDetails/:id', infoDetail)
Router.get('/Approve/:id', Approve)


module.exports=Router;