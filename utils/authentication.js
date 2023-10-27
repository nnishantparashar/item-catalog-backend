const jwt = require("jsonwebtoken");

exports.isAuth = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({
      message: "Not Authenticated",
    });
  }
  try {
    token = token.split(' ')[1]
    if(token === 'null' || !token){
      return res.status(401).send({
        message: "Not Authenticated",
      });
    }
    let obj = await jwt.verify(token, process.env.SECRET_KEY);

    req._id = obj._id;
    if (!obj._id) {
      return res.status(401).send({
        message: "Not Authenticated",
      });
    }
    return next();
  } 
  catch(error){
    return res.status(401).send({
      message: "Not Authenticated",
    });
  }
 

  // const { cookies } = req;
  // if (cookies.accessToken) {
  //   let obj = await jwt.verify(cookies.accessToken, process.env.SECRET_KEY);

  //   req._id = obj._id;
  //   if (!obj._id) {
  //     return res.status(401).send({
  //       message: "Not Authenticated",
  //     });
  //   }
  //   return next();
  // }
  // return res.status(401).send({
  //   message: "Not Authenticated",
  // });
};
