const Sequelize= require("sequelize");
const connection= new Sequelize('Guiapress', 'root', '******',{ //preencha com a senha do banco de dados
    host:'localhost',
    dialect:'mysql',
    timezone: "-03:00"
});
module.exports=connection;