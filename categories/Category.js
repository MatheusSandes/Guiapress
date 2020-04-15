const Sequelize= require("sequelize");
const connection= require("../database/database");


const Category= connection.define('categories',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug:{
        type: Sequelize.STRING,
        allowNull:false
    }
})

//Category.sync({force:true});
//Para nao ficar criando a tabela toda vez que o programa rodar
module.exports=Category;