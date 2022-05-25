const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');



//add product
router.post('/add',productController.addProduct);
//show products
router.get('/all',productController.getAllProduct);
//show product fl id
router.get('/:id',productController.getProductId);
//update product
router.put('/update/:id',productController.updateProduct);
//delete
router.delete('/delete/:id',productController.deleteProduct);
//search
router.get('/search/:key',productController.searchProduct);
module.exports = router;