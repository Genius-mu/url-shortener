// import React, { useRef } from "react";
// import { Copy, QrCode, Trash2, Download } from "lucide-react";
// import { QRCodeCanvas } from "qrcode.react";
// import toast from "react-hot-toast";

// export default function UrlCard({ url, base, onCopy, onDelete }) {
//   const full = `${base}/${url.short_code}`;
//   const canvasRef = useRef(null);

//   const handleDownload = () => {
//     // render QR to offscreen canvas and download
//     try {
//       const canvas = document.querySelector(`#qr-canvas-${url.id}`);
//       if (!canvas) return toast.error("QR not ready");
//       const dataUrl = canvas.toDataURL("image/png");
//       const a = document.createElement("a");
//       a.href = dataUrl;
//       a.download = `${url.short_code}.png`;
//       a.click();
//       toast.success("QR downloaded");
//     } catch (err) {
//       console.error(err);
//       toast.error("Download failed");
//     }
//   };

//   return (
//     <div className="bg-white/40 backdrop-blur-xl p-4 rounded-2xl border border-white/40 shadow-md flex items-start justify-between">
//       <div className="flex-1">
//         <p className="text-sm text-gray-800 break-all">{url.original_url}</p>
//         <a
//           className="text-blue-700 font-semibold block mt-2"
//           href={full}
//           target="_blank"
//           rel="noreferrer"
//         >
//           {full}
//         </a>
//         <p className="text-xs text-gray-600 mt-1">
//           Clicks: {url.clicks} • Created:{" "}
//           {new Date(url.created).toLocaleString()}
//         </p>
//       </div>

//       <div className="flex items-center gap-2 ml-4">
//         <div>
//           <button
//             onClick={() => onCopy(full)}
//             className="p-2 bg-white/50 rounded-lg border mr-2"
//           >
//             <Copy className="w-4 h-4" />
//           </button>

//           <button
//             onClick={() => onDelete(url.id)}
//             className="p-2 bg-white/50 rounded-lg border mr-2"
//           >
//             <Trash2 className="w-4 h-4" />
//           </button>
//         </div>

//         <div className="flex flex-col items-center">
//           <button
//             onClick={() => {
//               const el = document.getElementById(`qr-box-${url.id}`);
//               if (el) el.classList.toggle("hidden");
//             }}
//             className="p-2 bg-white/50 rounded-lg border"
//           >
//             <QrCode className="w-4 h-4" />
//           </button>

//           <div id={`qr-box-${url.id}`} className="hidden mt-2">
//             {/* Hidden canvas (QRCodeCanvas renders a canvas with predictable id) */}
//             <QRCodeCanvas id={`qr-canvas-${url.id}`} value={full} size={120} />
//             <button
//               onClick={handleDownload}
//               className="mt-2 p-2 rounded-md bg-white/60 border flex items-center gap-2 text-sm"
//             >
//               <Download className="w-4 h-4" /> Download
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { Copy, QrCode, Trash2, Download } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import toast from "react-hot-toast";

export default function UrlCard({ url, base, onCopy, onDelete }) {
  const full = `${base}/${url.short_code}`;

  const handleDownload = () => {
    try {
      const canvas = document.getElementById(`qr-canvas-${url.id}`);
      if (!canvas) return toast.error("QR not ready");
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `${url.short_code}.png`;
      a.click();
      toast.success("QR downloaded");
    } catch (err) {
      console.error(err);
      toast.error("Download failed");
    }
  };

  return (
    <div className="bg-white/40 backdrop-blur-xl p-4 rounded-2xl border border-white/40 shadow-md flex items-start justify-between flex-col sm:flex-row gap-y-3">
      <div className="flex-1">
        <p className="text-sm text-gray-800 break-all text-[12px] sm:text-[15px] sm:max-w-[350px]">{url.original_url}</p>
        <a
          className="text-blue-700 font-semibold block mt-2 text-[12px] sm:text-[16px]"
          href={full}
          target="_blank"
          rel="noreferrer"
        >
          {full}
        </a>
        <p className="text-xs text-gray-600 mt-1 text-[11px] sm:text-[14px]">
          Clicks: {url.clicks} • Created:{" "}
          {new Date(url.created).toLocaleString()}
        </p>
      </div>

      <div className="flex justify-center items-center gap-1 sm:ml-4">
        <div>
          <button
            onClick={() => onCopy(full)}
            className="p-2 bg-white/50 rounded-lg border mr-2"
          >
            <Copy className="sm:w-4 sm:h-4 w-3 h-3" />
          </button>

          <button
            onClick={() => onDelete(url.id)}
            className="p-2 bg-white/50 rounded-lg border mr-2"
          >
            <Trash2 className="sm:w-4 sm:h-4 w-3 h-3" />
          </button>
        </div>

        <div className="flex items-center">
          <button
            onClick={() => {
              const el = document.getElementById(`qr-box-${url.id}`);
              if (el) el.classList.toggle("hidden");
            }}
            className="p-2 bg-white/50 rounded-lg border"
          >
            <QrCode className="sm:w-4 sm:h-4 w-3 h-3" />
          </button>

          <div id={`qr-box-${url.id}`} className="hidden mt-2">
            <QRCodeCanvas id={`qr-canvas-${url.id}`} value={full} size={120} />
            <button
              onClick={handleDownload}
              className="mt-2 p-2 rounded-md bg-white/60 border flex items-center gap-2 text-sm"
            >
              <Download className="sm:w-4 sm:h-4 w-3 h-3" /> Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
