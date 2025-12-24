"use client";

import Link from "next/link";
import { useState } from "react";
import AuthCard from "@/components/common/AuthCard";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.error);
      return;
    }

    localStorage.setItem("token", data.token);
    window.location.href = "/onboarding";
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <AuthCard title="Create your account" subtitle="Start your AI-powered fitness journey">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 text-sm"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 text-sm"
          />

          <button className="w-full rounded-lg bg-indigo-600 py-3 text-white font-semibold">
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account? <Link href="/login" className="text-indigo-600">Login</Link>
        </p>
      </AuthCard>
    </main>
  );
}
