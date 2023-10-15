const express = require("express");
const { isAuth } = require("../utils/authentication");
const { isAdmin } = require("../utils/authorization");
const { getAllProducts, getProductById, addProduct, updateProduct, deleteProductById } = require("../controllers/product.controller");
const router = express.Router();

//get all products
router.get("/products", isAuth, getAllProducts);
//get product by id
router.get("/products/:productId", isAuth, getProductById);
// add new product
router.post("/addProducts", isAuth, isAdmin, addProduct);
//update existing product
router.put("/updateProduct/:productId", isAuth, isAdmin, updateProduct);
//remove product
router.delete("/deleteProduct/:productId", isAuth, isAdmin, deleteProductById)


module.exports = router;