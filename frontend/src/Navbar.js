import React from "react";
import "./Navbar.css";

// PUBLIC_INTERFACE
function Navbar() {
  /** 
   * This Navbar sits at the top of the app.
   * It displays the app title styled with accent (primary/success) as per the style guide.
   * It remains sticky and is responsive.
   */
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <span className="navbar-title">
          <span className="accent-strong">Simple</span>
          <span className="accent-weak">Notes</span>
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
