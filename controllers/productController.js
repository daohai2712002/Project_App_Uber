const Product = require('../models/products');
const multer  = require('multer');

const productController = {
    //add product
    addProduct:async(req,res)=>{

        const storage = multer.diskStorage({
            destination:'uploads',
            filename:(req,file,cb)=>{
                cb(null,file.originalname);
            }
        });
        const upload = multer({ storage: storage }).single('testImage');

       
        
        upload(req,res,(err)=>{
            if(err) return res.status(400).json(err);
            else{
                    const product = new Product({
                        name: req.body.name,
                        rating:req.body.rating,
                        price:req.body.price,
                        category:req.body.category,
                        description:req.body.description,
                        userId:req.user._id,
                        productImage:{
                            data:req.file.filename,
                            contentType:'image/png'    
                            }

        })
        product.save()
        .then(()=> res.send('add successfully').status(201))
        .catch((err)=> console.log(err));
                   
                    
                
            }
        })

       
    },
    //show all product
    getAllProduct:async(req,res)=>{
        try {
            const getAllProduct = await Product.find();
            res.status(200).json(getAllProduct);
            
        } catch (err) {
            res.status(400).json(err);
        }
    },
    //show product follow id
    getProductId:async(req,res)=>{
        try {
            const id = req.params.id;
            const getProductId = await Product.findById(id);
            res.status(200).json(getProductId);
        } catch (err) {
            res.status(400).json(err);
        }
        
    },
    //delete product

    deleteProduct:async(req,res)=>{
        try{
            const id =req.params.id;
            await Product.findByIdAndRemove(id);
            res.status(200).json("delete successfully");
        }catch(err){
            res.status(400).json(err);
        }
    },
    //update product
    updateProduct:async(req,res)=>{
      try {
        const id = req.params.id;
        let new_image=''
        const  updateProduct =await Product.findByIdAndUpdate(id,{
            name: req.body.name,
            rating:req.body.rating,
            price:req.body.price,
            category:req.body.category,
            description:req.body.description,
            productImage:new_image
        },{new:true});
        res.status(200).json("update successfully id :" + id);
      } catch (err) {
          res.status(400).json(err);
      }
    },
    //search product
    searchProduct: async(req,res)=>{
        try {
            const searchProduct = await Product.find({
                "$or":[
                    {
                        name:{$regex:req.params.key}
                        
                    },
                    {
                        price:{$regex:req.params.key}
                    }
                    
                ]    
            });
            res.status(200).json(searchProduct);
        } catch (err) {
            res.status(400).json(err);
        }
        
    }
}

module.exports = productController;