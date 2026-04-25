"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {

return (

<section className="bg-secondary relative overflow-hidden">


{/* SOFT BACKGROUND GLOW */}

<div className="absolute top-[-120px] right-[-120px] w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl hidden md:block"/>


<div className="max-w-7xl mx-auto px-6 py-20 md:py-24 grid md:grid-cols-2 gap-10 items-center">


{/* LEFT CONTENT */}

<motion.div
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
>


{/* BADGE */}

<span className="inline-block text-xs tracking-wide bg-primary/10 text-primary px-4 py-1 rounded-full font-medium">

Premium Beauty Collection

</span>


{/* TITLE */}

<h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-semibold text-primary leading-tight">

Elevate Your Natural Beauty
With Premium Cosmetics

</h1>


{/* DESCRIPTION */}

<p className="mt-6 text-neutral-600 max-w-lg text-lg">

Discover skincare and makeup crafted for confidence,
radiance, and everyday elegance.

</p>


{/* CTA BUTTONS */}

<div className="flex gap-4 mt-8 flex-wrap">

<Link
href="/products"
className="bg-primary text-white px-7 py-3 rounded-xl shadow-soft hover:scale-[1.03] transition"
>

Shop Now

</Link>


<Link
href="/products"
className="border border-primary text-primary px-7 py-3 rounded-xl hover:bg-primary hover:text-white transition"
>

Explore Collection

</Link>

</div>


{/* TRUST BADGE MOBILE VERSION */}

<div className="mt-6 md:hidden bg-white px-5 py-3 rounded-xl shadow-soft text-sm w-fit">

✨ Trusted by 2,000+ happy customers

</div>


</motion.div>



{/* RIGHT IMAGE */}

<motion.div
initial={{ opacity: 0, scale: 0.95 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.7 }}
className="relative"
>


<img
src="/hero-banner.jpg"
className="rounded-2xl shadow-soft object-cover w-full max-h-[420px]"
/>


{/* FLOATING TRUST BADGE DESKTOP */}

<div className="hidden md:block absolute bottom-6 left-6 bg-white px-5 py-3 rounded-xl shadow-soft text-sm">

✨ Trusted by 2,000+ happy customers

</div>


</motion.div>


</div>

</section>

);

}