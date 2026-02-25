import React from "react";
import { Files, Settings, BookOpen, Code2 } from "lucide-react";

export const SidebarNav = ({
  activeTab,
  setActiveTab,
  isDarkMode,
  onExplorerClick,
  onSettingsClick,
  onGithubReadmeClick,
  onHtmlEditorClick,
}) => {
  const tabs = [
    { id: "files", icon: Files, label: "Explorer", onClick: onExplorerClick },
    {
      id: "html-editor",
      icon: Code2,
      label: "HTML Editor",
      onClick: onHtmlEditorClick,
    },
    {
      id: "github-readme",
      icon: BookOpen,
      label: "GitHub README",
      onClick: onGithubReadmeClick,
    },
    {
      id: "settings",
      icon: Settings,
      label: "Settings",
      onClick: onSettingsClick,
    },
  ];

  return (
    <div
      className={`w-14 relative flex flex-col items-center py-3
      ${
        isDarkMode
          ? "bg-[#020617]/80 border-r border-white/5"
          : "bg-white border-r border-gray-200"
      }
      backdrop-blur-xl`}
    >
      {/* 🔥 left glow strip */}
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent" />

      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => {
              if (tab.onClick) {
                tab.onClick();
              } else {
                setActiveTab(tab.id);
              }
            }}
            title={tab.label}
            className={`
              relative p-3 mb-2 rounded-xl group
              transition-all duration-200
              hover:scale-105 active:scale-95
              ${
                isActive
                  ? isDarkMode
                    ? "text-white bg-white/10"
                    : "text-black bg-gray-100"
                  : isDarkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-black"
              }
            `}
          >
            {/* 🔥 active glow pill */}
            {isActive && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-r-full bg-gradient-to-b from-blue-500 to-cyan-400 shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
            )}

            {/* icon */}
            <Icon
              className={`
                w-5 h-5 transition-all duration-200
                group-hover:scale-110
              `}
            />

            {/* hover glow */}
            <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-cyan-400/0 blur-xl" />
          </button>
        );
      })}
    </div>
  );
};