const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
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
    billAmount:{
        type:Number,
        trim:true
    },
    orderDate:{
        type:Date,
        default: Date(),
    }
});

module.exports = mongoose.model('Orders', orderSchema);