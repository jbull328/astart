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
    app = express();

    var config = require('/config/database.');

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



app.use(methodOverride('_method'));
mongoose.connect('mongodb://localhost/modestoFCCUsers');

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


app.listen(process.env.PORT || 3000, function() {
  console.log("The Modesto All Star Server is running");
});
