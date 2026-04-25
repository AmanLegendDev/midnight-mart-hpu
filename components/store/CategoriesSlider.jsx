"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Face Care",
    image: "/cat-face.jpg",
  },
  {
    name: "Hair Care",
    image: "/cat-hair.jpg",
  },
  {
    name: "Makeup",
    image: "/cat-makeup.jpg",
  },
  {
    name: "Body Care",
    image: "/cat-body.jpg",
  },
  {
    name: "Serums",
    image: "/cat-serum.jpg",
  },
];

export default function CategoriesSlider() {
  return (
    <section className="bg-secondary">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <h2 className="text-3xl font-semibold text-primary text-center mb-12">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

          {categories.map((cat, index) => (

            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >

              <Link
                href="/products"
                className="bg-white rounded-2xl shadow-soft hover:shadow-lg transition group block text-center p-6"
              >

                <img
                  src={cat.image}
                  className="w-20 h-20 mx-auto object-contain group-hover:scale-110 transition"
                />

                <p className="mt-4 text-sm font-medium text-text">
                  {cat.name}
                </p>

              </Link>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}