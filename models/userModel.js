const {  DataTypes, Model } = require('sequelize');
const {sequelize}=require("../connection");


class User extends Model{};
User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue:DataTypes.UUIDV1,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      passWord: {
        type: DataTypes.STRING,
        allowNull: false
      }
},{
    sequelize,
    modelName: 'user',
})

module.exports=User