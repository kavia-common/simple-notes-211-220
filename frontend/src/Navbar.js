import React from "react";
import "./Navbar.css";
import { cn } from "./utils";

// PUBLIC_INTERFACE
function Navbar() {
  /** 
   * This Navbar sits at the top of the app.
   * It displays the app title styled with accent (primary/success) as per the style guide.
   * It remains sticky and is responsive.
   */
  return (
    <nav className={cn("navbar")}>
      <div className={cn("navbar-container")}>
        <span className={cn("navbar-title")}>
          <span className={cn("accent-strong")}>Simple</span>
          <span className={cn("accent-weak")}>Notes</span>
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
