// import mongoose, { Schema } from "mongoose";

// const orderHistorySchema = new Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   items: [
//     {
//       productId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Product",
//       },
//       quantity: {
//         type: Number,
//         required: true,
//       },
//     },
//   ],
//   orderPlacedAt: {
//     type: Date,
//     defaultValue: Date.now,
//   },
//   totalPrice: {
//     type: Number,
//     required: true,
//   },
// });

// export const OrderHistory = mongoose.model("OrderHistory", orderHistorySchema);


import mongoose, { Schema } from "mongoose";

const orderHistorySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity:  { type: Number, required: true }
    }
  ],
  totalPrice:     { type: Number, required: true },
  orderPlacedAt:  { type: Date, default: Date.now }
}, { timestamps: true });

export const OrderHistory = mongoose.model("OrderHistory", orderHistorySchema);