const express= require("express");
const app= express();
const bodyParser= require("body-parser");
const connection= require("./database/database");
const session= require( "express-session");

const categoriesController= require("./categories/CategoriesController");
const articlesController= require("./articles/ArticlesController");
const usersController= require("./users/UsersController");

const Article= require("./articles/Article");
const Category= require("./categories/Category");
const User= require("./users/User");

//View engine
app.set('view engine', 'ejs');

//Session
app.use(session({
    secret:"batatapotato", cookie: {maxAge: 300000}
}))

//Redis- banco apropriado para salvamento de cache, pois o session gasta memoria ram do servidor

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
app.use("/", usersController);

app.get("/session", (req, res)=>{
    req.session.treunamento="BLAAA"
    req.session.ano=2020
    req.session.user={
        username: "potato",
        email:"potato@batata.com"
    }
    res.send("bla")
})

app.get("/leitura", (req, res)=>{
    res.json({
        treunamento: req.session.treunamento,
        ano: req.session.ano,
        user: req.session.user
    })
})

app.get("/", (req, res)=>{
    Article.findAll({
        order:[
            ['id','DESC']
        ],
        limit:4
    }).then(articles =>{
        Category.findAll().then(categories =>{
            res.render("index", {articles: articles, categories:categories});
        })
        
    })
   
})

app.get("/:slug", (req, res) =>{
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article =>{
            if(article !=undefined){
                Category.findAll().then(categories =>{
                    res.render("article", {article: article, categories:categories});
                })          
            }else{
                res.redirect("/");
            }
        }).catch(err =>{
            res.redirect("/");
        });
});

app.get("/category/:slug",(req, res)  =>{
    var slug= req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model:Article}]//join .... similar ao feito no ArticlesController.js ... inclui na busca da categoria os dados de todos os artigos daquela categoria, graças ao relacionamento do bd
    }).then(category =>{
        if(category !=undefined){
            Category.findAll().then(categories =>{
                res.render("index", {articles: category.articles, categories: categories})
            })
        }else{
            res.redirect("/");
        }
    }).catch(err=>{
        res.redirect("/");
    })
})

app.listen(8080, () =>{
    console.log("servidor ok!");
})