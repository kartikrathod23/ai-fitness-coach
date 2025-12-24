"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export default function FeatureCard({
  icon,
  title,
  description,
  delay = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -6 }}
      className="rounded-2xl border bg-white/70 backdrop-blur
                 p-6 shadow-md hover:shadow-xl transition
                 dark:bg-black/40"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white">
        {icon}
      </div>

      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="mt-2 text-sm text-muted-foreground">
        {description}
      </p>
    </motion.div>
  );
}
