var express = require("express");
var app = express();
var bodyParser = require("body-parser");


app.set("view engine", "ejs");

var dishes = [
    {name: "Jollof Rice", image: "img/jollof-fit.jpg" },
    {name: "Banga Soup", image: "img/banga-soup.jpg"},
    {name: "Owo Soup", image: "img/img.jpg"},
    {name: "Fried Rice", image: "img/img.jpg"},

   ];



app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));


app.get("/", function(req, res){
    res.render("landing");
});


app.get("/dishes", function(req, res){
    res.render("dishes", {dishes : dishes});
});


app.post("/dishes", function(req, res){

    // get data from the form and add them to the array 
    var dishName = req.body.dishName;
    var dishImage = "img/"+ req.body.dishImage;
    var newDish = {name: dishName, image: dishImage };
    dishes.push(newDish);
    res.redirect('dishes')

    // redirect back to the dishes page


});

app.get("/new", function(req, res){
    res.render("new");
})

app.listen(3200, function(){
    console.log("eatIT app started at port 3200!");
    

});