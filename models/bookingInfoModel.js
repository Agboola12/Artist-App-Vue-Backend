const {DataTypes, Model} = require("sequelize");
const {sequelize} = require("../connection")

class Artist extends Model{};
 BookingInfo.init({
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
        allowNull: false
    },
    mobile:{
        type: DataTypes.STRING,
        allowNull: false
    },

 },{
        sequelize,
        modelName: 'bookingInfo',
 })

 module.exports = BookingInfo
