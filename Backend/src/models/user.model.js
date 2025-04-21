// import mongoose, { Schema } from "mongoose";

// const userSchema = new Schema({
//   username: {
//     type: String,
//     lowercase: true,
//     trim: true,
//     required: [true, "Name is required"],
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowecase: true,
//     trim: true,
//     required: [true, "Email is required"],
//   },
//   password: {
//     type: String,
//     required: [true, "Password is required"],
//   },
//   phonenumber: {
//     type: Number,
//   },
//   address: {
//     type: String,
//   },
//   country: {
//     type: String,
//   },
//   state: {
//     type: String,
//   },
//   city: {
//     type: String,
//   },
//   pincode: {
//     type: Number,
//   },
//   usertype: {
//     type: String,
//     default: "normal",
//     enum: ["normal", "admin"],
//   },
// });

// export const User = mongoose.model("User", userSchema);


import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: String, lowercase: true, trim: true, required: true },
  email:    { type: String, lowercase: true, trim: true, required: true, unique: true },
  password: { type: String, required: true },
  phonenumber: Number,
  address:     String,
  country:     String,
  state:       String,
  city:        String,
  pincode:     Number,
  usertype:    { type: String, enum: ["normal","admin"], default: "normal" }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);