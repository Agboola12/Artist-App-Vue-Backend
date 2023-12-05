const {Sequelize} = require("sequelize");
const dotenv=require("dotenv");
const mysql2 = require("mysql2");


dotenv.config()

// console.log(process.env)
  const sequelize = new Sequelize(
    process.env.DATABASENAME,
    process.env.USER,
    process.env.PASSWORD,
    {
        host:process.env.HOST,
       dialect:process.env.DIALECT,
       dialectModule:mysql2 
    }

);
module.exports={sequelize}