    var express = require("express"),
    bodyParser = require("body-parser"),
    cloudinary = require("cloudinary"),
    multer = require("multer"),
    router = express.Router(),
    upload = multer({ dest: 'public/img/avatars' }),
    Project = require('./public/models/userProjects.js'),
    Blog = require('./public/models/userBlogs.js'),
    User = require('./public/models/user.js'),
    dotenv = require("dotenv"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");
    showUser = require('./public/routes/showUser.js'),
    showUserNew = require('./public/routes/showUserForm.js'),
    showAll = require('./public/routes/showAll.js'),
    showProjectForm = require('./public/routes/showProjectForm.js'),
    showBlogForm = require('./public/routes/showBlogForm.js'),
    createUser = require('./public/routes/createUser.js'),
    createProject = require('./public/routes/createProject.js'),
    createBlog = require('./public/routes/createBlog.js'),
    userEdit = require('./public/routes/userEdit.js'),
    userDelete = require('./public/routes/userDelete.js'),
    showBlog = require('./public/routes/showBlog.js'),
    showUserEdit = require('./public/routes/showUserEdit.js');
    var path = require('path');
    var favicon = require('serve-favicon');
    var logger = require('morgan');
    var session = require('express-session');
    var cookieParser = require('cookie-parser');
    var passport = require('passport');
    var expressValidator = require('express-validator');
    var LocalStrategy = require('passport-local').Strategy;
    var flash = require('connect-flash');
    var bcrypt = require('bcryptjs');
    app = express();

    app.set('views', __dirname + '/views');
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(expressSanitizer());
    app.set("view engine", "ejs");
    app.use(express.static(__dirname + '/public'));
    dotenv.load();


    var users = require('./public/routes/users.js');

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

  // app.use('/', routes);
  app.use('/users', users);
  // app.use('/posts/', posts);

  // catch 404 and forward to error handler
//   app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
//   });




app.use(methodOverride('_method'));

app.get("/", function(req, res) {
  res.render('landing');
});

app.get('/showUser/:id', showUser);
app.get('/user/new', showUserNew);
app.get('/showAll/', showAll);
app.get('/showUser/:_id/projects/new', showProjectForm);
app.get('/showUser/:_id/userBlog/new', showBlogForm);
app.get('/userEdit/:_id', showUserEdit);
app.get('/showUser/:_id/userBlog', showBlog);

app.post('/user/new', createUser);
app.post("/showUser/:_id/projects", createProject);
app.post("/showUser/:_id/userBlog/new", createBlog);

app.put('/userEdit/:_id', userEdit);
app.delete('/userDelete/:_id', userDelete);

//Main auth Check function, put this in a rout to check for authentication  
function ensureAuthenticated(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

app.listen(process.env.PORT || 3000, function() {
  console.log("The Modesto All Star Server is running");
});
