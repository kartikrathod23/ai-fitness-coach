"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Dumbbell, Moon, Sun, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setMounted(true);

    // ✅ CHECK AUTH STATE
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("onboarding");
    localStorage.removeItem("ai_plan");

    window.location.href = "/";
  }

  if (!mounted) return null;

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <Dumbbell size={18} />
          </span>
          AI Fitness Coach
        </Link>

        <div className="flex items-center gap-4">
          {/* THEME TOGGLE
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-lg border px-3 py-2 hover:bg-muted transition"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button> */}

          {/* AUTH BUTTONS */}
          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="rounded-xl border px-6 py-2 text-sm"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white"
              >
                Get Started
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg border border-red-500 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
