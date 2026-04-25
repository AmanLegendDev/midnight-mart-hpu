"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";

export default function SuccessPage() {

const [order, setOrder] = useState(null);
const resetCart = useCartStore((state) => state.resetCart);

useEffect(() => {

const storedOrder =
localStorage.getItem("lastOrder");

if (storedOrder) {

setOrder(JSON.parse(storedOrder));

resetCart(); // cart clear here

}

}, []);



if (!order) {

return (

<p className="text-center py-20">

Loading order details...

</p>

);

}



return (

<section className="bg-secondary min-h-screen">

<div className="max-w-4xl mx-auto px-6 py-20">


{/* SUCCESS HEADER */}

<div className="text-center">

<div className="text-6xl">

✅

</div>

<h1 className="text-3xl font-semibold text-primary mt-4">

Order Confirmed Successfully

</h1>

<p className="text-neutral-500 mt-2">

Thank you {order.customerName}, your order has been placed successfully.

</p>

</div>



{/* CUSTOMER INFO */}

<div className="bg-white shadow-soft rounded-2xl mt-10 p-6">

<h2 className="text-lg font-semibold text-primary mb-4">

Customer Details

</h2>

<p>

Name: {order.customerName}

</p>

<p>

Phone: {order.phone}

</p>

<p>

Address: {order.address}

</p>

</div>



{/* ORDER SUMMARY */}

<div className="bg-white shadow-soft rounded-2xl mt-10 p-6">

<h2 className="text-lg font-semibold text-primary mb-4">

Order Summary

</h2>


{order.items.map((item, i) => (

<div
key={i}
className="flex justify-between border-b py-2"
>

<span>

{item.title} × {item.qty}

</span>

<span>

₹{item.price * item.qty}

</span>

</div>

))}


<div className="flex justify-between mt-4 text-lg font-semibold">

<span>Total Amount</span>

<span>

₹{order.totalAmount}

</span>

</div>

</div>



{/* PAYMENT INFO */}

<div className="bg-white shadow-soft rounded-2xl mt-10 p-6 space-y-4">

<div className="flex justify-between">

<span>Payment Method</span>

<span>

{order.paymentMethod}

</span>

</div>


<div className="flex justify-between">

<span>Payment Status</span>

<span className="text-green-600">

{order.paymentStatus}

</span>

</div>


<div className="flex justify-between">

<span>Order Status</span>

<span className="text-primary">

{order.orderStatus}

</span>

</div>

</div>



{/* DELIVERY INFO */}

<div className="bg-white shadow-soft rounded-2xl mt-10 p-6">

<h2 className="text-lg font-semibold text-primary mb-2">

Estimated Delivery

</h2>

<p>

2–5 Working Days

</p>

<p className="mt-2 text-neutral-500 text-sm">

Our team may contact you before dispatch.

</p>

</div>



{/* SUPPORT */}

<div className="bg-white shadow-soft rounded-2xl mt-10 p-6 flex justify-between items-center">

<span>

Need Help?

</span>

<a

href="tel:8219174058"

className="text-primary font-semibold"

>

8219174058

</a>

</div>



{/* CTA */}

<div className="flex flex-wrap gap-4 mt-10 justify-center">

<Link

href="/products"

className="bg-primary text-white px-6 py-3 rounded-lg"

>

Continue Shopping

</Link>


<a

href="https://wa.me/918219174058"

target="_blank"

className="border border-primary text-primary px-6 py-3 rounded-lg"

>

Contact Support

</a>

</div>



<p className="text-center text-neutral-400 mt-12 text-sm">

Thank you for shopping with Hilaireofficial 💚

</p>

</div>

</section>

);

}