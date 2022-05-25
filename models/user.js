const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose');
const User = new Schema({
    name:{
        type: String,
        required: true,
        minlength: 6,
        maxlength:20,
        unique:true,
        
    },
    email:{
        type: String,
        required: true,
        minlength: 10,
        maxlength:50,
        unique:true
    },
    password:{
        type: String,
        required: true,
        minlength: 10,
        
    }, 
    phone:{
        type:String,
        required:true,
        minlength:10,
        maxlength:12
    },
    admin:{
        type:Boolean,
        default:false
    }
},{timestamps:true});
// User.plugin(passportLocalMongoose);
var Users = mongoose.model('User', User);

module.exports = Users;