var express = require("express"),
router = express.Router({mergeParams: true}),
Dish = require("../models/dish"),
Comment = require("../models/comment");
// ======================================
// COMMENTS ROUTES
// ======================================


// CREATE A NEW COMMENT ROUTE
router.get("/new", isLoggedIn,  function(req, res){
    // find dish by id
    Dish.findById(req.params.id, function(err, dish){
        if (err) {
            console.log(err);
            
            
        } else {
            res.render("comments/new", {dish: dish});
            
        }
    });
});

// POST THE NEW COMMENT CREATED
router.post("/", isLoggedIn, function(req, res){
    // lookup dish using ID
    Dish.findById(req.params.id, function(err, dish){
        if (err) {
            console.log(err);
            res.redirect("/dishes");
            
            
        } else {
        Comment.create(req.body.comment, function(err, comment){
            if (err) {
                console.log(err);
                
                
            } else {

                    // add user and ID to the comment
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;


                // save comment

                comment.save();
                dish.comments.push(comment)
                console.log(comment.author.username);
                
                
                
                dish.save();
                res.redirect('/dishes/'+ dish._id);
                
            }
        });

            
        }
    });
    
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


