var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    cloudinary = require("cloudinary"),
    multer = require("multer"),
    path = require('path'),
    router = express.Router(),
    upload = multer({ dest: 'public/img/avatars' }),
    FccUsers = require('./public/models/fccUsers.js'),
    Project = require('./public/models/userProjects.js'),
    dotenv = require("dotenv"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    showAll = require('./public/routes/showAll.js'),
    createProject = require('./public/routes/createProject.js'),
    requestInfo = require('./public/routes/requestInfo.js'),
    passport = require('passport'),
    flash = require('connect-flash'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    userAuth = require('./public/routes/login.js'),
    configDB = require('./public/config/database.js')
    app = express();

    

    app.set('views', __dirname + '/views');
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(expressSanitizer());
    app.set("view engine", "ejs");
    app.use(express.static(__dirname + '/public'));
    dotenv.load();

    //Cloudinary API config for cloud storage of images.
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
  });

app.use(bodyParser.json());

//==================================================
//passport setup
//==================================================

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

// required for passport
app.use(session({ secret: process.env.PASSPORT_SECRET })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//TODO: add all routest to routes.js page for clean up 
// require('./app/routes.js')(app, passport);

app.use(methodOverride('_method'));
mongoose.connect(configDB.url);

app.get("/", function(req, res) {
  res.render("landing");
});
//auth routes
// app.get('/login', userAuth);

app.get('/showAll/', showAll);
//Potential customer requests info
app.get('/requestInfo/', requestInfo);
app.post('/requestInfo/', requestInfo);

app.listen(process.env.PORT || 3000, function() {
  console.log("The Modesto All Star Server is running");
});
