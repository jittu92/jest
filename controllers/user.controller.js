const bcrypt = require('bcrypt');
const crypto = require("crypto");

const {ObjectId} = require('mongodb');

const userModel = require("./../models/user.model");

const getAllUser = async (req, res)=>{
    try {
        
        let ad = await userModel.aggregate([
            {
                $project:{
                    "role":0}
            }
        ]);  
        if(ad.length == 0){
            return res.status(200).send({'message':"User Details Not Found", "success": false, 'data': ad})
        }
        // console.log(user_id);      
        res.status(200).send({'message':"User Details Found", "success": true, 'data': ad})

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            data: error,
            message: error.message
        })
        
    }
}
module.exports = {
    getAllUser,
}