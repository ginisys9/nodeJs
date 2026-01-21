var {Sequelize} = require('sequelize'),
sequelizeConnection = new Sequelize('contactdb','root',"",{
    host:'localhost',
    dialect:'mysql'
})
sequelizeConnection.authenticate().then(function(){
     console.log('MySql are connected');
}).catch(function(error){
     console.log("Error:"+error);
})
module.exports = sequelizeConnection;