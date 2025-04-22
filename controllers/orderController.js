const asyncHandler = require("express-async-handler");
const db = require("../config/dbConnection");


//@desc Get all orders
//@route GET /api/orders
//@access public 
const getOrders = asyncHandler(async (req,res) => {

  db.query("SELECT * FROM orders", (err, results)=>{
    if(err){
      console.log("DB error: ",err);
      return res.status(500).json({message: "Failed to get orders"});
    }
    res.status(200).json(results);
  })

  // res.status(200).json({message: "Get all orders"});
});


//@desc create contacts
//@route POST /api/contacts
//@access public 
const createOrder = asyncHandler(async (req,res) => {
  

  //handling the error
  const {id} = req.body;

  if(!id){
    res.status(400);
    throw new Error("Id is missing");
    
  }
  console.log("The id: ", req.body);

  res.status(200).json({message: `the selected id ${req.body.id}`});
});

module.exports = {getOrders, createOrder};