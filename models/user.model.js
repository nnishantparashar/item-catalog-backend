const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    hashedPassword:{
        type:String,
        required:true,
        trim: true,
    },
    role:{
        type:String,
        default:1,
        trim:true,
    },
    address:{
        type:String,
        required:true,
        trim: true,
    },
    isActive:{
        type:Boolean,
        default:false,
        trim:true
    },
},
{timestamps:true}
);

module.exports = mongoose.model('Users', userSchema);

//Role:
//Admin-> 0, Normal User -> 1