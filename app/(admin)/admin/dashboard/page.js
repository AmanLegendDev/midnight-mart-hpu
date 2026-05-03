"use client";

import { useEffect,useState } from "react";
import Link from "next/link";
import {
Clock,
Truck,
CheckCircle,
TrendingUp,
PackagePlus,
IndianRupee,
ClipboardList,
Wallet,
Package
} from "lucide-react";

export default function Dashboard(){

const [stats,setStats]=useState({});


/*
FETCH STATS
*/

const fetchStats=async()=>{

const res=await fetch("/api/admin/stats");

const data=await res.json();

setStats(data);

};


/*
LIVE POLLING
*/

useEffect(()=>{

fetchStats();

const interval=setInterval(fetchStats,4000);

return()=>clearInterval(interval);

},[]);


return(

<div className="space-y-8">


{/* HEADER */}

<div>

<h1 className="text-2xl font-semibold text-yellow-400">

Order Control Panel

</h1>

<p className="text-neutral-400">

Live campus delivery analytics

</p>

</div>



{/* ORDER STATUS CARDS */}

<div className="grid md:grid-cols-3 gap-4">

<OrderCard
title="New Orders"
value={stats.newOrders}
icon={<Clock size={22}/>}
link="/admin/orders"
/>

<OrderCard
title="Processing"
value={stats.processingOrders}
icon={<Truck size={22}/>}
link="/admin/orders"
/>

<OrderCard
title="Completed"
value={stats.completedOrders}
icon={<CheckCircle size={22}/>}
link="/admin/orders"
/>

<OrderCard
title="Custom Orders"
value={stats.customOrders}
icon={<PackagePlus size={22}/>}
link="/admin/custom-orders"
/>

</div>



{/* TODAY ANALYTICS */}

<div className="grid md:grid-cols-3 gap-4">

<StatCard
title="Today's Orders"
value={stats.todayOrders}
icon={<Package size={22}/>}
/>

<StatCard
title="Today's Revenue"
value={`₹ ${stats.todayRevenue || 0}`}
icon={<Wallet size={22}/>}
/>

<StatCard
title="Today's Profit"
value={`₹ ${stats.todayProfit || 0}`}
icon={<TrendingUp size={22}/>}
/>

</div>



{/* ALL TIME ANALYTICS */}

<div className="grid md:grid-cols-3 gap-4">

<StatCard
title="Total Orders"
value={stats.totalOrders}
icon={<Package size={22}/>}
/>

<StatCard
title="Total Revenue"
value={`₹ ${stats.totalRevenue || 0}`}
icon={<Wallet size={22}/>}
/>

<StatCard
title="Total Profit"
value={`₹ ${stats.totalProfit || 0}`}
icon={<TrendingUp size={22}/>}
/>

</div>



{/* QUICK ACTIONS */}

<div className="grid md:grid-cols-2 gap-4">

<MiniCard
title="➕ Add Product"
link="/admin/products/create"
/>

<MiniCard
title="📂 Manage Categories"
link="/admin/categories"
/>

</div>


</div>

);

}


/*
ORDER STATUS CARD
*/

function OrderCard({title,value,icon,link}){

return(

<Link
href={link}
className="card p-6 flex justify-between items-center hover:border-yellow-400 transition"
>

<div>

<p className="text-sm text-neutral-400">

{title}

</p>

<h2 className="text-4xl font-semibold mt-1">

{value || 0}

</h2>

</div>

<div className="text-yellow-400">

{icon}

</div>

</Link>

);

}


/*
ANALYTICS CARD
*/

function StatCard({title,value,icon}){

return(

<div className="card p-6 flex justify-between items-center">

<div>

<p className="text-sm text-neutral-400">

{title}

</p>

<h2 className="text-3xl font-semibold mt-1">

{value}

</h2>

</div>

<div className="text-yellow-400">

{icon}

</div>

</div>

);

}


/*
MINI ACTION CARD
*/

function MiniCard({title,link}){

return(

<Link
href={link}
className="card p-4 hover:border-yellow-400 transition text-center"
>

{title}

</Link>

);

}