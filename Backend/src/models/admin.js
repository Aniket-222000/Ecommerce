import mongoose, { Mongoose } from "mongoose";

const AdminSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,required:true}
},{timestamps:true})
export const Admin=mongoose.model("Admin",AdminSchema)