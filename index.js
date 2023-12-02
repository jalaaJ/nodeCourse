const express = require("express")

const mongo = require("mongoose")

const Article = require("./models/Article")

const app = express()

// The .connect() method returns a promise, so we can use the .then() method
mongo.connect("mongodb+srv://jalaa_95:Jj0173623906@cluster0.ju7cmqg.mongodb.net/?retryWrites=true&w=majority").then( () => {
    console.log("Connected successfully!")
}).catch( (error)=> {
    console.log("Error with connecting to the database!", error)
})

app.use(express.json())

//==============Application Endpoints================

app.get("/", (req, res) => {
    res.send("Hello from the server's main page!")
})

app.get("/numbers", (req, res) => {
    let numbers = "";
    for(let i=0; i<10; i++)
    {
        numbers += i + " ";
    }
    res.send(`Numbers are: ${numbers}`);
})

app.get("/summation/:num1/:num2", (req, res) => {
    const num1 = req.params.num1;
    const num2 = req.params.num2;
    const total = Number(num1) + Number(num2);
    // res.send(`The sum is: ${total}`);
    // res.sendFile(__dirname + "/views/numbers.ejs");
    // res.render(__dirname + "/views/numbers.ejs");
    res.render("numbers.ejs", {
        total: total
    });
})

app.get("/say-hello", (req, res) => {
    const name = req.body.name;
    res.send(`${name}`);
})

app.get("/json", (req, res) => {
    res.json({
        name: req.query.name,
        age: 28
    })
})

app.get("/hello", (req, res) => {
    res.send("Hello from hello!")
})

app.get("/hi", (req, res) => {
    res.send("Hello from hi!")
})

app.get("/test", (req, res) => {
    res.send("Hello from test!")
})

//===========Article Endpoints============

app.post("/articles", async (req, res) => {
    const first_article = new Article()
    const articleTitle = req.body.articleTitle
    const articleBody = req.body.articleBody
    first_article.title = articleTitle
    first_article.body = articleBody
    first_article.likes = 0
    await first_article.save()
    res.json(first_article)
})

app.get("/articles", async (req, res) => {
    const articles = await Article.find()
    res.json(articles)
})

app.get("/articles/:articleId", async (req, res) => {
    const id = req.params.articleId
    const article = await Article.findById(id)
    res.json(article)
})

app.delete("/articles/:articleId", async (req, res) => {
    const id = req.params.articleId
    await Article.findByIdAndDelete(id)
    res.send("Article deleted!")
})

app.get("/showArticles", async (req, res) => {
    const articles = await Article.find()
    res.render("articles.ejs", {
        allArticles: articles
    })
})


//==============Running The Server===============

app.listen(3000, () => {
    console.log("I'm listening on port 3000")
})
