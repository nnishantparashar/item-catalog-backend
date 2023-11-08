const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productId:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    name:{
        type: String,
        required: true,
        trim: true,
    },
    price:{
        type: Number,
        required: true,
        trim: true,
    },
    image:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    quantity:{
        type: Number,
        required: true,
        trim: true,
    },
    shortDescription:{
        type: String,
        required: true,
        trim: true,
    },
   

},
{timestamps:true},
);

module.exports = mongoose.model("Products", productSchema);