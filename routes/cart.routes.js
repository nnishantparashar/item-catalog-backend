const express = require("express");
const { isAuth } = require("../utils/authentication");
const { getCartItems, addCartItem, removeCartItem, updateCartItem } = require("../controllers/cart.controller");
const router = express.Router();

//get all items
router.get("/cartItems", isAuth, getCartItems);
//add item to cart
router.post("/addToCart", isAuth, addCartItem);
//remove item from cart
router.post("/removeFromCart", isAuth, removeCartItem);
//update item in cart
router.post("/updateItem", isAuth, updateCartItem);

module.exports = router;