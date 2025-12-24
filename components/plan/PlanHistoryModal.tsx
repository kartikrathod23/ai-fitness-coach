"use client";

import { getPlanHistory, clearPlanHistory } from "@/lib/planHistory";

export default function PlanHistoryModal({
  open,
  onClose,
  onSelect,
}: any) {
  if (!open) return null;

  const history = getPlanHistory();

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white dark:bg-black rounded-2xl w-full max-w-lg p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">📜 Plan History</h2>
          <button onClick={onClose}>✖</button>
        </div>

        {history.length === 0 ? (
          <p className="text-muted-foreground">No saved plans yet.</p>
        ) : (
          <ul className="space-y-3 max-h-80 overflow-y-auto">
            {history.map((item: any) => (
              <li
                key={item.id}
                onClick={() => {
                  onSelect(item.plan);
                  onClose();
                }}
                className="cursor-pointer rounded-lg border p-3 hover:bg-muted transition"
              >
                <p className="font-medium">
                  {item.user?.name ?? "Anonymous User"}
                  {" — "}
                  {item.user?.goal ?? "Fitness Plan"}
                </p>

                <p className="text-xs text-muted-foreground">
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleString()
                    : "Unknown date"}
                </p>

              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex justify-between">
          <button
            onClick={() => {
              clearPlanHistory();
              onClose();
            }}
            className="text-sm text-red-500"
          >
            Clear History
          </button>
        </div>
      </div>
    </div>
  );
}
