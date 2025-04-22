const express = require("express");
const dotenv = require("dotenv").config(); // load .env
const errorHandler = require("./middleware/errorHandler");
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());// get json type data from api
app.use("/api/orders", require("./routes/orderRouts")); // middleware
app.use(errorHandler);

app.listen(port, ()=> {
  console.log(`Server is running on port ${port}`);
});