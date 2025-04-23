const asyncHandler = require("express-async-handler");
const db = require("../config/dbConnection");


var selectedItem = 0;
let orderIds = 0;

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

});


//@desc Get a particular order
//@route GET /api/orders/:id
//@access public 
const getOrder = asyncHandler(async (req,res) =>{
  // res.status(200).json({message: `Get a particular order ${req.params.id}`});

  db.query("SELECT * FROM orders", (err, results) =>{
    if(err){
      console.log("DB error: ",err);
      return res.status(500).json({message: "Failed to get orders"});
    }

    orderIds = results.map(order => order.order_id); // filter to the
    console.log("request id: ",req.params.id);
    

    for(let i =0; i< results.length; i++){
      if(orderIds[i] == req.params.id){
        res.status(200).json({
          "orderid": results[i].order_id,
          "customer id": results[i].cutomer_id,
          "title": results[i].title,
          "price": results[i].price,
          "last updated": results[i].last_updated
        });

      }else{
        // res.status(200).json({message:"Item not found"});
        console.log("Item not found");
      }
      
    }
  });


  db.query("SELECT * FROM order_tracking WHERE order_id = ?", [req.params.id], (err, trackingResults) => {
    if (err) {
      console.log("DB error: ", err);
      return res.status(500).json({ message: "Failed to get tracking info" });
    }

    if(trackingResults.length === 0){
      return res.status(404).json({message: "Tracking info not found"});
    }

    const trackingInfo = {
      tracking_id: trackingResults[0].tracking_id,
      latitude: trackingResults[0].latitude,
      longitude: trackingResults[0].longitude,
      order_status: trackingResults[0].order_status,
    };

    console.log(trackingInfo);
  });


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
  selectedItem = req.body.id;
  console.log("Selected item: ", selectedItem);
});

module.exports = {getOrders, getOrder, createOrder};