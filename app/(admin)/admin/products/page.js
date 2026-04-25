"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trash2, Pencil } from "lucide-react";

export default function ProductsPage() {

const [products, setProducts] = useState([]);

const fetchProducts = async () => {

const res = await fetch("/api/products/list");

const data = await res.json();

setProducts(data);

};

useEffect(() => {

fetchProducts();

}, []);



const deleteProduct = async (id) => {

const confirmDelete = confirm("Delete this product?");

if (!confirmDelete) return;

await fetch("/api/products/delete", {

method: "POST",

headers: {

"Content-Type": "application/json"

},

body: JSON.stringify({ id })

});

fetchProducts();

};



const toggleField = async (id, field, value) => {

await fetch("/api/products/toggle", {

method: "POST",

headers: {

"Content-Type": "application/json"

},

body: JSON.stringify({

id,

field,

value

})

});

fetchProducts();

};



return (

<div className="space-y-8">


{/* HEADER */}

<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

<div>

<h1 className="text-3xl font-semibold text-primary">

Products

</h1>

<p className="text-neutral-500">

Manage your store products

</p>

</div>


<Link

href="/admin/products/create"

className="bg-primary text-white px-5 py-2 rounded-lg hover:opacity-90 transition w-fit"

>

+ Add Product

</Link>

</div>



{/* PRODUCT LIST */}

<div className="space-y-4">

{products.length === 0 ? (

<div className="bg-white rounded-xl shadow-soft p-10 text-center text-neutral-400">

No products found

</div>

) : (

products.map((product, index) => (

<motion.div

key={product._id}

initial={{ opacity: 0, y: 15 }}

animate={{ opacity: 1, y: 0 }}

transition={{ delay: index * 0.05 }}

className="bg-white border border-borderSoft rounded-xl shadow-soft hover:shadow-md transition p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"

>


{/* LEFT SECTION */}

<div className="flex gap-4 items-center">


<img

src={product.images?.find(Boolean) || "/placeholder.png"}

className="w-16 h-16 rounded-lg object-cover border"

/>


<div>

<h3 className="font-medium text-text">

{product.title}

</h3>


<p className="text-sm text-neutral-500">

{product.category?.name}

</p>


<p className="text-primary font-semibold">

₹ {product.price}

</p>

</div>

</div>



{/* RIGHT SECTION */}

<div className="flex flex-wrap items-center gap-3">

{/* STATUS BADGES */}

{product.isVisible ? (

<span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
Visible
</span>

) : (

<span className="px-3 py-1 text-xs rounded-full bg-gray-200 text-gray-600 font-medium">
Hidden
</span>

)}


{product.isFeatured && (

<span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 font-medium">
Featured
</span>

)}



{/* FEATURED TOGGLE */}

<ToggleSwitch
label="Featured"
value={product.isFeatured}
onChange={(value)=>
toggleField(
product._id,
"isFeatured",
value
)
}
/>


{/* VISIBILITY TOGGLE */}

<ToggleSwitch
label="Visible"
value={product.isVisible}
onChange={(value)=>
toggleField(
product._id,
"isVisible",
value
)
}
/>


{/* EDIT */}

<Link
href={`/admin/products/edit/${product._id}`}
className="text-blue-500 hover:scale-110 transition"
>
<Pencil size={18} />
</Link>


{/* DELETE */}

<button
onClick={() => deleteProduct(product._id)}
className="text-red-500 hover:scale-110 transition"
>
<Trash2 size={18} />
</button>

</div>

</motion.div>

))

)}

</div>

</div>

);

}



/* TOGGLE SWITCH COMPONENT */

function ToggleSwitch({ label, value, onChange }) {

return (

<div className="flex items-center gap-2 text-sm">

<span>{label}</span>


<button

onClick={() => onChange(!value)}

className={`

w-10 h-5 flex items-center rounded-full transition

${value ? "bg-primary" : "bg-neutral-300"}

`}

>

<motion.div

layout

className="bg-white w-4 h-4 rounded-full shadow ml-1"

/>

</button>

</div>

);

}