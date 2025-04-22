//@desc Get all orders
//@route GET /api/orders
//@access public 

const getOrders = (req,res) => {
  res.status(200).json({message: "Get all orders"});
}

//@desc create contacts
//@route POST /api/contacts
//@access public 

const createOrder = (req,res) => {
  console.log("The id: ", req.body);
  res.status(200).json({message: "create a contact"});
}

module.exports = {getOrders, createOrder};