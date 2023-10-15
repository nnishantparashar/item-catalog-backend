const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true,
        trim:true,
    },
    productList:[{
        productId:String,
        name:String,
        image:String,
        price:Number,
        quantity:Number,
        
    },
    ],
    totalAmount:{
        type:Number,
        trim:true
    }
});

module.exports = mongoose.model('Carts', cartSchema);