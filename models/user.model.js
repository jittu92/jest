const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator')
const userSchema = new mongoose.Schema({
    user_name:{
        type: String,
        required: true,
        // unique: true
    },
    user_username:{
        type: String,
        required: true,
        unique: true
    },
    user_password:{
        type: String,
        required: false,
        default: null
    },
    user_email:{
        type:String,
        // lowercase: true,
        // required: true,
        // unique: true,
        default:null
    },
    user_status:{
        type: String,
        required: true,
        enum: ['ACTIVE', 'INACTIVE'],
        default: 'ACTIVE'
    },
}, {timestamps:true})
userSchema.plugin(uniqueValidator)
const user = mongoose.model("users", userSchema);
module.exports = user