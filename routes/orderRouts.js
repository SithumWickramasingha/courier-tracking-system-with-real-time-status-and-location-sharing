const express = require("express");
const router = express.Router();
const  {getOrders,getOrder, createOrder} = require("../controllers/orderController");


router.route("/").get(getOrders).post(createOrder);

router.route("/:id").get(getOrder);

module.exports = router;