"use client";

import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import Script from "next/script";

export default function CheckoutPage() {

const cart = useCartStore((state) => state.cart);

const subtotal = cart.reduce(
(acc, item) => acc + item.price * item.qty,
0
);

const [form, setForm] = useState({
name: "",
phone: "",
address: "",
note: ""
});

const handleChange = (e) => {

setForm({
...form,
[e.target.name]: e.target.value
});

};



/*
=======================
ONLINE PAYMENT HANDLER
=======================
*/

const handleOrder = async () => {

if (!form.name || !form.phone || !form.address) {

alert("Fill required fields");

return;

}

const saveOrder = await fetch("/api/orders/create", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({

customerName: form.name,
phone: form.phone,
address: form.address,
note: form.note,
items: cart,
totalAmount: subtotal

})

});

const order = await saveOrder.json();


const paymentOrder = await fetch("/api/payment/create-order", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({
amount: subtotal
})

});

const razorpayOrder = await paymentOrder.json();


if (!window.Razorpay) {

alert("Payment SDK not loaded");

return;

}


const options = {

key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

amount: razorpayOrder.amount,

currency: "INR",

name: "Hilaire Store",

description: "Order Payment",

order_id: razorpayOrder.id,

handler: async function () {

await fetch("/api/orders/update-payment", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({
orderId: order._id
})

});


const orderData = {

customerName: form.name,
phone: form.phone,
address: form.address,

items: cart,

totalAmount: subtotal,

paymentMethod: "Online Payment",

paymentStatus: "paid",

orderStatus: "placed"

};

localStorage.setItem("lastOrder", JSON.stringify(orderData));

window.location.href = "/order-success";

},

prefill: {

name: form.name,
contact: form.phone

}

};


const rzp = new window.Razorpay(options);

rzp.open();

};



/*
=======================
COD HANDLER
=======================
*/

const handleCOD = async () => {

if (!form.name || !form.phone || !form.address) {

alert("Fill required fields");

return;

}

await fetch("/api/orders/create", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({

customerName: form.name,
phone: form.phone,
address: form.address,
note: form.note,
items: cart,
totalAmount: subtotal,
paymentStatus: "cod"

})

});


const orderData = {

customerName: form.name,
phone: form.phone,
address: form.address,

items: cart,

totalAmount: subtotal,

paymentMethod: "Cash on Delivery",

paymentStatus: "cod",

orderStatus: "placed"

};

localStorage.setItem("lastOrder", JSON.stringify(orderData));

window.location.href = "/order-success";

};



/*
=======================
WHATSAPP HANDLER
=======================
*/

const handleWhatsApp = () => {

const message = `New Order Request:

Name: ${form.name}
Phone: ${form.phone}
Address: ${form.address}

Items:
${cart.map(item =>
`${item.title} x ${item.qty}`
).join("\n")}

Total: ₹${subtotal}`;

window.open(

`https://wa.me/918219174058?text=${encodeURIComponent(message)}`

);

};



return (

<>

<Script
src="https://checkout.razorpay.com/v1/checkout.js"
strategy="afterInteractive"
/>


<section className="bg-secondary min-h-screen">

<div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">


{/* CUSTOMER FORM */}

<div className="bg-white rounded-xl shadow-soft p-6">

<h2 className="text-xl font-semibold mb-6">

Customer Details

</h2>


<input
name="name"
placeholder="Full Name"
className="border p-3 w-full mb-4 rounded-lg"
onChange={handleChange}
/>


<input
name="phone"
placeholder="Phone Number"
className="border p-3 w-full mb-4 rounded-lg"
onChange={handleChange}
/>


<textarea
name="address"
placeholder="Full Address"
className="border p-3 w-full mb-4 rounded-lg"
onChange={handleChange}
/>


<textarea
name="note"
placeholder="Extra note (optional)"
className="border p-3 w-full rounded-lg"
onChange={handleChange}
/>

</div>



{/* ORDER SUMMARY */}

<div className="bg-white rounded-xl shadow-soft p-6">

<h2 className="text-xl font-semibold mb-6">

Order Summary

</h2>


{cart.map(item => (

<div
key={item._id}
className="flex justify-between mb-3"
>

<span>

{item.title} × {item.qty}

</span>

<span>

₹{item.price * item.qty}

</span>

</div>

))}


<hr className="my-4"/>


<div className="flex justify-between text-lg font-semibold">

<span>Total</span>

<span>₹{subtotal}</span>

</div>



<button
onClick={handleOrder}
className="bg-primary text-white w-full mt-6 py-3 rounded-lg"
>

Pay Online

</button>



<button
onClick={handleCOD}
className="border border-primary text-primary w-full mt-4 py-3 rounded-lg"
>

Cash on Delivery

</button>



<button
onClick={handleWhatsApp}
className="bg-green-500 text-white w-full mt-4 py-3 rounded-lg"
>

Order via WhatsApp

</button>


</div>

</div>

</section>

</>

);

}