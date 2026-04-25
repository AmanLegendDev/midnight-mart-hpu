"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function OrdersPage() {

const [orders, setOrders] = useState([]);

const fetchOrders = async () => {

const res = await fetch("/api/orders/list");

const data = await res.json();

setOrders(data);

};

useEffect(() => {

fetchOrders();

}, []);


/*
=====================
STATUS UPDATE FUNCTION
=====================
*/

const updateStatus = async (
id,
field,
value
) => {

await fetch(
"/api/orders/update-status",
{
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
id,
field,
value
})
}
);

fetchOrders();

};


/*
=====================
DELETE ORDER
=====================
*/

const deleteOrder = async id => {

await fetch(
"/api/orders/delete",
{
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({ id })
}
);

fetchOrders();

};



return (

<div className="space-y-8">


{/* HEADER */}

<div>

<h1 className="text-3xl font-semibold text-primary">

Orders Dashboard

</h1>

<p className="text-neutral-500">

Manage order lifecycle in real-time

</p>

</div>



{/* ORDERS */}

<div className="space-y-6">

{orders.map((order, index) => (

<motion.div
key={order._id}
initial={{ opacity: 0, y: 15 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: index * 0.05 }}
className="bg-white border border-borderSoft rounded-xl shadow-soft p-6 space-y-5"
>


{/* CUSTOMER INFO */}

<div className="flex justify-between flex-wrap gap-4">

<div>

<h3 className="font-semibold text-lg">

{order.customerName}

</h3>

<p className="text-sm text-neutral-500">

{order.phone}

</p>

<p className="text-sm text-neutral-500">

{order.address}

</p>

</div>


<div className="text-sm text-neutral-400">

🕒 {new Date(order.createdAt).toLocaleString()}

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

<p className="font-semibold text-lg">

₹ {order.totalAmount}

</p>

<div className="flex gap-2">

<PaymentBadge status={order.paymentStatus} />

<OrderBadge status={order.orderStatus} />

</div>

</div>



{/* ORDER TIMELINE CONTROL */}

<div className="flex flex-wrap gap-2">


<StatusBtn
label="Confirm"
color="bg-blue-100 text-blue-700"
onClick={() =>
updateStatus(
order._id,
"orderStatus",
"confirmed"
)
}
/>


<StatusBtn
label="Pack"
color="bg-purple-100 text-purple-700"
onClick={() =>
updateStatus(
order._id,
"orderStatus",
"packed"
)
}
/>


<StatusBtn
label="Ship"
color="bg-yellow-100 text-yellow-700"
onClick={() =>
updateStatus(
order._id,
"orderStatus",
"shipped"
)
}
/>


<StatusBtn
label="Deliver"
color="bg-green-100 text-green-700"
onClick={() =>
updateStatus(
order._id,
"orderStatus",
"delivered"
)
}
/>


<StatusBtn
label="Cancel"
color="bg-red-100 text-red-700"
onClick={() =>
updateStatus(
order._id,
"orderStatus",
"cancelled"
)
}
/>


<StatusBtn
label="Payment Received"
color="bg-emerald-100 text-emerald-700"
onClick={() =>
updateStatus(
order._id,
"paymentStatus",
"paid"
)
}
/>


<button
onClick={() =>
deleteOrder(order._id)
}
className="px-4 py-1 text-sm bg-gray-200 rounded-lg"
>

Delete

</button>


</div>


{/* VISUAL TRACKER BAR */}

<OrderTracker status={order.orderStatus} />


</motion.div>

))}

</div>

</div>

);

}



/*
====================
TRACKER BAR
====================
*/

function OrderTracker({ status }) {

const steps = [
"placed",
"confirmed",
"packed",
"shipped",
"delivered"
];

const currentIndex =
steps.indexOf(status);

return (

<div className="flex justify-between mt-4">

{steps.map((step, i) => (

<div
key={step}
className="flex flex-col items-center flex-1"
>

<div
className={`w-4 h-4 rounded-full

${i <= currentIndex
? "bg-primary"
: "bg-neutral-300"}
`}
/>

<p
className={`text-xs mt-1

${i <= currentIndex
? "text-primary"
: "text-neutral-400"}
`}
>

{step}

</p>

</div>

))}

</div>

);

}



/*
====================
BUTTON COMPONENT
====================
*/

function StatusBtn({
label,
onClick,
color
}) {

return (

<button
onClick={onClick}
className={`px-4 py-1 text-sm rounded-lg ${color}`}
>

{label}

</button>

);

}



/*
====================
PAYMENT BADGE
====================
*/

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



/*
====================
ORDER BADGE
====================
*/

function OrderBadge({ status }) {

const map = {

placed: "Placed",

confirmed: "Confirmed",

packed: "Packed",

shipped: "Shipped",

delivered: "Delivered",

cancelled: "Cancelled"

};

return (

<span className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">

{map[status] || "Placed"}

</span>

);

}