const bcrypt = require('bcrypt');
const crypto = require("crypto");
const jwt = require("jsonwebtoken")
const { ObjectId } = require("mongodb");

const userModel = require("./../models/user.model")



const userLogin = async (req, res)=>{
    try {
        let {username, password} = req.body;
        /* Fetching User Data */
            let ad = await userModel.aggregate([
                {
                    $match: {
                        $or:[{user_username:username}, {user_email:username}],
                    }
                },
            ]);
        /* Fetching User Data */
        if (ad.length == 0) {
            return res.status(401).send({
                'message':"Wrong Username", 
                "success": false, 
                'data': []
            })

        }
        if (ad[0].user_password === null) {
            return res.status(401).send({
                message:"Password not found", 
                success: false, 
                data: []
            })

        }
        /* Validating Password */
            let validPass = await bcrypt.compare(password, ad[0].user_password);
            if (!validPass) {
                return res.status(401).send({
                    message:"Wrong Password", 
                    success: false, 
                    data:[]
                }) 
            }
            if (ad[0].user_status == "INACTIVE") {
                return res.status(401).send({
                    message:"Inactive User", 
                    success: false, 
                    data:[]
                }) 
            }
        /* Validating Password */
        /* Token Generation */
            let token = jwt.sign({
                _id: ad[0]._id, 
                user_username: ad[0].user_username, 
                user_name: ad[0].user_name,
            }, 
            process.env.SECRET, 
            {
                expiresIn: 86400, // 24 Hrs

                algorithm: "HS256"
            })
        /* Token Generation */
        
        res.status(200).send({
            'message':"Successfully Logged In", 
            "success": true, 
            'data': [
                {
                    token:token, 
                    name: ad[0].user_name, 
                    username: ad[0].user_username, 
                    email_id: ad[0].user_email,
                }
            ]
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            data: error,
            message: "Something went wrong"
        })
        
    }
}
module.exports = {
    userLogin,
}
