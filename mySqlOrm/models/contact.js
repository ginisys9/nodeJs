var { DataTypes} = require('sequelize'),
sequelize = require('./index'),
Contact = sequelize.define('Contact',{
    first_name:{type:DataTypes.STRING,allowNull:false},
    last_name:{type:DataTypes.STRING},
    email:{type:DataTypes.STRING,allowNull:false,unique:true},
    phone:{type:DataTypes.STRING},
    address:{type:DataTypes.STRING},
},{
    timestamps:false
});
module.exports = Contact;