"use client";

import { useState } from "react";
import ImageModal from "./ImageModal";
import { speakText, stopSpeaking } from "@/lib/textToSpeech";
import { workoutPlanToSpeech } from "@/lib/planToSpeechText";

export default function WorkoutPlan({ plan }: any) {
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // async function generateImage(exercise: string) {
    //     setLoading(true);

    //     try {
    //         const res = await fetch("/api/generate-image", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({
    //                 prompt: `${exercise} exercise in gym, realistic fitness photography`,
    //             }),
    //         });

    //         const data = await res.json();

    //         if (!res.ok) {
    //             alert(data.error || "Failed to generate image");
    //             return;
    //         }

    //         setImage(data.image);
    //     } catch {
    //         alert("Network error");
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    function generateImage(exercise: string) {
        const prompt = encodeURIComponent(
            `${exercise} gym exercise, realistic fitness photography, correct form`
        );

        setImage(`https://image.pollinations.ai/prompt/${prompt}`);
    }




    if (!plan) {
        return (
            <div className="rounded-xl border p-6 text-center text-muted-foreground">
                Workout plan not available.
            </div>
        );
    }

    return (
        <section>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    🏋️ Workout Plan
                </h2>

                <div className="flex gap-2">
                    <button
                        onClick={() => speakText(workoutPlanToSpeech(plan))}
                        className="rounded-lg border px-4 py-1.5 text-sm hover:bg-muted"
                    >
                        🔊 Read
                    </button>

                    <button
                        onClick={stopSpeaking}
                        className="rounded-lg border px-4 py-1.5 text-sm hover:bg-muted"
                    >
                        ⏹ Stop
                    </button>
                </div>
            </div>

            <p className="mb-6 text-muted-foreground">{plan.overview}</p>

            {/* Days */}
            <div className="grid md:grid-cols-2 gap-6">
                {plan.days.map((day: any) => (
                    <div
                        key={day.day}
                        className="rounded-2xl border bg-white p-6 shadow-md"
                    >
                        <h3 className="font-semibold">{day.day}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Focus: {day.focus}
                        </p>

                        <ul className="space-y-2">
                            {day.exercises.map((ex: any, i: number) => (
                                <li
                                    key={i}
                                    className="flex justify-between items-center text-sm border-b pb-1"
                                >
                                    <span>{ex.name}</span>
                                    <button
                                        onClick={() => generateImage(ex.name)}
                                        className="text-indigo-600 text-sm"
                                    >
                                        🖼️ View Image
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {loading && (
                <p className="mt-4 text-sm text-muted-foreground">
                    Generating image…
                </p>
            )}

            <ImageModal image={image} onClose={() => setImage(null)} />
        </section>
    );
}
