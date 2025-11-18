import React from "react";
import UrlShortener from "./components/UrlShortener";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <main className="max-w-5xl mx-auto px-4 py-6">
        <UrlShortener />
      </main>
    </div>
  );
}
