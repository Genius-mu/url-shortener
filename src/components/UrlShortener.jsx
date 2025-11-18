// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { Copy, Loader2, QrCode, Trash2, Download } from "lucide-react";
// import { QRCodeCanvas } from "qrcode.react";
// import toast from "react-hot-toast";
// import { motion, AnimatePresence } from "framer-motion";
// import UrlCard from "./UrlCard";

// const BASE_URL = "https://url-shortener-jgh8.onrender.com";

// export default function UrlShortener() {
//   const [input, setInput] = useState("");
//   const [shortUrl, setShortUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [list, setList] = useState([]);
//   const mountedRef = useRef(false);

//   useEffect(() => {
//     mountedRef.current = true;
//     fetchList();
//     return () => (mountedRef.current = false);
//   }, []);

//   async function fetchList() {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/shorturls/`);
//       if (mountedRef.current) setList(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch URLs");
//     }
//   }

//   const handleShorten = async () => {
//     if (!input.trim()) {
//       toast("Enter a valid URL", { icon: "🔍" });
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await axios.post(`${BASE_URL}/api/shorturls/`, {
//         original_url: input,
//       });

//       const code = res.data.short_code;
//       const full = `${BASE_URL}/${code}`;
//       setShortUrl(full);
//       setList((p) => [res.data, ...p]);
//       setInput("");
//       toast.success("Shortened successfully");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to shorten");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCopy = (text) => {
//     navigator.clipboard.writeText(text);
//     toast.success("Copied to clipboard");
//   };

//   const handleDelete = async (id) => {
//     const confirm = window.confirm("Delete this short link?");
//     if (!confirm) return;

//     try {
//       await axios.delete(`${BASE_URL}/api/shorturls/${id}/`);
//       setList((p) => p.filter((i) => i.id !== id));
//       toast.success("Deleted");
//     } catch (err) {
//       console.error(err);
//       toast.error("Delete failed");
//     }
//   };

//   return (
//     <div className="py-6">
//       {/* Card */}
//       <motion.div
//         initial={{ y: 40, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-xl mx-auto bg-white/30 backdrop-blur-xl shadow-xl border border-white/40 rounded-3xl p-6"
//       >
//         <h1 className="text-3xl font-extrabold text-center mb-4">✨ sumpha</h1>

//         <div className="flex gap-3">
//           <input
//             type="text"
//             placeholder="Paste your long URL..."
//             className="flex-1 p-3 bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl outline-none"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleShorten()}
//           />

//           <button
//             onClick={handleShorten}
//             className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 rounded-2xl flex items-center gap-2 shadow-md"
//             disabled={loading}
//           >
//             {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Shorten"}
//           </button>
//         </div>

//         {shortUrl && (
//           <motion.div
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             className="mt-5 bg-white/40 backdrop-blur-xl p-4 rounded-2xl flex justify-between items-center border border-white/50"
//           >
//             <a
//               href={shortUrl}
//               target="_blank"
//               rel="noreferrer"
//               className="text-blue-700 font-semibold"
//             >
//               {shortUrl}
//             </a>

//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => handleCopy(shortUrl)}
//                 className="p-2 rounded-lg bg-white/50 border"
//               >
//                 <Copy className="w-4 h-4" />
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </motion.div>

//       {/* List */}
//       <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 gap-4">
//         <AnimatePresence>
//           {list.map((url) => (
//             <motion.div
//               key={url.id}
//               layout
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 10 }}
//             >
//               <UrlCard
//                 url={url}
//                 base={BASE_URL}
//                 onCopy={handleCopy}
//                 onDelete={() => handleDelete(url.id)}
//               />
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect, useRef, createContext } from "react";
// import axios from "axios";
// import { Copy, Loader2, QrCode, Trash2, Download } from "lucide-react";
// import { QRCodeCanvas } from "qrcode.react";
// import toast from "react-hot-toast";
// import { motion, AnimatePresence } from "framer-motion";
// import UrlCard from "./UrlCard";
// import QRPopUp from "./QRPopUp";

// export const PopUpFunction = createContext();

// const BASE_URL = "https://url-shortener-jgh8.onrender.com";

// export default function UrlShortener({ url, base }) {
//   const [input, setInput] = useState("");
//   const [shortUrl, setShortUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [list, setList] = useState([]);
//   const mountedRef = useRef(false);
//   const [BtnPop, setBtnPop] = useState(false);
//   const [selectedURL, setSelectedURL] = useState(null);

//   useEffect(() => {
//     mountedRef.current = true;
//     fetchList();
//     return () => (mountedRef.current = false);
//   }, []);

//   async function fetchList() {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/shorturls/`);
//       if (mountedRef.current) setList(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch URLs");
//     }
//   }

//   const handleShorten = async () => {
//     if (!input.trim()) {
//       toast("Enter a valid URL", { icon: "🔍" });
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await axios.post(`${BASE_URL}/api/shorturls/`, {
//         original_url: input,
//       });

//       const code = res.data.short_code;
//       const full = `${BASE_URL}/${code}`;
//       setShortUrl(full);
//       setList((p) => [res.data, ...p]);
//       setInput("");
//       toast.success("Shortened successfully");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to shorten");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCopy = (text) => {
//     navigator.clipboard.writeText(text);
//     toast.success("Copied to clipboard");
//   };

//   const handleDelete = async (id) => {
//     const confirm = window.confirm("Delete this short link?");
//     if (!confirm) return;

//     try {
//       await axios.delete(`${BASE_URL}/api/shorturls/${id}/`);
//       setList((p) => p.filter((i) => i.id !== id));
//       toast.success("Deleted");
//     } catch (err) {
//       console.error(err);
//       toast.error("Delete failed");
//     }
//   };

//   const full = `${base}/${url.short_code}`;

//   const handleDownload = () => {
//     try {
//       const canvas = document.getElementById(`qr-canvas-${url.id}`);
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
//     <div className="py-6">
//       {/* Card */}
//       <motion.div
//         initial={{ y: 40, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-xl mx-auto bg-white/30 backdrop-blur-xl shadow-xl border border-white/40 rounded-3xl p-6"
//       >
//         <h1 className="text-3xl font-extrabold text-center mb-4">✨ sumpha</h1>

//         <div className="w-full flex gap-3 justify-center items-center sm:flex-row flex-col">
//           <input
//             type="text"
//             placeholder="Paste your long URL..."
//             className="w-full flex-1 p-3 bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl outline-none shadow-xl"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleShorten()}
//           />

//           <button
//             onClick={handleShorten}
//             className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 rounded-2xl flex items-center gap-2 py-3 w-full sm:w-fit text-center justify-center shadow-md"
//             disabled={loading}
//           >
//             {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Shorten"}
//           </button>
//         </div>

//         {shortUrl && (
//           <motion.div
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             className="mt-5 bg-white/40 backdrop-blur-xl p-4 rounded-2xl flex justify-between items-center border border-white/50"
//           >
//             <a
//               href={shortUrl}
//               target="_blank"
//               rel="noreferrer"
//               className="text-blue-700 font-semibold"
//             >
//               {shortUrl}
//             </a>

//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => handleCopy(shortUrl)}
//                 className="p-2 rounded-lg bg-white/50 border"
//               >
//                 <Copy className="sm:w-4 sm:h-4 w-2 h-2" />
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </motion.div>

//       {/* List */}
//       <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 gap-4">
//         <AnimatePresence>
//           {list.map((url) => (
//             <motion.div
//               key={url.id}
//               layout
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 10 }}
//             >
//               <PopUpFunction.Provider value={{ BtnPop, setBtnPop }}>
//                 <UrlCard
//                   url={url}
//                   base={BASE_URL}
//                   onCopy={handleCopy}
//                   onDelete={() => handleDelete(url.id)}
//                 />
//               </PopUpFunction.Provider>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//         <QRPopUp trigger={BtnPop}>
//           <div id={`qr-box-${url.id}`} className="hidden mt-2 ml-3">
//             <QRCodeCanvas
//               id={`qr-canvas-${selectedURL.id}`}
//               value={`${BASE_URL}/${selectedURL.short_code}`}
//               size={120}
//             />
//             <button
//               onClick={() => handleDownload(selectedURL)}
//               className="mt-2 p-2 w-full rounded-md bg-white/60 border flex items-center gap-2 text-sm"
//             >
//               <Download className="sm:w-4 sm:h-4 w-3 h-3" /> Download
//             </button>
//           </div>
//         </QRPopUp>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef, createContext } from "react";
import axios from "axios";
import { Copy, Loader2, Download } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import UrlCard from "./UrlCard";
import QRPopUp from "./QRPopUp";

export const PopUpFunction = createContext();

const BASE_URL = "https://url-shortener-jgh8.onrender.com";

export default function UrlShortener() {
  const [input, setInput] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const mountedRef = useRef(false);

  const [BtnPop, setBtnPop] = useState(false);
  const [selectedURL, setSelectedURL] = useState(null);

  useEffect(() => {
    mountedRef.current = true;
    fetchList();
    return () => (mountedRef.current = false);
  }, []);

  async function fetchList() {
    try {
      const res = await axios.get(`${BASE_URL}/api/shorturls/`);
      if (mountedRef.current) setList(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch URLs");
    }
  }

  const handleShorten = async () => {
    if (!input.trim()) {
      toast("Enter a valid URL", { icon: "🔍" });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/shorturls/`, {
        original_url: input,
      });

      const code = res.data.short_code;
      const full = `${BASE_URL}/${code}`;
      setShortUrl(full);

      setList((prev) => [res.data, ...prev]);
      setInput("");
      toast.success("Shortened successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to shorten");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this short link?")) return;

    try {
      await axios.delete(`${BASE_URL}/api/shorturls/${id}/`);
      setList((prev) => prev.filter((i) => i.id !== id));
      toast.success("Deleted");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  const handleDownload = () => {
    try {
      if (!selectedURL) return toast.error("QR not ready");

      const canvas = document.getElementById(`qr-canvas-${selectedURL.id}`);
      if (!canvas) return toast.error("QR not ready");

      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `${selectedURL.short_code}.png`;
      a.click();
      toast.success("QR downloaded");
    } catch (err) {
      console.error(err);
      toast.error("Download failed");
    }
  };

  return (
    <div className="py-6">
      {/* Input Card */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl mx-auto bg-white/30 backdrop-blur-xl shadow-xl border border-white/40 rounded-3xl p-6"
      >
        <h1 className="text-3xl font-extrabold text-center mb-4">✨ sumpha</h1>

        <div className="w-full flex gap-3 justify-center items-center sm:flex-row flex-col">
          <input
            type="text"
            placeholder="Paste your long URL..."
            className="w-full flex-1 p-3 bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl outline-none shadow-xl"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleShorten()}
          />

          <button
            onClick={handleShorten}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 rounded-2xl flex items-center gap-2 py-3 w-full sm:w-fit text-center justify-center shadow-md"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Shorten"}
          </button>
        </div>

        {shortUrl && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mt-5 bg-white/40 backdrop-blur-xl p-4 rounded-2xl flex justify-between items-center border border-white/50"
          >
            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 font-semibold"
            >
              {shortUrl}
            </a>

            <button
              onClick={() => handleCopy(shortUrl)}
              className="p-2 rounded-lg bg-white/50 border"
            >
              <Copy className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* LIST */}
      <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 gap-4">
        <AnimatePresence>
          {list.map((url) => (
            <motion.div
              key={url.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <PopUpFunction.Provider
                value={{ BtnPop, setBtnPop, setSelectedURL }}
              >
                <UrlCard
                  url={url}
                  base={BASE_URL}
                  onCopy={handleCopy}
                  onDelete={() => handleDelete(url.id)}
                />
              </PopUpFunction.Provider>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* POPUP */}
        <QRPopUp trigger={BtnPop} setTrigger={setBtnPop}>
          {selectedURL && (
            <div className="flex flex-col justify-center items-center">
              <QRCodeCanvas
                id={`qr-canvas-${selectedURL.id}`}
                value={`${BASE_URL}/${selectedURL.short_code}`}
                size={180}
              />

              <button
                onClick={handleDownload}
                className="mt-2 p-2 w-full rounded-md bg-white/60 border flex items-center gap-2 text-sm justify-center"
              >
                <Download className="w-4 h-4" /> Download
              </button>
            </div>
          )}
        </QRPopUp>
      </div>
    </div>
  );
}
