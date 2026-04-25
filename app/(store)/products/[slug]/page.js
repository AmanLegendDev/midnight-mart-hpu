"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import Navbar from "@/components/layout/Navbar";
import ProductCard from "@/components/store/ProductCard";

export default function ProductPage() {

const { slug } = useParams();

const addToCart = useCartStore(
state => state.addToCart
);

const [product, setProduct] = useState(null);

const [selectedImage, setSelectedImage] =
useState(null);

const [relatedProducts, setRelatedProducts] =
useState([]);

const [showPopup, setShowPopup] =
useState(false);



/* LOAD PRODUCT */

useEffect(() => {

fetch(`/api/store/product/${slug}`, {
  cache: "no-store"
})
.then(res => res.json())
.then(data => {

setProduct(data);

setSelectedImage(
data.images?.[0]
);

});

}, [slug]);



/* LOAD RELATED PRODUCTS */

useEffect(() => {

if (!product?.category?._id) return;

fetch("/api/store/products", {
  cache: "no-store"
})
.then(res => res.json())
.then(data => {

const filtered =
data.filter(p =>

p.category?._id ===
product.category._id &&
p.slug !== product.slug

);

setRelatedProducts(filtered);

});

}, [product]);



/* ADD TO CART */

const handleAddToCart = () => {

addToCart(product);

setShowPopup(true);

setTimeout(() => {

setShowPopup(false);

}, 2000);

};



if (!product)
return (
<p className="text-center py-20">
Loading...
</p>
);



return (

<section className="bg-secondary min-h-screen">

<Navbar />

<div className="max-w-6xl mx-auto px-6 py-16">


{/* TOP SECTION */}

<div className="grid md:grid-cols-2 gap-14">


{/* IMAGE SIDE */}

<div>

<img
src={selectedImage || "/placeholder.png"}
className="rounded-2xl shadow-soft w-full object-cover"
/>


{/* THUMBNAILS */}

<div className="flex gap-3 mt-4 flex-wrap">

{product.images?.map((img, i) => (

<img
key={i}
src={img}
onClick={() => setSelectedImage(img)}
className={`

w-16 h-16 rounded-lg cursor-pointer object-cover border

${selectedImage === img
? "border-primary"
: "border-neutral-200"}

`}
/>

))}

</div>

</div>



{/* RIGHT SIDE */}

<div>


<h1 className="text-4xl font-semibold text-primary">

{product.title}

</h1>


{product.shortDescription && (

<p className="text-lg text-neutral-500 mt-3">

{product.shortDescription}

</p>

)}


<p className="text-3xl text-accent mt-4 font-semibold">

₹ {product.price}

</p>


{/* TRUST STRIP */}

<div className="mt-4 text-sm text-neutral-500 space-y-1">

<p>✔ Free Delivery Available</p>

<p>✔ Cash on Delivery Available</p>

<p>✔ Secure Checkout</p>

</div>


{product.size && (

<p className="mt-4 text-sm">

Size: {product.size}

</p>

)}



{/* BUTTONS DESKTOP */}

<div className="hidden md:flex gap-4 mt-8">

<button
onClick={handleAddToCart}
className="bg-primary text-white px-6 py-3 rounded-lg hover:scale-[1.03] transition"
>

Add to Cart

</button>


<a
href={`https://wa.me/918219174058?text=Hi I want to order ${product.title}`}
target="_blank"
className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition"
>

WhatsApp Order

</a>

</div>

</div>

</div>



{/* DESCRIPTION BLOCK */}

{product.description && (

<div className="mt-16 bg-white rounded-xl shadow-soft p-8">

<h2 className="text-2xl font-semibold text-primary mb-4">

Product Description

</h2>

<p className="text-neutral-600 leading-relaxed">

{product.description}

</p>

</div>

)}



{/* BENEFITS */}

{product.benefits?.length > 0 && (

<div className="mt-10">

<h2 className="text-2xl font-semibold text-primary mb-6">

Key Benefits

</h2>

<div className="grid md:grid-cols-3 gap-6">

{product.benefits.map((b, i) => (

<div
key={i}
className="bg-white rounded-xl shadow-soft p-5"
>

✔ {b}

</div>

))}

</div>

</div>

)}



{/* INGREDIENTS */}

{product.ingredients && (

<div className="mt-12 bg-white rounded-xl shadow-soft p-8">

<h2 className="text-2xl font-semibold text-primary mb-4">

Ingredients

</h2>

<p className="text-neutral-600">

{product.ingredients}

</p>

</div>

)}



{/* HOW TO USE */}

{product.howToUse && (

<div className="mt-12 bg-white rounded-xl shadow-soft p-8">

<h2 className="text-2xl font-semibold text-primary mb-4">

How to Use

</h2>

<p className="text-neutral-600">

{product.howToUse}

</p>

</div>

)}



{/* RELATED PRODUCTS */}

{relatedProducts.length > 0 && (

<div className="mt-20">

<h2 className="text-2xl font-semibold text-primary mb-8">

Related Products

</h2>

<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

{relatedProducts.map(product => (

<ProductCard
key={product._id}
product={product}
/>

))}

</div>

</div>

)}


</div>



{/* MOBILE CTA BAR */}

<div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t shadow-soft p-4 flex gap-3 z-50">

<button
onClick={handleAddToCart}
className="flex-1 bg-primary text-white py-3 rounded-lg"
>

Add to Cart

</button>


<a
href={`https://wa.me/918219174058?text=Hi I want to order ${product.title}`}
target="_blank"
className="flex-1 border border-primary text-primary py-3 rounded-lg text-center"
>

WhatsApp Order

</a>

</div>



{/* SUCCESS POPUP */}

{showPopup && (

<div className="fixed top-6 right-6 bg-primary text-white px-6 py-3 rounded-xl shadow-lg z-50">

Added to cart successfully ✅

</div>

)}

</section>

);

}