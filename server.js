//Dependencies
var express = require("express");
var exphbs  = require('express-handlebars');
var mongoose = require("mongoose");

//Require all models
var db = require("./models");

//Port configuration
var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

//Require routes
var routes = require("./routes")

//Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Make public a static folder
app.use(express.static("public"));


// //Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Have every request go through route middleware
app.use(routes);

//if deployed, use the deployed database.  Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines"

//Connect to the mongo db
mongoose.connect(MONGODB_URI);

//Listen on the port
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
