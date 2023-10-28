const express = require("express");
const { isAuth } = require("../utils/authentication");
const { isAdmin } = require("../utils/authorization");
const { getAllOrders, getOrderByOrderId, getOrderByUserId, placeOrder, deleteOrderById } = require("../controllers/order.controller");
const router = express.Router();

//get all orders
router.get("/orders", isAuth, isAdmin, getAllOrders);
//get orders by orderId
router.get("/order/:orderId", isAuth, getOrderByOrderId); 
//get all orders of given user
router.get("/orders/:userId", isAuth, getOrderByUserId); 
// place order
router.post("/place-order", isAuth, placeOrder); 
//delete order by  orderId
router.post("/cancel-order/:orderId", isAuth, isAdmin, deleteOrderById);

module.exports = router;

