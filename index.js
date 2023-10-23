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

const whitelist = ['http://localhost:3000', 'https://www.netlify.com/'];

// Enable pre-flight requests
app.options('*', cors());

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

//Connect to DB
db();
app.use(express.json());
app.use(cookieParser());
// app.use(cors());
app.use(authRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use(orderRoutes);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log("App is running on PORT :", PORT);
});