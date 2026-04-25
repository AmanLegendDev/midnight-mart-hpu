"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProductPage() {

const { id } = useParams();
const router = useRouter();

const [form, setForm] = useState(null);
const [categories, setCategories] = useState([]);
const [images, setImages] = useState([]);
const [uploading, setUploading] = useState(false);


/*
====================
FETCH PRODUCT DATA
====================
*/

useEffect(() => {

fetch(`/api/products/${id}`)
.then(res => res.json())
.then(data => {

setForm(data);

setImages(data.images || []);

});

fetch("/api/categories/dropdown")
.then(res => res.json())
.then(setCategories);

}, [id]);


/*
====================
UPLOAD IMAGE
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

if (data.url) {

setImages(prev => [...prev, data.url]);

}

setUploading(false);

};


/*
====================
REMOVE IMAGE
====================
*/

const removeImage = index => {

setImages(prev =>
prev.filter((_, i) => i !== index)
);

};


/*
====================
SUBMIT UPDATE
====================
*/

const handleSubmit = async e => {

e.preventDefault();

await fetch("/api/products/update", {

method: "POST",

headers: {

"Content-Type": "application/json"

},

body: JSON.stringify({

id,

data: {

...form,

images

}

})

});

/*
AUTO REDIRECT
*/

router.push("/admin/products");

};



if (!form) return null;



return (

<div className="max-w-3xl space-y-8">


{/* HEADER */}

<div>

<h1 className="text-3xl font-semibold text-primary">

Edit Product

</h1>

<p className="text-neutral-500">

Update full product information

</p>

</div>



<form

onSubmit={handleSubmit}

className="bg-white rounded-xl shadow-soft border border-borderSoft p-6 space-y-6"

>


{/* TITLE */}

<InputField
label="Title"
value={form.title}
onChange={v => setForm({...form,title:v})}
/>


{/* SHORT DESCRIPTION */}

<InputField
label="Short Description"
value={form.shortDescription || ""}
onChange={v =>
setForm({...form,shortDescription:v})
}
/>


{/* FULL DESCRIPTION */}

<TextAreaField
label="Full Description"
value={form.description || ""}
onChange={v =>
setForm({...form,description:v})
}
/>


{/* BENEFITS */}

<TextAreaField
label="Benefits (comma separated)"
value={form.benefits?.join(",") || ""}
onChange={v =>
setForm({
...form,
benefits: v.split(",")
})
}
/>


{/* INGREDIENTS */}

<TextAreaField
label="Ingredients"
value={form.ingredients || ""}
onChange={v =>
setForm({...form,ingredients:v})
}
/>


{/* HOW TO USE */}

<TextAreaField
label="How To Use"
value={form.howToUse || ""}
onChange={v =>
setForm({...form,howToUse:v})
}
/>


{/* SIZE */}

<InputField
label="Size"
value={form.size || ""}
onChange={v =>
setForm({...form,size:v})
}
/>


{/* PRICE */}

<InputField
label="Price"
type="number"
value={form.price}
onChange={v =>
setForm({...form,price:v})
}
/>


{/* CATEGORY */}

<select

value={form.category}

onChange={e =>
setForm({

...form,

category:e.target.value

})

}

className="border border-borderSoft p-3 w-full rounded-lg"

>

{categories.map(cat => (

<option

key={cat._id}

value={cat._id}

>

{cat.name}

</option>

))}

</select>



{/* IMAGE UPLOAD */}

<div>

<label className="text-sm font-medium">

Product Images

</label>

<input

type="file"

onChange={handleImageUpload}

className="mt-2"

/>

{uploading && (

<p className="text-sm text-neutral-400">

Uploading...

</p>

)}


<div className="flex gap-3 flex-wrap mt-4">

{images.map((img,index)=>(

<div key={index} className="relative">

<img

src={img}

className="w-24 h-24 object-cover rounded-lg border"

/>

<button

type="button"

onClick={()=>removeImage(index)}

className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"

>

×

</button>

</div>

))}

</div>

</div>



{/* FEATURED */}

<CheckboxField
label="Featured Product"
value={form.isFeatured}
onChange={v =>
setForm({...form,isFeatured:v})
}
/>


{/* VISIBILITY */}

<CheckboxField
label="Visible on Website"
value={form.isVisible}
onChange={v =>
setForm({...form,isVisible:v})
}
/>



<button

className="bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition"

>

Update Product

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

function InputField({label,value,onChange,type="text"}){

return(

<div>

<label className="text-sm font-medium">

{label}

</label>

<input

type={type}

value={value}

onChange={e=>onChange(e.target.value)}

className="border border-borderSoft p-3 w-full rounded-lg mt-1"

/>

</div>

);

}


function TextAreaField({label,value,onChange}){

return(

<div>

<label className="text-sm font-medium">

{label}

</label>

<textarea

value={value}

onChange={e=>onChange(e.target.value)}

className="border border-borderSoft p-3 w-full rounded-lg mt-1"

/>

</div>

);

}


function CheckboxField({label,value,onChange}){

return(

<label className="flex gap-2 items-center">

<input

type="checkbox"

checked={value}

onChange={e=>onChange(e.target.checked)}

/>

{label}

</label>

);

}