"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await fetch("/api/admin/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await res.json();

  if (res.ok) {
    router.push("/admin/dashboard");
    router.refresh(); // ⭐ important fix
  } else {
    alert(data.message || "Login failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-soft w-[350px]"
      >
        <h2 className="text-2xl font-semibold text-primary mb-6 text-center">

          Admin Login

        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-6"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg cursor-pointer">

          Login

        </button>
      </form>
    </div>
  );
}