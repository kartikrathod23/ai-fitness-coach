export default function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-emerald-100">
      <div className="text-center">
        <div className="h-12 w-12 mx-auto rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
        <p className="mt-4 text-lg font-medium">
          Generating your AI fitness plan...
        </p>
      </div>
    </div>
  );
}
