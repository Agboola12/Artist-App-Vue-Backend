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







import React, { Component } from "react";

class CldCustUploadLgRestApi extends Component {
  processFile = async (e) => {
    var file = e.target.files[0];

    // Set your cloud name and unsigned upload preset here:
    var YOUR_CLOUD_NAME = "YOUR_CLOUD_NAME";
    var YOUR_UNSIGNED_UPLOAD_PRESET = "YOUR_UNSIGNED_UPLOAD_PRESET";

    var POST_URL =
      "https://api.cloudinary.com/v1_1/" + YOUR_CLOUD_NAME + "/auto/upload";

    var XUniqueUploadId = +new Date();

    processFile();

    function processFile(e) {
      var size = file.size;
      var sliceSize = 20000000;
      var start = 0;

      setTimeout(loop, 3);

      function loop() {
        var end = start + sliceSize;

        if (end > size) {
          end = size;
        }
        var s = slice(file, start, end);
        send(s, start, end - 1, size);
        if (end < size) {
          start += sliceSize;
          setTimeout(loop, 3);
        }
      }
    }

    function send(piece, start, end, size) {
      console.log("start ", start);
      console.log("end", end);

      var formdata = new FormData();
      console.log(XUniqueUploadId);

      formdata.append("file", piece);
      formdata.append("cloud_name", YOUR_CLOUD_NAME);
      formdata.append("upload_preset", YOUR_UNSIGNED_UPLOAD_PRESET);
      formdata.append("public_id", "myChunkedFile2");

      var xhr = new XMLHttpRequest();
      xhr.open("POST", POST_URL, false);
      xhr.setRequestHeader("X-Unique-Upload-Id", XUniqueUploadId);
      xhr.setRequestHeader(
        "Content-Range",
        "bytes " + start + "-" + end + "/" + size
      );

      xhr.onload = function () {
        // do something to response
        console.log(this.responseText);
      };

      xhr.send(formdata);
    }

    function slice(file, start, end) {
      var slice = file.mozSlice
        ? file.mozSlice
        : file.webkitSlice
        ? file.webkitSlice
        : file.slice
        ? file.slice
        : noop;

      return slice.bind(file)(start, end);
    }

    function noop() {}
  };

  render() {
    return (
      <div>
        <h3>Upload:</h3>
        <p>
          Note: Before choosing a file, set your cloud name and unsigned upload
          preset in CldCustUploadLgRestApi.js:
        </p>
        <p>YOUR_CLOUD_NAME</p>
        <p>YOUR_UNSIGNED_UPLOAD_PRESET</p>
        <br />
        <h5>Test image/video upload</h5>
        <input type="file" onChange={this.processFile} />
      </div>
    );
  }
}

export default CldCustUploadLgRestApi;
























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

