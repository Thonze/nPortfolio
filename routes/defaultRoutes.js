const defaultController = require('../controllers/defaultController');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const {index, about, contact, admin, project,details, loginGet, loginPost} = require("../controllers/defaultController");
const Admin = require('../models/admin').Admin;

router.all('/*',  (req, res, next)=>{
  req.app.locals.layout = 'default';
  next() 
});



//define local strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, (req, email, password, done) => {
      Admin.findOne({email: email}).then(user => {
        if(!user){
          Admin.findOne({email:email}).then(user =>{
            if(!user){
              return done(null, false, req.flash('error-message', 'User not found with this email'));
            }
            bcrypt.compare(password, user.password, (err, passwordMatched) =>{
              if(err){
                return err;
              }
              if(!passwordMatched){
                return done(null, false, req.flash('error-message', 'invalid username or password'));
              }
    
              return done(null, user, req.flash('success-message', 'login successful'));
            });
          })
          
        }
        bcrypt.compare(password, user.password, (err, passwordMatched) =>{
          if(err){
            return err;
          }
          if(!passwordMatched){
            return done(null, false, req.flash('error-message', 'invalid username or password'));
          }

          return done(null, user, req.flash('success-message', 'login successful'));
        });
      });
}));




passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Admin.findById(id, function(err, user) {
    if(!user){
      Admin.findById(id, function(err, user){
        done(err, user);
      })
    }else{
      done(err, user);
    }
    
  });
});






router.route("/",index)
.get(defaultController.index);



router.route('/login',loginGet)
  .get(defaultController.loginGet)
  .post(passport.authenticate('local',{
    successRedirect: '/admin',
    failureRedirect:'/login',
    failureFlash: true,
    successFlash: true,
    session: true
   
  }));


module.exports = router;