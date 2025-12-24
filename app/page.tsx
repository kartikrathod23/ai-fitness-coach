"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import FeatureCard from "@/components/common/FeatureCard";
import { Brain, Dumbbell, FileText, RefreshCcw, } from "lucide-react";
import { User, SlidersHorizontal, Sparkles, CheckCircle, } from "lucide-react";

export default function HomePage() {
  return (
    
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-100 via-white to-emerald-100 dark:from-indigo-950 dark:via-black dark:to-emerald-950" />

        {/* Glow effect */}
        <div className="absolute -z-10 h-[300px] w-[300px] rounded-full bg-indigo-400/20 blur-3xl top-1/3 left-1/4" />
        <div className="absolute -z-10 h-[300px] w-[300px] rounded-full bg-emerald-400/20 blur-3xl bottom-1/3 right-1/4" />

        <div className="max-w-4xl px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-extrabold tracking-tight"
          >
            Your Personal{" "}
            <span className="text-primary">AI Fitness Coach</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            Instantly generate personalized workout plans, diet routines, and daily
            motivation — powered by advanced AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              href="/signup"
              className="rounded-xl px-8 py-4 font-semibold text-white
                        bg-gradient-to-r from-indigo-600 to-indigo-500
                        shadow-xl shadow-indigo-600/30
                        border border-indigo-500/40
                        hover:scale-105 hover:shadow-2xl
                        transition-all duration-200"
            >
              Start Free Now
            </Link>


            <Link
              href="#features"
              className="rounded-xl border px-8 py-4 font-medium hover:bg-muted transition"
            >
              See How It Works
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section
        id="features"
        className="relative py-24"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold">
              Everything You Need to Stay Fit
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Powered by AI to adapt to your body, goals, and lifestyle.
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<Brain size={22} />}
              title="AI-Powered Plans"
              description="Personalized workout and diet plans generated uniquely for your fitness goals."
              delay={0.1}
            />

            <FeatureCard
              icon={<Dumbbell size={22} />}
              title="Smart Workouts"
              description="Daily exercises with sets, reps, and rest time tailored to your level."
              delay={0.2}
            />

            <FeatureCard
              icon={<FileText size={22} />}
              title="Export as PDF"
              description="Download your complete fitness plan and follow it anytime, anywhere."
              delay={0.3}
            />

            <FeatureCard
              icon={<RefreshCcw size={22} />}
              title="Regenerate Anytime"
              description="Change goals or preferences and instantly regenerate your plan."
              delay={0.4}
            />
          </div>
        </div>
      </section>


      {/* HOW IT WORKS SECTION */}
      <section className="relative py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Get your personalized fitness plan in just a few simple steps.
            </p>
          </motion.div>

          <div className="grid gap-10 md:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white">
                  {step.icon}
                </div>

                <h3 className="text-lg font-semibold">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



    </main>
  );
}


const steps = [
  {
    title: "Create Your Profile",
    description:
      "Enter your age, height, weight, fitness level, and goals.",
    icon: <User size={22} />,
  },
  {
    title: "Set Preferences",
    description:
      "Choose workout location, diet type, and any medical considerations.",
    icon: <SlidersHorizontal size={22} />,
  },
  {
    title: "AI Generates Plan",
    description:
      "Our AI creates a personalized workout and diet plan just for you.",
    icon: <Sparkles size={22} />,
  },
  {
    title: "Follow & Improve",
    description:
      "Track progress, regenerate plans, and stay motivated every day.",
    icon: <CheckCircle size={22} />,
  },
];
