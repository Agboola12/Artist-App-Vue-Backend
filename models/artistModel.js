const {DataTypes, Model} = require("sequelize");
const {sequelize} = require("../connection")

class Artist extends Model{};
 Artist.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1
    },
    firstName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    musicType:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    mobile:{
        type: DataTypes.STRING,
        allowNull: false
    },
    state:{
        type: DataTypes.STRING,
        allowNull: false
    },
    country:{
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl:{
        type: DataTypes.STRING,
    },
    passWord:{
        type: DataTypes.STRING,
        allowNull: false
    },

 },{
        sequelize,
        modelName: 'artist',
 })

 module.exports = Artist
