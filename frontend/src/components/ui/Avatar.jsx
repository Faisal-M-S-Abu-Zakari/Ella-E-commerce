const Avatar = ({ src, size = 48, alt = "avatar", uploading = false }) => {
  const s = typeof size === "number" ? `${size}px` : size;
  return (
    <div style={{ width: s, height: s }} className="relative">
      <div className="shadow-lg rounded-full ring-4 ring-white w-full h-full overflow-hidden cursor-pointer">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <div className="flex justify-center items-center bg-white w-full h-full text-gray-400">
            No photo
          </div>
        )}
      </div>
      {uploading && (
        <div className="absolute inset-0 flex justify-center items-center bg-black/40 text-white text-xs">
          Uploading...
        </div>
      )}
    </div>
  );
};

export default Avatar;
