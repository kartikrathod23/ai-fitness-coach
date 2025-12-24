export function workoutPlanToSpeech(plan: any) {
  let text = `Here is your workout plan. ${plan.overview}. `;

  plan.days.forEach((day: any) => {
    text += `${day.day}. Focus: ${day.focus}. `;
    day.exercises.forEach((ex: any) => {
      text += `${ex.name}, ${ex.sets} sets, ${ex.reps} reps. `;
    });
  });

  return text;
}

export function dietPlanToSpeech(plan: any) {
  let text = `Here is your diet plan. ${plan.overview}. `;

  Object.entries(plan.meals).forEach(([meal, items]: any) => {
    text += `${meal}. `;
    items.forEach((item: string) => {
      text += `${item}. `;
    });
  });

  return text;
}
