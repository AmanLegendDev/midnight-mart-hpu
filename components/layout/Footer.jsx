import Link from "next/link";

export default function Footer() {

return (

<footer className="bg-white border-t mt-20">

<div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">


{/* BRAND */}

<div>

<h2 className="text-primary text-xl font-semibold">

Hilaireofficial

</h2>

<p className="text-neutral-500 mt-3 text-sm">

Premium beauty essentials crafted for confidence and elegance.

</p>

</div>


{/* SHOP */}

<div>

<h3 className="font-semibold mb-3">

Shop

</h3>

<div className="flex flex-col gap-2 text-sm text-neutral-500">

<Link href="/products">All Products</Link>

<Link href="/cart">Cart</Link>

<Link href="/checkout">Checkout</Link>

</div>

</div>


{/* SUPPORT */}

<div>

<h3 className="font-semibold mb-3">

Support

</h3>

<div className="flex flex-col gap-2 text-sm text-neutral-500">

<p>Shipping Policy</p>

<p>Return Policy</p>

<p>Privacy Policy</p>

</div>

</div>


{/* CONTACT */}

<div>

<h3 className="font-semibold mb-3">

Contact

</h3>

<p className="text-sm text-neutral-500">

Shimla, Himachal Pradesh

</p>

<p className="text-sm text-neutral-500 mt-1">

+91 8219174058

</p>

</div>


</div>


<div className="text-center text-xs text-neutral-400 pb-6">

© {new Date().getFullYear()} Hilaireofficial. All rights reserved.

</div>

</footer>

);

}