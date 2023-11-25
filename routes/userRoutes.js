const express=require("express");
const { createUser, loginUser, getUser}=require("../controllers/usercontroller");
const { createArtist, loginArtist, getArtist, updateProfile, getAllArtist, getBands, getDjs, getMusicArtist, 
    popularArtist, getArtistDetails, artistNotice } = require("../controllers/artistController");
const { verifyToken } = require("../middlewares/authMiddleware");
const { createMusic, delSong, songDetail, getAllSong, updateSong, AllSong, popularSong   } = require("../controllers/musicController");
const { upload} = require("../upload.js");
const { bookingInfo, getBookingInfo, infoDetail, Approve } = require("../controllers/bookingInfoController.js");

const Router=express.Router();

// users
Router.post('/createUser',createUser);
Router.post('/loginUser', loginUser);
Router.get('/getUser',verifyToken, getUser)

// artist
Router.post('/createArtist', upload.single("image") ,createArtist)
Router.post('/loginArtist', loginArtist)
Router.get('/getArtist',verifyToken, getArtist)
Router.put('/updateProfile/:id', upload.single('image'), updateProfile )
Router.get('/getAllArtist', getAllArtist)
Router.get('/popularArtist', popularArtist)
Router.get('/getBands', getBands)
Router.get('/getDjs', getDjs )
Router.get('/getMusicArtist', getMusicArtist )
Router.get('/getArtistDetails/:id', getArtistDetails )
Router.get('/artistNotice/:id',  artistNotice )
Router.get('/artistAppointment/:id',  artistNotice )

//artist music
Router.post('/createMusic', upload.fields([{name: 'image'}, {name:'mp3'}]), createMusic)
Router.get('/getAllSong', verifyToken, getAllSong)
Router.get('/songDetail/:id', songDetail )
Router.delete('/delSong/:id', delSong )
Router.put('/updateSong/:id', upload.single("image"), updateSong )
Router.get('/AllSong', AllSong)
Router.get('/popularSong', popularSong)

// creating booking information
Router.post('/bookingInfo', bookingInfo)
Router.post('/getBookingInfo', getBookingInfo)
Router.get('/infoDetails/:id', infoDetail)
Router.get('/Approve/:id', Approve)


module.exports=Router;