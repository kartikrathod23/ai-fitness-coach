"use client";

export default function ImageModal({
  image,
  onClose,
}: {
  image: string | null;
  onClose: () => void;
}) {
  if (!image) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-white rounded-xl p-4 max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-sm"
        >
          ✕
        </button>
        <img
          src={image}
          alt="AI Generated"
          className="rounded-lg w-full"
        />
      </div>
    </div>
  );
}
