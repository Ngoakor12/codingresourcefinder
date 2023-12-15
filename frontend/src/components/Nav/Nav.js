import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { Context } from "../../AppContext";

export default function Nav() {
  const { renderedResources, bookmarks } = useContext(Context);

  function className({ isActive }) {
    return isActive ? "nav-item active-nav" : "nav-item";
  }

  return (
    <nav className="nav">
      <NavLink to="/resources" className={className}>
        {`Resources ${
          renderedResources ? `(${renderedResources.length})` : `(0)`
        }`}
      </NavLink>
      <NavLink to="/bookmarks" className={className}>
        {`Bookmarks ${bookmarks ? `(${bookmarks.length})` : `(0)`}`}
      </NavLink>
    </nav>
  );
}
