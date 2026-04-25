"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";

export default function OrdersPage() {

const [orders, setOrders] = useState([]);
const [selectedOrder, setSelectedOrder] = useState(null);


useEffect(() => {

fetch("/api/orders/list")
.then(res => res.json())
.then(setOrders);

}, []);



return (

<section className="bg-secondary min-h-screen">

<Navbar />

<div className="max-w-5xl mx-auto px-6 py-14">


{/* PAGE TITLE */}

<div className="mb-10">

<h1 className="text-3xl font-semibold text-primary">

Your Orders

</h1>

<p className="text-neutral-500 mt-1">

Track your recent purchases and delivery status

</p>

</div>



{/* EMPTY STATE */}

{orders.length === 0 && (

<div className="text-neutral-400 text-center py-20">

No orders yet

</div>

)}



{/* ORDERS LIST */}

<div className="space-y-6">

{orders.map(order => (

<div
key={order._id}
className="bg-white rounded-2xl shadow-soft p-6 space-y-4"
>


{/* TOP */}

<div className="flex justify-between flex-wrap gap-3">

<div>

<h3 className="font-semibold text-lg">

Order #{order._id.slice(-6)}

</h3>

<p className="text-sm text-neutral-500">

{new Date(order.createdAt).toLocaleString()}

</p>

</div>


<div className="flex gap-2">

<StatusBadge status={order.orderStatus} />

<PaymentBadge status={order.paymentStatus} />

</div>

</div>



{/* ITEMS */}

<div className="text-sm text-neutral-600">

{order.items.map(item => (

<div key={item._id}>

{item.title} × {item.qty}

</div>

))}

</div>



{/* TOTAL */}

<div className="flex justify-between items-center">

<p className="font-semibold">

Total: ₹ {order.totalAmount}

</p>


<button
onClick={() =>
setSelectedOrder(order)
}
className="text-primary border border-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition"
>

Track Your Order

</button>

</div>

</div>

))}

</div>



{/* TRACKING PANEL */}

{selectedOrder && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

<div className="bg-white rounded-2xl shadow-soft p-8 w-[95%] max-w-lg relative">


{/* CLOSE BUTTON */}

<button
onClick={() => setSelectedOrder(null)}
className="absolute top-3 right-4 text-neutral-500 hover:text-black"
>
✕
</button>


<h2 className="text-xl font-semibold text-primary mb-6">

Tracking Details

</h2>


<OrderTimeline status={selectedOrder.orderStatus} />


<div className="mt-6 text-neutral-600">

Delivery Address:

<br/>

{selectedOrder.address}

</div>


</div>

</div>

)}


{/* SUPPORT SECTION */}

<div className="mt-14 bg-white rounded-2xl shadow-soft p-8 text-center">

<h2 className="text-lg font-semibold text-primary mb-2">

Need Help?

</h2>

<p className="text-neutral-500">

For delivery support or order issues contact us anytime

</p>

<a
href="tel:8219174058"
className="inline-block mt-4 bg-primary text-white px-6 py-3 rounded-lg"
>

Call Support: 8219174058

</a>

</div>

</div>

</section>

);

}



/*
====================
TIMELINE COMPONENT
====================
*/

function OrderTimeline({ status }) {

const steps = [

"placed",
"confirmed",
"packed",
"shipped",
"delivered"

];

return (

<div className="space-y-3">

{steps.map(step => {

const active =
steps.indexOf(step) <= steps.indexOf(status);

return (

<div
key={step}
className={`flex items-center gap-3 text-sm

${active
? "text-primary"
: "text-neutral-400"}
`}
>

<div
className={`w-3 h-3 rounded-full

${active
? "bg-primary"
: "bg-neutral-300"}
`}
/>

{step.toUpperCase()}

</div>

);

})}

</div>

);

}



/*
====================
BADGES
====================
*/

function StatusBadge({ status }) {

if (status === "delivered")

return (

<span className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">

Delivered

</span>

);

if (status === "cancelled")

return (

<span className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full">

Cancelled

</span>

);

return (

<span className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">

Placed

</span>

);

}



function PaymentBadge({ status }) {

if (status === "paid")

return (

<span className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">

Paid

</span>

);

if (status === "cod")

return (

<span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">

COD

</span>

);

return (

<span className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded-full">

Pending

</span>

);
}