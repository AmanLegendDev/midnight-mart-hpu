"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
Package,
Layers,
ShoppingCart,
Plus,
Clock
} from "lucide-react";

export default function Dashboard() {

const [stats, setStats] = useState({
products: 0,
categories: 0,
orders: 0
});


useEffect(() => {

fetch("/api/admin/stats")
.then(res => res.json())
.then(setStats);

}, []);


return (

<div className="space-y-10">


{/* HEADER */}

<div className="flex flex-col md:flex-row md:justify-between gap-4">

<div>

<h1 className="text-4xl font-semibold text-primary">

Dashboard Overview

</h1>

<p className="text-neutral-500 mt-1">

Control your store from one place

</p>

</div>


<div className="flex gap-3">

<ActionBtn
link="/admin/products/create"
text="Add Product"
/>

<ActionBtn
link="/admin/orders"
text="View Orders"
/>

</div>

</div>



{/* STATS CARDS */}

<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">


<StatCard
title="Products"
value={stats.products}
icon={<Package size={22}/>}
link="/admin/products"
/>


<StatCard
title="Categories"
value={stats.categories}
icon={<Layers size={22}/>}
link="/admin/categories"
/>


<StatCard
title="Orders"
value={stats.orders}
icon={<ShoppingCart size={22}/>}
link="/admin/orders"
/>


<StatCard
title="Order History"
value="View"
icon={<Clock size={22}/>}
link="/admin/order-history"
/>


</div>



{/* QUICK ACTION PANEL */}

<div className="bg-white rounded-xl shadow-soft border border-borderSoft p-6">

<h2 className="text-lg font-semibold text-primary mb-5">

Quick Actions

</h2>


<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">

<ActionTile
link="/admin/products/create"
text="Create Product"
/>

<ActionTile
link="/admin/categories"
text="Manage Categories"
/>

<ActionTile
link="/admin/orders"
text="Track Orders"
/>

<ActionTile
link="/admin/order-history"
text="Order History"
/>

</div>

</div>


</div>

);

}



/*
========================
CLICKABLE CARD COMPONENT
========================
*/

function StatCard({
title,
value,
icon,
link
}) {

return (

<Link
href={link}
className="bg-white border border-borderSoft rounded-xl shadow-soft p-6 flex justify-between items-center hover:shadow-lg hover:scale-[1.02] transition"
>

<div>

<p className="text-neutral-500 text-sm">

{title}

</p>

<h2 className="text-4xl font-semibold text-primary mt-2">

{value}

</h2>

</div>


<div className="w-10 h-10 flex items-center justify-center rounded-lg bg-secondary text-primary">

{icon}

</div>

</Link>

);

}



/*
========================
BUTTON
========================
*/

function ActionBtn({
link,
text
}) {

return (

<Link
href={link}
className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-lg hover:opacity-90 transition"
>

<Plus size={16}/>

{text}

</Link>

);

}



/*
========================
TILES
========================
*/

function ActionTile({
link,
text
}) {

return (

<Link
href={link}
className="bg-secondary border border-borderSoft rounded-xl p-4 hover:bg-primary hover:text-white transition font-medium text-center"
>

{text}

</Link>

);

}