const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();

//add category
router.post('/add',categoryController.addCategory);
//get all
router.get('/getCategory',categoryController.getCategory);
//update
router.put('/update/:id',categoryController.updateCategory);
//delete
router.delete('/delete/:id',categoryController.deleteCategory);
//get id
router.get('getCategory/:id',categoryController.getCategoryId);


module.exports = router;