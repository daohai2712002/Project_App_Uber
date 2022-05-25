const mongoose = require('mongoose');
const Schame = mongoose.Schema;

const Categories = new Schame({
    name:{
        type:String,
        required:true,
        unique:true
    },
  
    slug:{
        type:String,
        required:true
    },
    productId:[{
        type:Schame.Types.ObjectId,
        ref:"Products"
    }],
    userId:[{
        type:Schame.Types.ObjectId,
        ref:"User"
        
    }]

},{timestamps:true});
const Category = mongoose.model('Categories', Categories);
module.exports = Category;