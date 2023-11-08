const {DataTypes, Model} = require("sequelize");
const {sequelize} = require("../connection");

class Music extends Model{};
    Music.init({
        songTitle:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        imageUrl:{
            type: DataTypes.STRING
        },
        mp3Url:{
            type: DataTypes.STRING,
        },
        songDescription:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        websiteUrl:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        tiktokHandle:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        facebookHandle:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        instagramHandle:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        artistId:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        artistName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'music',
 })

 module.exports = Music