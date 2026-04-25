"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductsPage() {

const [categories, setCategories] = useState([]);
const [images, setImages] = useState([]);
const [uploading, setUploading] = useState(false);

const [showPopup, setShowPopup] = useState(false);

const emptyForm = {
title: "",
shortDescription: "",
description: "",
benefits: "",
ingredients: "",
howToUse: "",
size: "",
price: "",
category: "",
isFeatured: false,
isVisible: true
};

const [form, setForm] = useState(emptyForm);


/*
====================
FETCH CATEGORIES
====================
*/

useEffect(() => {

fetch("/api/categories/dropdown")
.then(res => res.json())
.then(setCategories);

}, []);


/*
====================
IMAGE UPLOAD
====================
*/

const handleImageUpload = async e => {

const file = e.target.files[0];

if (!file) return;

setUploading(true);

const formData = new FormData();

formData.append("file", file);

const res = await fetch("/api/upload", {
method: "POST",
body: formData
});

const data = await res.json();

if (data?.url) {

setImages(prev => [...prev, data.url]);

}

setUploading(false);

};


/*
====================
SUBMIT PRODUCT
====================
*/

const handleSubmit = async e => {

e.preventDefault();

await fetch("/api/products/create", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({
...form,
images
})

});


/*
SUCCESS POPUP SHOW
*/

setShowPopup(true);


/*
RESET FORM
*/

setForm(emptyForm);
setImages([]);


/*
AUTO CLOSE POPUP
*/

setTimeout(() => {

setShowPopup(false);

}, 2000);

};



return (

<div className="max-w-3xl space-y-6 relative">


{/* SUCCESS POPUP */}

<AnimatePresence>

{showPopup && (

<motion.div

initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}
exit={{ opacity: 0, scale: 0.9 }}

className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"

>

<div className="bg-white rounded-xl shadow-soft px-8 py-6 text-center">

<h2 className="text-xl font-semibold text-green-600">

Product Created Successfully ✅

</h2>

<p className="text-neutral-500 mt-2">

New product added to store

</p>

</div>

</motion.div>

)}

</AnimatePresence>



{/* HEADER */}

<h1 className="text-2xl font-semibold text-primary">

Create Product

</h1>



<form

onSubmit={handleSubmit}

className="bg-white p-6 rounded-xl shadow-soft space-y-4"

>


{/* TITLE */}

<InputField
placeholder="Product title"
value={form.title}
onChange={v => setForm({...form,title:v})}
/>


{/* SHORT DESCRIPTION */}

<TextAreaField
placeholder="Short Description"
value={form.shortDescription}
onChange={v => setForm({...form,shortDescription:v})}
/>


{/* FULL DESCRIPTION */}

<TextAreaField
placeholder="Full Description"
value={form.description}
onChange={v => setForm({...form,description:v})}
/>


{/* BENEFITS */}

<TextAreaField
placeholder="Benefits (comma separated)"
value={form.benefits}
onChange={v => setForm({...form,benefits:v.split(",")})}
/>


{/* INGREDIENTS */}

<TextAreaField
placeholder="Ingredients"
value={form.ingredients}
onChange={v => setForm({...form,ingredients:v})}
/>


{/* HOW TO USE */}

<TextAreaField
placeholder="How to use"
value={form.howToUse}
onChange={v => setForm({...form,howToUse:v})}
/>


{/* SIZE */}

<InputField
placeholder="Size (eg: 100ml)"
value={form.size}
onChange={v => setForm({...form,size:v})}
/>


{/* PRICE */}

<InputField
placeholder="Price"
type="number"
value={form.price}
onChange={v => setForm({...form,price:v})}
/>


{/* CATEGORY */}

<select

value={form.category}

onChange={e =>
setForm({...form,category:e.target.value})
}

className="border p-3 w-full rounded-lg"

>

<option value="">Select category</option>

{categories.map(cat => (

<option key={cat._id} value={cat._id}>

{cat.name}

</option>

))}

</select>



{/* IMAGE UPLOAD */}

<input
type="file"
onChange={handleImageUpload}
/>


{uploading && (

<p className="text-sm text-neutral-500">

Uploading image...

</p>

)}



{/* IMAGE PREVIEW */}

<div className="flex gap-3 flex-wrap">

{images.map((img,i)=>(
<img
key={i}
src={img}
className="w-20 h-20 rounded"
/>
))}

</div>



{/* FEATURED */}

<label className="flex gap-2">

<input

type="checkbox"

checked={form.isFeatured}

onChange={e =>
setForm({...form,isFeatured:e.target.checked})
}

/>

Featured Product

</label>



{/* VISIBILITY */}

<label className="flex gap-2">

<input

type="checkbox"

checked={form.isVisible}

onChange={e =>
setForm({...form,isVisible:e.target.checked})
}

/>

Visible on website

</label>



{/* SUBMIT */}

<button

className="bg-primary text-white px-6 py-3 rounded-lg w-full"

>

Save Product

</button>


</form>

</div>

);

}



/*
====================
REUSABLE COMPONENTS
====================
*/

function InputField({placeholder,value,onChange,type="text"}){

return(

<input

type={type}

placeholder={placeholder}

value={value}

onChange={e=>onChange(e.target.value)}

className="border p-3 w-full rounded-lg"

/>

);

}



function TextAreaField({placeholder,value,onChange}){

return(

<textarea

placeholder={placeholder}

value={value}

onChange={e=>onChange(e.target.value)}

className="border p-3 w-full rounded-lg"

/>

);

}