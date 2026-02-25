import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export const HtmlEditor = ({ isOpen, onClose, isDarkMode }) => {
  const [htmlContent, setHtmlContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewKey, setPreviewKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchHtmlContent();
    }
  }, [isOpen]);

  const refreshPreview = () => {
  setIsRefreshing(true);

  setTimeout(() => {
    setPreviewKey((k) => k + 1);
    setIsRefreshing(false);
  }, 180);
};

  const fetchHtmlContent = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://raw.githubusercontent.com/seraprogrammer/Extensions/main/htmleditor.html"
      );
      if (!response.ok) throw new Error("Failed to fetch HTML content");
      const content = await response.text();

      const styledContent = `
        <style>
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          ::-webkit-scrollbar-track {
            background: ${isDarkMode ? "#1e1e1e" : "#f1f1f1"};
          }
          ::-webkit-scrollbar-thumb {
            background: ${isDarkMode ? "#4a4a4a" : "#888"};
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: ${isDarkMode ? "#555" : "#555"};
          }
          body {
            margin: 0;
            padding: 16px;
            font-family: system-ui;
          }
        </style>
        ${content}
      `;

      setHtmlContent(styledContent);
      refreshPreview();
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 🔥 BACKDROP */}
      <div
        className="absolute inset-0 backdrop-blur-xl bg-black/60 animate-fadeIn"
        onClick={onClose}
      />

      {/* 🚀 FLOATING MODAL */}
      <div
        className={`relative w-[95vw] h-[92vh] rounded-2xl overflow-hidden border animate-scaleIn
        ${
          isDarkMode
            ? "bg-[#0f172a]/90 border-white/10"
            : "bg-white/90 border-gray-200"
        }
        backdrop-blur-2xl shadow-[0_40px_120px_rgba(0,0,0,0.7)]`}
      >
        {/* ===== HEADER ===== */}
        <div
          className={`h-14 flex items-center justify-between px-5 border-b
          ${
            isDarkMode
              ? "border-white/10 bg-[#020617]/40"
              : "border-gray-200 bg-white/70"
          }
          backdrop-blur-xl`}
        >
          <h2
            className={`text-lg font-semibold tracking-wide ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            HTML Editor
          </h2>

          {/* ❌ CLOSE BUTTON */}
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-all duration-200
            ${
              isDarkMode
                ? "hover:bg-white/10 text-white"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <X className="w-5 h-5 transition-transform duration-200 hover:rotate-90" />
          </button>
        </div>

        {/* ===== CONTENT ===== */}
        <div className="h-[calc(100%-3.5rem)]">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div
                className={`h-10 w-10 rounded-full border-2 animate-spin
                ${
                  isDarkMode
                    ? "border-cyan-400 border-t-transparent"
                    : "border-blue-600 border-t-transparent"
                }`}
              />
            </div>
          ) : error ? (
            <div className="text-red-500 text-center p-4">{error}</div>
          ) : (
            <div className="h-full p-3">
              {/* 🖥️ PREMIUM PREVIEW FRAME */}
              <div
                className={`w-full h-full rounded-xl overflow-hidden border
                ${
                  isDarkMode
                    ? "border-white/10 bg-[#020617]"
                    : "border-gray-200 bg-white"
                }
                shadow-inner`}
              >
                <div
  className={`relative w-full h-full transition-all duration-300 ${
    isRefreshing ? "scale-[0.985] opacity-70" : "scale-100 opacity-100"
  }`}
>
  <iframe
    key={previewKey}
    srcDoc={htmlContent}
    className="w-full h-full border-none rounded-xl"
    title="HTML Preview"
    sandbox="allow-scripts allow-same-origin"
  />

  {/* live glow overlay */}
  <div
    className={`pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300 ${
      isRefreshing ? "opacity-100 bg-cyan-400/10" : "opacity-0"
    }`}
  />
</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};