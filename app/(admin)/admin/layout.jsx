"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {

const pathname = usePathname();

const [open, setOpen] = useState(false);

const NavItem = ({ href, label }) => (

<Link
href={href}
onClick={() => setOpen(false)}
className={`px-4 py-2 rounded-lg transition
${
pathname === href
? "bg-primary text-white"
: "text-text hover:bg-secondary"
}`}
>

{label}

</Link>

);

return (

<div className="flex min-h-screen bg-secondary">


{/* SIDEBAR */}

<aside
className={`

fixed lg:static inset-y-0 left-0 w-64

bg-white border-r border-borderSoft

transform transition-transform duration-300

z-50

${open ? "translate-x-0" : "-translate-x-full"}

lg:translate-x-0

`}
>


{/* BRAND */}

<div className="flex items-center gap-3 px-6 py-5 border-b border-borderSoft">

<img
src="/logo.png"
className="h-8 object-contain"
/>

<span className="font-semibold text-primary text-lg tracking-wide">

Hilaireofficial

</span>

</div>



{/* NAVIGATION */}

<nav className="flex flex-col gap-2 p-4">

<NavItem href="/admin/dashboard" label="Dashboard" />

<NavItem href="/admin/categories" label="Categories" />

<NavItem href="/admin/products" label="Products" />

<NavItem href="/admin/orders" label="Orders" />


<button

className="mt-6 px-4 py-2 rounded-lg text-left text-red-500 hover:bg-secondary transition"

>

Logout

</button>

</nav>

</aside>



{/* MAIN AREA */}

<div className="flex-1 flex flex-col">


{/* HEADER */}

<header className="bg-white border-b border-borderSoft px-6 py-4 flex items-center justify-between">


{/* HAMBURGER */}

<button

onClick={() => setOpen(!open)}

className="lg:hidden text-primary text-2xl"

>

☰

</button>



{/* HEADER BRAND */}

<div className="flex items-center gap-3">

<img

src="/logo.png"

className="h-7"

/>

<span className="font-semibold text-primary tracking-wide">

Admin Dashboard

</span>

</div>

</header>



{/* PAGE CONTENT */}

<main className="p-6 flex-1">

{children}

</main>


</div>


</div>

);

}