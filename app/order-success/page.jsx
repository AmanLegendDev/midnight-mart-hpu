"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SuccessPage() {

const [order,setOrder]=useState(null);

/*
LOAD ORDER
*/

useEffect(()=>{

const storedOrder =
localStorage.getItem("lastOrder");

if(storedOrder){

setOrder(JSON.parse(storedOrder));

}

},[]);


/*
LOADING SCREEN
*/

if(!order){

return(

<section className="min-h-screen flex items-center justify-center bg-[#020617] text-white">

Loading order...

</section>

);

}


/*
SUCCESS UI
*/

return(

<section className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center px-6 text-center">


{/* SPINNING LOGO */}

<motion.div

animate={{rotate:360}}

transition={{
repeat:Infinity,
duration:6,
ease:"linear"
}}

className="w-20 h-20 rounded-full border border-yellow-400 overflow-hidden shadow-lg"

>

<Image
src="/logo.png"
alt="logo"
width={80}
height={80}
/>

</motion.div>



{/* HEADLINE */}

<motion.h1

initial={{opacity:0,y:20}}

animate={{opacity:1,y:0}}

transition={{delay:.2}}

className="text-3xl font-semibold text-yellow-400 mt-6"

>

Order Confirmed 🎉

</motion.h1>


<p className="text-neutral-400 mt-2 max-w-md">

Your order has been received successfully.

Our delivery partner is preparing your items now.

</p>



{/* ETA BADGE */}

<div className="mt-4 bg-yellow-400/10 border border-yellow-400 text-yellow-400 px-4 py-2 rounded-full text-sm">

Estimated delivery: 10–20 minutes 🚀

</div>



{/* ORDER SUMMARY CARD */}

<div className="mt-6 bg-[#020617] border border-white/10 rounded-xl p-5 text-left max-w-md w-full space-y-3">


<p>

<span className="text-neutral-400">

Customer:

</span>

&nbsp;

{order.customerName}

</p>


<p>

<span className="text-neutral-400">

Hostel:

</span>

&nbsp;

{order.hostel}

</p>


<p>

<span className="text-neutral-400">

Room:

</span>

&nbsp;

{order.room}

</p>


<p className="text-yellow-400 font-semibold">

Total Paid: ₹ {order.totalAmount}

</p>


</div>



{/* TRACK BUTTON */}

<Link

href="/orders"

className="mt-6 bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-[1.03] transition"

>

Track Your Order 📦

</Link>



{/* SUPPORT TEXT */}

<p className="text-neutral-500 text-xs mt-6 max-w-sm">

If your order is delayed or you need help,

our delivery team will contact you shortly.

</p>



{/* BACK HOME BUTTON */}

<Link

href="/"

className="mt-4 border border-yellow-400 text-yellow-400 px-5 py-2 rounded-xl hover:bg-yellow-400 hover:text-black transition"

>

Back to Home

</Link>


</section>

);

}