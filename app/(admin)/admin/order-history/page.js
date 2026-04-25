"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function OrderHistoryPage() {

const [orders,setOrders]=useState({});


useEffect(()=>{

fetch("/api/orders/list")
.then(res=>res.json())
.then(data=>{

const grouped={};

data.forEach(order=>{

const date=new Date(order.createdAt)
.toLocaleDateString();

if(!grouped[date]){
grouped[date]=[];
}

grouped[date].push(order);

});

setOrders(grouped);

});

},[]);



return(

<div className="space-y-10">


{/* PAGE TITLE */}

<div>

<h1 className="text-3xl font-semibold text-primary">

Order History

</h1>

<p className="text-neutral-500">

Track completed and active orders day-wise

</p>

</div>



{/* EMPTY STATE */}

{Object.keys(orders).length===0 &&(

<p className="text-neutral-400">

No orders available

</p>

)}



{/* DAY-WISE GROUP */}

{Object.entries(orders).map(([date,list])=>(

<div key={date} className="space-y-5">

<h2 className="text-lg font-semibold text-primary">

📅 {date}

</h2>



<div className="space-y-4">

{list.map((order,index)=>(

<motion.div

key={order._id}

initial={{opacity:0,y:10}}

animate={{opacity:1,y:0}}

transition={{delay:index*0.04}}

className="bg-white rounded-xl shadow-soft border border-borderSoft p-5 space-y-4"

>


{/* TOP SECTION */}

<div className="flex justify-between flex-wrap gap-2">

<div>

<p className="font-semibold">

{order.customerName}

</p>

<p className="text-sm text-neutral-500">

📞 {order.phone}

</p>

</div>


<div className="flex gap-2">

<PaymentBadge status={order.paymentStatus}/>

<OrderBadge status={order.orderStatus}/>

</div>

</div>



{/* ADDRESS */}

<p className="text-sm text-neutral-500">

📍 {order.address}

</p>



{/* ITEMS */}

<div className="text-sm text-neutral-600">

{order.items.map(item=>(

<div key={item._id}>

{item.title} × {item.qty}

</div>

))}

</div>



{/* TOTAL */}

<div className="font-semibold text-primary">

₹ {order.totalAmount}

</div>



{/* PROGRESS BAR */}

<OrderProgress status={order.orderStatus}/>


{/* TIME */}

<p className="text-xs text-neutral-400">

🕒 {new Date(order.createdAt).toLocaleString()}

</p>


</motion.div>

))}

</div>

</div>

))}

</div>

);

}



/*
=====================
PROGRESS BAR
=====================
*/

function OrderProgress({status}){

const steps=[
"placed",
"confirmed",
"packed",
"shipped",
"delivered"
];

const index=steps.indexOf(status);

return(

<div className="flex justify-between items-center mt-2">

{steps.map((step,i)=>(

<div key={step} className="flex flex-col items-center flex-1">

<div
className={`w-4 h-4 rounded-full
${i<=index?"bg-primary":"bg-neutral-300"}
`}
/>

<p
className={`text-xs mt-1
${i<=index?"text-primary":"text-neutral-400"}
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
=====================
PAYMENT BADGE
=====================
*/

function PaymentBadge({status}){

if(status==="paid")

return(

<span className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">

Paid

</span>

);

if(status==="cod")

return(

<span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">

COD

</span>

);

return(

<span className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded-full">

Pending

</span>

);

}



/*
=====================
ORDER BADGE
=====================
*/

function OrderBadge({status}){

const map={

placed:"Placed",

confirmed:"Confirmed",

packed:"Packed",

shipped:"Shipped",

delivered:"Delivered",

cancelled:"Cancelled"

};

return(

<span className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">

{map[status]||"Placed"}

</span>

);

}