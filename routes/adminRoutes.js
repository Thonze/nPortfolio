const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const {isUserAuthenticated} = require("../config/customFunctions");
const {projectGet, admin,details, ProjectPost} = require("../controllers/adminController");
const passport = require('passport');
const flash = require('connect-flash')
 

router.all('/*', isUserAuthenticated, (req, res, next) => {

    req.app.locals.layout = 'admin';

    next(); 
});


router.route('/index')
    .get(adminController.index)

router.route('/')
 .get(isUserAuthenticated,adminController.admin);

 //Project
router.route('/project', isUserAuthenticated)
    .get( isUserAuthenticated,adminController.projectGet)
    .post( isUserAuthenticated,adminController.projectPost)


router.route('/delete/:id')
    .delete(isUserAuthenticated,adminController.delete)

router.route('/')
    

  




module.exports = router;