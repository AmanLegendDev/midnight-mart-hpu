import Link from "next/link";

export default function ProductCard({ product }) {

return (

<Link href={`/products/${product.slug}`}>

<div className="bg-white rounded-2xl shadow-soft hover:shadow-lg transition overflow-hidden cursor-pointer group">

<img
src={product.images?.[0] || "/placeholder.png"}
className="w-full h-44 object-cover group-hover:scale-105 transition"
/>

<div className="p-4">

<h3 className="font-medium text-text line-clamp-1">

{product.title}

</h3>


<p className="text-xs text-neutral-500 mt-1 line-clamp-2">

{product.shortDescription}

</p>


<div className="flex justify-between items-center mt-4">

<span className="text-primary font-semibold">

₹ {product.price}

</span>

<span className="text-sm text-primary group-hover:underline">

View →

</span>

</div>

</div>

</div>

</Link>

);
}