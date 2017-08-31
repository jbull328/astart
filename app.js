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
    Blog = require('./public/models/userBlogs.js')
    dotenv = require("dotenv"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
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
    showUserEdit = require('./public/routes/showUserEdit.js'),
    passport = require('passport'),
    flash = require('connect-flash'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    userAuth = require('./public/routes/login.js'),
    app = express();

    require('./app/routes.js')(app, passport);

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

//prevent cross origin issues
app.use(bodyParser.json());
//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader(‘Access-Control-Allow-Origin’, ‘*’);
 res.setHeader(‘Access-Control-Allow-Credentials’, ‘true’);
 res.setHeader(‘Access-Control-Allow-Methods’, ‘GET,HEAD,OPTIONS,POST,PUT,DELETE’);
 res.setHeader(‘Access-Control-Allow-Headers’, ‘Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers’);
//==================================================
//passport setup
//==================================================
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
var configDB = require('./config/database.js');

// required for passport
app.use(session({ secret: 'ndaosncu1b9fbvc2g86!vb#iyb12' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


app.use(methodOverride('_method'));
mongoose.connect(configDB.url);

app.get("/", function(req, res) {
  res.status(200);
});
//auth routes
app.get('/login', userAuth);

//
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


app.listen(process.env.PORT || 3000, function() {
  console.log("The Modesto All Star Server is running");
});
