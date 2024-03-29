const Category = require('../models/category');

const categoryController = {
    //add category
    addCategory:async(req,res)=>{
        try {
            const addCategory = await new Category({
                name: req.body.name,
                slug:req.body.slug,
                userId:req.user._id
            });
            addCategory.save();
            res.status(200).json("add success");
        } catch (err) {
            res.status(500).json(err);
            
        }
       
    },
    //show
    getCategory:async(req,res)=>{
        try {
            const getCategory = await Category.find();
            res.status(200).json(getCategory);
        } catch (err) {
            res.status(500).json(err);
            
        }
    },
    //show follow id
    getCategoryId:async(req,res)=>{
        try {
            const id = req.params.id;
            const getCategoryId = await Category.findById(id);
            res.status(200).json(getCategoryId);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //update
    updateCategory: async(req,res)=>{
        try {
            const id = req.params.id;
            const option= req.body;
            const updateCategory = await Category.findByIdAndUpdate(id,option,{new:true});
            res.status(200).json(updateCategory);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //delete
    deleteCategory: async(req,res)=>{
        try {
            const deleteCategory = await Category.findByIdAndDelete(req.params.id);
            res.status(200).json("delete success fully!");
        } catch (err) {
            res.status(500).json(err);
            
        }
    }
}
module.exports = categoryController;