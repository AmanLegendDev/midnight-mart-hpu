"use client";

import { useEffect,useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle,Phone } from "lucide-react";

export default function CustomOrdersAdmin(){

const [orders,setOrders]=useState([]);

const fetchOrders=()=>{

fetch("/api/custom-orders/list")
.then(res=>res.json())
.then(setOrders);

};

useEffect(()=>{

fetchOrders();

},[]);


/*
MARK AS DELIVERED
*/

const markDelivered=async(id)=>{

await fetch("/api/custom-orders/update-status",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({ id })

});

fetchOrders();

};


/*
FILTER
*/

const newOrders=orders.filter(o=>o.status==="new");

const oldOrders=orders.filter(o=>o.status==="delivered");


return(

<div className="space-y-10">


{/* HEADER */}

<div>

<h1 className="text-2xl text-yellow-400 font-semibold">

Custom Order Requests

</h1>

<p className="text-neutral-400 text-sm">

Special campus requests submitted by students

</p>

</div>


{/* NEW REQUESTS */}

<section>

<h2 className="text-lg text-white mb-4">

New Requests 🚀

</h2>


{newOrders.length===0 &&(

<p className="text-neutral-500">

No new custom requests

</p>

)}


<div className="space-y-4">

{

newOrders.map(o=>(

<motion.div
key={o._id}
initial={{opacity:0,y:10}}
animate={{opacity:1,y:0}}
className="card p-5 space-y-2"
>


{/* TOP */}

<div className="flex justify-between items-center">

<p className="text-yellow-400 font-semibold">

{o.name}

</p>

<p className="text-xs text-neutral-500">

{new Date(o.createdAt).toLocaleString()}

</p>

</div>


{/* DETAILS */}

<p className="text-sm">

📞 {o.phone}

</p>

<p className="text-sm">

🏫 {o.hostel} — Room {o.room}

</p>


{/* ITEM */}

<div className="bg-black/20 p-3 rounded-lg text-sm">

{o.item}

</div>


{/* NOTE */}

{o.note &&(

<p className="text-xs text-neutral-400">

Note: {o.note}

</p>

)}


{/* ACTIONS */}

<div className="flex justify-between items-center pt-2">


<a
href={`tel:${o.phone}`}
className="flex items-center gap-1 text-xs text-yellow-400"
>

<Phone size={14}/>

Call Student

</a>


<button
onClick={()=>markDelivered(o._id)}
className="flex items-center gap-1 text-xs bg-green-500 px-3 py-1 rounded-full"
>

<CheckCircle size={14}/>

Delivered

</button>


</div>


</motion.div>

))

}

</div>

</section>


{/* OLD REQUESTS */}

<section>

<h2 className="text-lg text-white mb-4">

Completed Requests ✅

</h2>


{oldOrders.length===0 &&(

<p className="text-neutral-500">

No completed custom orders yet

</p>

)}


<div className="space-y-4">

{

oldOrders.map(o=>(

<div
key={o._id}
className="card p-5 opacity-60 space-y-2"
>


<div className="flex justify-between">

<p className="text-white font-medium">

{o.name}

</p>

<p className="text-xs text-neutral-500">

{new Date(o.createdAt).toLocaleString()}

</p>

</div>


<p className="text-sm">

🏫 {o.hostel} — Room {o.room}

</p>


<div className="text-sm">

{o.item}

</div>


</div>

))

}

</div>

</section>


</div>

);

}