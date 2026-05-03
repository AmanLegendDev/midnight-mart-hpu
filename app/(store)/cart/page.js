"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import FreebieProgress from "@/components/store/FreebieProgress";

export default function CartPage(){

const cart = useCartStore(state=>state.cart);

const addToCart = useCartStore(state=>state.addToCart);
const removeItem = useCartStore(state=>state.removeItem);
const decreaseQty = useCartStore(state=>state.decreaseQty);


/*
TOTAL ITEMS
*/

const totalItems = cart.reduce(
(acc,item)=>acc+item.qty,
0
);


/*
TOTAL PRICE
*/

const subtotal = cart.reduce(
(acc,item)=>acc + item.sellingPrice * item.qty,
0
);


/*
EMPTY CART
*/

if(cart.length===0)

return(

<section className="bg-[#020617] min-h-screen text-white">

<Navbar/>

<div className="flex flex-col items-center justify-center py-32 text-center">

<h2 className="text-2xl font-semibold">

Cart is empty 🛒

</h2>

<p className="text-neutral-400 mt-2">

Add snacks to unlock FREE rewards 🎁

</p>

<Link
href="/"
className="mt-6 bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold shadow-lg"
>

Browse Items

</Link>

</div>

</section>

);



return(

<section className="bg-[#020617] min-h-screen text-white pb-32">

<Navbar/>


{/* HEADER */}

<div className="px-5 pt-6 pb-2">

<h1 className="text-xl font-semibold text-yellow-400">

Your Cart

</h1>

<p className="text-xs text-neutral-400">

{totalItems} items selected

</p>

</div>


{/* FREEBIE PROGRESS */}

<FreebieProgress/>


{/* REWARD HINT STRIP */}

<div className="px-4 mt-3">

<div className="bg-[#111827] border border-yellow-400/20 rounded-xl px-4 py-3 text-xs text-neutral-300">

🎁 Unlock FREE Lollipop @ ₹150  
🍪 FREE Biscuit @ ₹300  
🧃 FREE Slice Bottle @ ₹500

</div>

</div>



{/* CART LIST */}

<div className="px-4 mt-4 space-y-4">

{cart.map(item=>(

<motion.div

key={item._id}

initial={{opacity:0,y:10}}

animate={{opacity:1,y:0}}

className="flex gap-4 items-center bg-[#111827] border border-white/10 rounded-2xl p-3"

>


{/* IMAGE */}

<img

src={item.image || "/placeholder.png"}

className="w-20 h-20 rounded-xl object-contain bg-black/20 p-2"

/>


{/* DETAILS */}

<div className="flex-1">


<h3 className="text-sm font-medium line-clamp-2">

{item.name}

</h3>


<p className="text-yellow-400 text-sm font-semibold mt-1">

₹ {item.sellingPrice}

</p>


<p className="text-[11px] text-neutral-400">

Item total ₹ {item.qty * item.sellingPrice}

</p>



{/* QTY CONTROLS */}

<div className="flex items-center gap-2 mt-2">


<button

onClick={()=>decreaseQty(item._id)}

className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center"

>

−

</button>


<span className="text-sm font-semibold">

{item.qty}

</span>


<button

onClick={()=>addToCart(item)}

className="w-8 h-8 rounded-lg bg-yellow-400 text-black flex items-center justify-center font-bold"

>

+

</button>


</div>

</div>



{/* REMOVE */}

<button

onClick={()=>removeItem(item._id)}

className="text-red-400"

>

<Trash2 size={18}/>

</button>


</motion.div>

))}

</div>



{/* STICKY CHECKOUT BAR */}

<motion.div

initial={{y:120,opacity:0}}

animate={{y:0,opacity:1}}

className="fixed bottom-0 left-0 w-full bg-[#020617] border-t border-white/10 px-4 py-4 flex items-center justify-between shadow-xl"

>


<div>

<p className="text-xs text-neutral-400">

Subtotal

</p>

<p className="text-lg font-semibold text-yellow-400">

₹ {subtotal}

</p>

</div>


<Link

href="/checkout"

className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold shadow-lg active:scale-95 transition"

>

Checkout →

</Link>


</motion.div>


</section>

);

}