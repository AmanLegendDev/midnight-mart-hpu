"use client";

import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";

const hostelCharges = {
"Boys Hostel": 15,
"Girls Hostel": 10,
"Library Side": 20,
"Admin Block": 5,
"Main Gate": 25
};

export default function CheckoutPage() {

/*
ZUSTAND STORE ACCESS (INSIDE COMPONENT ONLY)
*/

const cart = useCartStore(state => state.cart);

const clearCart = useCartStore(state => state.clearCart);


/*
SUBTOTAL
*/

const subtotal = cart.reduce(
(acc,item)=>acc + item.sellingPrice * item.qty,
0
);


/*
FORM STATE
*/

const [form,setForm] = useState({

customerName:"",
phone:"",
hostel:"",
room:"",
note:""

});


/*
DELIVERY CHARGE
*/

const deliveryCharge =
hostelCharges[form.hostel] || 0;


/*
TOTAL
*/

const totalAmount =
subtotal + deliveryCharge;


/*
FORM HANDLER
*/

const handleChange = e => {

setForm({

...form,
[e.target.name]:e.target.value

});

};


/*
CREATE ORDER
*/

const handlePlaceOrder = async () => {

if(
!form.customerName ||
!form.phone ||
!form.hostel ||
!form.room
){
alert("Fill required fields");
return;
}

const res = await fetch("/api/orders/create", {

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

...form,
items: cart.map(item => ({
productId: item._id,
title: item.name,
sellingPrice: item.sellingPrice,
actualPrice: item.actualPrice,
qty: item.qty
})),
subtotal,
deliveryCharge,
totalAmount

})

});

const data = await res.json();


/*
SAVE ORDER FOR SUCCESS PAGE
*/

localStorage.setItem(
"lastOrder",
JSON.stringify(data)
);


/*
CLEAR CART
*/

clearCart();


/*
REDIRECT
*/

window.location.href="/order-success";

};


return(

<section className="bg-[#020617] min-h-screen text-white pb-32">

<Navbar/>

<div className="max-w-6xl mx-auto px-4 pt-6 grid md:grid-cols-2 gap-6">


{/* CUSTOMER FORM */}

<div className="bg-[#020617] border border-white/10 rounded-2xl p-5 space-y-4">

<h2 className="text-lg text-yellow-400 font-semibold">

Delivery Details

</h2>


<input
name="customerName"
placeholder="Full Name"
className="input-style"
onChange={handleChange}
/>


<input
name="phone"
placeholder="Phone Number"
className="input-style"
onChange={handleChange}
/>


<select
name="hostel"
className="input-style"
onChange={handleChange}
>

<option value="">
Select Hostel
</option>

{Object.keys(hostelCharges).map(hostel=>(
<option key={hostel}>
{hostel}
</option>
))}

</select>


<input
name="room"
placeholder="Room Number"
className="input-style"
onChange={handleChange}
/>


<textarea
name="note"
placeholder="Extra instructions (optional)"
className="input-style"
onChange={handleChange}
/>

</div>



{/* ORDER SUMMARY */}

<div className="bg-[#020617] border border-white/10 rounded-2xl p-5">

<h2 className="text-lg text-yellow-400 font-semibold mb-4">

Order Summary

</h2>


{cart.map(item=>(

<div
key={item._id}
className="flex justify-between mb-2 text-sm"
>

<span>
{item.title} × {item.qty}
</span>

<span>
₹ {item.sellingPrice * item.qty}
</span>

</div>

))}


<hr className="my-3 border-white/10"/>


<div className="flex justify-between text-sm">

<span>Subtotal</span>

<span>₹ {subtotal}</span>

</div>


<div className="flex justify-between text-sm">

<span>Delivery Charge</span>

<span>₹ {deliveryCharge}</span>

</div>


<hr className="my-3 border-white/10"/>


<div className="flex justify-between text-lg font-semibold text-yellow-400">

<span>Total</span>

<span>₹ {totalAmount}</span>

</div>


<motion.button
whileTap={{scale:.95}}
onClick={handlePlaceOrder}
className="w-full mt-6 bg-yellow-400 text-black py-3 rounded-xl font-semibold shadow-lg"
>

Place Order

</motion.button>


</div>

</div>

</section>

);

}