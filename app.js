const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Controller = require('./controller/login');
const User = require('./models/user');
const bodyParser =  require("body-parser");
const app = express();
const passportLocalMongoose =  require("passport-local-mongoose");


const db = 'mongodb+srv://admin:1234@nodetutor.yh4xi.mongodb.net/Login?retryWrites=true&w=majority'
const connect = mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.use(require("express-session")({
    secret:"POG",//decode or encode session
        resave: false,          
        saveUninitialized:false    
}));

//passport local mongose config
passport.serializeUser(User.serializeUser());       //session encoding
passport.deserializeUser(User.deserializeUser());   //session decoding
passport.use(new LocalStrategy(User.authenticate()));
/////////////////////////////

app.use(bodyParser.urlencoded(
    { extended:true }
));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.set('view engine', 'ejs');


app.use(Controller);

app.use((req,res) => {
    res.status(404).render('404', {title: '404'});
});
