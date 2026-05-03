"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";

export default function CustomOrderPage(){

const [form,setForm]=useState({
name:"",
phone:"",
hostel:"",
room:"",
item:"",
note:""
});

const [loading,setLoading]=useState(false);

const hostelList=[
"Boys Hostel",
"Girls Hostel",
"Library Side",
"Admin Block",
"Main Gate"
];

const handleChange=(e)=>{

setForm({
...form,
[e.target.name]:e.target.value
});

};


const handleSubmit=async()=>{

if(!form.name || !form.phone || !form.hostel || !form.room || !form.item){

alert("Fill all required fields");

return;

}

setLoading(true);

const res=await fetch("/api/custom-orders/create",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(form)

});

setLoading(false);


/*
WHATSAPP REDIRECT
*/

const msg=`Hi MidnightMartHPU 👋

Custom Order Request:

Name: ${form.name}
Phone: ${form.phone}
Hostel: ${form.hostel}
Room: ${form.room}

Item Needed:
${form.item}

Note:
${form.note || "None"}
`;

window.location.href="/order-success?type=custom";



};


return(

<section className="bg-[#020617] min-h-screen text-white pb-24">

<Navbar/>


<div className="max-w-xl mx-auto px-5 pt-8">


<h1 className="text-2xl font-semibold text-yellow-400">

Custom Order Request

</h1>

<p className="text-neutral-400 mt-1 text-sm">

Can't find your item?  
We’ll arrange it specially for you.

</p>



<div className="mt-6 space-y-4">


<input
name="name"
placeholder="Your Name"
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

{

hostelList.map(h=>(
<option key={h}>{h}</option>
))

}

</select>


<input
name="room"
placeholder="Room Number"
className="input-style"
onChange={handleChange}
/>


<textarea
name="item"
placeholder="What item do you want?"
className="input-style"
onChange={handleChange}
/>


<textarea
name="note"
placeholder="Extra instructions (optional)"
className="input-style"
onChange={handleChange}
/>


<motion.button
whileTap={{scale:.96}}
onClick={handleSubmit}
className="w-full bg-yellow-400 text-black py-3 rounded-xl font-semibold shadow-lg"
>

{loading?"Sending Request...":"Submit Request"}

</motion.button>


</div>

</div>

</section>

);

}