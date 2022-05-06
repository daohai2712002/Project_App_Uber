const mongoose = require('mongoose');
const Schame = mongoose.Schema;

const categorySchema = new Schame({
    name:{
        type:String,
        required:true,
        unique:true
    },
    parent_id:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    }

},{timestamps:true});
const Category = mongoose.model('cetegorySchema', categorySchema);
module.exports = Category;