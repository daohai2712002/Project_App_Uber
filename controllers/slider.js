const Sliders = require("../models/slider");
const multer  = require('multer');
const { find } = require("../models/slider");


const imageController = {
    //save image data and foder
    saveImage: async(req,res)=>{
        //check diskstorage image
        const storage = multer.diskStorage({
            destination:'uploads',
            filename:(req,file,cb)=>{
                cb(null,file.originalname);
            }
        });
        const upload = multer({ storage: storage }).single('testImage');

        upload(req,res, (err)=>{
            if(err){
                console.log(err);
            }
            else{
                const newImage = new Sliders({
                    name: req.body.name,
                    iamge:{
                        data:req.file.filename,
                        contentType:'image/png'
                    }
                });
                newImage.save().then(() => res.send("success save image")).catch(err => console.log(err));
                
            }
        });
    },
    getImage: async(req,res)=>{
        try {
            const getAllSlider = await Sliders.find();
            
            res.status(200).json(getAllSlider);
        } catch (err) {
            res.status(500).json(err);
            
        }
       
    },
    //update
    updateSlider:async(req,res)=>{
        try {
            const id = req.params.id;
            const update = req.body;
            const updateSlider = await Sliders.findByIdAndUpdate(id,update, { new: true });
            res.status(200).json(updateSlider.name);
        } catch (err) {
            res.status(500).json(err);
            
        }
       
    },
    getSLiderId:async(req,res)=>{
        try {
            const getSliderId = await Sliders.findById(req.params.id);
           
            res.status(200).json(getSliderId);
        } catch (err) {
            res.status(500).json(err);
            
        }
       
    },
    deleteSlider:async(req,res)=>{
        try {
            const deleteSlider = await Sliders.findByIdAndDelete(req.params.id);
            res.status(200).json("delete succcess fully!");
        } catch (err) {
            res.status(500).json(err);
            
        }
        
    }
};

module.exports = imageController;