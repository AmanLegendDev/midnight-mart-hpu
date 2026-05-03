"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin(){

const router = useRouter();

const[email,setEmail]=useState("");
const[password,setPassword]=useState("");
const[loading,setLoading]=useState(false);

const handleSubmit=async(e)=>{

e.preventDefault();

setLoading(true);

const res=await fetch("/api/admin/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
email,
password
})

});

const data=await res.json();

setLoading(false);

if(res.ok){

router.push("/admin/dashboard");

router.refresh();

}else{

alert(data.message||"Login failed");

}

};


return(

<section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#020617]">


{/* GOLD GLOW */}

<div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-yellow-400/10 blur-[160px] rounded-full"/>


{/* CARD */}

<div className="relative z-10 w-[360px] bg-[#0B0F19] border border-white/10 rounded-2xl shadow-2xl p-8">


{/* LOGO */}

<div className="flex flex-col items-center mb-6">

<Image
src="/logo.png"
width={50}
height={50}
alt="logo"
/>

<h2 className="text-lg font-semibold text-yellow-400 mt-3">

MidnightMartHPU Admin

</h2>

<p className="text-xs text-neutral-400 mt-1">

Secure campus order control panel

</p>

</div>


<form

onSubmit={handleSubmit}

className="space-y-4"

>


{/* EMAIL */}

<input

type="email"

placeholder="Admin Email"

required

className="w-full bg-[#020617] border border-white/10 p-3 rounded-lg outline-none focus:border-yellow-400 text-white"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>


{/* PASSWORD */}

<input

type="password"

placeholder="Password"

required

className="w-full bg-[#020617] border border-white/10 p-3 rounded-lg outline-none focus:border-yellow-400 text-white"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>


{/* BUTTON */}

<button

disabled={loading}

className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:scale-[1.02] transition shadow-lg"

>

{loading?"Signing in...":"Secure Login"}

</button>


</form>


{/* FOOTNOTE */}

<p className="text-[11px] text-neutral-500 text-center mt-6">

Authorized access only • MidnightMartHPU Delivery Panel

</p>


</div>

</section>

);

}