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

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Copy, Loader2, QrCode, Trash2, Download } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import UrlCard from "./UrlCard";

const BASE_URL = "https://url-shortener-jgh8.onrender.com";

export default function UrlShortener() {
  const [input, setInput] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const mountedRef = useRef(false);

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
      setList((p) => [res.data, ...p]);
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
    const confirm = window.confirm("Delete this short link?");
    if (!confirm) return;

    try {
      await axios.delete(`${BASE_URL}/api/shorturls/${id}/`);
      setList((p) => p.filter((i) => i.id !== id));
      toast.success("Deleted");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="py-6">
      {/* Card */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl mx-auto bg-white/30 backdrop-blur-xl shadow-xl border border-white/40 rounded-3xl p-6"
      >
        <h1 className="text-3xl font-extrabold text-center mb-4">✨ sumpha</h1>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Paste your long URL..."
            className="flex-1 p-3 bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleShorten()}
          />

          <button
            onClick={handleShorten}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 rounded-2xl flex items-center gap-2 shadow-md"
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

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(shortUrl)}
                className="p-2 rounded-lg bg-white/50 border"
              >
                <Copy className="sm:w-4 sm:h-4 w-2 h-2" />
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* List */}
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
              <UrlCard
                url={url}
                base={BASE_URL}
                onCopy={handleCopy}
                onDelete={() => handleDelete(url.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
