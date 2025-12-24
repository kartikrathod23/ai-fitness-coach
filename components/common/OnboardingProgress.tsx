"use client";

export default function OnboardingProgress({
  step,
  total,
}: {
  step: number;
  total: number;
}) {
  const percentage = ((step + 1) / total) * 100;

  return (
    <div className="mb-8">
      <div className="h-2 w-full rounded-full bg-muted">
        <div
          className="h-2 rounded-full bg-indigo-600 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Step {step + 1} of {total}
      </p>
    </div>
  );
}
