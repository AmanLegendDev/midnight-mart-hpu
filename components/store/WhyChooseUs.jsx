"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Natural Ingredients",
    image: "/icon-natural.jpg",
  },
  {
    title: "Free Delivery",
    image: "/icon-delivery.jpg",
  },
  {
    title: "Secure Checkout",
    image: "/icon-secure.jpg",
  },
  {
    title: "Customer Support",
    image: "/icon-support.jpg",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <h2 className="text-3xl font-semibold text-primary text-center mb-12">
          Why Choose Us
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">

          {features.map((item, index) => (

            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >

              <img
                src={item.image}
                className="w-14 h-14 mx-auto"
              />

              <p className="mt-4 font-medium text-text">
                {item.title}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}