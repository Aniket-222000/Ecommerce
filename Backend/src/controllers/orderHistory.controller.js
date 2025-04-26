// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/ApiError.js";
// import { OrderHistory } from "../models/orderHistory.model.js";
// import { ApiResponse } from "../utils/ApiResponse.js";

// const getUserOrders = asyncHandler(async (req, res) => {
//   const userId = req.body._id;
//   if (!userId) {
//     throw new ApiError(400, "User Id is required");
//   }
//   const user = await OrderHistory.find({ user: userId });
//   return res
//     .status(201)
//     .json(new ApiResponse(200, user, "Product Added Successfully"));
// });

// const addOrderHistory = asyncHandler(async (req, res) => {
//   const { userId, items, totalPrice } = req.body;

//   if (!userId || !items || !totalPrice) {
//     console.log(userId, items, totalPrice);
//     throw new ApiError(400, "All fields are required");
//   }

//   const newOrderHistory = await OrderHistory.create({
//     user: userId,
//     items,
//     totalPrice,
//     orderPlacedAt: null,
//   });
//   const addedOrderHistory = await OrderHistory.findById(newOrderHistory._id);
//   if (!addedOrderHistory) {
//     throw new ApiError(500, "Something went wrong while adding Order History");
//   }
//   return res
//     .status(201)
//     .json(
//       new ApiResponse(
//         200,
//         addedOrderHistory,
//         "Order History Added Successfully"
//       )
//     );
// });

// export { getUserOrders, addOrderHistory };


import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { OrderHistory } from "../models/orderHistory.model.js";
import { ApiResponse } from "../utils/apiResponse.js";

const getUserOrders = asyncHandler(async (req, res) => {
  const { userId } = req.query;
  if (!userId) throw new ApiError(400, "User ID is required");
  const orders = await OrderHistory.find({ user: userId });
  res.status(200).json(new ApiResponse(200, orders, "User orders fetched successfully"));
});

const addOrderHistory = asyncHandler(async (req, res) => {
  const { userId ,items,totalPrice} = req.body;
  // if (!userId||!items||!totalPrice)
  //   throw new ApiError(400, "All fields are required");
  console.log(userId)
  
  const newOrder = await OrderHistory.create({ user: userId, items, totalPrice });
  res.status(201).json(new ApiResponse(200, newOrder, "Order history added successfully"));
});

export { getUserOrders, addOrderHistory };
