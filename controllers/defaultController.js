const Post = require('../models/post').Post

module.exports = {

    index:async(req, res)=>{
        let pageTitle = 'Home'
        await Post.find({}, {"_id":1, _id:0}).sort({"_id":-1}).then(post=>{
              res.render('index.ejs',{pageTitle, post})
        }).catch(err=>{
            console.log(err)
        })
    },
       
    loginGet: (req, res) => {
        let pageTitle = "login";
        res.render("login.ejs",{pageTitle});
        req.flash("success-message", "Login Successful")
},



}
    
    

    