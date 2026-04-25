import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
{
customerName: String,

phone: String,

address: String,

note: String,

items: [

{
productId: mongoose.Schema.Types.ObjectId,

title: String,

price: Number,

qty: Number

}

],

totalAmount: Number,

paymentStatus: {
type: String,
default: "pending"
},

orderStatus: {
type: String,
default: "placed"
}

},
{ timestamps: true }
);

export default mongoose.models.Order ||
mongoose.model("Order", orderSchema);