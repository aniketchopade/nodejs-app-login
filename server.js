var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var configDB = require('./config/database');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');


mongoose.connect(configDB.url);

require('./config/passport')(passport); // pass passport for configuration
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

app.use(session({
    secret: "asdhaskdhaskjdh"
}));
console.log("i am here");
app.use(passport.initialize());  /*sets  req.passport.user */ 
app.use(passport.session()); /*calls passport.deserializeUser attch req.usr*/
app.use(flash());

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passp

// launch ======================================================================
app.listen(3000);
console.log('The magic happens on port ' + port);
