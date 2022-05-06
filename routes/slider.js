var express = require('express');
var router = express.Router();
const imageController = require('../controllers/slider');


//save slide database
router.post('/add',imageController.saveImage);
//get image from db
router.get('/image',imageController.getImage);
//update slider
router.put('/update/:id',imageController.updateSlider);
//search id slider
router.get('/:id',imageController.getSLiderId);
//delete slider
router.delete('/delete/:id',imageController.deleteSlider);

module.exports = router;