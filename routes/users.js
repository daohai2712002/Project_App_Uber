var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

const authController = require('../controllers/authController');
const { route } = require('.');
const middlewareController = require('../controllers/middlewareController');
router.use(bodyParser.json());
//register
router.post("/register",authController.registerUser);
router.post("/login",authController.login);
router.get("/all",middlewareController.verifyToken,authController.getUser);
router.delete("/:id", middlewareController.verifyTokenAndAdminAuth ,authController.deleteuser);
//refresh token
router.post("/refresh",authController.requestRefreshToken);
//logout
router.post("/logout",middlewareController.verifyToken,authController.logout);
//search
router.get('/search/:key',authController.searchUser);
module.exports = router;
