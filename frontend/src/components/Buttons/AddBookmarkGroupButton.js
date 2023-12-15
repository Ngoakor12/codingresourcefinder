import React from "react";

export default function AddBookmarkGroupButton({ handleClick }) {
  return (
    <button type="button" className="add-bookmarks-group" onClick={handleClick}>
      Add bookmark group
    </button>
  );
}
