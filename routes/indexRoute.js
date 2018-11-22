var express = require("express"),
router = express.Router();
var passport = require("passport");
var User = require("../models/user");



router.get("/", function(req, res){
    res.render("landing");
});
// AUTH ROUTES

router.get("/register", function(req, res){
    res.render("register")
});


// handle sign up logic

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err) {
            console.log(err);
            
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/dishes");
            });
            
        }
    });
});

// Show login form

router.get("/login", function(req, res){
    res.render("login")
});

// handling login logic

router.post("/login", passport.authenticate("local", {
    successRedirect: "/dishes",
    failureRedirect: "/login",
}), function(req, res){

});


// log out route
router.get("/logout", function(req, res){
    req.logOut();
    res.redirect("/dishes")
});


// middleware
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) {
        return next()
        
    } else {
        res.redirect("/login");
    }
};

module.exports = router;

