import { v4 as uuid } from "uuid";

export function savePlanToHistory(plan: any, user: any) {
  const history = JSON.parse(localStorage.getItem("plan_history") || "[]");

  history.unshift({
    plan,
    user: {
      name: user?.name || "Anonymous",
      goal: user?.goal || "Fitness",
    },
    createdAt: new Date().toISOString(),
  });

  localStorage.setItem("plan_history", JSON.stringify(history));
}


export function getPlanHistory() {
  return JSON.parse(localStorage.getItem("ai_plan_history") || "[]");
}

export function clearPlanHistory() {
  localStorage.removeItem("ai_plan_history");
}
