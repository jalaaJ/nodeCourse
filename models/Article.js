const mongo = require("mongoose")
const Schema = mongo.Schema

const articleSchema = new Schema({
    title: String,
    body: String,
    likes: Number
})

const Article = mongo.model("Article", articleSchema)

module.exports = Article