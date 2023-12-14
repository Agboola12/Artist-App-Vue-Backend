const Music = require("../models/musicModel");

const createMusic = async(req,res) =>{
  try{
    if(req.files){
      const imageUrl = req.files['imageUrl'][0].path;
      const mp3Url = req.files['mp3'][0].path;
      
      const newUser = {
        songTitle: req.body.songTitle,
          imageUrl: imageUrl, 
          mp3Url: mp3Url,
          songDescription: req.body.songDescription,
          websiteUrl: req.body.websiteUrl,
          tiktokHandle: req.body.tiktokHandle,
          facebookHandle: req.body.facebookHandle,
          instagramHandle: req.body.instagramHandle,
          artistId: req.body.artistId,
          artistName: req.body.artistName,
        };
        Music.create(newUser)
        .then((response) => {
            res.status(200).json({
                message: "music upload successfully",
                status: true
            })
            console.log(response);
          })
          .catch((err) => {
            res.status(200).json({
              message: " error in music uploading ",
              status: false
            })
            console.log(err);
          })
        }
      }
  catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      status: false,
      error: error.message,
    });
  }
}

const songDetail =async (req, res) => {
    const musicId = req.params.id;
    // console.log(musicId);

    try {
        const user = await Music.findByPk(musicId);
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

const getAllSong = async (req, res)=> {
 
  try {
    const artistId = req.user.id;   
      const user = await Music.findAll({where:{artistId}});
      if (!user) {
        return res.status(404).json({ status: false, error: "User not found" });
      }
      res.status(200).json({ status: true, data: user });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ status: false, error: "Error fetching user details" });
  }
}


const delSong = async (req, res) => {
    const musicId = req.params.id;
    // console.log(musicId);
  
    try {
      const music = await Music.findByPk(musicId);
  
      if (!music) {
        return res.status(200).json({ 
          status:false,
          message:"Problem with deleting the song",
          error: "Music record not found" 
        });
      }
  
      await music.destroy();
  
      res.status(204).end({
        status:true,
        message:"Problem with deleting the song",
    }); 
    } catch (error) {
      console.error(error);
      res.status(200).json({ error: "Error deleting music record" });
    }

}

const updateSong = async (req, res)=>{
  const imageUrl = (req.file.path);
    const songId = req.params.id
    const {songTitle, songDescription, facebookHandle, instagramHandle, websiteUrl, tiktokHandle } = req.body; 
    try {
        const user = await Music.findByPk(songId);
        if (!user) {
          return res.status(200).json({ 
            status:false,
            message:"Song cannot found",
            error: "Song not found" 
          });
        }
    
        user.songTitle = songTitle;
        if (req.file) {
          user.imageUrl = imageUrl;
        }
        user.songDescription = songDescription;
        user.websiteUrl = websiteUrl;
        user.tiktokHandle = tiktokHandle;
        user.facebookHandle = facebookHandle;
        user.instagramHandle = instagramHandle;

        
        await user.save();
    
        res.status(200).json({
          status:true,
          message:"Song Details update successfully",
          user
        }); 
      } catch (error) {
        console.error(error);
        res.status(200).json({
          status:false,
          message:"Error updating Song ",
          error: "Error updating song details" });
      }
}

const AllSong = async (req, res)=> {
  try {
   
      const user = await Music.findAll();
      if (!user) {
        return res.status(404).json({ status: false, error: "Songs not found" });
      }
      res.status(200).json({ status: true, data: user });
  } catch (error) {
    console.error("Error fetching all song :", error);
    res.status(500).json({ status: false, error: "Error fetching all song " });
  }
} 

const popularSong = async (req, res)=> {
  try {
   
      const user = await Music.findAll({limit:3});
      // console.log(user);
      if (!user) {
        return res.status(404).json({ status: false, error: "Songs not found" });
      }
      res.status(200).json({ status: true, data: user });
  } catch (error) {
    console.error("Error fetching all song :", error);
    res.status(500).json({ status: false, error: "Error fetching all song " });
  }
} 



  






module.exports ={createMusic, getAllSong, delSong, songDetail , updateSong, AllSong, popularSong  }