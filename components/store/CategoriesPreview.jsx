"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CategoriesPreview() {

const [categories, setCategories] = useState([]);

useEffect(() => {

fetch("/api/categories/dropdown")
.then(res => res.json())
.then(setCategories);

}, []);


return (

<section className="bg-secondary">

<div className="max-w-7xl mx-auto px-6 py-20">


{/* HEADER */}

<div className="text-center mb-14">

<p className="text-accent text-sm uppercase tracking-wide">

Browse Collection

</p>

<h2 className="text-3xl md:text-4xl font-semibold text-primary mt-2">

Shop by Category

</h2>

</div>



{/* CATEGORY GRID */}

<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

{categories.map((cat, index) => (

<Link
key={cat._id}
href={`/products?category=${cat._id}`}
>

<motion.div

initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: index * 0.05 }}

className="group relative bg-white rounded-2xl shadow-soft overflow-hidden border border-neutral-100 hover:shadow-lg transition p-8 flex items-center justify-center"

>


{/* CATEGORY NAME */}

<h3 className="text-lg font-medium text-primary group-hover:scale-105 transition">

{cat.name}

</h3>


{/* HOVER BORDER EFFECT */}

<div className="absolute inset-0 border border-primary opacity-0 group-hover:opacity-20 rounded-2xl transition"/>

</motion.div>

</Link>

))}

</div>



{/* VIEW ALL BUTTON */}

<div className="text-center mt-14">

<Link
href="/products"
className="bg-primary text-white px-8 py-3 rounded-xl shadow-soft hover:scale-[1.03] transition"
>

Explore All Products

</Link>

</div>


</div>

</section>

);

}