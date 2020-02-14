
const Post = require('../models/post').Post
const Admin = require('../models/admin').Admin


module.exports = {
    index: async(req, res) => {
        await Post.find({}, {"_id":1, _id:0}).sort({"_id":-1}).then((post)=>{
            res.render("index.ejs", {post});
        }).catch(err=>{
            console.log(err)
        })
    },

    
    admin:async(req, res)=>{
        let pageTitle = 'Home'
        await Admin.findOne().then(async(admin)=>{
            await Post.find().then(post=>{
                // console.log(post)
                res.render('admin.ejs',{pageTitle, post, admin})
        })
    })
},

    projectGet: (req, res) => {
        let pageTitle = "Project";
        Post.find().then(posts => {
            res.render("projects.ejs",{pageTitle});
        })
        
    },

projectPost: async (req,res) => {
        const newPost =  new Post({
        Title: req.body.Title,
        Category: req.body.Category,
        Link: req.body.Link
    });

   await newPost.save().then(post =>{
       console.log(post);
       req.flash('success-message', 'project added successfully')
       return res.redirect('/admin')
   });

    
},
delete:async(req, res)=>{
    let id = req.params.id
    console.log(id)
    await Post.findOneAndDelete(id).then(post=>{
        console.log('project deleted successfully')
        req.flash('error-message', 'post deleted successfully')
        return res.redirect('/admin')
    }).catch(err=>{
        console.log('something went wrong')
        req.flash('error-message', 'something went wrong please try again')
    })
}
    
}


