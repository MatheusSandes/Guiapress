const Sequelize= require("sequelize");
const connection= require("../database/database");


const User= connection.define('users',{
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },password:{
        type: Sequelize.STRING,
        allowNull:false
    }
})

//Category.sync({force:true});
//Para nao ficar criando a tabela toda vez que o programa rodar
User.sync({force:false});
module.exports=User;