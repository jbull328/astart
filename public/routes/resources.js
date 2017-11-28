var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var methodOverride = require("method-override");
var upload = multer({ dest: 'astart/public/img/avatars/' });
var cloudinary = require("cloudinary");
var dotenv = require("dotenv");
var Resource = require('../models/resources.js');

router.get("/resources", ensureAuthenticated, function(req, res) {
    resources: (req, res) => { 
    const resources = [
        {
            resourceTitle: "FreeCodeCamp",
            resourceImage: "./img/examples/catdude.jpg",
            resourceDescription: "The best way to get started is jump right in and start coding, do as much of the FreeCodeCamp content as posible, epecialy up to the first projects to get your self coding and getting a feel for it if you are new",
            resourceUrl: "https://www.freecodecamp.org",
            complete: false,
    },
    {
        resourceTitle: "React's Most Basics",
        resourceImage: "./img/examples/catdude.jpg",
        resourceDescription: "At its core, React is just JavaScript. It doesn't need a build system or fancy syntax. And with just two functions, it lets you create something amazing...",
        resourceUrl: "https://reactarmory.com/guides/learn-react-by-itself/react-basics",
        complete: false,
    },
    {
        resourceTitle: "ReactJS Authentication Tutorial",
        resourceImage: "./img/examples/catdude.jpg",
        resourceDescription: "Learn how to quickly build apps with ReactJS and add authentication the right way.",
        resourceUrl: "https://auth0.com/blog/reactjs-authentication-tutorial/",
        complete: false,
    },
    {
        resourceTitle: "Build with React",
        resourceImage: "./img/examples/catdude.jpg",
        resourceDescription: "This no nonsense tutorial will get you coding React right away.",
        resourceUrl: "http://buildwithreact.com/tutorial",
        complete: false,
    },
    {
        resourceTitle: "Easy Node Authentication: Setup and Local",
        resourceImage: "./img/examples/catdude.jpg",
        resourceDescription: "Build your own authentication with Node, this could come in handy down the road",
        resourceUrl: "https://scotch.io/tutorials/easy-node-authentication-setup-and-local",
        complete: false,
    },
    {
        resourceTitle: "Learn Git",
        resourceImage: "./img/examples/catdude.jpg",
        resourceDescription: "Learn Git, a way to version your code, keep it backed up, and colaborate with other developers. This is how we work folks.",
        resourceUrl: "https://www.codecademy.com/courses/learn-git/lessons/git-workflow/exercises/hello-git?action=lesson_resume",
        complete: false,
    },
    {
        resourceTitle: "Interactive React Produt Page",
        resourceImage: "./img/examples/catdude.jpg",
        resourceDescription: "Learn React in this awesome tutorial, we will use this and other skills in our projects.",
        resourceUrl: "https://scotch.io/tutorials/interactive-product-page-with-react-and-cloudinary",
        complete: false,
    },
    
       
    ];

    // use the Event model to insert/save
    for (resource of resources) {
      var newResource = new Resource(resource);
      newResource.save();
    }
    }
    User.findById(req.params.id).populate('resources').exec(function(err, userRef) {
         
        if (err) {
          console.log(err);
        }  else {
            Resource.find(function(err, resource) {
                if (err) {
                  console.log(err);
                } else {
                    res.render('resources',  {userRef: userRef, resource: resource, user: req.user,});
                }
            });
        }
    });  

});

function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect('/users/login');
  }

module.exports = router;