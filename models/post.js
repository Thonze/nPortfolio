const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
   
   
    Title: {
        type: String,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    Link: {
        type: String,
        required: true
    }
   
    

    
});

module.exports = {Post: mongoose.model('post', postSchema)};


  