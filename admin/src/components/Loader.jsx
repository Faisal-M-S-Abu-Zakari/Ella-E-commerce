const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col justify-center items-center h-[60vh]">
      {/* الدائرة الدوارة */}
      <div className="border-black border-t-2 border-b-2 rounded-full w-12 h-12 animate-spin"></div>
      {/* النص تحت اللودر */}
      <span className="mt-4 text-gray-600">{text}</span>
    </div>
  );
};

export default Loader;
