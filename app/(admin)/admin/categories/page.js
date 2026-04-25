"use client";

import { useEffect, useState } from "react";

export default function CategoriesPage() {

const [name, setName] = useState("");

const [categories, setCategories] = useState([]);

const [loading, setLoading] = useState(false);



const fetchCategories = async () => {

const res = await fetch("/api/categories/list");

const data = await res.json();

setCategories(data);

};



useEffect(() => {

fetchCategories();

}, []);



const handleSubmit = async (e) => {

e.preventDefault();

if (!name.trim()) return;

setLoading(true);

const res = await fetch("/api/categories/create", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({
name
})

});

if (res.ok) {

setName("");

fetchCategories();

}

setLoading(false);

};



const deleteCategory = async (id) => {

const confirmDelete = confirm(
"Delete this category?"
);

if (!confirmDelete) return;

await fetch("/api/categories/delete", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({
id
})

});

fetchCategories();

};



return (

<div className="space-y-8">


{/* HEADER */}

<div className="flex justify-between items-center">

<div>

<h1 className="text-3xl font-semibold text-primary">

Categories

</h1>

<p className="text-neutral-500 mt-1">

Manage your product categories

</p>

</div>


<div className="bg-secondary px-4 py-2 rounded-lg font-medium">

Total: {categories.length}

</div>

</div>



{/* CREATE CARD */}

<div className="bg-white border border-borderSoft rounded-xl shadow-soft p-6 max-w-xl">

<h2 className="font-semibold text-primary mb-4">

Create New Category

</h2>


<form
onSubmit={handleSubmit}
className="flex gap-3"
>

<input
type="text"
placeholder="Enter category name"
className="flex-1 border border-borderSoft p-3 rounded-lg outline-none focus:ring-2 focus:ring-primary/30"
value={name}
onChange={(e)=>setName(e.target.value)}
/>


<button
disabled={loading}
className="bg-primary text-white px-6 rounded-lg hover:opacity-90 transition"
>

{loading ? "Creating..." : "Create"}

</button>

</form>

</div>



{/* CATEGORY LIST */}

<div className="bg-white border border-borderSoft rounded-xl shadow-soft">

{categories.length === 0 ? (

<div className="p-8 text-center text-neutral-400">

No categories yet

</div>

) : (

categories.map((cat)=> (

<div
key={cat._id}
className="flex justify-between items-center px-6 py-4 border-b last:border-none hover:bg-secondary transition"
>

<div className="font-medium text-text">

{cat.name}

</div>


<button
onClick={()=>deleteCategory(cat._id)}
className="text-red-500 text-sm hover:underline"
>

Delete

</button>

</div>

))

)}

</div>

</div>

);

}