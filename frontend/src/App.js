import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Button from "./Button";
import "./App.css";
import "./Navbar.css";
import { uid, setItem, getItem, removeItem, cn } from "./utils";

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

  // Example usage: Generate a placeholder uid for new notes using util
  // const newNoteId = uid("note");

  // Example usage: Scaffold for persisting notes (to be expanded as feature grows)
  // setItem("notes", [...existingNotes]);
  // const notes = getItem("notes", []);

  return (
    <div className={cn("App", "overall-layout")}>
      <Navbar />
      <Button
        variant={theme === "light" ? "primary" : "secondary"}
        size="sm"
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          borderRadius: "8px",
          zIndex: 101
        }}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        onClick={toggleTheme}
        className="theme-toggle"
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </Button>
      <div className={cn("main-layout-container")}>
        <aside className={cn("sidebar")}>
          {/* Sidebar (notes list) placeholder */}
          <div className={cn("sidebar-header")}>My Notes</div>
          <ul className={cn("notes-list")}>
            {/* Example placeholder */}
            <li className={cn("note-item", "selected")}>Welcome Note</li>
            <li className={cn("note-item")}>Add more...</li>
          </ul>
        </aside>
        <main className={cn("main-content")}>
          {/* Main area (note editor/viewer) placeholder */}
          <div className={cn("main-editor")}>
            <h2>Note Title</h2>
            <textarea className={cn("note-editor")} rows={12} placeholder="Start writing your note..." />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
