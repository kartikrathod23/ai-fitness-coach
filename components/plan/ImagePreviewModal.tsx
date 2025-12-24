"use client";

export default function ImagePreviewModal({ open, image, onClose }: any) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-4 max-w-md w-full">
        <img src={image} alt="Generated" className="rounded-lg" />
        <button
          onClick={onClose}
          className="mt-4 w-full rounded-lg border py-2"
        >
          Close
        </button>
      </div>
    </div>
  );
}
