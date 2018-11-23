var express = require("express"),
router = express.Router(),
Dish = require("../models/dish");



// GET ALL THE DISHES AND RENDER THEM ON THE VIEW
router.get("/dishes", function(req, res){

    // gets all dishes from the DB
    Dish.find({}, function (err, allDishes) {

        if (err) {
            console.log(err);
            
            
        } else {
     
     res.render("dishes/index", {dishes : allDishes, currentUser : req.user});
        }
    });
});


router.post("/dishes", isLoggedIn,  function(req, res){

    // get data from the form and add them to the DB
var dishName = req.body.dishName,
dishImage = "img/"+ req.body.dishImage,
description = req.body.desc,
author = {
    id: req.user._id,
    username: req.user.username,
}
    var newDish = {name: dishName, image: dishImage, description: description,  author: author };
 

    Dish.create(newDish, function (err, dish) {
        if (err) {
            console.log(err);
            
            
        } else {
    // redirect back to the dishes page
            res.redirect("/dishes");
            // console.log(dish);
        }
        
    });



});

router.get("/dishes/new", isLoggedIn,  function(req, res){
    res.render("dishes/new");
});

// show more info about one dish
router.get("/dishes/:id", function (req, res) {

    // find the camp ground with the provided ID
    Dish.findById(req.params.id).populate("comments").exec(function(err, foundDish){

        // throw an error if things don't go right
        if (err) {
        res.redirect("/dishes");
         console.log(err);
            
            
        } else {
            // rendder show template with that dish
            // console.log(foundDish);
            
            res.render("dishes/show", {dish: foundDish});    
        }

    });

});




// ROUTE TO EDIT DISH
router.get("/dishes/:id/edit",isLoggedIn, function(req, res){

    Dish.findById(req.params.id, function(err, foundDish){
        if (err) {
            console.log(err);
            res.redirect("/dishes/:id")
            
        } else {
            res.render("dishes/edit", { dish : foundDish});
            
        }
    });

});


// FIND AND EDIT THE REQUIRED DISH
router.put("/dishes/:id", isLoggedIn, function(req, res){
    Dish.findByIdAndUpdate(req.params.id, req.body.dish, function(err, updatedDish){
        if (err) {
            res.redirect("/dishes");
            console.log(err);
            
            
        } else {
            res.redirect("/dishes/" + req.params.id);
            console.log(updatedDish);
            
            
        }
    });
});



//ROUTE TO DELETE DISH

// middleware
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) {
        return next()
        
    } else {
        res.redirect("/login");
    }
};

module.exports = router;
