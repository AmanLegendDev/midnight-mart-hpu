"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { Trash2 } from "lucide-react";

export default function CartPage() {

const cart = useCartStore(state => state.cart);

const addToCart =
useCartStore(state => state.addToCart);

const removeItem =
useCartStore(state => state.removeItem);

const decreaseQty =
useCartStore(state => state.decreaseQty);


const subtotal = cart.reduce(
(acc, item) =>
acc + item.price * item.qty,
0
);


if (cart.length === 0)
return (

<section className="bg-secondary min-h-screen">

<Navbar />

<div className="flex flex-col items-center justify-center py-32 text-center">

<h2 className="text-3xl font-semibold text-primary">

Your cart is empty

</h2>

<p className="text-neutral-500 mt-2">

Looks like you haven't added anything yet

</p>

<Link
href="/products"
className="mt-6 bg-primary text-white px-7 py-3 rounded-xl shadow-soft hover:scale-[1.02] transition"
>

Continue Shopping

</Link>

</div>

</section>

);


return (

<section className="bg-secondary min-h-screen">

<Navbar />

<div className="max-w-6xl mx-auto px-6 py-16">

<h1 className="text-3xl font-semibold text-primary mb-10">

Shopping Cart

</h1>


<div className="grid md:grid-cols-3 gap-10">


{/* CART ITEMS */}

<div className="md:col-span-2 space-y-6">

{cart.map(item => (

<div
key={item._id}
className="bg-white rounded-2xl shadow-soft flex flex-col sm:flex-row gap-6 p-6 items-center"
>


<img
src={
item.images?.find(Boolean)
|| "/placeholder.png"
}
className="w-28 h-28 object-cover rounded-xl"
/>


<div className="flex-1">


<h3 className="font-medium text-text text-lg">

{item.title}

</h3>


<p className="text-accent mt-1">

₹ {item.price}

</p>


{/* QUANTITY CONTROLS */}

<div className="flex gap-3 mt-4 items-center">


<button
onClick={() =>
decreaseQty(item._id)
}
className="px-3 py-1 border rounded-lg hover:bg-secondary transition"
>

−

</button>


<span className="font-medium">

{item.qty}

</span>


<button
onClick={() =>
addToCart(item)
}
className="px-3 py-1 border rounded-lg hover:bg-secondary transition"
>

+

</button>

</div>

</div>


{/* REMOVE BUTTON */}

<button
onClick={() =>
removeItem(item._id)
}
className="text-red-500 hover:scale-110 transition"
>

<Trash2 size={20} />

</button>


</div>

))}

</div>



{/* ORDER SUMMARY */}

<div className="bg-white rounded-2xl shadow-soft p-6 h-fit sticky top-24">


<h2 className="text-xl font-semibold text-primary mb-6">

Order Summary

</h2>


<div className="flex justify-between mb-3 text-neutral-600">

<span>Subtotal</span>

<span>₹ {subtotal}</span>

</div>


<div className="flex justify-between mb-6 text-neutral-600">

<span>Shipping</span>

<span>Free</span>

</div>


<hr />


<div className="flex justify-between text-lg font-semibold mt-6">

<span>Total</span>

<span>₹ {subtotal}</span>

</div>


<Link
href="/checkout"
className="mt-6 block text-center bg-primary text-white py-3 rounded-xl shadow-soft hover:scale-[1.02] transition"
>

Proceed to Checkout

</Link>


<Link
href="/products"
className="mt-4 block text-center border border-primary text-primary py-3 rounded-xl hover:bg-primary hover:text-white transition"
>

Continue Shopping

</Link>


</div>

</div>

</div>

</section>

);

}