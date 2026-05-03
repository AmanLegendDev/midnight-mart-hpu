import mongoose from "mongoose";

const customOrderSchema=new mongoose.Schema({

name:String,

phone:String,

hostel:String,

room:String,

item:String,

note:String,

status:{
type:String,
default:"pending"
},

campus:{
type:String,
default:"HPU"
},

status:{
type:String,
enum:["new","delivered"],
default:"new"
}

},{
timestamps:true
});

export default mongoose.models.CustomOrder ||
mongoose.model("CustomOrder",customOrderSchema);