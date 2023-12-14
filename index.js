const express = require("express");
const cors = require("cors");

const path = require('path');

const app = express();
const {sequelize}=require("./connection");
const userRoute=require("./routes/userRoutes")
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


(async()=>{
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()


// app.get('/',(req,res)=>{
//     res.json({
//         message:"You are welcome to back end"
//     })
// })
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });

app.use("/",userRoute)

app.listen(8000,()=>{
    console.log(" app start working");
})