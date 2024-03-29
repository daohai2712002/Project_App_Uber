const jwt = require("jsonwebtoken");
const middlewareController = {
    //verifyToken
    verifyToken: (req,res, next) => {
        //lay token
        const token = req.headers.token;
        
        //kiem tra
        if(token) {
            //lay khoang trang
            const accessToken = token.split(" ")[1];
            //xac thuc token
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) =>{
                if(err) {
                    res.status (403).json ("Token is not valid");
                }
                req.user = user;
                next();
            
        });
    }
    else{
        res.status (481).json ("You're not authenticated");
     }
    },
    verifyTokenAndAdminAuth: (req, res, next) => {
        middlewareController.verifyToken (req, res, () => {
                if (req.user.id = req.params.id || req.user.admin) {
                    next();
                } else {
                    res.status (483).json("You're not allowed to delete other");
                    }
            });
        },

}

module.exports = middlewareController;