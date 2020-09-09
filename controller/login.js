const express = require('express');
const c = express.Router();
const User = require('../models/user');
const passport = require('passport');

c.get('/' , (req,res) => {
    res.redirect('/login');
})

c.get('/login', (req,res) => {
    res.render('login');
});

c.get('/register', (req,res) => {
    res.render('register');
});

c.get('/user',isLoggedIn ,(req,res) => {
    res.render('landing');
});

c.post('/login',passport.authenticate("local",{
    successRedirect: "/user",
    failureRedirect: "/"
}) ,(req,res) => {
});


c.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/");
});

c.post("/register",(req,res)=>{
    
    User.register(new User({username: req.body.username,email:req.body.email,phone: req.body.phone}),req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.render("register");
        }
    passport.authenticate("local")(req,res,function(){
        res.redirect("/login");
    })    
    })
})

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}

module.exports = c;