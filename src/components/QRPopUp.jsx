import { X } from "lucide-react";
import React from "react";

const QRPopUp = ({ trigger, setTrigger, children }) => {
  return trigger ? (
    <div className="fixed top-0 left-0 w-full h-[100vh] bg-[rgba(0,0,0,0.3)] flex justify-center items-center z-[9999]">
      <div className="relative p-6 w-full max-w-[400px] bg-white rounded-xl shadow-xl">
        <button
          className="absolute top-3 right-3 text-sm px-3 py-1 border rounded border-none"
          onClick={() => setTrigger(false)}
        >
          <X className="w-3 h-3 sm:w-4 sm:h-4 text-red-600"  strokeWidth={3} />
        </button>
        {children}
      </div>
    </div>
  ) : null;
};

export default QRPopUp;
