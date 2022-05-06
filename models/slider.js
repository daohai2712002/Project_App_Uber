const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Slider = new Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        data:Buffer,
        contenType:String
    }
},{timestamps:true});
const Sliders = mongoose.model('Slider', Slider);
module.exports = Sliders;