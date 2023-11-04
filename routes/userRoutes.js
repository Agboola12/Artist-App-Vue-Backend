const express=require("express");
const { createUser, loginUser, getUser}=require("../controllers/usercontroller");
const { createArtist, loginArtist, getArtist, updateProfile, getAllArtist, getBand } = require("../controllers/artistController");
const { verifyToken } = require("../middlewares/authMiddleware");
const { createMusic, delSong, songDetail, getAllSong, updateSong   } = require("../controllers/musicController");
const { upload} = require("../upload.js")

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
Router.get('/getBand', getBand)
Router.get('/getBand', )

//artist music
Router.post('/createMusic', upload.fields([{name: 'image'}, {name:'mp3'}]), createMusic)
Router.get('/getAllSong', verifyToken, getAllSong)
Router.get('/songDetail/:id', songDetail )
Router.delete('/delSong/:id', delSong )
Router.put('/updateSong/:id', upload.single("image"), updateSong )


module.exports=Router;