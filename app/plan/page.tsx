"use client";

import { useEffect, useState } from "react";
import PlanHeader from "@/components/plan/PlanHeader";
import WorkoutPlan from "@/components/plan/WorkoutPlan";
import DietPlan from "@/components/plan/DietPlan";
import MotivationBanner from "@/components/plan/MotivationBanner";
import Loader from "@/components/plan/Loader";
import { exportPlanToPDF } from "@/lib/exportPlanToPDF";
import { savePlanToHistory } from "@/lib/planHistory";
import PlanHistoryModal from "@/components/plan/PlanHistoryModal";


export default function PlanPage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [regenerating, setRegenerating] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [error, setError] = useState<string | null>(null);



    const [user, setUser] = useState<any>(null);
    useEffect(() => {
        const storedUser = localStorage.getItem("onboarding");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);



    async function generatePlan(isRegenerate = false) {
        if (isRegenerate) setRegenerating(true);
        else setLoading(true);

        setError(null); // reset old error

        try {
            const res = await fetch("/api/generate-plan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    JSON.parse(localStorage.getItem("onboarding") || "{}")
                ),
            });

            const json = await res.json();

            if (!res.ok) {
                setError(json.error || "Failed to generate plan");
                return;
            }

            setData(json);
            localStorage.setItem("ai_plan", JSON.stringify(json));
            
            if (json?.workout_plan && user) {
                savePlanToHistory(json, user);
            }

        } catch (err) {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
            setRegenerating(false);
        }
    }


    useEffect(() => {
        const storedPlan = localStorage.getItem("ai_plan");

        if (storedPlan) {
            setData(JSON.parse(storedPlan));
            setLoading(false);
        } else {
            generatePlan();
        }
    }, []);

    if (loading) return <Loader />;

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-red-600 font-medium">{error}</p>
                <button
                    onClick={() => generatePlan()}
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-white"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (!user || !data) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 flex items-center justify-center px-6">
                <div className="max-w-md w-full rounded-3xl bg-white/80 backdrop-blur-xl border shadow-2xl p-8 text-center">

                    {/* Icon */}
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full 
                        bg-indigo-100 text-indigo-600">
                        ⚠️
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold mb-2">
                        We couldn’t generate your plan
                    </h2>

                    {/* Explanation */}
                    <p className="text-sm text-muted-foreground mb-6">
                        Our AI is temporarily unavailable or your free quota has been exhausted.
                        Don’t worry — you can try again or go back and update your details.
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => generatePlan()}
                            className="rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 
                       py-3 text-white font-semibold shadow-lg hover:scale-105 transition"
                        >
                            🔁 Try Again
                        </button>

                        <button
                            onClick={() => window.location.href = "/onboarding"}
                            className="rounded-xl border py-3 text-sm font-medium hover:bg-muted transition"
                        >
                            ← Go Back to Onboarding
                        </button>
                    </div>
                </div>
            </main>
        );
    }


    return (
        <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 px-6 py-10">
            <div className="max-w-6xl mx-auto space-y-10">
                <PlanHeader />

                {/* PRIMARY ACTIONS */}
                <div className="flex flex-wrap justify-center gap-4">
                    <button
                        onClick={() => generatePlan(true)}
                        disabled={regenerating}
                        className={`rounded-xl px-6 py-2 font-semibold transition
            ${regenerating
                                ? "bg-muted text-muted-foreground cursor-not-allowed"
                                : "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg hover:scale-105"
                            }`}
                    >
                        {regenerating ? "Regenerating..." : "🔁 Regenerate Plan"}
                    </button>

                    <button
                        onClick={() => setShowHistory(true)}
                        className="rounded-xl border px-6 py-2 text-sm hover:bg-muted transition"
                    >
                        📜 View History
                    </button>


                    <button
                        onClick={() => exportPlanToPDF(data, user)}
                        className="rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 
            px-6 py-2 text-white font-semibold shadow-md hover:scale-105 transition"
                    >
                        📄 Export Plan as PDF
                    </button>
                </div>


                <MotivationBanner text={data.motivation} />

                {data?.workout_plan && (
                    <WorkoutPlan plan={data.workout_plan} />
                )}

                {data?.diet_plan && (
                    <DietPlan plan={data.diet_plan} />
                )}

            </div>

            <PlanHistoryModal
                open={showHistory}
                onClose={() => setShowHistory(false)}
                onSelect={(plan: any) => {
                    setData(plan);
                    localStorage.setItem("ai_plan", JSON.stringify(plan));
                }}
            />

        </main>
    );
}


