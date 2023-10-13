const express=require("express");
const { createUser, loginUser}=require("../controllers/usercontroller");
const { createArtist, loginArtist, getArtist, updateProfile } = require("../controllers/artistController");
const { verifyToken } = require("../middlewares/authMiddleware");
const { createMusic, delSong, songDetail, getAllSong, updateSong   } = require("../controllers/musicController");
const { upload} = require ("../upload")
const Router=express.Router();

Router.post('/createUser',createUser);
Router.post('/loginUser', loginUser);

Router.post('/createArtist', upload.single("image") ,createArtist)
Router.post('/loginArtist', loginArtist)
Router.get('/getArtist',verifyToken, getArtist)
Router.put('/updateProfile/:id', upload.single('image'), updateProfile )

Router.post('/createMusic', upload.single('image'), createMusic)
// Router.post('/createMusic', upload.single("image"), upload.single("mp3"),createMusic)
Router.get('/getAllSong', verifyToken, getAllSong)
Router.get('/songDetail/:id', songDetail )
Router.delete('/delSong/:id', delSong )
Router.put('/updateSong/:id', upload.single("image"), updateSong )


module.exports=Router;