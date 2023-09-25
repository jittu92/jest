const jwt = require("jsonwebtoken")
const userModel = require("./../models/user.model")



const verifyToken = async (req, res, next)=>{
    let token = req.headers['authorization']
    if(!token){
        return res.status(403).send({
            success: false,
            message: "No Token Provided",
            data: req.headers.authorization
        })
    }
    token  = (token.split(' '))[1]
    // console.log(token);
    jwt.verify(token, process.env.SECRET, {
        algorithm: "HS256"
    },async (err, decoded)=>{
        if (err) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized!",
                data: []
            })  
        }
        else{
            let user_details = await userModel.findById(decoded._id);
            if(user_details == null){
                return res.status(401).send({
                    success: false,
                    message: "User Not found",
                    data: []
                })  
            }
            else{
                req.user = decoded._id
                next();
            }
        }
    })
}


module.exports = {
    verifyToken,
}

