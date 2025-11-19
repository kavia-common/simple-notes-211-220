import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./App.css";
import "./Navbar.css";

/**
 * PUBLIC_INTERFACE
 * Main App component for Simple Notes.
 * Integrates a sticky Navbar, a sidebar, and a main content area in a responsive modern flex layout.
 */
function App() {
  const [theme, setTheme] = useState("light");

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="App overall-layout">
      <Navbar />
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
      <div className="main-layout-container">
        <aside className="sidebar">
          {/* Sidebar (notes list) placeholder */}
          <div className="sidebar-header">My Notes</div>
          <ul className="notes-list">
            {/* Example placeholder */}
            <li className="note-item selected">Welcome Note</li>
            <li className="note-item">Add more...</li>
          </ul>
        </aside>
        <main className="main-content">
          {/* Main area (note editor/viewer) placeholder */}
          <div className="main-editor">
            <h2>Note Title</h2>
            <textarea className="note-editor" rows={12} placeholder="Start writing your note..." />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
