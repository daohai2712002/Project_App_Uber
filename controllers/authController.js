const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const Users = require('../models/user');
let refreshTokens = [];
const authController = {
    //get all user
    getUser: async(req,res)=>{
        try {
            const getUser = await User.find();
            res.status(200).json(getUser);
        } catch (err) {
            res.status(500).json(err);
            
        }
    },
    //generate ACCESS TOKEN
    generateAccessToken: (user)=>{
        return jwt.sign(
            {
                id:user.id,
                admin:user.admin
            },
            process.env.JWT_ACCESS_KEY,//key
            {expiresIn:"2h"}//thoi gian het han token
        
        );
    },
    //generate REFRESH TOKEN
    generateRefreshToken: (user)=>{
        return jwt.sign(
            {
                id:user.id,
                admin:user.admin
            },
            process.env.JWT_REFRESH_KEY,//key
            {expiresIn:"365d"}//thoi gian het han token
        
        );
    },
    //register
    registerUser: async(req, res)=>{
        try {
            //hash password
            const salt = await bcrypt.genSalt(10);

            const hashed = await bcrypt.hash(req.body.password, salt);
            //creat new user
            const newUser = await new User({
                name: req.body.name,
                email: req.body.email,
                password: hashed,
                phone:req.body.phone
            });
            //luu database
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);  
            console.log(err)
        }
       
    },

    login: async(req,res)=>{
        try {
            const user = await User.findOne({ name: req.body.name });
            if (!user) {
                return res.status(404).json("Wrong username!");
            };
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            
            if (!validPassword) {
                return res.status(404).json("Wrong password");
            };
            if (user && validPassword){
              
                const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateRefreshToken(user);
                refreshTokens.push(refreshToken);
                res.cookie("refreshToken", refreshToken,{
                    httpOnly:true,//chi xac thuc khi co http
                    secure:false,
                    path:"/",
                    sameSite:"strict"//ngan cha tan cong csrf
                })
                //an password
                const{password, ...others} = user._doc;
                res.status (200).json({...others,accessToken});
            };
           
        } catch (err) {
            res.status(500).json(err);
            
        }
        
    },
    requestRefreshToken: async(req,res)=>{
        //take refresh token from user
        const refreshToken = req.cookies.refreshToken;
        //kiem tra xem co ton tai hay k
        if (!refreshToken) return res.status (401).json("You're not authenticated");
            if(!refreshTokens.includes(refreshToken)){
                res.status(500).json("Refresh token is not valid");
            }
            //xac thuc
            jwt.verify(refreshToken,process.env.JWT_REFRESH_KEY, (err,user) =>{
            if(err) {
            console.log(err);
            }
            //loc token cu ra vi da co token moi
            refreshTokens = refreshTokens.filter ((token) => token !== refreshToken);
            //Create new accesstoken, refresh token
            const newAccessToken= authController.generateAccessToken(user);
            const newRefreshToken= authController.generateRefreshToken(user);
            refreshTokens.push(refreshToken);
            res.cookie("refreshToken", newRefreshToken, {
            httpOnly:true,
            secure: false,
            path: "/",
            sameSite: "strict",
            });
            res.status(200).json({accessToken:newAccessToken});
    });
        
    },
    //changPassword
    changePassword: async(req,res)=>{
        try {
            console.log("thay doi mk");
            res.status(200).json("change password success");
        } catch (err) {
            res.status(500).json(err);
            
        }
        
    },
    //delete user
    deleteuser: async(req,res)=>{
        try{const user= await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully");
        }catch(err) {
            res.status(500).json(err);
        }
    },
    //logout
    logout: async(req,res)=>{
        res.clearCookie("refreshToken");
        refreshTokens= refreshTokens.filter(
            (token) => token !== req.cookies.refreshToken
        );
        res.status(200).json("Logged out !");
    },
    //search
    searchUser:async(req,res)=>{
        try {
            const searchUser = await Users.find({
                "$or":[
                    {
                        name:{$regex:req.params.key}
                        
                    },
                    {
                        email:{$regex:req.params.key}
                    }
                    
                ]    
            });
            res.status(200).json(searchUser);
        } catch (err) {
            res.status(400).json(err);
        }
    }
       
}
module.exports = authController;