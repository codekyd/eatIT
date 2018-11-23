
// IMPORT ALL THE REQUIRED MODULES
var passportLocalMongoose = require("passport-local-mongoose"),
methodOverride = require("method-override"),
LocalStrategy = require("passport-local"),
Comment = require("./models/comment"),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
User = require("./models/user"),
Dish = require("./models/dish"),
passport = require("passport"),
express = require("express"),
seedDB = require("./seed"),

app = express();

// IMPORTS NEEDED ROUTES
var commentRoutes = require("./routes/commentsRoute"),
dishRoutes        = require("./routes/dishesRoute"),
indexRoutes       = require("./routes/indexRoute");

// seedDB();
// MONGOOSE CONFIG

app.use(bodyParser.urlencoded({extended : true}));
mongoose.connect("mongodb://localhost/eatIT");
app.use(express.static( __dirname +  "/public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");


// PASSPORT CONFIG

app.use(require("express-session")({
    secret: "the boom bomb!",
    resave: false,
    saveUninitialized: false,

}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});


    // USE ALL ROUTES IMPORTED
app.use( indexRoutes);
app.use( "/dishes/:id/comments", commentRoutes);
app.use( dishRoutes);


//  SET UP SERVER
app.listen(3200, function(){
    console.log("eatIT app started at port 3200!");
    

});

