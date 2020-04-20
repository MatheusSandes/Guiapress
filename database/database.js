const Sequelize= require("sequelize");
const connection= new Sequelize('blablabla', 'matheussandes', '810401MA',{
    host:'mysql669.umbler.com',
    dialect:'mysql',
    timezone: "-03:00"
});
module.exports=connection;