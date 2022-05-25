const mongoose = require('mongoose');
const Schame = mongoose.Schema;
const Products = new Schame({
    name:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:String,
        required:true
    },
    productImage:{
        data: Buffer,
        contentType:String
    },
    rating:{
        type:String,
        required:true
    },
    category:[{
        type: Schame.Types.ObjectId,
        ref:"Categories"
    }],
    userId:[{
        type: Schame.Types.ObjectId,
        ref:"User"
        
    }],
    description:{
        type:String,
        required:true
    }

},{timestamps:true});
const Product = mongoose.model('Products', Products);
module.exports = Product;