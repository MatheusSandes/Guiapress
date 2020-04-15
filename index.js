const express= require("express");
const app= express();
const bodyParser= require("body-parser");
const connection= require("./database/database");

const categoriesController= require("./categories/CategoriesController");
const articlesController= require("./articles/ArticlesController");

const Article= require("./articles/Article");
const Category= require("./categories/Category");

//View engine
app.set('view engine', 'ejs');

//Static
app.use(express.static('public'));


//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Database
connection
    .authenticate()
    .then(() =>{
        console.log("conexão ok!");
    }).catch((error)=>{
        console.log("ERRO");
    })
//Caso queira é possivel criar prefixos, por exemplo: "/blabla/A rota que ta dentro do categoriesController"
app.use("/", categoriesController);
app.use("/", articlesController);
app.get("/", (req, res)=>{
    res.render("index");
})

app.listen(8080, () =>{
    console.log("servidor ok!");
})