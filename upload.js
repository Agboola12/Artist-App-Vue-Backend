const multer = require("multer");
const cloudinary = require("cloudinary").v2
const dotenv = require("dotenv");

const fs = require('fs').promises;

dotenv.config();
cloudinary.config({
  api_key: process.env.C_API_KEY,
    cloud_name: process.env.C_CLOUD_NAME,
    api_secret: process.env.C_API_SECRET
})



async function handleUpload(req) {
  const b64 = Buffer.from(req.file.buffer).toString("base64");
  let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
  const res = await cloudinary.uploader.upload(dataURI, {
  resource_type: "auto",
  folder:'Music',
  allowedFormat: ["png", "jpeg", "jpg", "svg", "gif"]
});
return res;
}


const storage = new multer.memoryStorage();
const upload = multer({
storage,
});


module.exports = {upload, handleUpload}

