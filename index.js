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
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(authRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use(orderRoutes);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log("App is running on PORT :", PORT);
});