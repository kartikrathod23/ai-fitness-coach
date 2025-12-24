"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-md rounded-2xl border bg-white/80 p-8 shadow-xl backdrop-blur
                 dark:bg-black/60"
    >
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>

      <div className="mt-6">{children}</div>
    </motion.div>
  );
}
