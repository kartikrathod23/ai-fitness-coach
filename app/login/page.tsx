"use client";

import Link from "next/link";
import { useState } from "react";
import AuthCard from "@/components/common/AuthCard";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // Save token (can be used later for protected routes)
      localStorage.setItem("token", data.token);

      // Redirect after login
      window.location.href = "/onboarding";
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <AuthCard
        title="Welcome back"
        subtitle="Login to continue your fitness journey"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border px-4 py-3 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg border px-4 py-3 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />

          <button
            type="submit"
            disabled={loading}
            className={`mt-2 w-full rounded-lg py-3 font-semibold text-white transition
              ${
                loading
                  ? "bg-muted cursor-not-allowed"
                  : "bg-indigo-600 shadow-lg shadow-indigo-600/30 hover:bg-indigo-500"
              }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-indigo-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </AuthCard>
    </main>
  );
}
