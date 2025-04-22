const express = require("express");
const dotenv = require("dotenv").config(); // load .env

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/orders", require("./routes/orderRouts"));

app.listen(port, ()=> {
  console.log(`Server is running on port ${port}`);
});