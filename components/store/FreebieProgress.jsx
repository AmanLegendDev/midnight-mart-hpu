"use client";

import { useCartStore } from "@/store/cartStore";

export default function FreebieProgress(){

const cart = useCartStore(state=>state.cart);

const total = cart.reduce(
(acc,item)=>acc + item.sellingPrice * item.qty,
0
);


/*
FREEBIE TIERS
*/

const tiers = [

{ amount:150, label:"FREE Lollipop 🍭" },

{ amount:300, label:"FREE Biscuit 🍪" },

{ amount:500, label:"FREE Slice Bottle 🧃" }

];


/*
FIND CURRENT TIER RANGE
*/

let previousTierAmount = 0;

let nextTier = null;

for(let i=0;i<tiers.length;i++){

if(total < tiers[i].amount){

nextTier = tiers[i];

break;

}

previousTierAmount = tiers[i].amount;

}


/*
ALL UNLOCKED
*/

if(!nextTier){

return(

<section className="mx-4 mt-6 rounded-2xl border border-green-500/30 bg-green-500/10 px-5 py-4">

<p className="text-green-400 text-sm font-semibold">

🎉 All FREE rewards unlocked!

You will receive Lollipop 🍭 Biscuit 🍪 and Slice 🧃 FREE

</p>

</section>

);

}


/*
CALCULATIONS
*/

const remaining = nextTier.amount - total;


/*
PROGRESS BETWEEN TIERS (smooth UX)
*/

const progress =

((total - previousTierAmount) /

(nextTier.amount - previousTierAmount)) * 100;


/*
RENDER
*/

return(

<section className="mx-4 mt-6 rounded-2xl border border-yellow-400/20 bg-[#111827] px-5 py-4 shadow-lg">


{/* HEADER */}

<div className="flex justify-between items-center text-xs text-neutral-400 mb-2">

<span>Unlock Rewards 🎁</span>

<span>Cart ₹{total}</span>

</div>


{/* MESSAGE */}

<p className="text-sm text-white font-medium">

Add ₹{remaining} more to unlock

<span className="text-yellow-400">

{" "}{nextTier.label}

</span>

</p>


{/* PROGRESS BAR */}

<div className="mt-3 h-2 w-full bg-black/30 rounded-full overflow-hidden">

<div

className="h-full bg-yellow-400 rounded-full transition-all duration-500"

style={{

width:`${Math.max(0,Math.min(progress,100))}%`

}}

></div>

</div>


{/* TIER MARKERS */}

<div className="flex justify-between mt-3 text-[10px] text-neutral-500">

{tiers.map(tier=>(

<span

key={tier.amount}

className={

total >= tier.amount

? "text-green-400 font-semibold"

: ""

}

>

₹{tier.amount}

</span>

))}

</div>


</section>

);

}