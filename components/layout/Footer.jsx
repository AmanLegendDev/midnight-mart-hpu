import Link from "next/link";

export default function Footer() {

return (

<footer className="bg-[#0B0F19] border-t border-white/5 mt-10">

<div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">


{/* BRAND */}

<div>

<h2 className="text-yellow-400 text-lg font-semibold">

MidnightMartHPU

</h2>

<p className="text-neutral-400 mt-3 text-sm">

Late night hostel delivery inside HPU Summerhill campus.

Fast • Reliable • Student-friendly

</p>

</div>



{/* QUICK LINKS */}

<div>

<h3 className="font-semibold mb-3 text-white">

Quick Links

</h3>

<div className="flex flex-col gap-2 text-sm text-neutral-400">

<Link href="/">Home</Link>

<Link href="#categories">Categories</Link>

<Link href="/orders">Track Order</Link>

<a
href="https://wa.me/918219174058"
target="_blank"
>

Custom Order

</a>

</div>

</div>



{/* DELIVERY INFO */}

<div>

<h3 className="font-semibold mb-3 text-white">

Delivery Info

</h3>

<div className="flex flex-col gap-2 text-sm text-neutral-400">

<p>⚡ 10–15 min delivery</p>

<p>🏫 Inside HPU campus only</p>

<p>🌙 Midnight service active</p>

</div>

</div>



{/* CONTACT */}

<div>

<h3 className="font-semibold mb-3 text-white">

Contact Support

</h3>

<div className="flex flex-col gap-2 text-sm text-neutral-400">

<p>Shimla • HPU Summerhill</p>

<a
href="tel:8219174058"
className="hover:text-yellow-400 transition"
>

📞 +91 8219174058

</a>

<a
href="https://wa.me/918219174058"
target="_blank"
className="hover:text-yellow-400 transition"
>

💬 WhatsApp Support

</a>

</div>

</div>


</div>



{/* COPYRIGHT STRIP */}

<div className="text-center text-xs text-neutral-500 pb-6">

© {new Date().getFullYear()} MidnightMartHPU — Built for HPU Students 🚀

</div>


</footer>

);

}