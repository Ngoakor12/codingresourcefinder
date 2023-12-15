import React from "react";

export default function ClearBookmarksButton({ handleClick }) {
  return (
    <button type="button" className="clear-bookmarks" onClick={handleClick}>
      Clear bookmarks
    </button>
  );
}
