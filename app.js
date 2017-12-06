
var express = require("express");
    var path = require('path'),
    bodyParser = require("body-parser"),
    cloudinary = require("cloudinary").v2,
    multer = require("multer"),
    router = express.Router(),
    upload = multer({ dest: __dirname +  './public/img/avatars/' }),
    Project = require('./public/models/userProjects.js'),
    Blog = require('./public/models/userBlogs.js'),
    User = require('./public/models/user.js'),
    Resource = require('./public/models/resources.js'),
    dotenv = require("dotenv"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");
    
    var favicon = require('serve-favicon');
    var logger = require('morgan');
    var session = require('express-session');
    var cookieParser = require('cookie-parser');
    var passport = require('passport');
    var expressValidator = require('express-validator');
    var LocalStrategy = require('passport-local').Strategy;
    var flash = require('connect-flash');
    var bcrypt = require('bcryptjs');
    var mongo = require('mongodb');
    var mongoose = require('mongoose');
    var db = mongoose.connection;

    var routes = require('./public/routes/index.js');
    var users = require('./public/routes/users.js');
    var posts = require('./public/routes/posts.js');
    var cohorts = require('./public/routes/cohorts.js');
    var sponsors = require('./public/routes/sponsors.js');
    var resources = require('./public/routes/resources.js');

    app = express();


    app.set('views', __dirname + '/views');
    app.use(bodyParser.urlencoded({extended: true}));
    app.set("view engine", "ejs");
    app.use(express.static(__dirname + '/public'));
    dotenv.load();

    //Cloudinary API config for cloud storage of images.
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
  });

  app.use(session({
    secret:'secret',
    saveUninitialized: true,
    resave: true
  }));

  // Passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Validator
  app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
   
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));

  app.use(function(req,res,next){
    res.locals.userValue = null;
    res.locals.errors = null;
    next();
})

  app.use(cookieParser());

  app.use(flash());
  app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
  });

  app.get('*', function(req, res, next) {
    res.locals.user = req.user || null;
    next();
  })
  
  app.use('/', routes, sponsors, resources);
  app.use('/users/', users);
  app.use('/posts/', posts);
  app.use('/cohorts/', cohorts);

  // catch 404 and forward to error handler
  // app.use(function(req, res, next) {
  //   var err = new Error('Not Found');
  //   err.status = 404;
  //   next(err);
  // });



app.use(methodOverride('_method'));
mongoose.connect('mongodb://localhost/users');


app.listen(process.env.PORT || 3000, function() {
  console.log("The Modesto All Star Server is running");
});