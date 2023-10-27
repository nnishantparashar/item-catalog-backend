const jwt = require("jsonwebtoken");

exports.isAuth = async (req, res, next) => {
  
  const token = req.headers.authorization.split(" ")[1];
  if(!token || token === ''){
    return res.status(401).send({
      message: "Please login to continue.."
    });
  }
  if (token) {
    console.log("Auth token : ", token)
    let obj = await jwt.verify(token, process.env.SECRET_KEY);

    req._id = obj._id;
    if (!obj._id) {
      return res.status(401).send({
        message: "Not Authenticated",
      });
    }
    return next();
  }
  return res.status(401).send({
    message: "Not Authenticated",
  });
};
