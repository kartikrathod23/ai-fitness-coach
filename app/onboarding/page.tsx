"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OnboardingProgress from "@/components/common/OnboardingProgress";

const TOTAL_STEPS = 4;

export default function OnboardingPage() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState<any>({});

    function next() {
        if (step < TOTAL_STEPS - 1) {
            setStep(step + 1);
        } else {
            // FINAL STEP: save data & redirect
            localStorage.setItem("onboarding", JSON.stringify(formData));
            window.location.href = "/plan";
        }
    }

    function back() {
        if (step > 0) setStep(step - 1);
    }

    function updateField(key: string, value: string) {
        setFormData({ ...formData, [key]: value });
    }


    function isStepValid(step: number, data: any) {
        if (step === 0) {
            return (
                typeof data.name === "string" &&
                data.name.trim().length > 0 &&
                Number(data.age) > 0 &&
                typeof data.gender === "string" &&
                data.gender.length > 0
            );
        }

        if (step === 1) {
            return (
                Number(data.height) > 0 &&
                Number(data.weight) > 0 &&
                typeof data.goal === "string" &&
                data.goal.length > 0
            );
        }

        if (step === 2) {
            return (
                typeof data.level === "string" &&
                data.level.length > 0 &&
                typeof data.location === "string" &&
                data.location.length > 0 &&
                typeof data.diet === "string" &&
                data.diet.length > 0
            );
        }

        return true; // Step 4 optional
    }


    return (
        <main className="relative min-h-screen overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br 
      from-indigo-100 via-white to-emerald-100
      dark:from-indigo-950 dark:via-black dark:to-emerald-950" />

            {/* Content */}
            <div className="min-h-screen max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">

                {/* LEFT VISUAL SECTION */}
                <div className="hidden lg:flex flex-col justify-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl font-bold leading-tight"
                    >
                        Build your <span className="text-indigo-600">personalized</span><br />
                        AI fitness plan
                    </motion.h1>

                    <p className="mt-4 text-lg text-muted-foreground max-w-md">
                        Answer a few simple questions and let our AI create a workout
                        and diet plan tailored just for you.
                    </p>

                    {/* Decorative elements */}
                    <div className="relative mt-10">
                        <div className="absolute h-40 w-40 rounded-full bg-indigo-400/30 blur-3xl -top-10 -left-10" />
                        <div className="absolute h-40 w-40 rounded-full bg-emerald-400/30 blur-3xl top-20 left-32" />
                    </div>
                </div>

                {/* RIGHT FORM SECTION */}
                <div className="flex justify-center">
                    <div className="w-full max-w-xl rounded-3xl border 
          bg-white/80 backdrop-blur-xl p-8 shadow-2xl
          dark:bg-black/60">

                        <OnboardingProgress step={step} total={TOTAL_STEPS} />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                                transition={{ duration: 0.45, ease: "easeOut" }}
                            >
                                {step === 0 && <StepOne updateField={updateField} />}
                                {step === 1 && <StepTwo updateField={updateField} />}
                                {step === 2 && <StepThree updateField={updateField} />}
                                {step === 3 && <StepFour updateField={updateField} />}
                            </motion.div>
                        </AnimatePresence>

                        <div className="mt-8 flex justify-between">
                            {step > 0 ? (
                                <button
                                    onClick={back}
                                    className="rounded-xl border px-5 py-2 text-sm 
                  hover:bg-muted transition"
                                >
                                    Back
                                </button>
                            ) : <div />}

                            <button
                                onClick={next}
                                disabled={!isStepValid(step, formData)}
                                className={`rounded-xl px-6 py-2 font-semibold transition
                                ${isStepValid(step, formData)
                                        ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-600/30 hover:scale-105 hover:shadow-xl"
                                        : "bg-muted text-muted-foreground cursor-not-allowed"
                                    }`}
                            >
                                {step === TOTAL_STEPS - 1 ? "Generate Plan" : "Next"}
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}

/* ---------- STEPS ---------- */

function StepOne({ updateField }: any) {
    return (
        <>
            <StepHeader
                title="Basic Information"
                subtitle="Tell us a bit about yourself so we can personalize your plan."
            />
            <Input label="Name" onChange={(v) => updateField("name", v)} />
            <Input label="Age" type="number" onChange={(v) => updateField("age", v)} />
            <Select
                label="Gender"
                options={["Male", "Female", "Other"]}
                onChange={(v) => updateField("gender", v)}
            />
        </>
    );
}

function StepTwo({ updateField }: any) {
    return (
        <>
            <StepHeader
                title="Body & Goal"
                subtitle="Help us understand your body and fitness objective."
            />
            <Input label="Height (cm)" type="number" onChange={(v) => updateField("height", v)} />
            <Input label="Weight (kg)" type="number" onChange={(v) => updateField("weight", v)} />
            <Select
                label="Fitness Goal"
                options={["Weight Loss", "Muscle Gain", "Maintain Fitness"]}
                onChange={(v) => updateField("goal", v)}
            />
        </>
    );
}

function StepThree({ updateField }: any) {
    return (
        <>
            <StepHeader
                title="Preferences"
                subtitle="Customize how and where you like to work out."
            />
            <Select
                label="Fitness Level"
                options={["Beginner", "Intermediate", "Advanced"]}
                onChange={(v) => updateField("level", v)}
            />
            <Select
                label="Workout Location"
                options={["Home", "Gym", "Outdoor"]}
                onChange={(v) => updateField("location", v)}
            />
            <Select
                label="Diet Preference"
                options={["Vegetarian", "Non-Vegetarian", "Vegan", "Keto"]}
                onChange={(v) => updateField("diet", v)}
            />
        </>
    );
}

function StepFour({ updateField }: any) {
    return (
        <>
            <StepHeader
                title="Optional Details"
                subtitle="These help us fine-tune your recommendations."
            />
            <Input label="Medical History (optional)" onChange={(v) => updateField("medical", v)} />
            <Select
                label="Stress Level"
                options={["Low", "Moderate", "High"]}
                onChange={(v) => updateField("stress", v)}
            />
        </>
    );
}

/* ---------- UI PARTS ---------- */

function StepHeader({ title, subtitle }: { title: string; subtitle: string }) {
    return (
        <>
            <h2 className="text-2xl font-bold mb-1">{title}</h2>
            <p className="mb-6 text-sm text-muted-foreground">{subtitle}</p>
        </>
    );
}

function Input({
    label,
    onChange,
    type = "text",
}: {
    label: string;
    onChange: (v: string) => void;
    type?: string;
}) {
    return (
        <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">
                {label.includes("optional") ? label : (
                    <>
                        {label} <span className="text-red-500">*</span>
                    </>
                )}
            </label>

            <input
                type={type}
                inputMode={type === "number" ? "numeric" : undefined}
                className="w-full rounded-xl border bg-white/80 px-4 py-3 text-sm
          focus:outline-none focus:ring-2 focus:ring-indigo-600
          dark:bg-black/40 transition"
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}


function Select({
    label,
    options,
    onChange,
}: {
    label: string;
    options: string[];
    onChange: (v: string) => void;
}) {
    return (
        <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">
                {label} <span className="text-red-500">*</span>
            </label>

            <select
                className="w-full rounded-xl border bg-white/80 px-4 py-3 text-sm
          focus:outline-none focus:ring-2 focus:ring-indigo-600
          dark:bg-black/40 transition"
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">Select an option</option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
}
