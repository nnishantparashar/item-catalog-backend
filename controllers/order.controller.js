const { createSecretKey } = require("crypto");
const Orders = require("../models/order.model");
const Users = require("../models/user.model");
const Carts = require("../models/cart.model");

exports.getAllOrders = (req, res) => {
  try {
    Orders.find()
      .then((data) => {
        return res.status(200).send({
          message: "Orders have been retrieved successfully.",
          data: data,
        });
      })
      .catch((error) => {
        return res.status(400).send({
          message: "Error while retrieving orders.",
          error: error,
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.getOrderByOrderId = (req, res) => {
  try {
    const orderId = req.params.orderId;
    Orders.findOne({ _id: orderId })
      .then((data) => {
        if (!data) {
          return res.status(200).send({
            message: "No order found with the given Id.",
          });
        }

        res.status(200).send({
          message: "Order have been retrieved successfully.",
          data: data,
        });
      })
      .catch((error) => {
        return res.status(400).send({
          message: "Error while retrieving order data.",
          erroe: error,
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.getOrderByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const currentUser = await Users.findOne({ _id: userId });
    const user = currentUser.email;

    Orders.find({ user: user })
      .then((data) => {
        if (!data) {
          return res.status(200).send({
            message: "No order found with the given userId.",
          });
        }

        res.status(200).send({
          message: "Order have been retrieved successfully.",
          data: data,
        });
      })
      .catch((error) => {
        return res.status(400).send({
          message: "Error while retrieving order data.",
          erroe: error,
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.placeOrder = async (req, res) => {
  try {
    const payload = req.body;
    const user = payload.user;
    const newOrder = new Orders(payload);
    newOrder
      .save()
      .then(async (data) => {
        await Carts.deleteOne({user:user});
        res.status(200).send({
          message: "Order placed successfully.",
          data: data,
        });
      })
      .catch((error) => {
       
        return res.status(400).send({
          message: "Error while placing order.",
          error: error,
        });
      });
      // update quantity of product after placing order
      const products = await Products.find();
      const orders = await Orders.find();
      products.forEach((product) => {
        orders.productList.forEach((item) =>{
          if(product.productId === item.productId){
            let id = product.productId;
            let newQuantity = product.quantity - item.quantiy;
            Products.findOneAndUpdate(
              { productId: id },
              { $set: { "quantity": newQuantity } }
            );
          }
        }
        )
        
      });

  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.deleteOrderById = (req, res) => {
  try {
    const orderId = req.params.orderId;
    Orders.deleteOne({ _id: orderId })
      .then((data) => {
        res.status(200).send({
          message: "Order has been deleted successfully.",
          data: data,
        });
      })
      .catch((error) => {
        return res.status(400).send({
          message: "Error while deleting order data.",
          erroe: error,
        });
      });
      // update quantity of product after deleting order
  } catch (error) {
    
    res.status(500).send({
      message: "Internal server error",
      error: error,
    });
  }
};
