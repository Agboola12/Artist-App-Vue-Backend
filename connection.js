const {Sequelize} = require("sequelize");
const dotenv=require("dotenv");
const mysql2 = require("mysql2");

dotenv.config()
  const sequelize = new Sequelize(
    process.env.DATABASENAME,
    process.env.USER,
    process.env.PASSWORD,
    {
       dialect:process.env.DIALECT,
       dialectModule:mysql2 
    }

);
module.exports={sequelize}