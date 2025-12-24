"use client";

import { useState } from "react";
import ImageModal from "./ImageModal";
import { speakText, stopSpeaking } from "@/lib/textToSpeech";
import { dietPlanToSpeech } from "@/lib/planToSpeechText";

export default function DietPlan({ plan }: any) {
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // async function generateImage(meal: string) {
    //     const res = await fetch("/api/generate-image", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //             prompt: `${meal} food photography, realistic, studio lighting`,
    //         }),
    //     });

    //     const data = await res.json();
    //     setImage(data.image);
    // }

    function generateImage(meal: string) {
        const prompt = encodeURIComponent(
            `${meal} food photography, realistic, high quality`
        );

        setImage(`https://image.pollinations.ai/prompt/${prompt}`);
    }


    if (!plan) {
        return (
            <div className="rounded-xl border p-6 text-center text-muted-foreground">
                Diet plan not available.
            </div>
        );
    }

    return (
        <section>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    🥗 Diet Plan
                </h2>

                <div className="flex gap-2">
                    <button
                        onClick={() => speakText(dietPlanToSpeech(plan))}
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

            <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(plan.meals).map(([meal, items]: any) => (
                    <div
                        key={meal}
                        className="rounded-2xl border bg-white p-6 shadow-md"
                    >
                        <h3 className="font-semibold capitalize mb-2">{meal}</h3>

                        <ul className="space-y-1 text-sm text-muted-foreground">
                            {items.map((item: string, i: number) => (
                                <li key={i} className="flex justify-between items-center">
                                    <span>{item}</span>
                                    <button
                                        onClick={() => generateImage(item)}
                                        className="text-indigo-600"
                                    >
                                        🖼️
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
