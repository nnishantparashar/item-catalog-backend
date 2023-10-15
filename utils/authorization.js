const Users = require("../models/user.model");

exports.isAdmin = async (req, res, next) => {
  const { _id } = req;

  if (_id) {
    const currentUser = await Users.findOne({ _id: _id });
    if (currentUser.role !== "0") {
      return res.status(401).send({
        message: "Access denied! Admin Resource.",
      });
    }
    return next();
  }
  return res.status(401).send({
    message: "Access denied! Admin Resource.",
  });
};

