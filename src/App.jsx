import { Routes, Route, Link } from "react-router-dom";
import UrlShortener from "./components/UrlShortener";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <nav className="max-w-5xl mx-auto p-6 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold">
          sumpha
        </Link>
        <div className="space-x-4">
          <Link to="/dashboard" className="text-sm font-medium">
            Dashboard
          </Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4">
        <Routes>
          <Route path="/" element={<UrlShortener />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
}
