export default function MotivationBanner({ text }: { text: string }) {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 p-6 text-white shadow-xl">
      <h3 className="text-lg font-semibold">💪 Daily Motivation</h3>
      <p className="mt-2">{text}</p>
    </div>
  );
}
