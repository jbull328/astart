// routes/index.js

const express = require('express');
const passport = require('passport');
const router = express.Router();

// const env = {
//   AUTH0_CLIENT_ID: 'YOUR_CLIENT_ID',
//   AUTH0_DOMAIN: 'YOUR_AUTH0_DOMAIN',
//   AUTH0_CALLBACK_URL: 'http://localhost:3000/callback'
// };

/* GET home page. */
// router.get('/login', function(req, res, next) {
//   res.render('index');
// });

// Perform the login
router.get(
  '/login',
  passport.authenticate('auth0', {
    clientID: process.env.AUTH0_CLIENT_ID,
    domain: process.env.AUTH0_DOMAIN,
    redirectUri: process.env.AUTH0_CALLBACK_URL,
    // audience: 'htts://' + process.env.AUTH0_DOMAIN + '/userinfo',
    responseType: 'code',
    scope: 'openid'
  }),
  function(req, res) {
    res.redirect('/');
  }
);

// Perform session logout and redirect to homepage
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Perform the final stage of authentication and redirect to '/user'
router.get(
  '/callback',
  passport.authenticate('auth0', {
    failureRedirect: '/'
  }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/user');
  }
);

module.exports = router;
