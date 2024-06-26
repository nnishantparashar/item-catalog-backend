require("dotenv").config();
const express = require("express");
const { db } = require("./db/connect");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");
const cors = require("cors");
const app = express();

//Connect to DB
db();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://exquisite-mousse-c75562.netlify.app/"); 
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(authRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use(orderRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("App is running on PORT :", PORT);
});
