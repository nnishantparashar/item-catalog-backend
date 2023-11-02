const Carts = require("../models/cart.model");
const Users = require("../models/user.model");

exports.getCartItems = async (req, res) => {
  try {
    const userId = req.params.userId;
    const User = await Users.findOne({id: userId});
    const user = User.email;
    const cartUser = await Carts.findOne({ user: user });
    if (cartUser) {
      return res.status(200).send({
        message: "Cart data have been retrieved successfully.",
        data: cartUser,
      });
    }

    return res.status(200).send({
      message: "No item in user's cart",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.addCartItem = async (req, res) => {
  try {
    const payload = req.body;
    const newItem = payload.productList;
    const user = payload.user;
    const total = payload.totalAmount;

    const cartUser = await Carts.findOne({ user: user });
    if (!cartUser) {
      const newCart = new Carts(payload);
      newCart
        .save()
        .then((data) => {
          return res.status(200).send({
            message: "item successfully added to new cart",
            data: data,
          });
        })
        .catch((error) => {
          return res.status(400).send({
            message: "Error while adding item to new cart.",
            error: error,
          });
        });
    } else {
      Carts.updateOne(
        { user: user },
        { $push: { productList: newItem } },
      )
        .then(async (data) => {
          await cartUser.updateOne({ $set: { totalAmount: total } });
          return res.status(200).send({
            message: "item successfully added to existing cart",
          });
        })
        .catch((error) => {
          return res.status(400).send({
            message: "Error while adding item to existing cart.",
            error: error,
          });
        });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const payload = req.body;
    const removeItem = payload.productId;
    const user = payload.user;
    const total = payload.totalAmount;

    Carts.updateOne(
      { user: user },
      { $pull: { productList: { productId: removeItem } } }
    )
      .then(async (data) => {
        if (data.modifiedCount !== 0) {
          const cartUser = await Carts.findOne({ user: user });
          await cartUser.updateOne({ $set: { totalAmount: total } });
          if (cartUser.productList.length === 0) {
            await cartUser.deleteOne();
          }
          return res.status(200).send({
            message: "item successfully removed from cart",
            data: data,
          });
        } else {
          return res.status(200).send({
            message: "item not found in your cart.",
            data: data,
          });
        }
      })
      .catch((error) => {
        return res.status(400).send({
          message: "Error while removing item from cart.",
          error: error,
        });
      });
    // }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.updateCartItem = async(req, res) => {
  try {
    const payload = req.body;
    const productId = payload.productId;
    const user = payload.user;
    const newQuantity = payload.quantity;
    const total = payload.totalAmount;
    const cartUser = await Carts.findOne({ user: user });

    Carts.findOneAndUpdate(
      { user: user, "productList.productId": productId },
      { $set: { "productList.$.quantity": newQuantity } }
    )
      .then(async (data) => {
        await cartUser.updateOne({ $set: { totalAmount: total } });
        return res.status(200).send({
          message: "item successfully updated",
        });
      })
      .catch((error) => {
        return res.status(400).send({
          message: "Error while updating.",
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
