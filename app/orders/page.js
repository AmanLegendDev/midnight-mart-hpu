"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";

export default function OrdersPage() {

const [orders,setOrders]=useState([]);
const [selectedOrder,setSelectedOrder]=useState(null);


/*
FETCH ORDERS (LATEST FIRST)
*/

const fetchOrders=async()=>{

const res=await fetch("/api/orders/list");

const data=await res.json();

setOrders(
data.sort(
(a,b)=>new Date(b.createdAt)-new Date(a.createdAt)
)
);

};


/*
AUTO REFRESH EVERY 5s
*/

useEffect(()=>{

fetchOrders();

const interval=setInterval(fetchOrders,5000);

return()=>clearInterval(interval);

},[]);



return(

<section className="bg-[#020617] min-h-screen text-white">

<Navbar/>

<div className="max-w-5xl mx-auto px-4 py-10">


{/* HEADER */}

<div className="mb-8">

<h1 className="text-2xl font-semibold text-yellow-400">

Your Orders

</h1>

<p className="text-neutral-400 text-sm mt-1">

Track your delivery status live

</p>

</div>



{/* EMPTY STATE */}

{orders.length===0 &&(

<div className="text-neutral-500 text-center py-24">

No orders yet

</div>

)}



{/* ORDERS LIST */}

<div className="space-y-4">

{orders.map(order=>(

<div

key={order._id}

className="bg-[#020617] border border-white/10 rounded-2xl p-4 space-y-3"

>


{/* TOP */}

<div className="flex justify-between items-center">

<div>

<h3 className="font-semibold">

Order #{order._id.slice(-6)}

</h3>

<p className="text-xs text-neutral-500">

{new Date(order.createdAt).toLocaleString()}

</p>

</div>


<div className="flex gap-2">

<StatusBadge status={order.orderStatus}/>

<PaymentBadge status={order.paymentStatus}/>

</div>

</div>



{/* ITEMS */}

<div className="text-sm text-neutral-400">

{order.items.map(item=>(

<div key={item._id}>

{item.title} × {item.qty}

</div>

))}

</div>



{/* TOTAL */}

<div className="flex justify-between items-center">

<p className="text-yellow-400 font-semibold">

₹ {order.totalAmount}

</p>


<button

onClick={()=>setSelectedOrder(order)}

className="border border-yellow-400 text-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition"

>

Track Order

</button>

</div>

</div>

))}

</div>



{/* TRACKING POPUP */}

<AnimatePresence>

{selectedOrder &&(

<motion.div

initial={{opacity:0}}

animate={{opacity:1}}

exit={{opacity:0}}

className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"

>

<motion.div

initial={{scale:.9}}

animate={{scale:1}}

exit={{scale:.9}}

className="bg-[#020617] border border-white/10 rounded-2xl p-6 w-[92%] max-w-lg relative"

>


{/* CLOSE */}

<button

onClick={()=>setSelectedOrder(null)}

className="absolute right-4 top-3 text-neutral-400"

>

✕

</button>



<h2 className="text-lg text-yellow-400 font-semibold mb-5">

Order Tracking

</h2>


<OrderTimeline status={selectedOrder.orderStatus}/>



<div className="mt-6 text-sm text-neutral-400">

Hostel:

<br/>

{selectedOrder.hostel}

<br/><br/>

Room:

<br/>

{selectedOrder.room}

</div>



{selectedOrder.orderStatus==="delivered" &&(

<div className="mt-6 text-green-400 font-semibold">

Order delivered successfully 🎉

</div>

)}



{selectedOrder.orderStatus==="cancelled" &&(

<div className="mt-6 text-red-400 font-semibold">

Order cancelled by store

</div>

)}



</motion.div>

</motion.div>

)}

</AnimatePresence>



{/* SUPPORT */}

<div className="mt-14 border border-white/10 rounded-2xl p-6 text-center">

<h2 className="text-yellow-400 font-semibold mb-2">

Need Help?

</h2>

<p className="text-neutral-400 text-sm">

Contact delivery support anytime

</p>

<a

href="tel:8219174058"

className="inline-block mt-4 bg-yellow-400 text-black px-6 py-2 rounded-lg"

>

Call Support

</a>

</div>


</div>

</section>

);

}



/*
TIMELINE
*/

function OrderTimeline({status}){

const steps=[

"placed",
"confirmed",
"out_for_delivery",
"delivered"

];

return(

<div className="space-y-3">

{steps.map(step=>{

const active=

steps.indexOf(step)<=steps.indexOf(status);

return(

<div

key={step}

className={`flex items-center gap-3 text-sm

${active
?"text-yellow-400"
:"text-neutral-500"}`}

>

<div

className={`w-3 h-3 rounded-full

${active
?"bg-yellow-400"
:"bg-neutral-700"}`}

/>

{step.replaceAll("_"," ").toUpperCase()}

</div>

);

})}

</div>

);

}



/*
BADGES
*/

function StatusBadge({status}){

if(status==="delivered")

return(

<span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full">

Delivered

</span>

);

if(status==="cancelled")

return(

<span className="text-xs bg-red-500/20 text-red-400 px-3 py-1 rounded-full">

Cancelled

</span>

);

if(status==="out_for_delivery")

return(

<span className="text-xs bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full">

Out for Delivery

</span>

);

return(

<span className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">

Placed

</span>

);

}



function PaymentBadge({status}){

if(status==="paid")

return(

<span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full">

Paid

</span>

);

return(

<span className="text-xs bg-neutral-700 text-neutral-300 px-3 py-1 rounded-full">

Pending

</span>

);

}