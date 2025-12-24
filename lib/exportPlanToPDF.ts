import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportPlanToPDF(plan: any, user: any) {
  const doc = new jsPDF();

  let y = 15;

  if (!plan || !user) {
    alert("Plan or user data missing. Please regenerate.");
    return;
  }

  // Title
  doc.setFontSize(18);
  doc.text("AI Fitness Coach – Personalized Plan", 14, y);
  y += 10;

  // User info
  doc.setFontSize(11);
  doc.text(`Name: ${user.name}`, 14, y); y += 6;
  doc.text(`Age: ${user.age}`, 14, y); y += 6;
  doc.text(`Gender: ${user.gender}`, 14, y); y += 6;
  doc.text(`Goal: ${user.goal}`, 14, y); y += 10;

  // Workout Plan
  doc.setFontSize(14);
  doc.text("Workout Plan", 14, y);
  y += 6;

  plan.workout_plan.days.forEach((day: any) => {
    doc.setFontSize(12);
    doc.text(`${day.day} – ${day.focus}`, 14, y);
    y += 4;

    autoTable(doc, {
      startY: y,
      head: [["Exercise", "Sets", "Reps", "Rest"]],
      body: day.exercises.map((ex: any) => [
        ex.name,
        ex.sets,
        ex.reps,
        ex.rest,
      ]),
      theme: "grid",
      styles: { fontSize: 9 },
    });

    y = (doc as any).lastAutoTable.finalY + 8;
  });

  // Diet Plan
  doc.setFontSize(14);
  doc.text("Diet Plan", 14, y);
  y += 6;

  Object.entries(plan.diet_plan.meals).forEach(([meal, items]: any) => {
    doc.setFontSize(11);
    doc.text(meal.toUpperCase(), 14, y);
    y += 4;

    items.forEach((item: string) => {
      doc.text(`• ${item}`, 16, y);
      y += 4;
    });

    y += 2;
  });

  // Tips
  doc.setFontSize(14);
  doc.text("Tips", 14, y);
  y += 6;

  plan.tips.forEach((tip: string) => {
    doc.setFontSize(10);
    doc.text(`• ${tip}`, 16, y);
    y += 4;
  });

  // Motivation
  y += 6;
  doc.setFontSize(12);
  doc.text("Motivation", 14, y);
  y += 6;
  doc.setFontSize(10);
  doc.text(plan.motivation, 16, y);

  // Save
  doc.save(`AI_Fitness_Plan_${user.name}.pdf`);
}
