const {DataTypes, Model} = require("sequelize");
const {sequelize} = require("../connection")

class BookingInfo extends Model{};
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
    date:{
        type: DataTypes.STRING,
        allowNull: false
    },
    event:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    information:{
        type: DataTypes.STRING,
        allowNull: false
    },
    musicType:{
        type: DataTypes.STRING,
        allowNull: false
    },
    state:{
        type: DataTypes.STRING,
        allowNull: false
    },
    time:{
        type: DataTypes.STRING,
        allowNull: false
    },
    userName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    userEmail:{
        type: DataTypes.STRING,
        allowNull: false
    },
    musicId:{
        type: DataTypes.STRING,
        allowNull: false
    },
    artistName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    state:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

 },{
        sequelize,
        modelName: 'bookingInfo',
 })

 module.exports = BookingInfo
