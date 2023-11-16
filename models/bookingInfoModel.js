const {DataTypes, Model} = require("sequelize");
const {sequelize} = require("../connection")

class Artist extends Model{};
 BookingInfo.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1
    },
    address:{
        type: DataTypes.STRING,
        allowNull: false
    },
    artistType:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    budget:{
        type: DataTypes.STRING,
        allowNull: false
    },
    country:{
        type: DataTypes.STRING,
        allowNull: false
    },

 },{
        sequelize,
        modelName: 'bookingInfo',
 })

 module.exports = BookingInfo
