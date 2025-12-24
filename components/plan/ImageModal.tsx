export default function ImageModal({
  image,
  onClose,
}: {
  image: string | null;
  onClose: () => void;
}) {
  if (!image) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-4 max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-sm"
        >
          ✖
        </button>

        {/* 🔄 LOADER */}
        <div className="text-center text-sm text-muted-foreground mb-2">
          Loading image...
        </div>

        <img
          src={image}
          alt="Generated"
          className="rounded-lg"
          onLoad={() => {
            // 👇 THIS IS WHAT STOPS LOADING
            const event = new Event("image-loaded");
            window.dispatchEvent(event);
          }}
        />
      </div>
    </div>
  );
}
